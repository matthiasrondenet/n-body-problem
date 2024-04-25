import { OdeEquation, Solver } from "../calculations/solvers/solver";
import { CartesianCoordinate2d, GravitationalConstant, Mass } from "./physics";

export const toFlatArray = (
  bodies: {
    position: CartesianCoordinate2d;
    velocity: CartesianCoordinate2d;
  }[]
): number[] => {
  const u = new Array<number>(4 * bodies.length);

  for (let iBody = 0; iBody < bodies.length; iBody++) {
    const body = bodies[iBody];

    const bodyStart = iBody * 4; // Starting index for current body in the u array
    u[bodyStart + 0] = body.position.x;
    u[bodyStart + 1] = body.position.y;

    u[bodyStart + 2] = body.velocity.x;
    u[bodyStart + 3] = body.velocity.y;
  }

  return u;
};

export const toBodies = (state: number[]) => {
  const bodies = Array<{
    position: CartesianCoordinate2d;
    velocity: CartesianCoordinate2d;
  }>(state.length / 4);
  for (let i = 0; i < state.length / 4; i++) {
    bodies[i] = {
      position: {
        x: state[i * 4 + 0],
        y: state[i * 4 + 1],
      },
      velocity: {
        x: state[i * 4 + 2],
        y: state[i * 4 + 3],
      },
    };
  }
  return bodies;
};

// distance between two points in cartesian coordonates
// d=√((x2 – x1)² + (y2 – y1)²)
export const distance = (
  positionA: CartesianCoordinate2d,
  positionB: CartesianCoordinate2d
): number => {
  return _distance(positionA.x, positionA.y, positionB.x, positionB.y);

  //   return Math.sqrt(
  //     Math.pow(positionB.x - positionA.x, 2) +
  //       Math.pow(positionB.y - positionA.y, 2)
  //   );
};

export const _distance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
// due to gravity from other bodies,
// using Newton's law of gravitation.
export const calculateAccelerationOf = (
  body: CartesianCoordinate2d,
  otherBodies: (CartesianCoordinate2d & { mass: Mass })[],
  g: GravitationalConstant
) => {
  let x = 0;
  let y = 0;

  otherBodies.forEach((oBody) => {
    // Distance between the two bodies
    const d = distance(body, oBody);
    const dPower3 = Math.pow(d, 3);

    x += (g * oBody.mass * (oBody.x - body.x)) / dPower3;
    y += (g * oBody.mass * (oBody.y - body.y)) / dPower3;
  });

  return {
    x: x,
    y: y,
  };
};

// export const _calculateAccelerationOf = ()

// Calculate the derivatives of the system of ODEs that describe equation of motion of the bodie
export const buildMotionOde = (
  masses: Mass[],
  gravitationalConstant: GravitationalConstant
): OdeEquation => {
  // n body law of motion blabla derivative
  const nBodyDerivative = (_: number, y: number[]): number[] => {
    // console.log("nBodyDerivative", x, y);

    const du = new Array<number>(y.length);

    const bodies = toBodies(y);

    bodies.forEach((b, i) => {
      const position = b.position;
      const velocity = b.velocity;
      const oBodies = bodies
        .filter((_x, j) => j !== i)
        .map((x, i) => ({
          ...x.position,
          mass: masses[i] as Mass,
        }));

      const acc = calculateAccelerationOf(
        position,
        oBodies,
        gravitationalConstant as GravitationalConstant
      );

      du[i * 4 + 0] = velocity.x; // Velocity x
      du[i * 4 + 1] = velocity.y; // Velocity y
      du[i * 4 + 2] = acc.x; // Acceleration x
      du[i * 4 + 3] = acc.y; // Acceleration y
    });

    return du;
  };
  return nBodyDerivative;
};

export const updatePositions = (
  solver: Solver,
  ode: OdeEquation,
  y0: number[],
  stepSize: number
): number[] => {
  console.log("updatePositions", y0);

  const solverResult = solver({
    equation: ode,
    initialCondition: y0,
    range: [0, 0 + stepSize],
    stepSize: stepSize,
  });

  console.log("updatePositions solverResult", y0, solverResult.results[1]);

  return solverResult.results[1];
};
