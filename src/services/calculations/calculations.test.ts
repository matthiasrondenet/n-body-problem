import { describe, expect, test } from "vitest";
import { SolverArguments } from "./solvers/solver";
import {
  ResolutionMethod,
  resolutionMethodStrategies,
} from "./solvers/solvers";

const roundAll = (numbers: number[], decimalPlaces: number) => {
  return numbers.map((x) => round(x, decimalPlaces));
};

const round = (num: number, decimalPlaces: number) => {
  const p = Math.pow(10, decimalPlaces);
  const n = num * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
};

const T = 0.2143;
const R = 1 / 14;
const dSIR = (_t: number, y: readonly number[]) => [
  -T * y[0] * y[1],
  (T * y[0] - R) * y[1],
  R * y[1],
];

const initialCondition = [1, 0.1, 0];

const solverArguments: SolverArguments = {
  equation: dSIR,
  initialCondition: [...initialCondition],
  range: [0, 2],
  stepSize: 0.2,
};

const verify = (
  actual: number[],
  expected: number[],
  decimalPlaces?: number
) => {
  const a = decimalPlaces ? roundAll(actual, decimalPlaces) : actual;
  const e = decimalPlaces ? roundAll(expected, decimalPlaces) : expected;
  expect(a).toEqual(e);
};

describe("SIR model calculations", () => {
  test.each([
    ["Euler integration", 2],
    ["Midpoint method", 4],
    ["Runge Kutta", 8],
    ["Gragg Bulirsch Stoer", 10],
  ])(
    "approximation using %s method",
    (resolutionMethod: string, approximationDecimal: number) => {
      const solver =
        resolutionMethodStrategies[resolutionMethod as ResolutionMethod];

      const { results } = solver(solverArguments);

      expect(results.length).toBe(11);
      verify(results[0], initialCondition);
      verify(
        results[1],
        [0.9956617509464054, 0.10288911695752348, 0.0014491320960711173],
        approximationDecimal
      );
      verify(
        results[2],
        [0.991218224026938, 0.10584178430821396, 0.0029399916648480662],
        approximationDecimal
      );
      verify(
        results[10],
        [0.9517638456626972, 0.1317578074792591, 0.01647834685804368],
        approximationDecimal
      );
    }
  );
});
