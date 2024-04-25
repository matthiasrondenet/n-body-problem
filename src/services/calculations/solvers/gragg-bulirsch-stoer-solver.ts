import { Options, Solver as OdexSolver } from "odex";
import { OdeEquation, SolverArguments, SolverResult } from "./solver";

const option: Partial<Options> = {
  absoluteTolerance: 1e-10,
};

export const graggBulirschStoerSolver = ({
  equation,
  initialCondition,
  range,
  stepSize,
}: SolverArguments): SolverResult => {
  const [t0, tn] = range;
  const steps = (tn - t0) / stepSize;

  const f = equation;
  const n = steps;
  const h = stepSize;
  const results = graggBulirschStoer(f, n, h, initialCondition, t0);

  return { results: results };
};

const graggBulirschStoer = (
  f: OdeEquation,
  n: number,
  h: number,
  f0: number[],
  t0: number
) => {
  const m = f0.length;

  const odexSolver = new OdexSolver(f, m, option);
  const sF = odexSolver.integrate(t0, f0);

  let i = 0;
  const results = [];

  while (i <= n) {
    results.push(sF(i * h));
    i++;
  }
  return results;
};
