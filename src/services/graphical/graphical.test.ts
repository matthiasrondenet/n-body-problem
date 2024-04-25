import { describe, expect, test } from "vitest";
import { centerPoint, timeToHumanReadableFormat } from "./graphical";
import { oneDayInSeconds, oneYearInSeconds } from "../physics/constants";

describe("calculate drawable objects", () => {
  test("should calculate the center point of the screen", () => {
    const actual = centerPoint({ width: 600, height: 300 });
    expect(actual).toEqual({ x: 300, y: 150 });
  });
});

describe("display time to a readeable format", () => {
  test.each([
    [90, "90ms"],
    [1_290, "1s 290ms"],
    [91_290, "1m 31s 290ms"],
    [1_991_290, "33m 11s 290ms"],
    [10_991_290, "3h 3m 11s"],
    [210_991_290, "2d 10h 36m"],
    [120_210_991_290, "3y 296d 7h"],
    [19_120_210_991_290, "6c 6y 108d"],
    [oneYearInSeconds * 1000, "1y"],
    [oneDayInSeconds * 1000, "1d"],
    [(oneYearInSeconds + oneDayInSeconds) * 1000, "1y 1d"],
  ])(
    "should display %s elapsed ms to a human readable format",
    (time: number, expected: string) => {
      const actual = timeToHumanReadableFormat(time);
      expect(actual).toEqual(expected);
    }
  );
});
