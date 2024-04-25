import {
  SimulationConfig,
  commonPresetConfig,
  defaultThreeBodies,
} from "./presets";

export const chaotic: SimulationConfig = {
  ...commonPresetConfig,
  gravitationalConstant: 1,
  bodies: {
    "1": {
      ...defaultThreeBodies["1"],
      initialPosition: {
        r: 1,
        theta: 0,
        type: "Polar",
      },
      initialVelocity: {
        r: 0.55,
        theta: Math.PI / 2,
        type: "Polar",
      },
    },
    "2": {
      ...defaultThreeBodies["2"],
      initialPosition: {
        r: 1,
        theta: (2 * Math.PI) / 3,
        type: "Polar",
      },
      initialVelocity: {
        r: 0.55,
        theta: (2 * Math.PI) / 3 + Math.PI / 2,
        type: "Polar",
      },
    },
    "3": {
      ...defaultThreeBodies["3"],
      initialPosition: {
        r: 1,
        theta: (4 * Math.PI) / 3,
        type: "Polar",
      },
      initialVelocity: {
        r: 0.55,
        theta: (4 * Math.PI) / 3 + Math.PI / 2,
        type: "Polar",
      },
    },
  },
};
