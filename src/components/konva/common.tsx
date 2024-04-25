import { PropsWithChildren } from "react";
import { Label, Tag, Text } from "react-konva";

type TooltipProps = {
  id: string;
  x: number;
  y: number;
  textColor: string;
  color?: string;
  contents: Record<string, string> | Record<string, never>;
  fontSize?: number;
};
export const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  id,
  x,
  y,
  color,
  textColor,
  contents,
  fontSize,
}) => {
  return (
    <Label id={id} x={x} y={y}>
      <Tag fill={color} />
      {Object.keys(contents).map((k, i) => (
        <Text
          id={`tooltip-content-${k}`}
          key={k}
          y={i * 15}
          fontSize={fontSize ?? 14}
          text={contents[k]}
          fill={textColor}
          wrap="word"
        />
      ))}
    </Label>
  );
};
