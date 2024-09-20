import {
  diameters,
  masses,
  oneYearInSeconds,
  velocities,
  heliocentricDistance,
  earthMoonDistance,
  oneDayInSeconds,
  sunEarthDistance,
  moonVelocity,
} from "../physics/constants";
import {
  defaultSimulationConfig,
  SimulationBodyConfig,
  SimulationConfig,
} from "../simulation/simulation-config-types";

export const sun: SimulationBodyConfig = {
  name: "Sun",
  color: "yellow",
  mass: masses["Sun"],
  diameter: diameters["Sun"],
  initialPosition: {
    r: 0,
    theta: 0,
  },
  initialVelocity: {
    r: 0,
    theta: 0,
  },
};

export const mercury: SimulationBodyConfig = {
  name: "Mercury",
  color: "orange",
  mass: masses["Mercury"],
  diameter: diameters["Mercury"],

  initialPosition: {
    x: heliocentricDistance["Mercury"],
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: velocities["Mercury"],
  },
};

export const venus: SimulationBodyConfig = {
  name: "Venus",
  color: "emerald",
  mass: masses["Venus"],
  diameter: diameters["Venus"],
  initialPosition: {
    x: -heliocentricDistance["Venus"],
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: -velocities["Venus"],
  },
};

export const earth: SimulationBodyConfig = {
  name: "Earth",
  color: "blue",
  mass: masses["Earth"],
  diameter: diameters["Earth"],
  initialPosition: {
    x: heliocentricDistance["Earth"],
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: velocities["Earth"],
  },
};

const moon: SimulationBodyConfig = {
  name: "moon",
  color: "gray",
  mass: masses["Moon"],
  diameter: diameters["Moon"],
  initialPosition: {
    x: heliocentricDistance["Earth"] + earthMoonDistance,
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: velocities["Earth"] + moonVelocity,
  },
};

export const mars: SimulationBodyConfig = {
  name: "Mars",
  color: "red",
  mass: masses["Mars"],
  diameter: diameters["Mars"],
  initialPosition: {
    x: -heliocentricDistance["Mars"],
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: -velocities["Mars"],
  },
};

const jupiter: SimulationBodyConfig = {
  name: "jupiter",
  color: "purple",
  mass: masses["Jupiter"],
  diameter: diameters["Jupiter"],
  initialPosition: {
    x: heliocentricDistance["Jupiter"],
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: velocities["Jupiter"],
  },
};

const saturn: SimulationBodyConfig = {
  name: "saturn",
  color: "rose",
  mass: masses["Saturn"],
  diameter: diameters["Saturn"],
  initialPosition: {
    x: -heliocentricDistance["Saturn"],
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: -velocities["Saturn"],
  },
};

const uranus: SimulationBodyConfig = {
  name: "uranus",
  color: "slate",
  mass: masses["Uranus"],
  diameter: diameters["Uranus"],
  initialPosition: {
    x: heliocentricDistance["Uranus"],
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: velocities["Uranus"],
  },
};

const neptune: SimulationBodyConfig = {
  name: "neptune",
  color: "cyan",
  mass: masses["Neptune"],
  diameter: diameters["Neptune"],
  initialPosition: {
    x: -heliocentricDistance["Neptune"],
    y: 0,
  },
  initialVelocity: {
    x: 0,
    y: -velocities["Neptune"],
  },
};

const kepler16_AB_semi_major_axis = 0.22431 * sunEarthDistance;
const kepler16_b_semi_major_axis = 0.7048 * sunEarthDistance;

const kepler16_AB_period = 41.08 * oneDayInSeconds;
const kepler_16_b_period = 229 * oneDayInSeconds;

const kepler16_AB_vBinary =
  (2 * Math.PI * kepler16_AB_semi_major_axis) / kepler16_AB_period;

const kepler16_b_v =
  (2 * Math.PI * kepler16_b_semi_major_axis) / kepler_16_b_period;

const kepler16A_rA =
  (kepler16_AB_semi_major_axis * masses["Kepler-16 B"]) /
  (masses["Kepler-16 B"] + masses["Kepler-16 A"]);

const kepler16A_rB =
  (kepler16_AB_semi_major_axis * masses["Kepler-16 A"]) /
  (masses["Kepler-16 B"] + masses["Kepler-16 A"]);

export const kepler16A: SimulationBodyConfig = {
  name: "Kepler-16 A",
  color: "yellow",
  mass: masses["Kepler-16 A"],
  initialPosition: {
    x: -kepler16A_rA,
    y: 0,
  },
  initialVelocity: {
    r: (kepler16_AB_vBinary * kepler16A_rA) / kepler16_AB_semi_major_axis,
    theta: Math.PI / 2,
  },
};

