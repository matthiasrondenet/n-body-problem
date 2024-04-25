import {
  defaultSimulationConfig,
  SimulationConfig,
} from "../simulation/simulation-config-types";

const chaotic1Config: SimulationConfig = {
  ...defaultSimulationConfig,
  gravitationalConstant: 1,
  bodies: [
    {
      mass: 1,
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
      mass: 1,
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
      mass: 1,
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

const chaoticFigure8Config: SimulationConfig = {
  ...defaultSimulationConfig,
  name: "Chaotic 2 test 8 - Orbit 𝑉.1.𝐴",
  description: "Šuvakov - V - Figure 8",
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.347113, y: 0.532727 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.347113, y: 0.532727 },
    },
    // {
    //   initialPosition: { x: 0, y: 0 },
    //   initialVelocity: { x: -0.694226, y: -1.065454 },
    // },
  ],
};

export const chaoticPresetNames = ["Chaotic 1", "Chaotic 2"] as const;

export type ChaoticPreset = (typeof chaoticPresetNames)[number];

export const chaoticPresets: Record<ChaoticPreset, SimulationConfig> = {
  "Chaotic 1": chaotic1Config,
  "Chaotic 2": chaoticFigure8Config,
};
