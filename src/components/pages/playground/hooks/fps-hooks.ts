import { useShallow } from "zustand/react/shallow";
import { useSimulationsStore } from "../store/simulations-store";
import { useLoopState } from "./loop-state-hooks";
import { defaultFrameRates } from "@/utils/animation-loop-hooks";

const useSimulationFps = (id: string) =>
  useSimulationsStore(
    useShallow((state) => state.simulations[id].config.framesPerSecond)
  ) ?? defaultFrameRates;

export const useFps = (id: string) => {
  const framesPerSecond = useSimulationFps(id);
  const { counter, elapsed } = useLoopState(id);

  const throttling = 1000 / framesPerSecond;
  const calculatedThrottling = elapsed / counter;
  const calculatedFramesPerSecond = 1000 / calculatedThrottling;

  return {
    framesPerSecond,
    throttling,
    calculatedFramesPerSecond,
    calculatedThrottling,
  };
};
