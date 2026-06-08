export type Derivative = (x: number, y: number[], yp: number[]) => number[] | void;

export type DenseOutputFunction = (c: number, x: number) => number;

export type OutputFunction = (
  xOld: number,
  x: number,
  y: number[],
  dense: DenseOutputFunction
) => void | boolean;

export type Options = {
  absoluteTolerance?: number | number[];
  relativeTolerance?: number | number[];
  denseOutput?: boolean;
  maxExtrapolationColumns?: number;
  maxSteps?: number;
  stepSizeSequence?: number;
  interpolationFormulaDegree?: number;
  outputMode?: number;
  outputStepSize?: number;
  initialStepSize?: number;
  correctInitialStep?: boolean;
  stiffnessTest?: boolean;
  rawFunction?: boolean;
  debug?: boolean;
};

export class Solver {
  constructor(f: Derivative, n: number, options?: Options);
  solve(
    x0: number,
    y0: number[],
    xEnd: number,
    output?: OutputFunction
  ): { y: number[]; nStep: number };
  grid(
    dt: number,
    out: (xOut: number, yOut: number[]) => void | boolean
  ): OutputFunction;
}
