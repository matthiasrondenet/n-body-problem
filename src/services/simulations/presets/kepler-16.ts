import {
  SimulationConfig,
  commonPresetConfig,
  defaultThreeBodies,
} from "./presets";

export const kepler16: SimulationConfig = {
  ...commonPresetConfig,
  bodies: {
    "1": {
      ...defaultThreeBodies["1"],
      mass: 0.6897 * 1.98855 * Math.pow(10, 30),
      initialPosition: {
        r: (0.20255 * 0.22431 * 1.496 * Math.pow(10, 11)) / (0.6897 + 0.20255),
        theta: 0,
        type: "Polar",
      },
      initialVelocity: {
        r: 13 * Math.pow(10, 3),
        theta: Math.PI / 2,
        type: "Polar",
      },
    },
    "2": {
      ...defaultThreeBodies["2"],
      mass: 0.20255 * 1.98855 * Math.pow(10, 30),
      initialPosition: {
        r: (0.6897 * 0.22431 * 1.496 * Math.pow(10, 11)) / (0.6897 + 0.20255),
        theta: Math.PI,
        type: "Polar",
      },
      initialVelocity: {
        r: 44 * Math.pow(10, 3),
        theta: (3 * Math.PI) / 2,
        type: "Polar",
      },
    },
    "3": {
      ...defaultThreeBodies["3"],
      mass: 0.3333 * 1.898 * Math.pow(10, 27),
      initialPosition: {
        r: 0.7048 * 1.496 * Math.pow(10, 11),
        theta: 0,
        type: "Polar",
      },
      initialVelocity: {
        r: 33 * Math.pow(10, 3),
        theta: Math.PI / 2,
        type: "Polar",
      },
    },
  },
};
