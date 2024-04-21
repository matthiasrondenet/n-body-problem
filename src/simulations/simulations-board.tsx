import { SimulationCard } from "./simulation-card";

export const SimulationsBoard: React.FC = () => {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div className="w-full pb-2">
        <SimulationCard />
      </div>
    </div>
  );
};
