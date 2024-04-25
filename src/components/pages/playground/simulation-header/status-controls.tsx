import { IconButton } from "@/components/ui-custom/icon-button";
import { Pause, Play, Repeat } from "lucide-react";

import { useStatusType } from "../hooks/status-state-hooks";

type StatusControlsProps = {
  id: string;
};
export const StatusControls: React.FC<StatusControlsProps> = ({ id }) => {
  const { statusType, changeStatusType } = useStatusType(id);

  return (
    <>
      <IconButton
        tooltipContent="Play"
        disabled={statusType !== "Paused"}
        onClick={() => changeStatusType("Running")}
      >
        <Play size={20} />
      </IconButton>
      <IconButton
        tooltipContent="Pause"
        disabled={statusType !== "Running"}
        onClick={() => changeStatusType("Paused")}
      >
        <Pause size={20} />
      </IconButton>
      <IconButton
        tooltipContent="Reset"
        onClick={() => changeStatusType("Reset")}
      >
        <Repeat size={20} />
      </IconButton>
    </>
  );
};
