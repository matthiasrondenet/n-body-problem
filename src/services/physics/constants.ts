/**
 * Gravitational constant G = 6.67408 × 10^-11 (m3.kg^-1.s^-2)
 */
export const gravitationalConstant = 6.674_080 * Math.pow(10, -11);

export const oneMinuteInSeconds = 60;
export const oneHourInSeconds = oneMinuteInSeconds * 60;
export const oneDayInSeconds = oneHourInSeconds * 24;
export const oneYearInSeconds = oneDayInSeconds * 365;
export const oneCenturyInSeconds = oneYearInSeconds * 100;

/**
 * Solar mass = 1.988,550 * 10^30 kg
 */
export const solarMass = 1.988_550e30;

/**
 * Sun - Earth distance: 149,597,870 km = (1 AU)
 */
export const sunEartDistance = 149_597_870_000; // in m

export const celestalBodies = [
  "Sun",
  "Mercury",
  "Venus",
  "Earth",
  "Moon",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Io",
  "Europa",
  "Alpha centauri A",
  "Alpha centauri B",
  "Proxima centauri",
  "Kepler-16 A",
  "Kepler-16 B",
  "Kepler-16 b",
] as const;
export type CelestalBody = (typeof celestalBodies)[number];

export type SolarSystemPlanet = Extract<
  CelestalBody,
  | "Mercury"
  | "Venus"
  | "Earth"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune"
>;

/**
 * celestal bodies masses, in kg
 * */
export const masses: Record<CelestalBody, number> = {
  Sun: solarMass,
  Mercury: 3.301_100e22, // 3.301,100 * 10^23 kg
  Venus: 4.867_500e24, // 4.867,500 * 10^24 kg
  Earth: 5.972_400e24, // 5.972,400 * 10^24 kg
  Mars: 6.417_100e23, // 6.417,100 * 10^23 kg
  Moon: 7.347_670e22, // 7.347,670 * 10^22 kg
  Jupiter: 1.898_600e27, // 1.898_600 * 10^27 kg
  Saturn: 568.34e24, // 568.34 * 10^24 kg
  Uranus: 8.681e25, // 8.681 * 10^25 kg
  Neptune: 1024.13e25, // 1024.13 * 10^25 kg
  Io: 8.931_938e22, // 8.931938 * 10^22 kg
  Europa: 0.047_998_440e24, // 4.799844 * 10^22 kg
  "Alpha centauri A": 2.167e30, // 2.167 * 10^30 kg
  "Alpha centauri B": 1.789e30, // 1.789 * 10^30 kg
  "Proxima centauri": 2.446e29, // 2.446 * 10^29 kg
  "Kepler-16 A": 0.6897 * solarMass, // 0.6897 solar mass
  "Kepler-16 B": 0.20255 * solarMass, // 0.20255 solar mass
  "Kepler-16 b": (1 / 3) * 1.898_600e27, // 1/3 jupiter mass
};

/**
 * celestal bodies diameters, in m
 */
export const diameters: Partial<Record<CelestalBody, number>> = {
  Sun: 1_391_400_000, //  1 391 400 km,
  Earth: 12_742_000, //  12 742 km
  Moon: 3_474_000, // 3 474 km
  Jupiter: 142_984_000, // 142 984 km
};

/**
 * solar system planets distance from the sun, in m
 */
export const heliocentricDistance: Record<SolarSystemPlanet, number> = {
  Mercury: 0.38709893 * sunEartDistance,
  Venus: 0.72333199 * sunEartDistance,
  Earth: sunEartDistance, // 1 AU
  Mars: 1.52366231 * sunEartDistance,
  Jupiter: 5.20336301 * sunEartDistance,
  Saturn: 9.53707032 * sunEartDistance,
  Uranus: 19.19126393 * sunEartDistance,
  Neptune: 30.06896348 * sunEartDistance,
};

export const earthMoonDistance = 384_400_000; // 384,400 km

/**
 * celestal bodies velocities, in ms/s
 */
export const velocities: Record<SolarSystemPlanet, number> = {
  Mercury: 47.87e3, // 47.87 km/s
  Venus: 35e3, // 35 km/s
  Earth: 29.78e3, // 29.78 km/s
  Mars: 24e3, // 24 km/s
  Jupiter: 13.07e3, // 13.07 km/s
  Saturn: 9.65e3, // 9.65 km/s
  Uranus: 6.81e3, // 6.81 km/s
  Neptune: 5.43e3, // 5.43 km/s
};

/**
 * Sun - Jupiter distance: 778,300,000 km
 */
export const sunJupiterDistance = 7.778_3 * Math.pow(10, 11); // in m

/**
 * Jupiter - Io distance: 421,700 km
 */
export const jupiterIoDistance = 421_700_000;

/**
 * Jupiter - Europa distance: 671,100 km
 */
export const jupiterToEuropaDiastance = 671_100_000;

/**
 * Sun density : 1408 (kg.m^-3)
 */
export const sunDensity = 1_408;

/**
 * Earth density : 5515 kg/m^3
 */
export const earthDensity = 5_515;

/**
 * Jupiter density : 1326 kg.m^-3)
 */
export const jupiterDensity = 1_326;

/**
 * Earth velocity : 29.78 km/s
 */
export const earthVelocity = 29.78 * Math.pow(10, 3);

/**
 * Moon velocity :  30.78 km/s
 */
// export const moonVelocity = 30.78 * Math.pow(10, 3);

export const moonVelocity = 1.022 * Math.pow(10, 3);

export const jupiterVelocity = 13.1 * Math.pow(10, 3);
