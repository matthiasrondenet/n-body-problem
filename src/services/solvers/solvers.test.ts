import { describe, expect, test } from "vitest";
import { roundAll } from "@/utils/number";
import { solverMethods, SolverName } from "./solvers";

const verify = (
  actual: number[],
  expected: number[],
  decimalPlaces?: number
) => {
  const a = decimalPlaces ? roundAll(actual, decimalPlaces) : actual;
  const e = decimalPlaces ? roundAll(expected, decimalPlaces) : expected;
  expect(a).toEqual(e);
};

describe("Solver calculations using ode = e", () => {
  const ode = (_t: number, y: number[]) => y;
  const y0 = [1];
  const range: [number, number] = [0, 1];

  test.each([
    ["Euler integration", 2],
    ["Midpoint method", 4],
    ["Runge Kutta", 8],
    ["Gragg Bulirsch Stoer", 9],
  ])(
    "approximation using %s method",
    (resolutionMethod: string, approximationDecimal: number) => {
      const solver = solverMethods[resolutionMethod as SolverName];

      const { results } = solver({
        equation: ode,
        initialCondition: [...y0],
        stepSize: 0.0001,
        range: range,
      });

      verify(results[0], y0);
      verify(results[results.length - 1], [Math.exp(1)], approximationDecimal);
    }
  );
});

describe("Solver calculations using ode = SIR", () => {
  const T = 0.2143;
  const R = 1 / 14;
  const dSIR = (_t: number, y: readonly number[]) => [
    -T * y[0] * y[1],
    (T * y[0] - R) * y[1],
    R * y[1],
  ];

  const initialCondition = [1, 0.1, 0];
  const range: [number, number] = [0, 2];

  test.each([
    ["Euler integration", 2],
    ["Midpoint method", 4],
    ["Runge Kutta", 8],
    ["Gragg Bulirsch Stoer", 10],
  ])(
    "approximation using %s method",
    (resolutionMethod: string, approximationDecimal: number) => {
      const solver = solverMethods[resolutionMethod as SolverName];

      const { results } = solver({
        equation: dSIR,
        initialCondition: [...initialCondition],
        range: range,
        stepSize: 0.2,
      });

      verify(results[0], initialCondition);
      verify(
        results[results.length - 1],
        [0.9517638456, 0.1317578075, 0.0164783469],
        approximationDecimal
      );
    }
  );
});
