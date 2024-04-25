import { Preset, presetKeys } from "@/services/presets/presets";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";
import { useNavigate } from "react-router-dom";
import { useSimulationActions } from "../playground/hooks/simulations-hooks";

export const useOpenNewPreset = () => {
  const navigate = useNavigate();
  const { addOrUpdatePreset } = useSimulationActions();
  return (preset: Preset, simulationConfig?: SimulationConfig) => {
    addOrUpdatePreset(preset, simulationConfig);
    navigate(`/presets/${presetKeys[preset]}?custom=true`);
  };
};
