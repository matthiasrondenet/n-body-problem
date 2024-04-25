import { describe, expect, test } from "vitest";
import { previousNth } from "./array";

const all = [0, 1, 2, 3, 4, 5, 6, 7];

describe("array n element", () => {
  test.each([
    [0, 1, [0]],
    [3, 2, [2, 3]],
    [7, 2, [6, 7]],
  ])(
    "Non-circular case should return 2 previous when index is %i ",
    (currentIndex: number, expectedLength: number, expected: number[]) => {
      const actual = previousNth(all, currentIndex, 2);
      expect(actual.length).toBe(expectedLength);
      expect(actual).toEqual(expected);
    }
  );

  test.each([
    [0, 1, [0]],
    [3, 4, [0, 1, 2, 3]],
    [7, 8, [0, 1, 2, 3, 4, 5, 6, 7]],
  ])(
    "Non-circular case should return all previous when index is %i",
    (currentIndex: number, expectedLength: number, expected: number[]) => {
      const actual = previousNth(all, currentIndex, 10);
      expect(actual.length).toBe(expectedLength);
      expect(actual).toEqual(expected);
    }
  );

  test.each([
    [8, 2, [7, 0]],
    [11, 2, [2, 3]],
    [15, 2, [6, 7]],
  ])(
    "Circular case should return 2 previous and overlap when index is %i",
    (currentIndex: number, expectedLength: number, expected: number[]) => {
      const actual = previousNth(all, currentIndex, 2);
      expect(actual.length).toBe(expectedLength);
      expect(actual).toEqual(expected);
    }
  );

  test.each([
    [8, 9, [0, 1, 2, 3, 4, 5, 6, 7, 0]],
    [11, 10, [2, 3, 4, 5, 6, 7, 0, 1, 2, 3]],
    [15, 10, [6, 7, 0, 1, 2, 3, 4, 5, 6, 7]],
  ])(
    "Circular case should return previous and overlap %i",
    (currentIndex: number, expectedLength: number, expected: number[]) => {
      const actual = previousNth(all, currentIndex, 10);
      expect(actual.length).toBe(expectedLength);
      expect(actual).toEqual(expected);
    }
  );
});
