import React from "react";
import { round } from "lodash-es";
import { Badge } from "@/components/ui/badge";
import { useFps } from "../hooks/fps-hooks";

type FpsProps = {
  id: string;
};
export const Fps: React.FC<FpsProps> = ({ id }) => {
  const { framesPerSecond, calculatedFramesPerSecond } = useFps(id);

  return (
    <span className="w-32">
      <span className="pr-2">FPS:</span>
      <Badge className="h-5 w-24 px-2">
        <p className="w-full text-center">
          {round(framesPerSecond)}:{round(calculatedFramesPerSecond, 2)}
        </p>
      </Badge>
    </span>
  );
};
