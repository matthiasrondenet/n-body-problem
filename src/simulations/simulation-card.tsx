import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSimulationsStore } from "./simulations-store";

type SimulationCardProps = {
  id: string;
};
export const SimulationCard: React.FC<SimulationCardProps> = ({ id }) => {
  const simulation = useSimulationsStore((state) => state.simulations[id]);

  return (
    <Card className="w-100">
      <CardHeader className="flex justify-between">
        <CardTitle>{simulation.name}</CardTitle>
        <CardDescription>Blabla ({id})</CardDescription>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  );
};
