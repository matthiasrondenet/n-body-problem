import React from "react";
import { JsonEditor } from "@/components/ui-custom/json-editor";
import {
  useSimulationActions,
  useSimulationConfigCalculated,
} from "../hooks/simulations-hooks";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";

type SettingsFormProps = {
  id: string;
};

export const SettingsForm: React.FC<SettingsFormProps> = ({ id }) => {
  const simulationConfig = useSimulationConfigCalculated(id);

  const { patchConfig } = useSimulationActions();

  const update = (newConfig: SimulationConfig) =>
    patchConfig(id, () => newConfig);

  return (
    <JsonEditor
      value={simulationConfig}
      onValueChange={(newConfig) => update(newConfig as SimulationConfig)}
    />
  );
};
