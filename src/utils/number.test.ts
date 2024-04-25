import { describe, expect, test } from "vitest";
import {
  rangeScalingFunctions,
  normalizeValue,
  RangeScalingFunctionName,
} from "./number";

describe("number tests", () => {
  describe("normalizeValue", () => {
    test.each([
      { x: 5, min: 0, max: 10, expected: 0.5 },
      { x: 0, min: 0, max: 10, expected: 0 },
      { x: 10, min: 0, max: 10, expected: 1 },
      { x: 0, min: -10, max: 10, expected: 0.5 },
      { x: 0.5, min: 0, max: 1, expected: 0.5 },
      { x: 5, min: 10, max: 0, expected: 0.5 },
    ])(
      "normalizes ($x, $min, $max) to $expected",
      ({ x, min, max, expected }) => {
        expect(normalizeValue(x, min, max)).toBeCloseTo(expected);
      }
    );

    test("returns NaN when min equals max", () => {
      expect(normalizeValue(5, 5, 5)).toBeNaN();
    });
  });

  describe("Range Scaling Functions", () => {
    const min = 0;
    const max = 100;
    const x = 0.5; // middle of the input range

    describe.each([
      ["linear"],
      ["logarithmic"],
      ["exponential"],
      ["log10"],
      ["sqrt"],
      ["quadratic"],
      ["cubic"],
    ])("%s function", (functionName) => {
      const func =
        rangeScalingFunctions[functionName as RangeScalingFunctionName];
      test("returns min when x is 0", () => {
        expect(func(0, min, max)).toBeCloseTo(min);
      });

      test("returns max when x is 1", () => {
        expect(func(1, min, max)).toBeCloseTo(max);
      });

      test("returns a value between min and max for x = 0.5", () => {
        const result = func(x, min, max);
        expect(result).toBeGreaterThan(min);
        expect(result).toBeLessThan(max);
      });

      test("handles negative range", () => {
        const negMin = -100;
        const negMax = -50;
        const result = func(x, negMin, negMax);
        expect(result).toBeLessThan(negMax);
        expect(result).toBeGreaterThan(negMin);
      });
    });

    // Specific tests for each function
    test("linear function at x=0.5 returns average of min and max", () => {
      expect(rangeScalingFunctions.linear(0.5, min, max)).toBe(50);
    });

    test("logarithmic function increases slower than linear", () => {
      const logResult = rangeScalingFunctions.logarithmic(0.5, min, max);
      const linearResult = rangeScalingFunctions.linear(0.5, min, max);
      expect(logResult).toBeLessThan(linearResult);
    });

    test("exponential function increases faster than linear", () => {
      const expResult = rangeScalingFunctions.exponential(0.5, min, max);
      const linearResult = rangeScalingFunctions.linear(0.5, min, max);
      expect(expResult).toBeGreaterThan(linearResult);
    });

    test("sqrt function increases slower than linear", () => {
      const sqrtResult = rangeScalingFunctions.sqrt(0.5, min, max);
      const linearResult = rangeScalingFunctions.linear(0.5, min, max);
      expect(sqrtResult).toBeGreaterThan(linearResult);
    });

    test("quadratic function increases faster than linear", () => {
      const quadResult = rangeScalingFunctions.quadratic(0.5, min, max);
      const linearResult = rangeScalingFunctions.linear(0.5, min, max);
      expect(quadResult).toBeLessThan(linearResult);
    });

    test("cubic function increases faster than quadratic", () => {
      const cubicResult = rangeScalingFunctions.cubic(0.5, min, max);
      const quadResult = rangeScalingFunctions.quadratic(0.5, min, max);
      expect(cubicResult).toBeLessThan(quadResult);
    });
  });
});
