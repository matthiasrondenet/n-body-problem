import { useShallow } from "zustand/react/shallow";
import { useSimulationsStore } from "../store/simulations-store";
import { useSimulationCalculated } from "@/components/simulation/simulation-hooks";

export const useSimulationActions = () =>
  useSimulationsStore((state) => state.actions);

export const useSimulationConfigCalculated = (id: string) =>
  useSimulationCalculated(useSimulationConfig(id));

export const useSimulationConfig = (id: string) =>
  useSimulationsStore(useShallow((state) => state.simulations[id].config));

export const useIsSimulationLoaded = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id] !== undefined)
  );

export const usePlaygroundKeys = () =>
  useSimulationsStore(useShallow((state) => state.playgroundKeys));

export const usePresetKey = () =>
  useSimulationsStore(useShallow((state) => state.presetKey));
