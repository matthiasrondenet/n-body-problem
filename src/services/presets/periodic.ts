import {
  defaultSimulationConfig,
  SimulationConfig,
} from "../simulation/simulation-config-types";

const defaultPeriodicConfig: SimulationConfig = {
  ...defaultSimulationConfig,
  gravitationalConstant: 1,
  solverName: "Gragg Bulirsch Stoer",
  isPeriodic: true,
  nbOfSteps: 12_000,
  timeSpeed: 30,
  graphicalConfig: {
    ...defaultSimulationConfig.graphicalConfig,
    diametersScalingFunc: "logarithmic",
    distancesScalingFunc: "linear",
    minimumSizePixels: 4,
    maximumSizePixels: 40,
  },
};

const butterflyi2a: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Butterfly I - Orbit I.2.A",
  description: "Šuvakov - I - Butterfly I",
  timeUnit: 6.234671,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.306893, y: 0.125507 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.306893, y: 0.125507 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.613786, y: -0.251014 },
    },
  ],
};

const dragonflyii4a: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Dragonfly - Orbit II.4.A",
  description: "Šuvakov - II - Dragonfly",
  timeUnit: 21.272338,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.080584, y: 0.588836 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.080584, y: 0.588836 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.161168, y: -1.177672 },
    },
  ],
};

const dragonflyii6a: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Dragonfly - Orbit II.6.A",
  description: "Šuvakov - II - Dragonfly",
  timeUnit: 33.641422,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.186238, y: 0.578714 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.186238, y: 0.578714 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.372476, y: -1.157428 },
    },
  ],
};

const yinYangiii3Aa: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Yin Yang - Orbit III.3.A.α",
  description: "Šuvakov - III - Yin Yang",
  timeUnit: 17.32881,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.513938, y: 0.304736 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.513938, y: 0.304736 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -1.027876, y: -0.609472 },
    },
  ],
};

const yinYangiii3Ab: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Yin Yang - Orbit III.3.A.β",
  description: "Šuvakov - III - Yin Yang",
  timeUnit: 10.963252,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.282699, y: 0.327209 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.282699, y: 0.327209 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.565398, y: -0.654418 },
    },
  ],
};

const mothiva2A: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Moth I - Orbit IVa.2.A",
  description: "Šuvakov - IVa - Moth I",
  timeUnit: 14.894306,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.464445, y: 0.39606 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.464445, y: 0.39606 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.92889, y: -0.79212 },
    },
  ],
};

const figure8V1A: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Figure 8 - Orbit V.1.A",
  description: "Šuvakov - V - Figure 8",
  timeUnit: 6.325897,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.347113, y: 0.532727 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.347113, y: 0.532727 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.694226, y: -1.065454 },
    },
  ],
};

const figure8V16A: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Figure 8 - Orbit V.16.A",
  description: "Šuvakov - V - Figure 8",
  timeUnit: 74.60656,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.162366, y: 0.5305 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.162366, y: 0.5305 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.324732, y: -1.061 },
    },
  ],
};

const yarnVI2A: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Figure 8 - Orbit 𝑉.I.2.𝐴",
  description: "Šuvakov - VI - Yarn",
  timeUnit: 14.894306,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.464445, y: 0.39606 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.464445, y: 0.39606 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.92889, y: -0.79212 },
    },
  ],
};

const otherVIIIAA: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Other - Orbit 𝑉III.A.𝐴",
  description: "Šuvakov - VIII - Other",
  timeUnit: 21.020518,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.201678, y: 0.409896 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.201678, y: 0.409896 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.403356, y: -0.819792 },
    },
  ],
};

const brouckeA1: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Brouke - Orbit A1",
  description: "Šuvakov - Broucke",
  timeUnit: 6.283213,
  bodies: [
    {
      initialPosition: { x: -0.9892620043, y: 0 },
      initialVelocity: { x: 0, y: 1.9169244185 },
    },
    {
      initialPosition: { x: 2.2096177241, y: 0 },
      initialVelocity: { x: 0, y: 0.1910268738 },
    },
    {
      initialPosition: { x: -1.2203557197, y: 0 },
      initialVelocity: { x: 0, y: -2.1079512924 },
    },
  ],
};

const brouckeA11: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Brouke - Orbit A11",
  description: "Šuvakov - Broucke",
  timeUnit: 32.584945,
  bodies: [
    {
      initialPosition: { x: 0.0132604844, y: 0 },
      initialVelocity: { x: 0, y: 1.054151921 },
    },
    {
      initialPosition: { x: 1.4157286016, y: 0 },
      initialVelocity: { x: 0, y: -0.2101466639 },
    },
    {
      initialPosition: { x: -1.4289890859, y: 0 },
      initialVelocity: { x: 0, y: -0.8440052572 },
    },
  ],
};

const brouckeA13: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Brouke - Orbit A13",
  description: "Šuvakov - Broucke",
  timeUnit: 59.716075,
  bodies: [
    {
      initialPosition: { x: -0.8965015243, y: 0 },
      initialVelocity: { x: 0, y: 0.8285556923 },
    },
    {
      initialPosition: { x: 3.2352526189, y: 0 },
      initialVelocity: { x: 0, y: -0.0056478094 },
    },
    {
      initialPosition: { x: -2.3387510946, y: 0 },
      initialVelocity: { x: 0, y: -0.8229078829 },
    },
  ],
};

