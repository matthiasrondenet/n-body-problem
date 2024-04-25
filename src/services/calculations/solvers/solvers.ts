import { eulerSolver } from "./euler-solver";
import { graggBulirschStoerSolver } from "./gragg-bulirsch-stoer-solver";
import { midPointSolver } from "./midpoint-solver";
import { rungeKuttaSolver } from "./runge-kutta-solver";
import { Solver } from "./solver";

export const availableResolutionMethods = [
  "Euler integration",
  "Midpoint method",
  "Runge Kutta",
  "Gragg Bulirsch Stoer",
] as const;

export type ResolutionMethod = (typeof availableResolutionMethods)[number];

export const resolutionMethodStrategies: Record<ResolutionMethod, Solver> = {
  "Euler integration": eulerSolver,
  "Midpoint method": midPointSolver,
  "Runge Kutta": rungeKuttaSolver,
  "Gragg Bulirsch Stoer": graggBulirschStoerSolver,
};
