// Gravitational constant G = 6.67408 × 10^-11 (m3.kg^-1.s^-2)
export type GravitationalConstant = number & { _GravitationalConstant: void };

// Average density of the body (kg.m^-3). Used for calculating body's radius form its mass
export type AverageDensityConstant = number & { _AverageDensityConstant: void };

// Mass in SI (kg)
export type Mass = number & { _Mass: void };

// Density in SI (kg/m^3)
export type Density = number & { _Density: void };

// eslint-disable-next-line
export const defaultGravitationalConstant: GravitationalConstant = (6.67408 *
  Math.pow(10, -11)) as GravitationalConstant;

// eslint-disable-next-line
export const defaultAverageDensityConstant: AverageDensityConstant = (1410 *
  1) as AverageDensityConstant;

export type Coordinate = (PolarCoordinate2d | CartesianCoordinate2d) & {
  type: CoordinateType;
};

export type CoordinateType = "Polar" | "Cartesian";

export type CartesianCoordinate2d = {
  x: number;
  y: number;
};

export type PolarCoordinate2d = {
  theta: number;
  r: number;
};

export type Velocity2d = {
  x: number;
  y: number;
};

// web have density
// p = m / V
// volume of Sphere V = 4/3 PI * r^3
// r = ( 3 * m / 4 * PI * P ) ^ (1/3)
// Calculate the radius of the body (in meters) based on its mass.
export const radius = (mass: Mass, density: Density): number => {
  return Math.pow(((3 / 4) * mass) / (Math.PI * density), 1 / 3);
};

// diameter  = 2*r
export const diameter = (mass: Mass, density: Density): number => {
  return 2 * radius(mass, density);
};

export const toCartesianCoordinate = (
  polarCoordinate: PolarCoordinate2d
): CartesianCoordinate2d => {
  return {
    x: polarCoordinate.r * Math.cos(polarCoordinate.theta),
    y: polarCoordinate.r * Math.sin(polarCoordinate.theta),
  };
};

export const toPolarCoordinate = (
  cartesianCoordinate: CartesianCoordinate2d
): PolarCoordinate2d => {
  return {
    r: Math.sqrt(
      Math.pow(cartesianCoordinate.x, 2) + Math.pow(cartesianCoordinate.y, 2)
    ),
    theta:
      cartesianCoordinate.x === 0
        ? 0
        : Math.atan2(cartesianCoordinate.y, cartesianCoordinate.x),
  };
};

export const convertToCartesian = (
  coordinate: Coordinate
): CartesianCoordinate2d => {
  if (coordinate.type === "Cartesian")
    return coordinate as CartesianCoordinate2d;
  else return toCartesianCoordinate(coordinate as PolarCoordinate2d);
};

export const convertToPolar = (coordinate: Coordinate): PolarCoordinate2d => {
  if (coordinate.type === "Polar") return coordinate as PolarCoordinate2d;
  else return toPolarCoordinate(coordinate as CartesianCoordinate2d);
};

// Correct the velocities and positions of the bodies
// // to make the center of mass motionless at the middle of the screen
export const adjustBodiesPositionFromCenter = (
  bodies: ({ position: CartesianCoordinate2d } & {
    velocity: CartesianCoordinate2d;
  } & { mass: Mass })[]
): ({ position: CartesianCoordinate2d } & {
  velocity: CartesianCoordinate2d;
} & { mass: Mass })[] => {
  // Mass velocity, also known as velocity of mass,
  // refers to the speed at which an object with a certain mass is moving
  // The center of mass velocity is the sum of each mass's momentum divided by the total mass of the system.
  const centerOfMassVelocity = findCenterOfMass(
    bodies.map((b) => ({
      ...b,
      ...b.velocity,
      ...{ mass: b.mass },
    }))
  );

  // The center of mass is a position defined relative to an object or system of objects.
  // It is the average position of all the parts of the system, weighted according to their masses.
  const centerOfMassPosition = findCenterOfMass(
    bodies.map((b) => ({
      ...b.position,
      ...{ mass: b.mass },
    }))
  );

  return bodies.map((b) => ({
    ...b,
    position: {
      x: b.position.x - centerOfMassPosition.x,
      y: b.position.y - centerOfMassPosition.y,
    },
    velocity: {
      x: b.velocity.x - centerOfMassVelocity.x,
      y: b.velocity.y - centerOfMassVelocity.y,
    },
    mass: b.mass,
  }));
};

// Returns the largest distance of an object from the center based on initial considitions
export const findLargestDistance = (
  polarCoordinates: PolarCoordinate2d[]
): number => {
  let max = 0;
  polarCoordinates.forEach((p) => {
    if (p.r > max) {
      max = p.r;
    }
  });

  return max;
};

export const findCenterOfMass = (
  bodies: (CartesianCoordinate2d & { mass: Mass })[]
): CartesianCoordinate2d => {
  let sumOfMass = 0;
  let x = 0;
  let y = 0;
  bodies.forEach((body) => {
    sumOfMass += body.mass;
    x += body.mass * body.x;
    y += body.mass * body.y;
  });

  return {
    x: x / sumOfMass,
    y: y / sumOfMass,
  };
};

// Returns the diameters of three bodies in meters
export const calculateDiameters = (
  count: number,
  densities: number[],
  averageDensity: number,
  masses: number[]
) => {
  const diameters = [];

  // Loop through the bodies
  for (let iBody = 0; iBody < count; iBody++) {
    const density = densities?.[iBody] ?? averageDensity;
    const mass = masses[iBody];
    diameters.push(diameter(mass as Mass, density as Density));
  }

  return diameters;
};