export const kepler16B: SimulationBodyConfig = {
  name: "Kepler-16 B",
  color: "orange",
  mass: masses["Kepler-16 B"],
  initialPosition: {
    x: kepler16A_rB,
    y: 0,
  },
  initialVelocity: {
    r: (kepler16_AB_vBinary * kepler16A_rB) / kepler16_AB_semi_major_axis,
    theta: (3 / 2) * Math.PI,
  },
};

export const kepler16b: SimulationBodyConfig = {
  name: "Kepler-16 b",
  color: "violet",
  mass: masses["Kepler-16 b"],
  initialPosition: {
    x: kepler16_b_semi_major_axis,
    y: 0,
  },
  initialVelocity: {
    r: kepler16_b_v,
    theta: Math.PI / 2,
  },
};

const solarSystemConfig: SimulationConfig = {
  ...defaultSimulationConfig,
  name: "Solar system",
  description: `(Sun-centered) solar system configuration.`,
  solverName: "Gragg Bulirsch Stoer",
  timeUnit: oneDayInSeconds * 180,
  nbOfSteps: 40_000,
  timeSpeed: 100,
  bodies: [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune],
  graphicalConfig: {
    ...defaultSimulationConfig.graphicalConfig,
    diametersScalingFunc: "log10",
    distancesScalingFunc: "cubic-root",
    distancesScalingFactor: 2,
    maximumSizePixels: 20,
    minimumSizePixels: 2,
  },
};

const sunEarthMoonConfig: SimulationConfig = {
  ...defaultSimulationConfig,
  name: "Sun Earth Moon",
  description: "Simulation of Earth and Moon orbits around the Sun",
  timeUnit: oneYearInSeconds,
  timeSpeed: 10,
  bodies: [sun, earth, moon],
  graphicalConfig: {
    ...defaultSimulationConfig.graphicalConfig,
    diametersScalingFunc: "cubic-root",
    distancesScalingFunc: "logarithmic",
    distancesScalingFactor: 1.4,
    maximumSizePixels: 30,
    minimumSizePixels: 1,
  },
};

const sunEarthJupiterConfig: SimulationConfig = {
  ...defaultSimulationConfig,
  name: "Sun - Earth - Jupiter",
  description: "Simulation of Earth and Jupiter orbits around the Sun",
  nbOfSteps: 15_000,
  timeSpeed: 50,
  timeUnit: oneYearInSeconds,
  bodies: [sun, earth, jupiter],
  graphicalConfig: {
    ...defaultSimulationConfig.graphicalConfig,
    diametersScalingFunc: "exponential",
    nbOfHistoryPoints: 3000,
    maximumSizePixels: 20,
    minimumSizePixels: 2,
  },
};

/**
 * Kepler 16 system
 * Binary star system with a planet of 1/3 of Jupiter's.
 * Kepler-16 A is 0.6897 sun mass
 * Kepler-16 B is 0.20255 sun mass
 * Kepler-16 b is 1/3 of jupiter mass
 * Both stars are separated by 0.22431 AU
 * In order to calculate position we use the center of mass formula
 * r_CM = (mA * rA + mB * rB) / (mA + mB), we a center of mass of 0, we get
 * rB - rA = 0.22431 AU
 * Orbital period is 41.08 days
 * rA = 0.22431 AU * mB / (mA + mB)
 * rB = 0.22431 AU * mA / (mB + mA)
 * rA ≈ -0.0002261 AU
 * rB ≈ 0.0007696 AU
 * Kepler-16 b is located at 0.7048 AU
 * Kepler-16 b has an orbital period of 229 days
 */
const kepler16Config: SimulationConfig = {
  ...defaultSimulationConfig,
  name: "Kepler 16 system",
  description: "Simplified (circular approximation) of the Kepler 16 system",
  nbOfSteps: 10_000,
  timeSpeed: 100,
  timeUnit: oneDayInSeconds * 41.08,
  bodies: [kepler16A, kepler16B, kepler16b],
  graphicalConfig: {
    ...defaultSimulationConfig.graphicalConfig,
    diametersScalingFunc: "log10",
    nbOfHistoryPoints: 1000,
    maximumSizePixels: 20,
    minimumSizePixels: 5,
  },
};

export const realWorldPresetNames = [
  "Solar system",
  "Sun Earth Moon",
  "Sun Earth Jupiter",
  "Kepler 16",
] as const;

export type RealWorldPreset = (typeof realWorldPresetNames)[number];

export const realWorldPresets: Record<RealWorldPreset, SimulationConfig> = {
  "Solar system": solarSystemConfig,
  "Sun Earth Moon": sunEarthMoonConfig,
  "Sun Earth Jupiter": sunEarthJupiterConfig,
  "Kepler 16": kepler16Config,
};
