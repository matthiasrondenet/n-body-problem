import { CustomSliderProps, CustomSlider } from "../ui-custom/custom-slider";

interface TimeSpeedSliderProps extends Omit<CustomSliderProps, "step"> {
  step?: number;
  withValue?: boolean;
}
export const TimeSpeedSlider: React.FC<TimeSpeedSliderProps> = ({
  value,
  min,
  max,
  step,
  sliderFunctionName,
  ...innerProps
}) => {
  const _sliderFunctionName = sliderFunctionName ?? "linear";
  const _step = step ?? (max - min) / 10;

  return (
    <CustomSlider
      {...innerProps}
      min={min}
      max={max}
      step={_step}
      value={value}
      sliderFunctionName={_sliderFunctionName}
    />
  );
};
