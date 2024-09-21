import { describe, expect, test } from "vitest";
import { CartesianCoordinate2d, convertToCartesian } from "./coordinate";
import { calculateCenterOfMass, calculateDiameter } from "./physics";
import { earthDensity, masses, diameters } from "./constants";
import { round } from "lodash-es";
import { PresetGroup, presets } from "../presets/presets";
import { SimulationConfig } from "../simulation/simulation-config-types";

describe("diameter", () => {
  test("calculate the diameter of a body", () => {
    const actual = calculateDiameter(masses["Earth"], earthDensity);
    expect(round(actual, -4)).toBe(round(diameters["Earth"]!, -4));
  });
});

describe("center of mass", () => {
  test("should calculate center of mass - scenario 1", () => {
    const bodies = [
      {
        x: -1,
        y: -1,
        mass: 1,
      },
      {
        x: 0,
        y: 0,
        mass: 1,
      },
      {
        x: 1,
        y: 1,
        mass: 1,
      },
    ];

    const actual = calculateCenterOfMass(bodies);

    expect(actual).toEqual({ x: 0, y: 0 });
  });

  test("should calculate center of mass - scenario 2", () => {
    const bodies = [
      {
        x: -5,
        y: -4,
        mass: 10,
      },
      {
        x: 0,
        y: 0,
        mass: 1,
      },
      {
        x: 15,
        y: 10,
        mass: 30,
      },
    ];

    const actual = calculateCenterOfMass(bodies);

    expect(actual).toEqual({ x: 9.75609756097561, y: 6.341463414634147 });
  });

  test("should calculate center of mass - scenario 3", () => {
    const bodies = [
      {
        x: -1,
        y: 1,
        mass: 5,
      },
      {
        x: 4,
        y: 3,
        mass: 3,
      },
      {
        x: 8,
        y: 7,
        mass: 9,
      },
    ];

    const actual = calculateCenterOfMass(bodies);

    expect(actual).toEqual({ x: 4.647058823529412, y: 4.529411764705882 });
  });

  test.each([
    ["Figure 8", "Figure 8 (Cris Moore)", { x: 0, y: 0 }],
    ["Real world", "Sun Earth Jupiter", { x: 742939098.4068764, y: 0 }],
    ["Real world", "Kepler 16", { x: 37594609.23293968, y: 0 }],
    ["Periodic", "Broucke R7", { x: -1.850371707708594e-17, y: 0 }],
    [
      "Periodic",
      "Sheen Loop-ended-triangles",
      { x: 0.17931926488349495, y: -0.13109315895265902 },
    ],
  ])(
    "should calculate center of mass - group %s - preset %s",
    (group: string, presetName: string, expected: CartesianCoordinate2d) => {
      const config = (
        presets[group as PresetGroup] as Record<string, SimulationConfig>
      )[presetName];
      const bodies = config.bodies.map((b) => ({
        ...convertToCartesian(b.initialPosition),
        mass: b.mass ?? 1,
      }));
      const actual = calculateCenterOfMass(bodies);
      expect(actual).toEqual(expected);
    }
  );
});
