import { SimulationAutoResized } from "@/components/simulation/simulation-auto-resized";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PeriodicPreset, periodicPresets } from "@/services/presets/periodic";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";
import { useOpenNewPreset } from "./open-preset-link-hooks";
import { TooltipText } from "@/components/ui-custom/tooltip-text";

export const Introduction: React.FC = () => {
  const introductionSimulations: PeriodicPreset[] = [
    "Broucke A1",
    "Broucke A11",
    "Broucke A13",
    "Broucke R7",
    "Butterfly I.2.A",
    "Dragonfly II.6.A",
    "Figure V.1.A",
    "Moth IVa.2.A",
    "Other III",
    "Set One 4",
    "Sheen Loop-ended-triangles",
    "Sheen Ovals-with-flourishes",
  ];

  const openPresetOnPlayground = useOpenNewPreset();

  const initConfig = (presetName: PeriodicPreset): SimulationConfig => ({
    ...periodicPresets[presetName],
    graphicalConfig: {
      ...periodicPresets[presetName].graphicalConfig,
      displayBodies: true,
      displayOrbits: true,
      nbOfHistoryPoints: 3000,
      historyPointsRatio: 0.05,
    },
  });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The three-body problem, or more generally the n-body problem, is a
            classical problem in physics that involves predicting the motion of
            celestial bodies under their mutual gravitational attraction. Unlike
            the two-body problem, which has a closed-form solution, the n-body
            problem is chaotic and requires numerical methods to solve.
          </p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="xxl:grid-cols-6 grid min-h-48 grid-cols-1 gap-1 pb-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {introductionSimulations.map((name) => {
            const config = initConfig(name);
            return (
              <TooltipText
                key={name}
                content="Open simulation preset"
                asChild={false}
              >
                <SimulationAutoResized
                  config={config}
                  className="ring-teal-600 hover:cursor-pointer hover:ring-2"
                  onClick={() => openPresetOnPlayground(name, config)}
                />
              </TooltipText>
            );
          })}
        </CardContent>
        <CardFooter className="text-sm italic">
          Some periodic solutions to three-body system.
        </CardFooter>
      </Card>
    </>
  );
};
