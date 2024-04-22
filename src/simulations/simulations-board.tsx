import { SimulationCard } from "./simulation-card";
import { useSimulationsStore } from "./simulations-store";

export const SimulationsBoard: React.FC = () => {
  const simulations = useSimulationsStore((state) => state.simulations);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Object.keys(simulations).map((k) => (
        <div key={k} className="flex-1 w-full basis-1/3">
          <SimulationCard id={k} />
        </div>
      ))}
    </div>
  );
};
