import { describe, expect, test } from "vitest";
import { Collection, addKey, duplicateKey, removeKey } from "./collection";

type FooTest = {
  a: string;
  b: boolean;
};

const state: Collection<FooTest> = {
  ["key_1"]: {
    a: "a_1",
    b: false,
  },
};

describe("add-key", () => {
  test("should insert in collection when key does not already exist", () => {
    const newValue: FooTest = { a: "a_2", b: true };

    const actual = addKey(state, "key_2", newValue);

    expect(actual).toEqual({
      ...state,
      ["key_2"]: { a: "a_2", b: true },
    });
    expect(actual["key_1"]).toBe(state["key_1"]);
    expect(actual["key_2"]).toBe(newValue);
  });

  test("should do nothing when key already exists", () => {
    const newValue: FooTest = { a: "a_2", b: true };

    const actual = addKey(state, "key_1", newValue);

    expect(actual).toBe(state);
  });
});

describe("remove-key", () => {
  test("should remove in collection when key exists", () => {
    const actual = removeKey(state, "key_1");

    expect(actual).toEqual({});
  });

  test("should do nothing when key does not exist", () => {
    const actual = removeKey(state, "key_2");

    expect(actual).toBe(state);
  });
});

describe("duplicate-key", () => {
  test("should ducplicate in collection when key exists and newKey does not exist", () => {
    const actual = duplicateKey(state, "key_1", "key_2");

    expect(actual).toEqual({
      ...state,
      ["key_2"]: { a: "a_1", b: false },
    });
    expect(actual["key_1"]).toBe(state["key_1"]);
    expect(actual["key_2"]).toEqual(state["key_1"]);
  });

  test("should do nothing when key not exists", () => {
    const actual = duplicateKey(state, "key_2", "key_3");

    expect(actual).toBe(state);
  });

  test("should do nothing when newKey already exists", () => {
    const s = {
      ...state,
      ["key_2"]: { a: "a_2", b: true },
    } as Collection<FooTest>;

    const actual = duplicateKey(s, "key_1", "key_2");

    expect(actual).toBe(s);
  });
});
