export type Collection<T, K extends string = string> = Readonly<Record<K, T>>;

export const addKey = <
  T,
  C extends Collection<T, K>,
  K extends string = string
>(
  collection: C,
  key: K,
  value: T
): C => {
  if (collection[key] !== undefined) {
    return collection;
  }

  return { [key]: value, ...collection };
};

export const addOrPatchKey = <
  T,
  C extends Collection<T, K>,
  K extends string = string
>(
  collection: C,
  key: K,
  value: T
): C => {
  return {
    ...collection,
    [key]: {
      ...collection[key],
      ...value,
    },
  };
};
export const removeKey = <
  T,
  C extends Collection<T, K>,
  K extends string = string
>(
  collection: C,
  key: K
): C => {
  if (collection[key] === undefined) {
    return collection;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _valueToRemove, ...rest } = collection;
  return rest as C;
};

export const patchKey = <
  T,
  C extends Collection<T, K>,
  K extends string = string
>(
  collection: C,
  key: K,
  patch: Partial<T>
): C => {
  if (collection[key] === undefined) {
    return collection;
  }
  return {
    ...collection,
    [key]: {
      ...collection[key],
      ...patch,
    },
  };
};

export const duplicateKey = <
  T,
  C extends Collection<T, K>,
  K extends string = string
>(
  collection: C,
  key: K,
  newKey: K
): C => {
  if (collection[key] === undefined) {
    return collection;
  }
  if (collection[newKey] !== undefined) {
    return collection;
  }

  return {
    ...collection,
    [newKey]: {
      ...collection[key],
    },
  };
};
