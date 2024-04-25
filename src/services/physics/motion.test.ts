import { describe, expect, test } from "vitest";
import { buildMotionOde, calculatePositions } from "./motion";
import { eulerSolver } from "../solvers/euler-solver";

const stepSize = 0.005;
const masses = Array(3).fill(1);
const gravitationalConstant = 1;
const motionOde = buildMotionOde(masses, gravitationalConstant);

const inital = [
  // B1
  0, 0, -0.93240737, -0.86473146,
  // B2
  0.97000436, -0.24308753, 0.466203685, 0.43236573,
  // B3
  -0.97000436, 0.24308753, 0.466203685, 0.43236573,
];

const expectedH1 = [
  // expected B1
  -0.00466203685, -0.0043236573, -0.93240737, -0.86473146,
  // expected B2
  0.9723353784250001, -0.24092570135, 0.46014115780147546, 0.4338850270496,
  // expected B3
  -0.967673341575, 0.24524935865, 0.4722662121985245, 0.4308464329504,
];

const expectedH2 = [
  // expected B1
  -0.0093240737, -0.0086473146, -0.9324889414771986, -0.8646286325314966,
  // expected B2
  0.9746360842140075, -0.23875627621475198, 0.454119638196521,
  0.43535349811925833,
  // expected B3
  -0.9653120105140073, 0.247403590814752, 0.4783693032806776,
  0.42927513441223825,
];

const expectedH100 = [
  // expected B1
  -0.5093692021939648, -0.3414938892971797, -1.1031046611211859,
  -0.3033587729720715,
  // expected B2
  1.0815357765298428, -0.012515138043459393, 0.018442234978529894,
  0.4677968891304136,
  // expected B3
  -0.5721665743358781, 0.354009027340639, 1.0846624261426565,
  -0.16443811615834258,
];
describe("motion", () => {
  describe("compute new position - figure 8", () => {
    test("should compute next position at h", () => {
      const stateVariable = [...inital];
      const results = calculatePositions({
        solver: eulerSolver,
        ode: motionOde,
        y0: stateVariable,
        stepSize,
        range: [0, stepSize],
      });

      const result = results[results.length - 1];

      expect(result).toEqual(expectedH1);
    });

    test("should compute positions on [0, 2h]", () => {
      const stateVariable = [...inital];

      const results = calculatePositions({
        solver: eulerSolver,
        ode: motionOde,
        y0: stateVariable,
        stepSize,
        range: [0, stepSize * 2],
      });

      expect(results).toEqual([inital, expectedH1, expectedH2]);
    });

    test("should compute positions on [0, 100h]", () => {
      const stateVariable = [...inital];

      const results = calculatePositions({
        solver: eulerSolver,
        ode: motionOde,
        y0: stateVariable,
        stepSize,
        range: [0, stepSize * 100],
      });

      const last = results[results.length - 1];
      expect(results.length).toBe(101);
      expect(last).toEqual(expectedH100);
    });
  });
});
