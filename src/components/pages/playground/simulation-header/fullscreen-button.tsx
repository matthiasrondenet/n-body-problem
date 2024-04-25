import React from "react";
import { IconButton } from "@/components/ui-custom/icon-button";
import { Maximize, Minimize } from "lucide-react";
import { useFullScreen } from "../hooks/fullscreen-state-hooks";

type FullScreenButtonProps = {
  id: string;
};
export const FullScreenButton: React.FC<FullScreenButtonProps> = ({ id }) => {
  const { isFullScreen, toggleFullScreen } = useFullScreen(id);

  return (
    <IconButton
      onClick={toggleFullScreen}
      tooltipContent={isFullScreen ? "Minimize" : "Maximize"}
    >
      {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
    </IconButton>
  );
};
