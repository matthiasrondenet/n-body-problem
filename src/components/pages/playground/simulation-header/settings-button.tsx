import { IconButton } from "@/components/ui-custom/icon-button";
import { Settings } from "lucide-react";
import { useSimulationActions } from "../hooks/simulations-hooks";
import { useSettingsOpen } from "../simulation-settings/settings-open";

type SettingsButtonProps = {
  id: string;
};
export const SettingsButton: React.FC<SettingsButtonProps> = ({ id }) => {
  const {
    actions: { onOpen },
  } = useSettingsOpen();

  const { patchState } = useSimulationActions();

  const handleOnOpen = () => {
    patchState(id, (s) => ({
      ...s,
      statusType: "Paused",
    }));
    onOpen();
  };

  return (
    <IconButton tooltipContent="Settings" onClick={handleOnOpen}>
      <Settings size={20} />
    </IconButton>
  );
};
