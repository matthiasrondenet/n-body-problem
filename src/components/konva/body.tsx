import Konva from "konva";
import React from "react";
import { Arrow, Circle, Group, Text } from "react-konva";
import { Tooltip } from "./common";
import defaultColors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { useTheme } from "../layout/header/theme-provider";
import { getColorOrDefault } from "./helpers";

type BodyProps = {
  name: string;
  radius: number;
  color: keyof DefaultColors;
  displayCoordinates: boolean;
  displayName: boolean;
  displayAxis: boolean;
};

export const Body = React.forwardRef(
  (
    {
      name,
      radius,
      color,
      displayCoordinates,
      displayName,
      displayAxis,
    }: BodyProps,
    ref: React.Ref<Konva.Group>
  ) => {
    const { theme } = useTheme();

    const axisLineLength = (radius / 1.25) * 5;
    const pointerLength = 4;

    const textColor =
      theme === "dark" ? defaultColors.white : defaultColors.black;

    const bodyColor = getColorOrDefault(color, "500");
    const axisColor = getColorOrDefault(color, "400");

    return (
      <>
        <Group id="body-group" ref={ref} x={0} y={0}>
          <Circle
            id="body-circle"
            shadowForStrokeEnabled={false}
            perfectDrawEnabled={false}
            radius={radius}
            fill={bodyColor}
          />

          {(displayCoordinates || displayName) && (
            <Tooltip
              id="body-tooltip"
              x={0}
              y={5}
              contents={{
                ...(displayName ? { name: name } : {}),
                ...(displayCoordinates ? { coordinates: "" } : {}),
              }}
              textColor={textColor}
            />
          )}

          {displayAxis && (
            <>
              <Arrow
                id="abscissa"
                points={[0, 0, axisLineLength, 0]}
                stroke={axisColor}
                strokeWidth={1}
                pointerLength={pointerLength}
                pointerWidth={pointerLength}
              />
              <Arrow
                id="ordinate"
                points={[0, 0, 0, -axisLineLength]}
                stroke={axisColor}
                strokeWidth={1}
                pointerLength={pointerLength}
                pointerWidth={pointerLength}
              />
              <Text
                id="ordinate-y"
                x={-5}
                y={-axisLineLength - 12}
                fill={axisColor}
                fontSize={10}
              />
              <Text
                id="abscissa-x"
                x={axisLineLength + 3}
                y={-5}
                fill={axisColor}
                fontSize={10}
              />
              <Arrow
                id="axis-velocity"
                points={[]}
                stroke={bodyColor}
                strokeWidth={1}
                pointerLength={pointerLength}
                pointerWidth={pointerLength}
              />
            </>
          )}
        </Group>
      </>
    );
  }
);
