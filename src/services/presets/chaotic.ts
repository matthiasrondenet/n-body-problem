import {
  defaultSimulationConfig,
  SimulationConfig,
} from "../simulation/simulation-config-types";

const chaotic1Config: SimulationConfig = {
  ...defaultSimulationConfig,
  gravitationalConstant: 1,
  timeUnit: 1,
  nbOfSteps: 12_000,
  timeSpeed: 100,
  bodies: [
    {
      initialPosition: {
        r: 1,
        theta: 0,
      },
      initialVelocity: {
        r: 0.55,
        theta: Math.PI / 2,
      },
    },
    {
      initialPosition: {
        r: 1,
        theta: (2 * Math.PI) / 3,
      },
      initialVelocity: {
        r: 0.55,
        theta: (2 * Math.PI) / 3 + Math.PI / 2,
      },
    },
    {
      initialPosition: {
        r: 1,
        theta: (4 * Math.PI) / 3,
      },
      initialVelocity: {
        r: 0.55,
        theta: (4 * Math.PI) / 3 + Math.PI / 2,
      },
    },
  ],
};

export const chaoticPresetNames = ["Chaotic 1"] as const;

export type ChaoticPreset = (typeof chaoticPresetNames)[number];

export const chaoticPresets: Record<ChaoticPreset, SimulationConfig> = {
  "Chaotic 1": chaotic1Config,
};
