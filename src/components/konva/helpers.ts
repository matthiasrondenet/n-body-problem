import Konva from "konva";
import { chunk, round } from "lodash-es";
import defaultColors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { SimulationType } from "../simulation/simulation-types";
import { SimulationResultState } from "../simulation/simulation-hooks";
import { previousNth } from "@/utils/array";
import { CartesianCoordinate2d } from "@/services/physics/coordinate";
import {
  BodyState,
  POSITION_X,
  POSITION_Y,
  STATE_BODY_LENGTH,
} from "@/services/physics/motion";

export const getColorOrDefault = (
  color: keyof DefaultColors,
  variant: string
) => {
  if (!Object.keys(defaultColors).includes(color)) return color;
  const c = defaultColors[color];
  if (!Object.keys(c).includes(variant)) return c;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (c as any)[variant];
};

const getBodiesLinesStates = (
  allResults: number[][],
  currentIndex: number,
  nbOfHistoryPoints: number,
  historyPointsRatio: number
) => {
  const pastBodiesStates = previousNth(
    allResults,
    currentIndex,
    nbOfHistoryPoints
  );
  const numToKeep = Math.round(pastBodiesStates.length * historyPointsRatio);
  const step = pastBodiesStates.length / (pastBodiesStates.length - numToKeep);
  return pastBodiesStates.filter((_, i) => Math.round(i % step) !== 0);
};

export const updateDrawing = ({
  resultState: { allResults, currentIndex },
  simulationConfig: { graphicalConfig, bodies },
  comPosition,
  transformXFunc,
  transformYFunc,
  konvaRefs: {
    layerCom,
    layerDebug,
    layerBodies,
    bodiesMap,
    orbitsMap,
    comBodyLinesMap,
    comLine,
  },
}: {
  resultState: SimulationResultState;
  simulationConfig: SimulationType;
  comPosition: CartesianCoordinate2d;
  transformXFunc: (x: number) => number;
  transformYFunc: (x: number) => number;
} & {
  konvaRefs: {
    stage: Konva.Stage | null;
    layerCom: Konva.Layer | null;
    layerDebug: Konva.Layer | null;
    layerBodies: Konva.Layer | null;
    bodiesMap: Record<number, Konva.Group | null>;
    orbitsMap: Record<number, Konva.Line | null>;
    comBodyLinesMap: Record<number, Konva.Line | null>;
    comLine: Konva.Line | null;
  };
}) => {
  const currentI = currentIndex % allResults.length;
  const currentBodiesState = allResults[currentI];
  const bodiesStates = chunk(
    currentBodiesState,
    STATE_BODY_LENGTH
  ) as unknown as BodyState[];

  const numberOfBodies = bodies.length;
  const bodiesLinesStates = getBodiesLinesStates(
    allResults,
    currentIndex,
    graphicalConfig.nbOfHistoryPoints,
    graphicalConfig.historyPointsRatio
  ).map((s) => chunk(s, STATE_BODY_LENGTH) as unknown as BodyState[]);

  const bodiesLinesHistory = bodiesStates.map((_, i) =>
    bodiesLinesStates.map((x) => x[i])
  );

  for (let i = 0; i < numberOfBodies; i++) {
    updateBodyPosition({
      body: bodiesMap[i],
      bodyState: bodiesStates[i],
      transformXFunc: transformXFunc,
      transformYFunc: transformYFunc,
    });
    updateOrbitPoints({
      orbit: orbitsMap[i],
      bodyLinesStates: bodiesLinesHistory[i],
      transformXFunc: transformXFunc,
      transformYFunc: transformYFunc,
    });
  }

  updateComLine({
    line: comLine,
    bodiesState: bodiesStates,
    transformXFunc: transformXFunc,
    transformYFunc: transformYFunc,
  });
  for (let i = 0; i < numberOfBodies; i++) {
    updateComBodyLine({
      line: comBodyLinesMap[i],
      bodyState: bodiesStates[i],
      centerOfMassPosition: comPosition,
      transformXFunc: transformXFunc,
      transformYFunc: transformYFunc,
    });
  }

  updateDebugInfo({
    layer: layerDebug,
    currentIndex,
    stepSize: 1,
  });

  if (layerBodies) {
    layerBodies.batchDraw();
  }
  if (layerCom) {
    layerCom.batchDraw();
  }
  if (layerDebug) {
    layerDebug.batchDraw();
  }
};

