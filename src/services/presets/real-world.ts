import {
  diameters,
  masses,
  oneYearInSeconds,
  velocities,
  heliocentricDistance,
  earthMoonDistance,
  oneDayInSeconds,
  sunEarthDistance,
} from "../physics/constants";
import {
  defaultSimulationConfig,
  SimulationBodyConfig,
  SimulationConfig,
} from "../simulation/simulation-config-types";

export const G = 6.6743e-11; // Gravitational constant
export const AU = 1.495978707e11; // Astronomical Unit in meters
export const solarMass = 1.9885e30; // Mass of the Sun in kg

export const masses2 = {
  Sun: solarMass,
  Mercury: 3.3011e23,
  Venus: 4.8675e24,
  Earth: 5.97237e24,
};

export const diameters2 = {
  Sun: 1.3927e9,
  Mercury: 4.879e6,
  Venus: 1.2104e7,
  Earth: 1.2742e7,
};

export const heliocentricDistance2 = {
  Mercury: 0.387 * AU,
  Venus: 0.723 * AU,
  Earth: AU,
};

export const orbitalPeriods = {
  Mercury: 87.97 * 24 * 60 * 60, // in seconds
  Venus: 224.7 * 24 * 60 * 60,
  Earth: 365.25 * 24 * 60 * 60,
};

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
    r: heliocentricDistance["Mercury"],
    theta: Math.PI,
  },
  initialVelocity: {
    r: velocities["Mercury"],
    theta: -Math.PI / 2,
  },
};

export const venus: SimulationBodyConfig = {
  name: "Venus",
  color: "emerald",
  mass: masses["Venus"],
  diameter: diameters["Venus"],
  initialPosition: {
    r: heliocentricDistance["Venus"],
    theta: 0,
  },
  initialVelocity: {
    r: velocities["Venus"],
    theta: Math.PI / 2,
  },
};

export const earth: SimulationBodyConfig = {
  name: "Earth",
  color: "blue",
  mass: masses["Earth"],
  diameter: diameters["Earth"],
  initialPosition: {
    r: heliocentricDistance["Earth"],
    theta: Math.PI / 2,
  },
  initialVelocity: {
    r: velocities["Earth"],
    theta: -Math.PI,
  },
};

const moon: SimulationBodyConfig = {
  name: "moon",
  color: "red",
  mass: masses["Moon"],
  diameter: diameters["Moon"],
  initialPosition: {
    r: heliocentricDistance["Earth"] + earthMoonDistance,
    theta: 0,
  },
  initialVelocity: {
    r: velocities["Earth"],
    theta: Math.PI / 2,
  },
};

export const mars: SimulationBodyConfig = {
  name: "Mars",
  color: "red",
  mass: masses["Mars"],
  diameter: diameters["Mars"],
  initialPosition: {
    r: heliocentricDistance["Mars"],
    theta: -Math.PI / 2,
  },
  initialVelocity: {
    r: velocities["Mars"],
    theta: 0,
  },
};

const jupiter: SimulationBodyConfig = {
  name: "jupiter",
  color: "purple",
  mass: masses["Jupiter"],
  diameter: diameters["Jupiter"],
  initialPosition: {
    r: heliocentricDistance["Jupiter"],
    theta: 0,
  },
  initialVelocity: {
    r: velocities["Jupiter"],
    theta: Math.PI / 2,
  },
};

const saturn: SimulationBodyConfig = {
  name: "saturn",
  color: "rose",
  mass: masses["Saturn"],
  diameter: diameters["Saturn"],
  initialPosition: {
    r: heliocentricDistance["Saturn"],
    theta: -Math.PI / 2,
  },
  initialVelocity: {
    r: velocities["Saturn"],
    theta: 0,
  },
};

const uranus: SimulationBodyConfig = {
  name: "uranus",
  color: "slate",
  mass: masses["Uranus"],
  diameter: diameters["Uranus"],
  initialPosition: {
    r: heliocentricDistance["Uranus"],
    theta: (11 * Math.PI) / 6,
  },
  initialVelocity: {
    r: velocities["Uranus"],
    theta: Math.PI / 2,
  },
};

const neptune: SimulationBodyConfig = {
  name: "neptune",
  color: "cyan",
  mass: masses["Neptune"],
  diameter: diameters["Neptune"],
  initialPosition: {
    r: heliocentricDistance["Neptune"],
    theta: 0,
  },
  initialVelocity: {
    r: velocities["Neptune"],
    theta: Math.PI / 2,
  },
};

export const kepler16A: SimulationBodyConfig = {
  name: "Kepler-16 A",
  color: "yellow",
  mass: masses["Kepler-16 A"],
  initialPosition: {
    r:
      (0.22431 * sunEarthDistance * masses["Kepler-16 B"]) /
      (masses["Kepler-16 B"] + masses["Kepler-16 A"]),
    theta: 0,
  },
  initialVelocity: {
    r: 13 * Math.pow(10, 3),
    theta: Math.PI / 2,
    // r: -0.38149
    // r: 0,
    // theta: -Math.PI / 1775000,
  },
};

export const kepler16B: SimulationBodyConfig = {
  name: "Kepler-16 B",
  color: "orange",
  mass: masses["Kepler-16 B"],
  initialPosition: {
    r:
      (0.22431 * sunEarthDistance * masses["Kepler-16 A"]) /
      (masses["Kepler-16 B"] + masses["Kepler-16 A"]),
    theta: Math.PI,
  },
  initialVelocity: {
    r: 44 * Math.pow(10, 3),
    theta: (3 * Math.PI) / 2,
    // r: 0,
    // theta: Math.PI / 1775000,
  },
};

export const kepler16b: SimulationBodyConfig = {
  name: " Kepler-16 b",
  color: "violet",
  mass: masses["Kepler-16 b"],
  initialPosition: {
    r: 0.7048 * 1.496 * Math.pow(10, 11),
    // r: 0.7048 * sunEarthDistance,
    theta: 0,
  },
  initialVelocity: {
    r: 33 * Math.pow(10, 3),
    theta: Math.PI / 2,
    // r: 0,
    // theta: Math.PI / 9875000,
  },
};

const solarSystemConfig: SimulationConfig = {
  ...defaultSimulationConfig,
  name: "Solar system",
  description: `(Sun-centered) solar system configuration.`,
  solverName: "Gragg Bulirsch Stoer",
  timeUnit: oneDayInSeconds * 180,
  nbOfSteps: 30_000,
  timeSpeed: 100,
  bodies: [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune],
  graphicalConfig: {
    ...defaultSimulationConfig.graphicalConfig,
    diametersScalingFunc: "exponential",
    distancesScalingFunc: "linear",
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
 */
const kepler16Config: SimulationConfig = {
  ...defaultSimulationConfig,
  name: "Kepler 16 system",
  description: "Simplified (circular approximation) of the Kepler 16 system",
  nbOfSteps: 10_000,
  timeSpeed: 100,
  timeUnit: oneDayInSeconds * 41,
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
