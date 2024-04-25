import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import {
  addOrPatchKey,
  Collection,
  duplicateKey,
  patchKey,
  removeKey,
} from "../../../../utils/collection";
import { isDev } from "@/config";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";
import { Preset, allPresets } from "@/services/presets/presets";

export type StatusType = "Paused" | "Running" | "Ended" | "Reset";

export type SimulationState = Readonly<{
  counter: number;
  startTime: number;
  currentTime: number;
  elapsed: number;
  statusType: StatusType;
  isFullScreen: boolean;
  width?: number;
  height?: number;
}>;

export type Simulation = Readonly<{
  name: string;
  config: SimulationConfig;
  state: SimulationState;
}>;

const initialState: SimulationState = {
  counter: 0,
  startTime: 0,
  currentTime: 0,
  elapsed: 0,
  statusType: "Running",
  isFullScreen: false,
  width: undefined,
  height: undefined,
};

const presetKey = "preset";

export interface SimulationsState {
  presetKey: string;
  playgroundKeys: string[];
  simulations: Collection<Simulation>;
  actions: {
    addOrUpdatePreset: (
      preset: Preset,
      simulationConfig?: Partial<SimulationConfig>
    ) => void;
    editInPlayground: () => void;
    remove: (id: string) => void;
    copy: (id: string) => void;
    reset: () => void;
    patchConfig: (
      id: string,
      simulationConfigPatcher: (
        simulationConfig: SimulationConfig
      ) => Partial<SimulationConfig>
    ) => void;
    patchState: (
      id: string,
      simulationStatePatcher: (
        simulationState: SimulationState
      ) => Partial<SimulationState>
    ) => void;
  };
}

const createNewKey = () => uuidv4();

const initFromPreset = (preset: Preset): Simulation => {
  return {
    name: preset,
    config: allPresets[preset],
    state: initialState,
  };
};

const initialSimulation: Record<string, Simulation> = {};

const addOrUpdatePreset = (
  state: SimulationsState,
  preset: Preset,
  simulationConfig?: Partial<SimulationConfig>
) => {
  const simulation = initFromPreset(preset);
  return addOrPatch(state, presetKey, {
    ...simulation,
    config: {
      ...simulation.config,
      ...simulationConfig,
    },
  });
};

const editInPlayground = (state: SimulationsState) => {
  return copy(state, state.presetKey);
};

const remove = (state: SimulationsState, key: string) => {
  return {
    ...state,
    simulations: removeKey(state.simulations, key),
    playgroundKeys: state.playgroundKeys.filter((k) => k !== key),
  };
};

const copy = (state: SimulationsState, key: string) => {
  const newKey = createNewKey();
  return {
    ...state,
    simulations: duplicateKey(state.simulations, key, newKey),
    playgroundKeys: [newKey, ...state.playgroundKeys],
  };
};

const reset = (state: SimulationsState) => {
  return {
    ...state,
    simulations: initialSimulation,
  };
};

const addOrPatch = (
  state: SimulationsState,
  key: string,
  simulation: Partial<Simulation>
) => {
  return {
    ...state,
    simulations: addOrPatchKey(state.simulations, key, simulation),
  };
};

const patchConfig = (
  state: SimulationsState,
  key: string,
  simulationConfigPacher: (
    simulationConfig: SimulationConfig
  ) => Partial<SimulationConfig>
) => {
  const simulation = state.simulations[key];
  const patched = {
    ...simulation,
    config: {
      ...simulation.config,
      ...simulationConfigPacher(simulation.config),
    },
  };
  return {
    ...state,
    simulations: patchKey(state.simulations, key, patched),
  };
};

const patchState = (
  state: SimulationsState,
  key: string,
  simulationStatePatcher: (
    simulationState: SimulationState
  ) => Partial<SimulationState>
) => {
  const simulation = state.simulations[key];
  const patched = {
    ...simulation,
    state: {
      ...simulation.state,
      ...simulationStatePatcher(simulation.state),
    },
  };
  return {
    ...state,
    simulations: patchKey(state.simulations, key, patched),
  };
};

export const stateCreator: StateCreator<SimulationsState, []> = (set) => ({
  presetKey: presetKey,
  playgroundKeys: [],
  simulations: initialSimulation,
  actions: {
    addOrUpdatePreset: (preset, config) =>
      set((state) => addOrUpdatePreset(state, preset, config)),
    editInPlayground: () => set((state) => editInPlayground(state)),
    remove: (id) => set((state) => remove(state, id)),
    copy: (id) => set((state) => copy(state, id)),
    reset: () => set((state) => reset(state)),
    patchConfig: (id, simulationConfigPatcher) =>
      set((state) => patchConfig(state, id, simulationConfigPatcher)),
    patchState: (id, simulationStatePatcher) =>
      set((state) => patchState(state, id, simulationStatePatcher)),
  },
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
