import { CartesianCoordinate2d } from "./coordinate";
import {
  BodyState,
  POSITION_X,
  POSITION_Y,
  VELOCITY_X,
  VELOCITY_Y,
} from "./motion";

/**
 * calculate the diameter of a body, based on its mass and density.
 * density: p = m / V
 * volume of a sphere: V = 4/3 PI * r^3
 * radius = ( 3/4 * m * PI * p ) ^ (1/3)
 * diameter = 2 * r
 * @param mass Mass in SI (kg)
 * @param density Density in SI (kg/m^3)
 * @returns diameter
 */
export const calculateDiameter = (mass: number, density: number): number => {
  const r = Math.pow(((3 / 4) * mass) / (Math.PI * density), 1 / 3);
  return 2 * r;
};

/**
 * calculate the distance between two points in cartesian coordonates
 * distance = √((x2 – x1)² + (y2 – y1)²)
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns the distance between two points
 */
export const calculateDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * calculate the hypotenuse between two values
 * @param a
 * @param b
 * @returns
 */
export const calculateHypotenuse = (a: number, b: number) =>
  Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

/**
 * calculate the barycenter (center of mass) of the system
 * the bodies coordinates are weighted according to their masses.
 * @param bodies
 * @returns
 */
export function calculateCenterOfMass<
  T extends CartesianCoordinate2d & { mass: number }
>(bodies: T[]): CartesianCoordinate2d {
  const agg = bodies.reduce(
    (agg, body) => {
      agg.mass += body.mass;
      agg.x += body.x * body.mass;
      agg.y += body.y * body.mass;
      return agg;
    },
    {
      x: 0,
      y: 0,
      mass: 0,
    }
  );

  return {
    x: agg.x / agg.mass,
    y: agg.y / agg.mass,
  };
}

/**
 * calculate the center of mass of the system
 * @param states
 * @param masses
 * @returns
 */
export const calculateCom = ({
  states,
  masses,
}: {
  states: BodyState[];
  masses: number[];
}) => {
  const centerOfMassPosition = calculateCenterOfMass(
    masses.map((m, index) => ({
      x: states[index][POSITION_X],
      y: states[index][POSITION_Y],
      mass: m,
    }))
  );
  const centerOfMassVelocity = calculateCenterOfMass(
    masses.map((m, index) => ({
      x: states[index][VELOCITY_X],
      y: states[index][VELOCITY_Y],
      mass: m,
    }))
  );

  return {
    centerOfMassPosition,
    centerOfMassVelocity,
  };
};

/**
 * adjust the states to the barycentric reference
 * @param states
 * @param adjustBarycentric
 * @param centerOfMassPosition
 * @param centerOfMassVelocity
 */
export const adjustToBarycentric = ({
  states,
  adjustBarycentric,
  centerOfMassPosition,
  centerOfMassVelocity,
}: {
  states: BodyState[];
  adjustBarycentric: boolean;
  centerOfMassPosition: CartesianCoordinate2d;
  centerOfMassVelocity: CartesianCoordinate2d;
}) => {
  states.forEach((state) => {
    if (adjustBarycentric) {
      state[POSITION_X] -= centerOfMassPosition.x;
      state[POSITION_Y] -= centerOfMassPosition.y;
    }
    if (adjustBarycentric) {
      state[VELOCITY_X] -= centerOfMassVelocity.x;
      state[VELOCITY_Y] -= centerOfMassVelocity.y;
    }
  });
};
