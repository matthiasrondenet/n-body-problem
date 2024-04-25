import { CartesianCoordinate2d } from "@/services/physics/coordinate";
import {
  SimulationBodyConfig,
  SimulationConfig,
} from "@/services/simulation/simulation-config-types";
import { OdeEquation, Solver } from "@/services/solvers/solver";

export type SimulationBody = Required<
  Pick<SimulationBodyConfig, "color" | "name" | "diameter" | "mass">
> & {
  state: number[];
};

export type SimulationType = Omit<SimulationConfig, "bodies"> & {
  bodies: SimulationBody[];
  centerOfMassPosition: CartesianCoordinate2d;
  centerOfMassVelocity: CartesianCoordinate2d;
  solver: Solver;
  ode: OdeEquation;
  stepSize: number;
};
