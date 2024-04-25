import { Preset, presetKeys } from "@/services/presets/presets";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSimulationActions } from "./simulations-hooks";

export const usePresetRoute = () => {
  const { addOrUpdatePreset } = useSimulationActions();
  const location = useLocation();
  const { preset, custom } = useParams();

  const presetParam =
    (Object.keys(presetKeys).find(
      (key) => presetKeys[key as Preset] === preset
    ) as Preset | undefined) ?? "Figure Eight 1 (old)";

  useEffect(() => {
    if (!custom) {
      addOrUpdatePreset(presetParam);
    }
  }, [presetParam, custom, addOrUpdatePreset]);

  return {
    isPresetRoute: location.pathname.startsWith("/presets"),
    presetParm: presetParam,
  };
};
