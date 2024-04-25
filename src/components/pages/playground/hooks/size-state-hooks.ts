import { useShallow } from "zustand/react/shallow";
import { useSimulationsStore } from "../store/simulations-store";
import { useSimulationActions } from "./simulations-hooks";

export const useSimulationHeight = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].state.height)
  );

export const useSimulationWidth = (id: string) =>
  useSimulationsStore(useShallow((state) => state.simulations[id].state.width));

export const useUpdateSize = (id: string) => {
  const { patchState } = useSimulationActions();
  const changeSize = ({ width, height }: { width: number; height: number }) =>
    patchState(id, () => ({ width: width, height: height }));

  const changeHeight = (height: number) =>
    patchState(id, () => ({ height: height }));

  const changeWidth = (width: number) =>
    patchState(id, () => ({ width: width }));

  return { changeSize, changeHeight, changeWidth };
};

export const useSize = (id: string) => {
  const height = useSimulationHeight(id);
  const width = useSimulationWidth(id);

  const { changeSize, changeHeight, changeWidth } = useUpdateSize(id);

  return { height, width, changeSize, changeHeight, changeWidth };
};
