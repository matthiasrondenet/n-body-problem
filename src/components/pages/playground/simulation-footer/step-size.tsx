import React from "react";
import { StepSizeSlider } from "@/components/common/step-size-slider";
import { useStepSize } from "../hooks/step-size-hooks";
import { oneDayInSeconds } from "@/services/physics/constants";

type StepSizeProps = {
  id: string;
};
export const StepSize: React.FC<StepSizeProps> = ({ id }) => {
  const { stepSize, changeStepSize } = useStepSize(id);

  return (
    <StepSizeSlider
      value={stepSize}
      min={oneDayInSeconds}
      max={oneDayInSeconds * 100}
      onChange={changeStepSize}
      withInput={false}
    />
  );
};
