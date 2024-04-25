import { OdeEquation, SolverArguments, SolverResult } from "./solver";
import { vectorAdd, vectorMultScalar } from "../../utils/number";

export const rungeKuttaSolver = ({
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
  const f0 = initialCondition;

  const results = rungeKutta(f, n, h, f0, t0);
  return { results: results };
};

const rungeKutta = (
  f: OdeEquation,
  n: number,
  h: number,
  f0: number[],
  t0: number
) => {
  const y = [f0];
  const m = f0.length;

  let t = t0;
  let i = 0;

  while (i < n) {
    const yNext: number[] = [];

    const k1 = f(t, y[i]);
    const k2 = f(t + 0.5 * h, vectorAdd(y[i], vectorMultScalar(0.5 * h, k1)));
    const k3 = f(t + 0.5 * h, vectorAdd(y[i], vectorMultScalar(0.5 * h, k2)));
    const k4 = f(t + h, vectorAdd(y[i], vectorMultScalar(h, k3)));

    for (let k = 0; k < m; k++) {
      yNext.push(y[i][k] + (h * (k1[k] + 2 * k2[k] + 2 * k3[k] + k4[k])) / 6);
    }

    y.push(yNext);
    t += h;
    i++;
  }
  return y;
};
