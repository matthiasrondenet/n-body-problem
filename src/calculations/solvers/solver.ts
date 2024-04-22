export type OdeEquation = (x: number, y: number[]) => number[];

export type SolverArguments = Readonly<{
  equation: OdeEquation;
  initialCondition: number[];
  range: [number, number];
  stepSize: number;
}>;

export type SolverResult = {
  results: number[][];
};

export type Solver = (arg: SolverArguments) => SolverResult;
