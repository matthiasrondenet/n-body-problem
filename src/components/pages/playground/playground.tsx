import { SimulationCard, SimulationCardProps } from "./simulation-card";
import { usePresetRoute } from "./hooks/preset-hooks";
import {
  useIsSimulationLoaded,
  usePlaygroundKeys,
  usePresetKey,
} from "./hooks/simulations-hooks";
import { Loader } from "@/components/ui-custom/loader";

const SimulationCardReady: React.FC<SimulationCardProps> = ({
  id,
  ...props
}) => {
  const isSimulationLoaded = useIsSimulationLoaded(id);
  return isSimulationLoaded ? (
    <SimulationCard id={id} {...props} />
  ) : (
    <Loader />
  );
};

const Playground: React.FC = () => {
  const { isPresetRoute } = usePresetRoute();

  const playgroundKeys = usePlaygroundKeys();
  const presetKey = usePresetKey();

  return isPresetRoute ? (
    <div className="w-full flex-1">
      <SimulationCardReady id={presetKey} />
    </div>
  ) : (
    <div className="flex flex-row flex-wrap gap-2">
      {playgroundKeys.map((k, i) => (
        <div key={k} className="w-full flex-1">
          <SimulationCardReady index={i} id={k} />
        </div>
      ))}
    </div>
  );
};

export default Playground;
