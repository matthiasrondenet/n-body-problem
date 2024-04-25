import { timeToHumanReadableFormat } from "@/services/graphical/graphical";
import { CustomSlider, CustomSliderProps } from "../ui-custom/custom-slider";

interface StepSizeSliderProps extends Omit<CustomSliderProps, "step"> {
  step?: number;
  withValue?: boolean;
}
export const StepSizeSlider: React.FC<StepSizeSliderProps> = ({
  value,
  min,
  max,
  step,
  sliderFunctionName,
  ...innerProps
}) => {
  const _sliderFunctionName = sliderFunctionName ?? "logarithmic";
  const _step = step ?? (max - min) / 100;

  return (
    <CustomSlider
      {...innerProps}
      min={min}
      max={max}
      step={_step}
      value={value}
      sliderFunctionName={_sliderFunctionName}
      valueFormatter={(v) => timeToHumanReadableFormat(v * 1000)}
    />
  );
};
