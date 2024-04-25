import { describe, expect, test } from "vitest";
import { SimulationsState, stateCreator } from "./simulations-store";
import { createStore } from "zustand";

describe("init", () => {
  const useTestSimulationsStore = createStore<SimulationsState>()(stateCreator);
  const initialState = useTestSimulationsStore.getInitialState();
  test("sould have default simulation", () => {
    const simulationKeys = Object.keys(initialState.simulations);
    expect(simulationKeys.length).toBe(1);
  });
});

describe("add", () => {
  const useTestSimulationsStore = createStore<SimulationsState>()(stateCreator);
  const initialState = useTestSimulationsStore.getInitialState();
  test("sould add new simulation", () => {
    initialState.add();

    expect(initialState.simulations["#0"].name).toBe("Figure Eight");
  });
});
