import { CartesianCoordinate2d } from "@/services/physics/coordinate";
import {
  defaultSimulationConfig,
  SimulationConfig,
} from "../simulation/simulation-config-types";

const figure8Position: CartesianCoordinate2d = {
  x: 0.97000436,
  y: -0.24308753,
};
const figure8Velocity: CartesianCoordinate2d = {
  x: -0.93240737,
  y: -0.86473146,
};

const figureEightConfig: SimulationConfig = {
  ...defaultSimulationConfig,
  name: "Figure 8 (Cris Moore)",
  description: "stable three-body system discovered by Cris Moore",
  gravitationalConstant: 1,
  timeSpeed: 100,
  bodies: [
    {
      initialPosition: figure8Position,
      initialVelocity: {
        x: -figure8Velocity.x / 2,
        y: -figure8Velocity.y / 2,
      },
    },
    {
      initialPosition: {
        x: -figure8Position.x,
        y: -figure8Position.y,
      },
      initialVelocity: {
        x: -figure8Velocity.x / 2,
        y: -figure8Velocity.y / 2,
      },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: {
        ...figure8Velocity,
      },
    },
  ],
};

export const figure8PresetNames = ["Figure 8 (Cris Moore)"] as const;

export type Figure8Preset = (typeof figure8PresetNames)[number];

export const figure8Presets: Record<Figure8Preset, SimulationConfig> = {
  "Figure 8 (Cris Moore)": figureEightConfig,
};
