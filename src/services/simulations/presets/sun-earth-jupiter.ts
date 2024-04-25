import { SimulationConfig, commonPresetConfig } from "./presets";

export const sunEarthJupiter: SimulationConfig = {
  ...commonPresetConfig,
  bodies: [
    {
      mass: 1.98855 * Math.pow(10, 30),
      density: 0.01,
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
    {
      mass: 5.972 * Math.pow(10, 24),
      density: 0.01,
      initialPosition: {
        r: 1.496 * Math.pow(10, 11),
        theta: 0,
        type: "Polar",
      },
      initialVelocity: {
        r: 30 * Math.pow(10, 3),
        theta: Math.PI / 2,
        type: "Polar",
      },
    },
    {
      mass: 1.898 * Math.pow(10, 27),
      density: 0.01,
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
  ],
};
