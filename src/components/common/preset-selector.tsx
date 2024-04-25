import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Preset, presetGroupNames, presets } from "@/services/presets/presets";

type PresetSelectorProps = {
  value: Preset | undefined;
  onValueChange: (value: Preset) => void;
};
export const PresetSelector: React.FC<PresetSelectorProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select a preset" />
      </SelectTrigger>
      <SelectContent>
        {presetGroupNames.map((presetGroup) => (
          <SelectGroup key={presetGroup}>
            <SelectLabel className="pl-3">{presetGroup}</SelectLabel>
            {Object.keys(presets[presetGroup]).map((presetName) => (
              <SelectItem key={presetName} value={presetName}>
                {presetName}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
