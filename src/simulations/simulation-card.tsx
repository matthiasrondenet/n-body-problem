import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SimulationCard: React.FC = () => {
  return (
    <Card className="w-100">
      <CardHeader className="flex justify-between">
        <CardTitle>Simulation name</CardTitle>
        <CardDescription>Blabla</CardDescription>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  );
};