const brouckeR7: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Brouke - Orbit R7",
  description: "Šuvakov - Broucke",
  timeUnit: 5.088604,
  bodies: [
    {
      initialPosition: { x: 0.8378824453, y: 0 },
      initialVelocity: { x: 0, y: 1.0329242005 },
    },
    {
      initialPosition: { x: -0.5545585011, y: 0 },
      initialVelocity: { x: 0, y: -1.8840083393 },
    },
    {
      initialPosition: { x: -0.2833239442, y: 0 },
      initialVelocity: { x: 0, y: 0.8510841387 },
    },
  ],
};

const sheenOvalsWithFlourishes: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Sheen - Orbit Ovals with Flourishes",
  description: "Šuvakov - Sheen",
  timeUnit: 8.094721472532424,
  bodies: [
    {
      initialPosition: { x: 0.716248295713, y: 0.384288553041 },
      initialVelocity: { x: 1.245268230896, y: 2.444311951777 },
    },
    {
      initialPosition: { x: 0.086172594591, y: 1.342795868577 },
      initialVelocity: { x: -0.67522432369, y: -0.96287961363 },
    },
    {
      initialPosition: { x: 0.538777980808, y: 0.481049882656 },
      initialVelocity: { x: -0.570043907206, y: -1.481432338147 },
    },
  ],
};

const sheenLoopEndedTriangles: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Sheen - Orbit Loop ended triangles",
  description: "Šuvakov - Sheen",
  timeUnit: 3.820761325134286,
  bodies: [
    {
      initialPosition: { x: 0.6661637520772179, y: -0.081921852656887 },
      initialVelocity: { x: 0.84120297540307, y: 0.029746212757039 },
    },
    {
      initialPosition: { x: -0.025192663684493022, y: 0.45444857588251897 },
      initialVelocity: { x: 0.142642469612081, y: -0.492315648524683 },
    },
    {
      initialPosition: { x: -0.10301329374224, y: -0.765806200083609 },
      initialVelocity: { x: -0.98384544501151, y: 0.462569435774018 },
    },
  ],
};

const setOne4: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Set One - Orbit 4",
  description: "Šuvakov - Set One",
  timeUnit: 48.10441368316314,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.5246810323562372, y: 0.5580894987428064 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.5246810323562372, y: 0.5580894987428064 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -1.0493620647124744, y: -1.116178997485613 },
    },
  ],
};

const figureEight1Old: SimulationConfig = {
  ...defaultPeriodicConfig,
  name: "Figure 8 1 (old)",
  timeUnit: 18.141367647963804,
  bodies: [
    {
      initialPosition: { x: -1, y: 0 },
      initialVelocity: { x: 0.18194288048334994, y: 0.5148059977254023 },
    },
    {
      initialPosition: { x: 1, y: 0 },
      initialVelocity: { x: 0.18194288048334994, y: 0.5148059977254023 },
    },
    {
      initialPosition: { x: 0, y: 0 },
      initialVelocity: { x: -0.3638857609666999, y: -1.0296119954508045 },
    },
  ],
};

export const periodicPresetNames = [
  "Butterfly I.2.A",
  "Dragonfly II.4.A",
  "Dragonfly II.6.A",
  "Yin Yang III.3.A.a",
  "Yin Yang III.3.A.β",
  "Moth IVa.2.A",
  "Figure V.1.A",
  "Figure V.16.A",
  "Yarn V.I.2.A",
  "Other III",
  "Broucke A1",
  "Broucke A11",
  "Broucke A13",
  "Broucke R7",
  "Sheen Ovals-with-flourishes",
  "Sheen Loop-ended-triangles",
  "Set One 4",
  "Figure Eight 1 (old)",
] as const;

export type PeriodicPreset = (typeof periodicPresetNames)[number];

export const periodicPresets: Record<PeriodicPreset, SimulationConfig> = {
  "Butterfly I.2.A": butterflyi2a,
  "Dragonfly II.4.A": dragonflyii4a,
  "Dragonfly II.6.A": dragonflyii6a,
  "Yin Yang III.3.A.a": yinYangiii3Aa,
  "Yin Yang III.3.A.β": yinYangiii3Ab,
  "Moth IVa.2.A": mothiva2A,
  "Figure V.1.A": figure8V1A,
  "Figure V.16.A": figure8V16A,
  "Yarn V.I.2.A": yarnVI2A,
  "Other III": otherVIIIAA,
  "Broucke A1": brouckeA1,
  "Broucke A11": brouckeA11,
  "Broucke A13": brouckeA13,
  "Broucke R7": brouckeR7,
  "Sheen Ovals-with-flourishes": sheenOvalsWithFlourishes,
  "Sheen Loop-ended-triangles": sheenLoopEndedTriangles,
  "Set One 4": setOne4,
  "Figure Eight 1 (old)": figureEight1Old,
};
