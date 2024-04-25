import { Coordinate } from "@/services/physics/physics";
import {
  SimulationConfig,
  commonPresetConfig,
  defaultThreeBodies,
} from "./presets";

const figure8Position: Coordinate = {
  x: 0.97000436,
  y: -0.24308753,
  type: "Cartesian",
};
const figure8Velocity: Coordinate = {
  x: -0.93240737,
  y: -0.86473146,
  type: "Cartesian",
};

export const figureEightConfig: SimulationConfig = {
  ...commonPresetConfig,
  gravitationalConstant: 1,
  bodies: {
    "1": {
      ...defaultThreeBodies["1"],
      initialPosition: figure8Position,
      initialVelocity: {
        x: -figure8Velocity.x / 2,
        y: -figure8Velocity.y / 2,
        type: "Cartesian",
      },
    },
    "2": {
      ...defaultThreeBodies["2"],
      initialPosition: {
        x: -figure8Position.x,
        y: -figure8Position.y,
        type: "Cartesian",
      },
      initialVelocity: {
        x: -figure8Velocity.x / 2,
        y: -figure8Velocity.y / 2,
        type: "Cartesian",
      },
    },
    "3": {
      ...defaultThreeBodies["3"],
      initialPosition: { x: 0, y: 0, type: "Cartesian" },
      initialVelocity: figure8Velocity,
    },
  },
};
