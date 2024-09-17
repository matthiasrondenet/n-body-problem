import {
  calculatePositions,
  POSITION_X,
  POSITION_Y,
  STATE_BODY_LENGTH,
} from "@/services/physics/motion";
import { Result, createError, createOk, isErr } from "@/utils/result";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { OdeEquation, Solver } from "@/services/solvers/solver";
import { StatusType } from "../pages/playground/store/simulations-store";
import {
  ControllableLoopArguments,
  useSimulationLoop,
} from "@/utils/animation-loop-hooks";
import { calculateHypotenuse } from "@/services/physics/physics";
import { chunk } from "lodash-es";
import { SimulationType } from "./simulation-types";
import { centerPoint } from "@/services/graphical/graphical";
import {
  AdditionalContentType,
  GraphicalConfig,
  SimulationConfig,
} from "@/services/simulation/simulation-config-types";
import { buildSimulationResetKey, toSimulation } from "./simulation-helpers";
import { normalizeValue, rangeScalingFunctions } from "@/utils/number";

export type SimulationResultState = {
  allResults: number[][];
  currentIndex: number;
};

const getResults = (results: number[][]): Result<number[][], string> => {
  const hasCalculationError =
    results.flatMap((x) => x).filter((x) => isNaN(x)).length > 0;
  if (hasCalculationError)
    return createError("An error occured during calculation");

  return createOk(results);
};

export const useSimulationCalculated = (config: SimulationConfig) =>
  useMemo(() => toSimulation(config), [config]);

export const useStateVariablesCalculation = ({
  solver,
  ode,
  stepSize,
  isPeriodic,
  timeSpeed,
  timeUnit,
}: {
  solver: Solver;
  ode: OdeEquation;
  stepSize: number;
  isPeriodic: boolean;
  timeSpeed: number;
  timeUnit: number;
}) => {
  const calculateBodyPositions = useCallback(
    (y0: number[], range: [number, number]) =>
      calculatePositions({
        solver: solver,
        ode: ode,
        y0: y0,
        stepSize: stepSize,
        range: range,
      }),
    [solver, ode, stepSize]
  );

  const computeNextBodyStatesResult = useCallback(
    ({
      allResults,
      currentIndex,
    }: SimulationResultState): Result<SimulationResultState, string> => {
      if (isPeriodic) {
        return createOk({
          allResults: allResults,
          currentIndex: currentIndex + timeSpeed,
        });
      }

      const curIndex = currentIndex % allResults.length;
      const currentResult = allResults[curIndex];
      const nextResults = getResults(
        calculateBodyPositions(currentResult, [0, stepSize * timeSpeed])
      );

      if (!isErr(nextResults)) {
        return createOk({
          allResults: [...allResults, ...nextResults.data],
          currentIndex: currentIndex + nextResults.data.length,
        });
      }

      return nextResults;
    },
    [isPeriodic, stepSize, timeSpeed, calculateBodyPositions]
  );

  /**
   * when isPeriodic defined we pre-compute all results
    on the other case, we just init with y0 values
   */
  const computeInitialBodyStatesResult = useCallback(
    (y0: number[]) =>
      isPeriodic ? calculateBodyPositions(y0, [0, timeUnit]) : [y0],
    [isPeriodic, timeUnit, calculateBodyPositions]
  );

  return { computeInitialBodyStatesResult, computeNextBodyStatesResult };
};

export const useDrawScaling = ({
  width,
  height,
  graphicalConfig,
  bodiesDiameters,
  bodiesDistances,
}: {
  width: number;
  height: number;
  graphicalConfig: Required<GraphicalConfig>;
  bodiesDiameters: number[];
  bodiesDistances: number[];
}) => {
  const minDistance = Math.min(...bodiesDistances);
  const maxDistance = Math.max(...bodiesDistances);

  const minDiameter = Math.min(...bodiesDiameters);
  const maxDiameter = Math.max(...bodiesDiameters);

  const minDrawDistance = 0;
  const maxDrawDistance =
    (Math.min(width, height) / 2) * graphicalConfig.distancesScalingFactor;

  const minDrawDiameterSize = Math.max(1, graphicalConfig.minimumSizePixels);
  const maxDrawDiameterSize = Math.min(100, graphicalConfig.maximumSizePixels);

  const center = centerPoint({ width, height });

  const transformDiameterFunc = useCallback(
    (value: number): number => {
      if (value === minDiameter && maxDiameter === minDiameter)
        return minDrawDiameterSize;

      const normalized = normalizeValue(value, minDiameter, maxDiameter);
      const transformed = rangeScalingFunctions[
        graphicalConfig.diametersScalingFunc
      ](normalized, minDrawDiameterSize, maxDrawDiameterSize);
      return transformed;
    },
    [
      minDiameter,
      maxDiameter,
      minDrawDiameterSize,
      maxDrawDiameterSize,
      graphicalConfig.diametersScalingFunc,
    ]
  );

  const transformDistanceFunc = useCallback(
    (value: number): number => {
      const normalized = normalizeValue(value, minDistance, maxDistance);
      const transformed = rangeScalingFunctions[
        graphicalConfig.distancesScalingFunc
      ](normalized, minDrawDistance, maxDrawDistance);
      return transformed;
    },
    [
      minDistance,
      maxDistance,
      minDrawDistance,
      maxDrawDistance,
      graphicalConfig.distancesScalingFunc,
    ]
  );

  const transformXYFunc = useCallback(
    (x: number, y: number) => {
      const distance = calculateHypotenuse(x, y);
      const transformed = transformDistanceFunc(distance);
      const ratio = transformed / distance;
      return {
        x: x * ratio + center.x,
        y: -y * ratio + center.y,
      };
    },
    [center.x, center.y, transformDistanceFunc]
  );

  return {
    transformDiameterFunc,
    transformXYFunc,
  };
};

