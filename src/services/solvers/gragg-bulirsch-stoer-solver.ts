import { Solver as OdexSolver, Options } from "odex";
import { OdeEquation, SolverArguments, SolverResult } from "./solver";

const option: Partial<Options> = {
  absoluteTolerance: 1e-10,
  relativeTolerance: 1e-10,
  denseOutput: true,
  maxSteps: 1e6,
};

export const graggBulirschStoerSolver = ({
  equation,
  initialCondition,
  range,
  stepSize,
}: SolverArguments): SolverResult => {
  const f = equation;
  const f0 = initialCondition;
  const [t0, tn] = range;
  const h = stepSize;
  const results = graggBulirschStoer(f, h, f0, t0, tn);
  return { results: results };
};

const graggBulirschStoer = (
  f: OdeEquation,
  h: number,
  f0: number[],
  t0: number,
  tn: number
) => {
  const m = f0.length;
  const odexSolver = new OdexSolver(f, m, option);

  const results: number[][] = [f0];
  let i = 1;

  odexSolver.solve(
    t0,
    f0,
    tn,
    odexSolver.grid(h, (_xOut, yOut) => {
      results[i] = yOut;
      i++;
    })
  );
  return results;
};
