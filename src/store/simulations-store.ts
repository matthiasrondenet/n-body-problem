import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import {
  Collection,
  addKey,
  duplicateKey,
  removeKey,
} from "./utils/collection";
import { SimulationConfig } from "@/services/simulations/presets/presets";
import { presets } from "@/services/simulations/simulations-presets";
import { isDev } from "@/config";

type Status = "Paused" | "Runing" | "Ended";

export type SimulationState = Readonly<{
  tick: number;
  status: Status;
}>;

export type Simulation = Readonly<{
  name: string;
  config: SimulationConfig;
}>;

export interface SimulationsState {
  simulations: Collection<Simulation>;
  add: () => void;
  remove: (id: string) => void;
  copy: (id: string) => void;
  reset: () => void;
}

const initialSimulation: Record<string, Simulation> = {
  [uuidv4()]: {
    name: `#1 Figure Eight`,
    config: presets["Figure Eight"],
  },
};

const add = (state: SimulationsState) => {
  return {
    ...state,
    simulations: addKey(state.simulations, uuidv4(), {
      name: `#${Object.keys(state.simulations).length + 1} Figure Eight`,
      config: presets["Figure Eight"],
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

export const stateCreator: StateCreator<SimulationsState, []> = (set) => ({
  simulations: initialSimulation,
  add: () => set((state) => add(state)),
  remove: (id) => set((state) => remove(state, id)),
  copy: (id) => set((state) => copy(state, id)),
  reset: () => set((state) => reset(state)),
});

export const useSimulationsStore = isDev
  ? create<SimulationsState>()(
      devtools(
        // persist(
        stateCreator
        //   ,
        //   { name: "simulations-store" }
        // )
      )
    )
  : create<SimulationsState>()(stateCreator);
