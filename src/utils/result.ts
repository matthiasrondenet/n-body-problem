export type Ok<T> = {
  type: "Ok";
  data: T;
};

export type Err<E> = {
  type: "Error";
  err: E;
};

export const createOk = <T>(data: T): Ok<T> => ({ type: "Ok", data });
export const createError = <E>(err: E): Err<E> => ({ type: "Error", err });

export const mapResult = <TIn, TOut, E>(
  r: Result<TIn, E>,
  fn: (t: TIn) => TOut
): Result<TOut, E> => (isErr(r) ? r : createOk(fn(r.data)));

export type Result<T, E> = Ok<T> | Err<E>;

export const isOk = <T, E>(r: Result<T, E>): r is Ok<T> => r.type === "Ok";
export const isErr = <T, E>(r: Result<T, E>): r is Err<E> => r.type === "Error";
