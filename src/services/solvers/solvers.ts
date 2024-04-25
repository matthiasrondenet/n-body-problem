import { eulerSolver } from "./euler-solver";
import { graggBulirschStoerSolver } from "./gragg-bulirsch-stoer-solver";
import { midPointSolver } from "./midpoint-solver";
import { rungeKuttaSolver } from "./runge-kutta-solver";
import { Solver } from "./solver";

export const solverNames = [
  "Euler integration",
  "Midpoint method",
  "Runge Kutta",
  "Gragg Bulirsch Stoer",
] as const;

export type SolverName = (typeof solverNames)[number];

export const solverMethods: Record<SolverName, Solver> = {
  "Euler integration": eulerSolver,
  "Midpoint method": midPointSolver,
  "Runge Kutta": rungeKuttaSolver,
  "Gragg Bulirsch Stoer": graggBulirschStoerSolver,
};
