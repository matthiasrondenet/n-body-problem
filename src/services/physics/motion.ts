import { chunk } from "lodash-es";
import { OdeEquation, Solver } from "../solvers/solver";
import { calculateDistance } from "./physics";

export const STATE_BODY_LENGTH = 4;
export const POSITION_X = 0;
export const POSITION_Y = 1;
export const VELOCITY_X = 2;
export const VELOCITY_Y = 3;

/**
 * State of a body, in cartesian coordinates
 * ie: [x1, y1, vx1, vy1]
 */
export type BodyState = [number, number, number, number];

/**
 * States variables use in the ODE
 * array of positions and velocities, in cartesian coordinates
 * ie: [x1, y1, vx1, vy1, ...same for other bodies]
 */
export type StateVariables = BodyState[];

/**
 * calculate the acceleration of a body regarding other bodies
 * using Newton's law of gravitation.
 * @param body current body state, [x, y, vx, vy]. (in cartesian coordinate)
 * @param otherBodies other bodies states in the system (in cartesian coordinate)
 * @param g gravitational constant
 * @returns acceleration (in cartesian coordinate)
 */
const calculateAccelerationOf = (
  bodyState: BodyState,
  otherBodies: { state: BodyState; mass: number }[],
  g: number
): number[] => {
  let [x, y] = [0, 0];

  otherBodies.forEach((oBody) => {
    const d = calculateDistance(
      bodyState[POSITION_X],
      bodyState[POSITION_Y],
      oBody.state[POSITION_X],
      oBody.state[POSITION_Y]
    );

    const dCubed = d * d * d;

    if (dCubed === 0) {
      throw new Error(
        "Bodies at same position, skipping acceleration calculation"
      );
    }

    x +=
      (g * oBody.mass * (oBody.state[POSITION_X] - bodyState[POSITION_X])) /
      dCubed;
    y +=
      (g * oBody.mass * (oBody.state[POSITION_Y] - bodyState[POSITION_Y])) /
      dCubed;
  });

  return [x, y];
};

/**
 * Build the ODEs that describe the equation of motion of the bodies in the system
 * @param masses array of bodies masses
 * @param gravitationalConstant gravitationalConstant
 * @returns an OdeEquation
 */
export const buildMotionOde = (
  masses: number[],
  gravitationalConstant: number
): OdeEquation => {
  return (_: number, y: number[]): number[] => {
    const du = new Array<number>(y.length);

    const bodies = chunk(y, STATE_BODY_LENGTH) as BodyState[];

    bodies.forEach((b, i) => {
      const others = bodies
        .map((b, i) => ({
          state: b,
          mass: masses[i],
        }))
        .filter((_b, j) => i !== j);

      const [accX, accY] = calculateAccelerationOf(
        b,
        others,
        gravitationalConstant
      );

      du[i * STATE_BODY_LENGTH + POSITION_X] = b[VELOCITY_X]; // Velocity x
      du[i * STATE_BODY_LENGTH + POSITION_Y] = b[VELOCITY_Y]; // Velocity y
      du[i * STATE_BODY_LENGTH + VELOCITY_X] = accX; // Acceleration x
      du[i * STATE_BODY_LENGTH + VELOCITY_Y] = accY; // Acceleration y
    });

    return du;
  };
};

/**
 * calculate positions over a range
 * @param solver the solver to use
 * @param ode motion ode func
 * @param y0 initial conditions, in state variable s format
 * @param stepSize step size
 * @param range range [from, to]
 * @returns array of results
 */
export const calculatePositions = ({
  solver,
  ode,
  y0,
  stepSize,
  range,
}: {
  solver: Solver;
  ode: OdeEquation;
  y0: number[];
  stepSize: number;
  range: [number, number];
}): number[][] => {
  const solverResult = solver({
    equation: ode,
    initialCondition: y0,
    range: range,
    stepSize: stepSize,
  });
  return solverResult.results;
};
