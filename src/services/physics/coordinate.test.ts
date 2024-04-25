import { describe, expect, test } from "vitest";
import {
  CartesianCoordinate2d,
  PolarCoordinate2d,
  convertToCartesian,
  convertToPolar,
} from "./coordinate";
import { sunEartDistance, sunJupiterDistance } from "./constants";

describe("convert coordinates from polar to cartesian", () => {
  test.each([
    ["sun", { r: 0, theta: 0 }, { x: 0, y: 0 }],
    ["earth", { r: sunEartDistance, theta: 0 }, { x: 149_597_870_000, y: 0 }],
    ["jupiter", { r: sunJupiterDistance, theta: 0 }, { x: 777830000000, y: 0 }],
    ["(-1,0)", { r: 1, theta: Math.PI }, { x: -1, y: 0 }],
    ["(1,0)", { r: 1, theta: 0 }, { x: 1, y: 0 }],
    ["(0,1)", { r: 1, theta: Math.PI / 2 }, { x: 0, y: 1 }],
    ["(1,1)", { r: 1.4142135623730951, theta: Math.PI / 4 }, { x: 1, y: 1 }],
    ["(12,5)", { r: 13, theta: 0.39479111969976155 }, { x: 12, y: 5 }],
  ])(
    "should conver polar coordinate to cartesian for %s",
    (
      _name: string,
      polarCoordinate: PolarCoordinate2d,
      expected: CartesianCoordinate2d
    ) => {
      const actual = convertToCartesian(polarCoordinate);
      expect(actual.x).toBeCloseTo(expected.x);
      expect(actual.y).toBeCloseTo(expected.y);
    }
  );
});

describe("convert coordinates from cartesian to polar", () => {
  test.each([
    ["sun", { x: 0, y: 0 }, { r: 0, theta: 0 }],
    ["earth", { x: 149_597_870_000, y: 0 }, { r: sunEartDistance, theta: 0 }],
    [
      "jupiter",
      { x: 778_000_000_000, y: 0 },
      { r: sunJupiterDistance, theta: 0 },
    ],
    ["(-1,0)", { x: -1, y: 0 }, { r: 1, theta: Math.PI }],
    ["(1,0)", { x: 1, y: 0 }, { r: 1, theta: 0 }],
    ["(0,1)", { x: 0, y: 1 }, { r: 1, theta: Math.PI / 2 }],
    ["(1,1)", { x: 1, y: 1 }, { r: 1.4142135623730951, theta: Math.PI / 4 }],
    ["(12,5)", { x: 12, y: 5 }, { r: 13, theta: 0.39479111969976155 }],
  ])(
    "should convert cartesian coordinate to polar for %s",
    (
      _name: string,
      cartesianCoordinate: CartesianCoordinate2d,
      expected: PolarCoordinate2d
    ) => {
      const actual = convertToPolar(cartesianCoordinate);
      expect(actual.r).toBeCloseTo(expected.r);
      expect(actual.theta).toBeCloseTo(expected.theta);
    }
  );
});
