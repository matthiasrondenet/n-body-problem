import { IconButton } from "@/components/ui-custom/icon-button";
import { SquareArrowOutUpRight } from "lucide-react";
import { useEditInPlayground } from "./edit-in-playground-hooks";

type EditInPlaygroundButtonProps = unknown;
export const EditInPlaygroundButton: React.FC<
  EditInPlaygroundButtonProps
> = () => {
  const editInPlaground = useEditInPlayground();
  return (
    <IconButton tooltipContent="Edit this preset" onClick={editInPlaground}>
      <SquareArrowOutUpRight size={20} />
    </IconButton>
  );
};
