import React, { useRef } from "react";
import { StatusType } from "../pages/playground/store/simulations-store";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";
import {
  SimulationResultState,
  useSimulation,
  useSimulationCalculated,
} from "./simulation-hooks";
import Konva from "konva";
import { Text, Stage, Layer, Circle, Line, Label } from "react-konva";
import { Body } from "../konva/body";
import { BodyLine } from "../konva/body-orbit";
import { ControllableLoopArguments } from "@/utils/animation-loop-hooks";
import { AxisLines } from "../konva/axis";
import { getColorOrDefault, updateDrawing } from "../konva/helpers";
Konva.autoDrawEnabled = false;

export interface SimulationProps {
  width: number;
  height: number;
  config: SimulationConfig;
  statusType?: StatusType;
  onStatusTypeChanged?: (statusType: StatusType) => void;
  onSimulationLoop?: (
    simulationLoopArguments: ControllableLoopArguments
  ) => void;
}

export const Simulation: React.FC<SimulationProps> = ({
  width,
  height,
  config,
  statusType,
  onStatusTypeChanged,
  onSimulationLoop,
}) => {
  const simulationConfig = useSimulationCalculated(config);

  const onSimulationLoopResultStateChanged = (
    resultState: SimulationResultState
  ) => {
    updateDrawing({
      resultState,
      simulationConfig,
      comPosition: drawableCenterOfMassPosition,
      konvaRefs: {
        stage: stageRef.current,
        layerCom: layerComRef.current,
        layerDebug: layerDebugRef.current,
        layerBodies: layerBodiesRef.current,
        bodiesMap: bodiesRefMap.current,
        orbitsMap: orbitRefMap.current,
        comBodyLinesMap: comBodyLinesRefMap.current,
        comLine: comLineRef.current,
      },
      transformXYFunc: transformXYFunc,
    });
  };

  const { additionnalContents, transformXYFunc, transformDiameterFunc } =
    useSimulation({
      width,
      height,
      simulationConfig,
      statusType,
      onStatusTypeChanged,
      onSimulationLoop,
      onSimulationLoopResultStateChanged,
    });

  const stageRef = useRef<Konva.Stage>(null);
  const layerComRef = useRef<Konva.Layer>(null);
  const layerDebugRef = useRef<Konva.Layer>(null);
  const layerBodiesRef = useRef<Konva.Layer>(null);

  const orbitRefMap = useRef<Record<number, Konva.Line | null>>({});
  const bodiesRefMap = useRef<Record<number, Konva.Group | null>>({});
  const comBodyLinesRefMap = useRef<Record<number, Konva.Line | null>>({});
  const comLineRef = useRef<Konva.Line>(null);

  const redColor = getColorOrDefault("red", "500");

  const drawableCenterOfMassPosition = transformXYFunc(
    simulationConfig.centerOfMassPosition.x,
    simulationConfig.centerOfMassPosition.y
  );

  return (
    <Stage id="stage" height={height} width={width} ref={stageRef}>
      <Layer id="debug" ref={layerDebugRef}>
        <Label x={5} y={5}>
          {Object.keys(additionnalContents).map((key, i) => (
            <Text
              id={`debug-additional-content-${key}`}
              key={key}
              text={additionnalContents[key]}
              fill={redColor}
              y={i * 15}
            />
          ))}
        </Label>
      </Layer>
      <Layer id="com" listening={false} ref={layerComRef}>
        {simulationConfig.graphicalConfig.displayAxis && (
          <AxisLines width={width} height={height} color={redColor} />
        )}
        {simulationConfig.graphicalConfig.displayCom && (
          <>
            <Circle
              x={drawableCenterOfMassPosition.x}
              y={drawableCenterOfMassPosition.y}
              radius={4}
              fill={"pink"}
              opacity={0.5}
            />
            <Line
              ref={comLineRef}
              stroke={redColor}
              strokeWidth={2}
              closed
              opacity={0.5}
            />
            {simulationConfig.bodies.map((_, i) => (
              <Line
                ref={(ref: Konva.Line | null) =>
                  (comBodyLinesRefMap.current[i] = ref)
                }
                key={i}
                stroke={redColor}
                strokeWidth={2}
                opacity={0.5}
              />
            ))}
          </>
        )}
      </Layer>
      <Layer id="bodies" listening={false} ref={layerBodiesRef}>
        {simulationConfig.graphicalConfig.displayBodies &&
          simulationConfig.bodies.map((b, i) => (
            <Body
              key={b.name ?? i}
              name={b.name}
              ref={(ref: Konva.Group | null) => (bodiesRefMap.current[i] = ref)}
              radius={transformDiameterFunc(b.diameter) / 2}
              color={b.color}
              displayCoordinates={
                simulationConfig.graphicalConfig.displayBodiesCoordinates
              }
              displayName={
                simulationConfig.graphicalConfig.displayBodiesBodiesNames
              }
              displayAxis={
                simulationConfig.graphicalConfig.displayBodiesBodiesAxis
              }
            />
          ))}
        {simulationConfig.graphicalConfig.displayOrbits &&
          simulationConfig.bodies.map((b, i) => (
            <BodyLine
              key={b.name ?? i}
              ref={(ref: Konva.Line | null) => (orbitRefMap.current[i] = ref)}
              color={b.color}
              size={transformDiameterFunc(b.diameter) / 2}
            />
          ))}
      </Layer>
    </Stage>
  );
};
