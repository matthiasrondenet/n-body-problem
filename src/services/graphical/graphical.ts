import { CartesianCoordinate2d } from "../physics/coordinate";
import {
  oneCenturyInSeconds,
  oneDayInSeconds,
  oneHourInSeconds,
  oneMinuteInSeconds,
  oneYearInSeconds,
} from "../physics/constants";

/**
 * calculate the center point of the canvas
 * @param width with of the canvas
 * @param height height of the canvas
 * @returns center point in cartesian coordinates
 */
export const centerPoint = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): CartesianCoordinate2d => {
  return {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
  };
};

/**
 * convert time in milliseconds to a human readable format
 * @param milliseconds time in milliseconds
 * @param maxUnitCount maximum number of units to display
 * @returns human readable time format
 */
export const timeToHumanReadableFormat = (
  milliseconds: number,
  maxUnitCount: number = 3
): string => {
  const timeUnits = [
    { unit: "c", value: oneCenturyInSeconds * 1000 },
    { unit: "y", value: oneYearInSeconds * 1000 },
    { unit: "d", value: oneDayInSeconds * 1000 },
    { unit: "h", value: oneHourInSeconds * 1000 },
    { unit: "m", value: oneMinuteInSeconds * 1000 },
    { unit: "s", value: 1000 },
    { unit: "ms", value: 1 },
  ];

  let result = "";
  let remainingTime = milliseconds;
  let counter = 0;

  for (let i = 0; i < timeUnits.length; i++) {
    const { unit, value } = timeUnits[i];

    if (remainingTime >= value) {
      const count = Math.floor(remainingTime / value);
      remainingTime %= value;
      result += `${count}${unit} `;
      counter++;
      if (counter === maxUnitCount) break;
    }
  }

  return result.trim();
};
