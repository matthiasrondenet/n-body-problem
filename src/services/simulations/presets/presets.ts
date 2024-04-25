import {
  Coordinate,
  defaultAverageDensityConstant,
  defaultGravitationalConstant,
} from "@/services/physics/physics";
import { ResolutionMethod } from "@/services/calculations/solvers/solvers";
import { Collection } from "@/utils/collection";

export const availablePresets = [
  "Figure Eight",
  "Sun Earth Jupiter",
  "Lagrange Point 5",
  "Kepler 16",
  "Chaotic 1",
] as const;

export type Preset = (typeof availablePresets)[number];

type SimulationBodyConfig = Readonly<{
  mass: number;
  density: number;
  initialPosition: Coordinate;
  initialVelocity: Coordinate;
  color: string;
  name?: string;
}>;

export type SimulationConfig = Readonly<{
  solver: ResolutionMethod;

  calculationsPerFrame: number;
  framesPerSecond: number;
  drawTimesPerFrame: number;

  metersPerPixel: number;
  minimumSizePixels: number;
  maximumSizePixels: number;

  timeScaleFactor: number;

  gravitationalConstant: number;

  bodies: Collection<SimulationBodyConfig>;
}>;

// The number of calculations done in one 16 millisecond frame.
// The higher the number, the more precise are the calculations and the slower the simulation.
export const defaultCalculationsPerFrame = 250;

// Number of frames per second
export const defaultFramesPerSecond = 60;

// Maximum number of times the orbital lines are drawn per frame.
// To improve performance, we do not draw after each calculation, since drawing can be slow.
export const defaultDrawTimesPerFrame = 10;

export const defaultMetersPerPixel = 100;
export const defaultMinimumSizePixels = 10; // Minimum size of an object in pixels.
export const defaultMaximumSizePixels = 80; // Maximum size of an object in pixels.

export const defaultTimeScaleFactor = 1;

const defaultBody: SimulationBodyConfig = {
  mass: 1,
  density: defaultAverageDensityConstant,
  initialPosition: {
    r: 0,
    theta: 0,
    type: "Polar",
  },
  initialVelocity: {
    r: 0,
    theta: 0,
    type: "Polar",
  },
  color: "pink",
};

export const defaultThreeBodies: Record<"1" | "2" | "3", SimulationBodyConfig> =
  {
    "1": {
      ...defaultBody,
      color: "blue",
    },
    "2": {
      ...defaultBody,
      color: "green",
    },
    "3": {
      ...defaultBody,
      color: "red",
    },
  };

export const commonPresetConfig: SimulationConfig = {
  solver: "Runge Kutta",

  calculationsPerFrame: defaultCalculationsPerFrame,
  framesPerSecond: defaultFramesPerSecond,
  drawTimesPerFrame: defaultDrawTimesPerFrame,

  metersPerPixel: defaultMetersPerPixel,
  minimumSizePixels: defaultMinimumSizePixels,
  maximumSizePixels: defaultMaximumSizePixels,

  timeScaleFactor: defaultTimeScaleFactor,

  gravitationalConstant: defaultGravitationalConstant,

  bodies: defaultThreeBodies,
};
