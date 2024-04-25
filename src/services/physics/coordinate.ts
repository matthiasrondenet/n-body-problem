import { calculateHypotenuse } from "./physics";

export const coordinateTypes = ["Polar", "Cartesian"] as const;
export type CoordinateType = (typeof coordinateTypes)[number];

export type Coordinate = PolarCoordinate2d | CartesianCoordinate2d;

export type CartesianCoordinate2d = {
  x: number;
  y: number;
};

export type PolarCoordinate2d = {
  theta: number;
  r: number;
};

/**
 * Check if the coordinate is a polar coordinate
 * @param coordinate coordinate in either Polar or Cartesian form
 * @returns boolean
 */
function isPolar(coordinate: Coordinate): coordinate is PolarCoordinate2d {
  return "theta" in coordinate;
}

/**
 * Convert polar coordinate to cartesian
 * @param polarCoordinate polar coordinate
 * @returns cartesian coordinate
 */
const toCartesianCoordinate = (
  polarCoordinate: PolarCoordinate2d
): CartesianCoordinate2d => {
  return {
    x: polarCoordinate.r * Math.cos(polarCoordinate.theta),
    y: polarCoordinate.r * Math.sin(polarCoordinate.theta),
  };
};

/**
 * Convert cartesian coordinate to polar
 * @param cartesianCoordinate cartesian coordinate
 * @returns polar coordinate
 */
const toPolarCoordinate = (
  cartesianCoordinate: CartesianCoordinate2d
): PolarCoordinate2d => {
  return {
    r: calculateHypotenuse(cartesianCoordinate.x, cartesianCoordinate.y),
    theta: Math.atan2(cartesianCoordinate.y, cartesianCoordinate.x),
  };
};

/**
 * Convert coordinate to cartesian
 * @param coordinate coordinate in either Polar or Cartesian form
 * @returns cartesian coordinate
 */
export const convertToCartesian = (
  coordinate: Coordinate
): CartesianCoordinate2d => {
  if (!isPolar(coordinate)) return coordinate;
  return toCartesianCoordinate(coordinate);
};

/**
 * Convert coordinate to polar
 * @param coordinate coordinate in either Polar or Cartesian form
 * @returns polar coordinate
 */
export const convertToPolar = (coordinate: Coordinate) => {
  if (isPolar(coordinate)) return coordinate;
  return toPolarCoordinate(coordinate);
};
