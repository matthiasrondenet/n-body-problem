import React from "react";
import { TimeSpeed } from "./time-speed";
import { ElapsedTime } from "./elapsed-time";
import { usePresetRoute } from "../hooks/preset-hooks";
import { useSimulationConfigDescription } from "../hooks/name-hooks";

type SimulationFooterProps = {
  id: string;
};
export const SimulationFooter: React.FC<SimulationFooterProps> = ({ id }) => {
  const { isPresetRoute } = usePresetRoute();

  const configDescription = useSimulationConfigDescription(id);

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex w-full flex-row flex-wrap items-center justify-between justify-items-center">
        {isPresetRoute && configDescription && (
          <p className="pb-2">{configDescription}</p>
        )}
        <span className="flex flex-row flex-wrap items-center justify-between justify-items-center gap-5">
          <TimeSpeed id={id} />
          <ElapsedTime id={id} showEstimated />
        </span>
      </div>
    </div>
  );
};
