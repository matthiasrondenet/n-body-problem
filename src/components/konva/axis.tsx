import { centerPoint } from "@/services/graphical/graphical";
import React from "react";
import { Circle, Group, Line } from "react-konva";

type AxisLinesProps = {
  width: number;
  height: number;
  color: string;
};
export const AxisLines: React.FC<AxisLinesProps> = ({
  width,
  height,
  color,
}) => {
  const center = centerPoint({ width, height });

  return (
    <>
      <Group x={center.x} y={center.y}>
        <Circle radius={2} fill={color} opacity={0.5} />
      </Group>
      <Line
        points={[0, center.y, width, center.y]}
        stroke={color}
        strokeWidth={1}
        opacity={0.5}
      />
      <Line
        points={[center.x, 0, center.x, height]}
        stroke={color}
        strokeWidth={1}
        opacity={0.5}
      />
    </>
  );
};
