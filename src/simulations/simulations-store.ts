import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import {
  Collection,
  addKey,
  duplicateKey,
  removeKey,
} from "@/utils/collection";

export interface SimulationState {
  name: string;
}

interface SimulationsState {
  simulations: Collection<SimulationState>;
  add: () => void;
  remove: (id: string) => void;
  copy: (id: string) => void;
  reset: () => void;
}

const initialSimulation: Record<string, SimulationState> = {};
initialSimulation[uuidv4()] = {
  name: "test 1",
};

const add = (state: SimulationsState) => {
  return {
    ...state,
    simulations: addKey(state.simulations, uuidv4(), {
      name: `#${Object.keys(state.simulations).length + 1}`,
    }),
  };
};

const remove = (state: SimulationsState, key: string) => {
  return {
    ...state,
    simulations: removeKey(state.simulations, key),
  };
};

const copy = (state: SimulationsState, key: string) => {
  return {
    ...state,
    simulations: duplicateKey(state.simulations, key, uuidv4()),
  };
};

const reset = (state: SimulationsState) => {
  return {
    ...state,
    simulations: initialSimulation,
  };
};

export const useSimulationsStore = create<SimulationsState>()(
  devtools(
    persist(
      (set) => ({
        simulations: initialSimulation,
        add: () => set((state) => add(state)),
        remove: (id) => set((state) => remove(state, id)),
        copy: (id) => set((state) => copy(state, id)),
        reset: () => set((state) => reset(state)),
      }),
      { name: "simulations-store" }
    )
  )
);
