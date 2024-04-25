import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import {
  binarySearch,
  denormalizeValue,
  inRange,
  normalizeValue,
  RangeScalingFunctionName,
  rangeScalingFunctions,
} from "@/utils/number";
import { cn } from "@/lib/utils";

export interface CustomSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  sliderFunctionName?: RangeScalingFunctionName;
  label?: string;
  withInput?: boolean;
  withValue?: boolean;
  className?: string;
  classNameLabel?: string;
  classNameSlider?: string;
  valueFormatter?: (value: number) => string;
  onChange: (value: number) => void;
}
export const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  step,
  value,
  sliderFunctionName = "linear",
  label,
  withInput = true,
  withValue = true,
  className,
  classNameLabel,
  classNameSlider,
  valueFormatter,
  onChange,
}) => {
  const sliderFunc: (x: number) => number = useCallback(
    (x: number) => rangeScalingFunctions[sliderFunctionName](x, min, max),
    [sliderFunctionName, min, max]
  );

  const normalizeValueFunc = useCallback(
    (x: number): number => normalizeValue(x, min, max),
    [min, max]
  );

  const denormalizeValueFunc = useCallback(
    (x: number): number => denormalizeValue(x, min, max),
    [min, max]
  );

  const transformValue = useCallback(
    (x: number): number => sliderFunc(normalizeValueFunc(x)),
    [sliderFunc, normalizeValueFunc]
  );

  const inverseTransformValue = useCallback(
    (y: number): number => {
      const x = binarySearch(sliderFunc, y, 20, 0.0001);
      return denormalizeValueFunc(x);
    },
    [sliderFunc, denormalizeValueFunc]
  );

  const [internalSliderValue, setInternalSliderValue] = useState<number>(
    inverseTransformValue(value)
  );
  const [internalInputValue, setInternalInputValue] = useState<
    number | undefined
  >(value);

  const handleSliderValueChange = (sliderValues: number[]) => {
    const v = sliderValues[0];
    setInternalSliderValue(v);
    const transformedValue = transformValue(v);
    onChange(transformedValue);
    setInternalInputValue(transformedValue);
  };

  const handleInputValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = parseFloat(event.target.value);
    if (inputValue && !Number.isNaN(inputValue)) {
      setInternalInputValue(inputValue);
      const inRangeValue = inRange(inputValue, min, max);
      onChange(inRangeValue);
      const initialInternalValue = inverseTransformValue(inRangeValue);
      setInternalSliderValue(initialInternalValue);
    } else {
      setInternalInputValue(undefined);
    }
  };

  return (
    <span className={cn("flex flex-row items-center gap-3", className)}>
      {label && (
        <Label className={cn("min:w-1/4", classNameLabel)} htmlFor={label}>
          {label}
        </Label>
      )}
      <Slider
        className="w-60 min-w-10"
        rangeClassName={classNameSlider}
        id={label ? `${label}_slider` : label}
        min={min}
        max={max}
        step={step}
        value={[internalSliderValue]}
        onValueChange={handleSliderValueChange}
      />
      {withInput && (
        <Input
          id={label ? label : `${label}_slider`}
          min={min}
          max={max}
          step={step}
          type="number"
          onChange={handleInputValueChange}
          value={internalInputValue}
        />
      )}
      {(withValue && valueFormatter?.(value)) ?? value}
    </span>
  );
};
