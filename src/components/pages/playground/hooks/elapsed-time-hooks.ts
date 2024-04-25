import { useLoopState } from "./loop-state-hooks";
import { useFps } from "./fps-hooks";
import { useSimulationConfigCalculated } from "./simulations-hooks";

export const useElapsedTime = (id: string) => {
  const { calculatedFramesPerSecond } = useFps(id);
  const { stepSize, timeSpeed } = useSimulationConfigCalculated(id);
  const { elapsed } = useLoopState(id);

  const elapsedEstimatedInRealTime =
    elapsed * stepSize * calculatedFramesPerSecond * timeSpeed;

  return {
    elapsed,
    stepSize,
    elapsedEstimatedInRealTime,
  };
};
