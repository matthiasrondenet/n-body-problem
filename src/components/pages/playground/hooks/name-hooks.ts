import { useShallow } from "zustand/react/shallow";
import { useSimulationsStore } from "../store/simulations-store";

export const useSimulationName = (id: string) =>
  useSimulationsStore(useShallow((state) => state.simulations[id].name));

export const useSimulationConfigDescription = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].config.description)
  );
