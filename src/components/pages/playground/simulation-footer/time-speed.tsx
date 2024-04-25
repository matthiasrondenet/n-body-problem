import React from "react";
import { TimeSpeedSlider } from "@/components/common/time-speed-slider";
import {
  useSimulationActions,
  useSimulationConfigCalculated,
} from "../hooks/simulations-hooks";

type TimeSpeedProps = {
  id: string;
};
export const TimeSpeed: React.FC<TimeSpeedProps> = ({ id }) => {
  const { timeSpeed } = useSimulationConfigCalculated(id);
  const { patchConfig } = useSimulationActions();

  const changeTimeSpeed = (value: number) => {
    patchConfig(id, () => ({
      timeSpeed: value,
    }));
  };

  return (
    <TimeSpeedSlider
      label="Time speed"
      value={timeSpeed}
      onChange={changeTimeSpeed}
      min={1}
      max={1000}
      step={1}
      withInput={false}
      withValue
    />
  );
};
