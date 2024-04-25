import { convertToCartesian } from "@/services/physics/coordinate";
import { BodyState, buildMotionOde } from "@/services/physics/motion";
import {
  adjustToBarycentric,
  calculateCom,
  calculateDiameter,
} from "@/services/physics/physics";
import { SimulationType } from "./simulation-types";
import { sunDensity } from "@/services/physics/constants";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";
import { solverMethods } from "@/services/solvers/solvers";
import { DefaultColors } from "tailwindcss/types/generated/colors";

const defaultMass = 1;
const bodyColors: (keyof DefaultColors)[] = [
  "blue",
  "fuchsia",
  "green",
  "lime",
  "violet",
  "orange",
  "cyan",
  "amber",
  "rose",
];

/**
 *
 * @param simulation
 * @returns
 */
export const buildSimulationResetKey = (simulation: SimulationType) =>
  [
    `solver=${simulation.solverName}`,
    `stepSize=${simulation.stepSize}`,
    `g=${simulation.gravitationalConstant}`,
    `timeUnit=${simulation.timeUnit}`,
    `timeSpeed=${simulation.timeSpeed}`,
    `bodies=`,
    ...simulation.bodies.map((b, i) => [
      `b${i}:name=${b.name}_diameter=${b.diameter}_mass=${b.mass}`,
    ]),
  ].join("_");

/**
 * Transform simulation config object to real simulation, using default values if needed
 * @param config
 * @returns simulation
 */
export const toSimulation = (config: SimulationConfig): SimulationType => {
  // sanitized and default
  const sanitized = config.bodies.map((b, i) => {
    const name = b.name ?? `#${i + 1}`;
    const color = b.color ?? bodyColors[i % bodyColors.length];
    const mass = b.mass ?? defaultMass;
    const diameter =
      b.diameter ?? calculateDiameter(mass, b.density ?? sunDensity);
    const position = convertToCartesian(b.initialPosition);
    const velocity = convertToCartesian(b.initialVelocity);
    const state: BodyState = [position.x, position.y, velocity.x, velocity.y];
    return {
      mass,
      diameter,
      color,
      name,
      state,
    };
  });

  const masses = sanitized.map((x) => x.mass);
  const states = sanitized.map((x) => x.state);

  const solver = solverMethods[config.solverName];
  const ode = buildMotionOde(masses, config.gravitationalConstant);
  const stepSize = config.stepSize ?? config.timeUnit / config.nbOfSteps;

  const { centerOfMassPosition, centerOfMassVelocity } = calculateCom({
    states: states,
    masses: masses,
  });

  adjustToBarycentric({
    states: states,
    adjustBarycentric: config.adjustBarycentric,
    centerOfMassPosition,
    centerOfMassVelocity,
  });

  return {
    ...config,
    stepSize: stepSize,
    bodies: sanitized,
    centerOfMassPosition: centerOfMassPosition,
    centerOfMassVelocity: centerOfMassVelocity,
    solver: solver,
    ode: ode,
  };
};
