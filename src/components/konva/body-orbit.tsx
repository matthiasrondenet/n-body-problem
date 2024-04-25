import React from "react";
import { Line } from "react-konva";
import Konva from "konva";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { getColorOrDefault } from "./helpers";

export const BodyLine = React.forwardRef(
  (
    {
      color,
    }: {
      color: keyof DefaultColors;
      size: number;
    },
    ref: React.Ref<Konva.Line>
  ) => {
    const c = getColorOrDefault(color, "500");
    return (
      <Line
        ref={ref}
        shadowForStrokeEnabled={false}
        perfectDrawEnabled={false}
        stroke={c}
        strokeWidth={1}
      />
    );
  }
);
