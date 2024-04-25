import { useShallow } from "zustand/react/shallow";
import { useSimulationsStore } from "../store/simulations-store";
import { useSimulationActions } from "./simulations-hooks";

const useSimulationCounter = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].state.counter)
  );

const useSimulationElapsed = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].state.elapsed)
  );

const useSimulationCurrentTime = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].state.currentTime)
  );

const useSimulationStartTime = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].state.startTime)
  );

export const useUpdateLoopState = (id: string) => {
  const { patchState } = useSimulationActions();

  const changeLoopState = ({
    counter,
    time,
    startTime,
    elapsed,
  }: {
    counter: number;
    time: number;
    startTime: number;
    elapsed: number;
  }) =>
    patchState(id, () => ({
      startTime: startTime,
      currentTime: time,
      counter: counter,
      elapsed: elapsed,
    }));

  return changeLoopState;
};
export const useLoopState = (id: string) => {
  const counter = useSimulationCounter(id);
  const elapsed = useSimulationElapsed(id);
  const currentTime = useSimulationCurrentTime(id);
  const startTime = useSimulationStartTime(id);
  const changeLoopState = useUpdateLoopState(id);

  const totalElapsed = currentTime - startTime;

  return {
    counter,
    elapsed,
    currentTime,
    startTime,
    totalElapsed,
    changeLoopState,
  };
};
