import { SimulationAutoResized } from "@/components/simulation/simulation-auto-resized";
import { useSimulationConfig } from "../hooks/simulations-hooks";
import { useStatusType } from "../hooks/status-state-hooks";
import { useUpdateSize } from "../hooks/size-state-hooks";
import { useUpdateLoopState } from "../hooks/loop-state-hooks";

type SimulationContentProps = {
  id: string;
};
export const SimulationContent: React.FC<SimulationContentProps> = ({ id }) => {
  const config = useSimulationConfig(id);
  const { statusType, changeStatusType } = useStatusType(id);
  const { changeSize } = useUpdateSize(id);
  const changeLoopState = useUpdateLoopState(id);

  return (
    <SimulationAutoResized
      id={id}
      config={config}
      statusType={statusType}
      onResized={changeSize}
      onStatusTypeChanged={changeStatusType}
      onSimulationLoop={changeLoopState}
    />
  );
};
