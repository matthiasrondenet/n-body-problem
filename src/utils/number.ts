import { round } from "lodash-es";

export const roundAll = (numbers: number[], decimalPlaces: number) =>
  numbers.map((x) => round(x, decimalPlaces));

export const normalizeValue = (x: number, min: number, max: number): number =>
  (x - min) / (max - min);

export const denormalizeValue = (x: number, min: number, max: number): number =>
  x * (max - min) + min;

export const rangeScalingFunctionNames = [
  "linear",
  "logarithmic",
  "exponential",
  "log10",
  "sqrt",
  "quadratic",
  "cubic",
] as const;

export type RangeScalingFunctionName =
  (typeof rangeScalingFunctionNames)[number];
export type RangeScalingFunction = (
  x: number,
  min: number,
  max: number
) => number;

export const rangeScalingFunctions: Record<
  RangeScalingFunctionName,
  RangeScalingFunction
> = {
  linear: (x, min, max) => min + x * (max - min),
  logarithmic: (x, min, max) =>
    min + (Math.exp(x * Math.log(max - min + 1)) - 1),
  exponential: (x, min, max) =>
    min +
    (Math.log(x * (max - min) + 1) / Math.log(max - min + 1)) * (max - min),
  log10: (x, min, max) =>
    min + (Math.log10(x * 9 + 1) / Math.log10(10)) * (max - min),
  sqrt: (x, min, max) => min + Math.sqrt(x) * (max - min),
  quadratic: (x, min, max) => min + x * x * (max - min),
  cubic: (x, min, max) => min + x * x * x * (max - min),
};

export const inRange = (x: number, min: number, max: number) =>
  Math.min(Math.max(x, min), max);

export const binarySearch = (
  func: (x: number) => number,
  y: number,
  iterations: number,
  precision: number,
  low: number = 0,
  high: number = 1,
  init?: number
) => {
  let x: number = init ?? high / 2;
  for (let i = 0; i < iterations; i++) {
    const value = func(x);
    if (Math.abs(value - y) < precision) break;
    if (value < y) low = x;
    else high = x;
    x = (low + high) / 2;
  }

  return x;
};

export const vectorMultScalar = (scalar: number, vector: readonly number[]) =>
  vector.map((x) => scalar * x);

export const vectorAdd = (a: readonly number[], b: readonly number[]) =>
  a.map((x, i) => x + b[i]);
