import { Preset, presetKeys } from "@/services/presets/presets";
import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  useIsSimulationLoaded,
  usePresetKey,
  useSimulationActions,
} from "./simulations-hooks";

export const usePresetRoute = () => {
  const { addOrUpdatePreset } = useSimulationActions();

  const presetKey = usePresetKey();
  const isLoaded = useIsSimulationLoaded(presetKey);
  const location = useLocation();
  const { preset } = useParams();
  const [searchParams] = useSearchParams();

  const custom = searchParams.get("custom");

  const presetParam =
    (Object.keys(presetKeys).find(
      (key) => presetKeys[key as Preset] === preset
    ) as Preset | undefined) ?? "Figure Eight 1 (old)";

  useEffect(() => {
    if (custom !== "true" || !isLoaded) {
      addOrUpdatePreset(presetParam);
    }
  }, [presetParam, custom, isLoaded, addOrUpdatePreset]);

  return {
    isPresetRoute: location.pathname.startsWith("/presets"),
    presetParm: presetParam,
  };
};
