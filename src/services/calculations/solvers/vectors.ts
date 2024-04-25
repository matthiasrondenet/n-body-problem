export const vectorMultScalar = (scalar: number, vector: readonly number[]) =>
  vector.map((x) => scalar * x);

export const vectorAdd = (a: readonly number[], b: readonly number[]) =>
  a.map((x, i) => x + b[i]);
