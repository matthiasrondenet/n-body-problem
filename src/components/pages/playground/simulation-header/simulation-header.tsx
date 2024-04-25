import { Title } from "./title";
import { ActionBar } from "./action-bar";
import { ChangePresetSelector } from "./change-preset-selector";
import { usePresetRoute } from "../hooks/preset-hooks";

type SimulationHeaderProps = {
  index?: number;
  id: string;
};
export const SimulationHeader: React.FC<SimulationHeaderProps> = ({
  index,
  id,
}) => {
  const { isPresetRoute } = usePresetRoute();
  return (
    <div className="flex flex-row flex-wrap items-center justify-between justify-items-center gap-2 md:gap-3">
      {isPresetRoute ? (
        <ChangePresetSelector />
      ) : (
        <span className="flex flex-row items-center justify-items-center gap-2">
          <Title index={index} id={id} />
        </span>
      )}
      <span className="flex flex-row items-center gap-3">
        <ActionBar id={id} />
      </span>
    </div>
  );
};
