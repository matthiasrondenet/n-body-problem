import { Copy, X } from "lucide-react";
import { FullScreenButton } from "./fullscreen-button";
import { SettingsButton } from "./settings-button";
import { StatusControls } from "./status-controls";
import { Separator } from "@/components/ui/separator";
import { IconButton } from "@/components/ui-custom/icon-button";
import { EditInPlaygroundButton } from "./edit-in-playground-button";
import { usePresetRoute } from "../hooks/preset-hooks";
import {
  usePlaygroundKeys,
  useSimulationActions,
} from "../hooks/simulations-hooks";

type ActionBarProps = {
  id: string;
};
export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { isPresetRoute } = usePresetRoute();
  const playgroundKeys = usePlaygroundKeys();

  const { copy, remove } = useSimulationActions();

  return (
    <span className="flex flex-row justify-items-end gap-2">
      {!isPresetRoute && (
        <>
          <IconButton tooltipContent="Copy" onClick={() => copy(id)}>
            <Copy size={20} />
          </IconButton>
          <IconButton
            tooltipContent="Delete"
            disabled={playgroundKeys.length <= 1}
            onClick={() => remove(id)}
          >
            <X size={20} />
          </IconButton>
          <Separator orientation="vertical" className="h-10" />
        </>
      )}

      <StatusControls id={id} />
      <Separator orientation="vertical" className="h-10" />
      <FullScreenButton id={id} />
      {isPresetRoute ? <EditInPlaygroundButton /> : <SettingsButton id={id} />}
    </span>
  );
};
