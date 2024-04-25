import { useSimulationsStore } from "@/store/simulations-store";
import { RotateCcw } from "lucide-react";
import { IconButton } from "../custom-ui/icon-button";

export const Reset: React.FC = () => {
  const reset = useSimulationsStore((state) => state.reset);

  return (
    <IconButton tooltipContent="Reset all simulations" onClick={() => reset()}>
      <RotateCcw size={20} />
    </IconButton>
  );
};
