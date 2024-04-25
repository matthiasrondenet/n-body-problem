import { useShallow } from "zustand/react/shallow";
import { useSimulationActions } from "./simulations-hooks";
import { StatusType, useSimulationsStore } from "../store/simulations-store";

export const useSimulationStatusType = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].state.statusType)
  );

export const useStatusType = (id: string) => {
  const statusType = useSimulationStatusType(id);

  const { patchState } = useSimulationActions();

  const changeStatusType = (statusType: StatusType) => {
    patchState(id, () => ({
      statusType: statusType,
    }));
  };

  return { statusType, changeStatusType };
};
