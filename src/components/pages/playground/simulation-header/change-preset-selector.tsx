import { Preset, presetKeys } from "@/services/presets/presets";
import { PresetSelector } from "@/components/common/preset-selector";
import { usePresetRoute } from "../hooks/preset-hooks";
import { useNavigate } from "react-router-dom";

export const ChangePresetSelector: React.FC = () => {
  const navigate = useNavigate();
  const { presetParm } = usePresetRoute();

  const handleOnPresetChange = (selected: Preset) => {
    navigate(`/presets/${presetKeys[selected]}`);
  };

  return (
    <PresetSelector value={presetParm} onValueChange={handleOnPresetChange} />
  );
};
