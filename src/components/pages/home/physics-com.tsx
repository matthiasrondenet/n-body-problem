import { SimulationAutoResized } from "@/components/simulation/simulation-auto-resized";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { masses } from "@/services/physics/constants";
import { allPresets } from "@/services/presets/presets";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";
import { MathJaxContext } from "better-react-mathjax";
import { Formula } from "./formula";
import { TooltipText } from "@/components/ui-custom/tooltip-text";
import { useOpenNewPreset } from "./open-preset-link-hooks";
import { kepler16A, kepler16B, kepler16b } from "@/services/presets/real-world";
import { CustomSlider } from "@/components/ui-custom/custom-slider";
import { useState } from "react";

export const PhysicsCoM: React.FC = () => {
  const preset = allPresets["Kepler 16"];

  const openPresetOnPlayground = useOpenNewPreset();
  const [kepler16AMassFactor, setKepler16AMassFactor] = useState(1.12);

  const simulationConfig: SimulationConfig = {
    ...preset,
    timeSpeed: 200,
    solverName: "Runge Kutta",
    framesPerSecond: 20,
    nbOfSteps: 10_000,
    bodies: [
      {
        ...kepler16A,
        mass: masses["Kepler-16 A"] * kepler16AMassFactor,
      },
      kepler16B,
      kepler16b,
    ],
    graphicalConfig: {
      ...preset.graphicalConfig,
      nbOfHistoryPoints: 100,
      displayOrbits: false,
      displayBodies: true,
      displayAxis: true,
      displayCom: true,
      maximumSizePixels: 20,
      minimumSizePixels: 8,
    },
  };
  return (
    <>
      <MathJaxContext>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Center of mass</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              In a n-body simulation, adjusting for the center of mass (COM)
              position and velocity is crucial for maintaining the stability and
              accuracy of the system.
            </p>
            <ul className="list-inside list-disc">
              <li className="p-2">
                <span className="text-teal-600">
                  Simplification of Motion:{" "}
                </span>
                By tracking the center of mass, we can simplify the analysis of
                the system's overall motion. The motion of the center of mass
                reflects the net movement of the entire system, independent of
                the internal interactions between bodies.
              </li>
              <li className="p-2">
                <span className="text-teal-600">Conservation Laws: </span>
                The center of mass velocity remains constant if no external
                forces act on the system, illustrating the conservation of
                linear momentum. This conservation law is a cornerstone in
                understanding the dynamics of isolated systems.
              </li>
              <li className="p-2">
                <span className="text-teal-600">Reference Point: </span>
                The center of mass serves as a convenient reference point for
                studying relative motions within the system. For instance, in
                celestial mechanics, placing the center of mass at the origin of
                a coordinate system can simplify the equations of motion.
              </li>
              <li className="p-2">
                <span className="text-teal-600"> Stability Analysis: </span>
                The stability of orbits and the overall structure of the system
                can be assessed by analyzing the motion of the center of mass.
                In multi-body systems like galaxies or planetary systems,
                understanding the center of mass motion helps in predicting the
                long-term behavior of the system.
              </li>
            </ul>
            <h4 className="py-2 text-lg text-teal-600">
              The center of mass position
            </h4>
            <p>
              The center of mass position is calculated as the weighted average
              of the positions of all three bodies, based on their masses. This
              adjustment helps in visualizing the system's overall motion and
              can simplify calculations.
              <br />
              The position of the center of mass <Formula inline>R</Formula> in
              an n-body system is given by:
            </p>
            <span className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center">
              <Formula className="w-1/3 pl-3 text-lg">
                {`\\(\\mathbf{R} = \\frac{\\sum_{i=1}^{n} m_i \\mathbf{r}_i}{\\sum_{i=1}^{n} m_i}\\)`}
              </Formula>
              <span className="w-2/3 pl-5 italic">
                Where:
                <ul className="list-inside list-disc">
                  <li>
                    <Formula inline>{"m_i"}</Formula> is the mass of the{" "}
                    <Formula inline>i</Formula>
                    body
                  </li>
                  <li>
                    <Formula inline>{"r_i"}</Formula> is its position vector of
                    the <Formula inline>i</Formula> body
                  </li>
                </ul>
                <br />
              </span>
            </span>
            <p>
              In addition to the center of mass position, the center of mass
              velocity is also a key concept.
            </p>
            <h4 className="py-2 text-lg text-teal-600">
              The velocity of the center of mass
            </h4>
            <p>
              The velocity of the center of mass{" "}
              <Formula inline>{"V_cm"}</Formula> is the rate of change of the
              center of mass position with respect to time and is calculated as:
            </p>
            <span className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center">
              <Formula className="w-1/3 pl-3 text-lg">
                {`\\(\\mathbf{V}_{\\text{cm}} = \\frac{\\sum_{i=1}^{n} m_i \\mathbf{v}_i}{\\sum_{i=1}^{n} m_i}\\)`}
              </Formula>
              <span className="w-2/3 pl-5 italic">
                Where:
                <ul className="list-inside list-disc">
                  <li>
                    <Formula inline>{"m_i"}</Formula> is the mass of the{" "}
                    <Formula inline>i</Formula>
                    body
                  </li>
                  <li>
                    <Formula inline>{"v_i"}</Formula> is the velocity vector of
                    the <Formula inline>i</Formula> body.
                  </li>
                </ul>
                <br />
              </span>
            </span>

            <div className="flex flex-col items-stretch gap-2">
              <p>Simulating barycentric adjustment</p>
              <CustomSlider
                label="Kepler-16 A mass"
                className=" text-lg"
                classNameSlider="bg-teal-600 dark:bg-teal-600"
                min={1}
                max={2}
                step={0.1}
                value={kepler16AMassFactor}
                sliderFunctionName="linear"
                onChange={setKepler16AMassFactor}
                withInput={false}
                withValue
                valueFormatter={(value) => `* ${value.toFixed(2)}`}
              />
            </div>
            <p className="italic">{simulationConfig.description}</p>
            <div className="flex flex-col items-stretch gap-1 md:flex-row">
              <TooltipText content="Open simulation preset" asChild={true}>
                <Card className="w-full">
                  <CardContent className="p-0">
                    <SimulationAutoResized
                      config={{
                        ...simulationConfig,
                        adjustBarycentric: true,
                      }}
                      className="ring-teal-600 hover:cursor-pointer hover:ring-2"
                      onClick={() =>
                        openPresetOnPlayground("Kepler 16", {
                          ...simulationConfig,
                          adjustBarycentric: true,
                        })
                      }
                    />
                  </CardContent>
                  <CardFooter className="text-sm italic">
                    With barycentric adjustment
                  </CardFooter>
                </Card>
              </TooltipText>
              <TooltipText content="Open simulation preset" asChild={true}>
                <Card className="w-full">
                  <CardContent className="p-0">
                    <SimulationAutoResized
                      config={{
                        ...simulationConfig,
                        adjustBarycentric: false,
                      }}
                      className="ring-teal-600 hover:cursor-pointer hover:ring-2"
                      onClick={() =>
                        openPresetOnPlayground("Kepler 16", {
                          ...simulationConfig,
                          adjustBarycentric: false,
                        })
                      }
                    />
                  </CardContent>
                  <CardFooter className="text-sm italic">
                    Without barycentric adjustment
                  </CardFooter>
                </Card>
              </TooltipText>
            </div>
          </CardContent>
        </Card>
      </MathJaxContext>
    </>
  );
};
