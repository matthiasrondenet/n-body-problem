import {
  useSimulationActions,
  useSimulationConfigCalculated,
} from "./simulations-hooks";

export const useStepSize = (id: string) => {
  const { stepSize, timeUnit } = useSimulationConfigCalculated(id);

  const { patchConfig } = useSimulationActions();

  const changeStepSize = (newStepSize: number) =>
    patchConfig(id, () => ({ stepSize: newStepSize }));

  return { stepSize, timeUnit, changeStepSize };
};