export const useSimulation = ({
  width,
  height,
  simulationConfig,
  statusType,
  onStatusTypeChanged,
  onSimulationLoop,
  onSimulationLoopResultStateChanged,
}: {
  width: number;
  height: number;
  simulationConfig: SimulationType;
  statusType?: StatusType;
  onStatusTypeChanged?: (statusType: StatusType) => void;
  onSimulationLoop?: (arg: ControllableLoopArguments) => void;
  onSimulationLoopResultStateChanged: (
    state: SimulationResultState,
    loopState: ControllableLoopArguments
  ) => void;
}) => {
  const { computeInitialBodyStatesResult, computeNextBodyStatesResult } =
    useStateVariablesCalculation({
      solver: simulationConfig.solver,
      ode: simulationConfig.ode,
      timeUnit: simulationConfig.timeUnit,
      timeSpeed: simulationConfig.timeSpeed,
      isPeriodic: simulationConfig.isPeriodic,
      stepSize: simulationConfig.stepSize,
    });

  const y0 = simulationConfig.bodies.flatMap((x) => x.state);
  const initialResults = computeInitialBodyStatesResult(y0);

  const initSimulationResultState: SimulationResultState = {
    allResults: initialResults,
    currentIndex: 0,
  };

  const bodiesDistanceFromCenter = useMemo(
    () =>
      initialResults.flatMap((x) =>
        chunk(x, STATE_BODY_LENGTH).map((y) =>
          calculateHypotenuse(y[POSITION_X], y[POSITION_Y])
        )
      ),
    [initialResults]
  );

  const configResetKey = useMemo(
    () => buildSimulationResetKey(simulationConfig),
    [simulationConfig]
  );

  const { transformDiameterFunc, transformXYFunc } = useDrawScaling({
    width,
    height,
    graphicalConfig: simulationConfig.graphicalConfig,
    bodiesDiameters: simulationConfig.bodies.map((x) => x.diameter),
    bodiesDistances: bodiesDistanceFromCenter,
  });

  const getContentFor = (
    contentType: AdditionalContentType
  ): string | undefined => {
    switch (contentType) {
      case "name":
        return simulationConfig.name;
      case "step-size":
        return simulationConfig.stepSize.toString();
      case "timeUnit":
        return simulationConfig.timeUnit.toString();
      case "nb-of-calculations":
      case "t":
        return undefined;
    }
  };

  const additionnalContents: Record<string, string | undefined> =
    simulationConfig.graphicalConfig.additionnalContents.reduce((acc, key) => {
      acc[key as string] = getContentFor(key);
      return acc;
    }, {} as Record<string, string | undefined>);

  useSimulationCalculation({
    configResetKey,
    frameRates: simulationConfig.framesPerSecond,
    initSimulationResultState,
    statusType,
    onStatusTypeChanged,
    onSimulationLoop,
    computeNextBodyStatesResult,
    onSimulationLoopResultStateChanged,
  });

  return {
    additionnalContents,
    transformDiameterFunc,
    transformXYFunc,
  };
};

export const useSimulationCalculation = ({
  configResetKey,
  frameRates,
  initSimulationResultState,
  statusType,
  onStatusTypeChanged,
  onSimulationLoop,
  computeNextBodyStatesResult,
  onSimulationLoopResultStateChanged,
}: {
  configResetKey: string;
  frameRates: number;
  initSimulationResultState: SimulationResultState;
  statusType?: StatusType;
  onStatusTypeChanged?: (statusType: StatusType) => void;
  onSimulationLoop?: (arg: ControllableLoopArguments) => void;
  computeNextBodyStatesResult: (
    state: SimulationResultState
  ) => Result<SimulationResultState, string>;
  onSimulationLoopResultStateChanged: (
    state: SimulationResultState,
    loopState: ControllableLoopArguments
  ) => void;
}) => {
  const reset = useRef<string>(configResetKey);
  const simulationStateRef = useRef<SimulationResultState>(
    initSimulationResultState
  );

  useSimulationLoop({
    statusType,
    frameRates: frameRates,
    onStatusTypeChanged,
    callback: (loopState: ControllableLoopArguments) => {
      onSimulationLoop?.(loopState);

      if (!simulationStateRef.current) {
        return;
      }

      const calculationResult = computeNextBodyStatesResult(
        simulationStateRef.current
      );

      if (isErr(calculationResult)) {
        onStatusTypeChanged?.("Ended");
        return;
      }

      simulationStateRef.current = calculationResult.data;
      onSimulationLoopResultStateChanged(simulationStateRef.current, loopState);
    },
  });

  useEffect(() => {
    if (configResetKey !== reset.current || statusType === "Reset") {
      reset.current = configResetKey;
      simulationStateRef.current = initSimulationResultState;
      if (statusType !== "Reset") {
        onStatusTypeChanged?.("Reset");
      }
    }
  }, [
    configResetKey,
    initSimulationResultState,
    statusType,
    onStatusTypeChanged,
  ]);
};
