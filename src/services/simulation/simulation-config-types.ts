import { DefaultColors } from "tailwindcss/types/generated/colors";
import { Coordinate } from "../physics/coordinate";
import { SolverName } from "../solvers/solvers";
import { RangeScalingFunctionName } from "@/utils/number";
import { gravitationalConstant } from "../physics/constants";

export type AdditionalContentType =
  | "name"
  | "step-size"
  | "nb-of-calculations"
  | "timeUnit"
  | "t"
  | "timeSpeed";

const defaultGraphicalConfig: GraphicalConfig = {
  displayAxis: false,
  displayCom: false,
  displayCoordinates: false,
  displayBodies: true,
  displayOrbits: true,
  displayBodiesBodiesNames: false,
  displayBodiesCoordinates: false,
  displayBodiesBodiesAxis: false,

  additionnalContents: [],

  diametersScalingFunc: "logarithmic",
  distancesScalingFunc: "linear",
  distancesScalingFactor: 1,

  minimumSizePixels: 5,
  maximumSizePixels: 30,

  nbOfHistoryPoints: 3000,
  historyPointsRatio: 1,
};

export const defaultSimulationConfig: SimulationConfig = {
  name: "",
  description: undefined,
  gravitationalConstant: gravitationalConstant,
  bodies: [],
  adjustBarycentric: true,
  solverName: "Runge Kutta",
  timeSpeed: 1,
  isPeriodic: false,
  timeUnit: 1,
  nbOfSteps: 10_000,
  stepSize: undefined,
  framesPerSecond: 30,
  graphicalConfig: defaultGraphicalConfig,
};

export type GraphicalConfig = {
  displayAxis: boolean;
  displayCom: boolean;
  displayCoordinates: boolean;
  displayBodies: boolean;
  displayOrbits: boolean;
  displayBodiesCoordinates: boolean;
  displayBodiesBodiesNames: boolean;
  displayBodiesBodiesAxis: boolean;

  additionnalContents: AdditionalContentType[];

  diametersScalingFunc: RangeScalingFunctionName;
  distancesScalingFunc: RangeScalingFunctionName;
  distancesScalingFactor: number;

  minimumSizePixels: number;
  maximumSizePixels: number;
  nbOfHistoryPoints: number;
  historyPointsRatio: number;
};

export type SimulationBodyConfig = Readonly<{
  initialPosition: Coordinate;
  initialVelocity: Coordinate;
  mass?: number;
  density?: number;
  diameter?: number;
  color?: keyof DefaultColors;
  name?: string;
}>;

export type SimulationConfig = Readonly<{
  name: string;
  description: string | undefined;
  gravitationalConstant: number;
  bodies: SimulationBodyConfig[];
  adjustBarycentric: boolean;
  solverName: SolverName;
  timeUnit: number;
  nbOfSteps: number;
  stepSize: number | undefined;
  isPeriodic: boolean;
  timeSpeed: number;
  framesPerSecond: number;
  graphicalConfig: Required<GraphicalConfig>;
}>;
