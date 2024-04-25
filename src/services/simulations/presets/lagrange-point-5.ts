import {
  SimulationConfig,
  commonPresetConfig,
  defaultThreeBodies,
} from "./presets";

export const lagrangePoint5: SimulationConfig = {
  ...commonPresetConfig,
  bodies: {
    "1": {
      ...defaultThreeBodies["1"],
      mass: 1.98855 * Math.pow(10, 30),
      density: 0.001,
      initialPosition: {
        r: 0,
        theta: 0,
        type: "Polar",
      },
      initialVelocity: {
        r: 0,
        theta: Math.PI / 2,
        type: "Polar",
      },
    },
    "2": {
      ...defaultThreeBodies["2"],
      mass: 5.972 * Math.pow(10, 24),
      density: 0.0001,
      initialPosition: {
        r: 7.5 * Math.pow(10, 11),
        theta: -Math.PI / 3 - Math.PI / 10,
        type: "Polar",
      },
      initialVelocity: {
        r: 13.3 * Math.pow(10, 3),
        theta: Math.PI / 6 - Math.PI / 10,
        type: "Polar",
      },
    },
    "3": {
      ...defaultThreeBodies["3"],
      mass: 1.898 * Math.pow(10, 28),
      density: 0.0001,
      initialPosition: {
        r: 7.78 * Math.pow(10, 11),
        theta: 0,
        type: "Polar",
      },
      initialVelocity: {
        r: 13.1 * Math.pow(10, 3),
        theta: Math.PI / 2,
        type: "Polar",
      },
    },
  },
};