export const updateOrbitPoints = ({
  orbit,
  bodyLinesStates,
  transformXFunc,
  transformYFunc,
}: {
  orbit: Konva.Line | null;
  bodyLinesStates: BodyState[];
  transformXFunc: (x: number) => number;
  transformYFunc: (x: number) => number;
}) => {
  if (!orbit) return;

  const bodyLinesPoints = bodyLinesStates.flatMap((state) => [
    transformXFunc(state[POSITION_X]),
    transformYFunc(state[POSITION_Y]),
  ]);

  orbit.points(bodyLinesPoints);
};

export const updateBodyPosition = ({
  body,
  bodyState,
  transformXFunc,
  transformYFunc,
}: {
  body: Konva.Group | null;
  bodyState: BodyState;
  transformXFunc: (x: number) => number;
  transformYFunc: (x: number) => number;
}) => {
  if (!body) return;

  const [x, y, vX, vY] = bodyState;

  body.x(transformXFunc(x));
  body.y(transformYFunc(y));

  const tooltipCoordinates = body.findOne<Konva.Text>(
    "#tooltip-content-coordinates"
  );

  if (tooltipCoordinates) {
    tooltipCoordinates.setText(`x: ${round(x, 2)}, y: ${round(y, 2)}`);
  }

  const axisVelocity = body.findOne<Konva.Arrow>("#axis-velocity");
  if (axisVelocity) {
    axisVelocity.points([0, 0, vX * 15, -vY * 15]);
  }

  const axisAbscissaX = body.findOne<Konva.Text>("#abscissa-x");
  if (axisAbscissaX) {
    axisAbscissaX.text(`${round(x, 2)}`);
  }
  const axisOrdinateY = body.findOne<Konva.Text>("#ordinate-y");
  if (axisOrdinateY) {
    axisOrdinateY.text(`${round(y, 2)}`);
  }
};

export const updateComLine = ({
  line,
  bodiesState,
  transformXFunc,
  transformYFunc,
}: {
  line: Konva.Line | null;
  bodiesState: BodyState[];
  transformXFunc: (x: number) => number;
  transformYFunc: (x: number) => number;
}) => {
  if (!line) return;

  const comLinePoints = bodiesState.flatMap((state) => [
    transformXFunc(state[POSITION_X]),
    transformYFunc(state[POSITION_Y]),
  ]);

  line.points(comLinePoints);
};

export const updateComBodyLine = ({
  line,
  bodyState,
  centerOfMassPosition,
  transformXFunc,
  transformYFunc,
}: {
  line: Konva.Line | null;
  bodyState: BodyState;
  centerOfMassPosition: CartesianCoordinate2d;
  transformXFunc: (x: number) => number;
  transformYFunc: (x: number) => number;
}) => {
  if (!line) return;

  line.points([
    transformXFunc(bodyState[POSITION_X]),
    transformYFunc(bodyState[POSITION_Y]),
    transformXFunc(centerOfMassPosition.x),
    transformYFunc(centerOfMassPosition.y),
  ]);
  line.bezier(true);
};

export const updateDebugInfo = ({
  layer,
  currentIndex,
  stepSize,
}: {
  layer: Konva.Layer | null;
  currentIndex: number;
  stepSize: number | undefined;
}) => {
  if (!layer) return;

  const additionnalContentT = layer.findOne<Konva.Text>(
    "#debug-additional-content-t"
  );

  if (additionnalContentT) {
    additionnalContentT.setText(`${currentIndex * (stepSize ?? 1)}`);
  }
};
