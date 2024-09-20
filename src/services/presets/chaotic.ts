import { SimulationConfig } from "../simulation/simulation-config-types";
import { brouckeR7, mothiva2A } from "./periodic";

const brouckeR7Chaotic: SimulationConfig = {
  ...brouckeR7,
  solverName: "Runge Kutta",
  gravitationalConstant: 2,
  isPeriodic: false,
};

const mothiva2AChaotic: SimulationConfig = {
  ...mothiva2A,
  solverName: "Runge Kutta",
  gravitationalConstant: 2,
  isPeriodic: false,
};

export const chaoticPresetNames = [
  "Chaotic Brouke Orbit R7",
  "Chaotic Moth IVa.2.A",
] as const;

export type ChaoticPreset = (typeof chaoticPresetNames)[number];

export const chaoticPresets: Record<ChaoticPreset, SimulationConfig> = {
  "Chaotic Brouke Orbit R7": brouckeR7Chaotic,
  "Chaotic Moth IVa.2.A": mothiva2AChaotic,
};
