import { useShallow } from "zustand/react/shallow";
import { useSimulationActions } from "./simulations-hooks";
import { useSimulationsStore } from "../store/simulations-store";

export const useSimulationIsFullScreen = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].state.isFullScreen)
  );
export const useFullScreen = (id: string) => {
  const isFullScreen = useSimulationIsFullScreen(id);
  const { patchState } = useSimulationActions();

  const toggleFullScreen = () =>
    patchState(id, (state) => ({
      isFullScreen: !state.isFullScreen,
    }));
  return { isFullScreen, toggleFullScreen };
};
