import { SolverSelector } from "@/components/common/solver-selector";
import { SimulationAutoResized } from "@/components/simulation/simulation-auto-resized";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allPresets } from "@/services/presets/presets";
import { SolverName, solverNames } from "@/services/solvers/solvers";
import { useState } from "react";
import { StepSizeSlider } from "@/components/common/step-size-slider";
import { StatusType } from "../playground/store/simulations-store";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";
import { oneDayInSeconds } from "@/services/physics/constants";
import { MathJaxContext } from "better-react-mathjax";
import { Formula } from "./formula";
import { useOpenNewPreset } from "./open-preset-link-hooks";
import { TooltipText } from "@/components/ui-custom/tooltip-text";

export const MathematicsSolversSimulations: React.FC = () => {
  const sunEarthJupiter = allPresets["Sun Earth Jupiter"];

  const [solverName, setSolverName] = useState<SolverName>("Euler integration");
  const [stepSize, setStepSize] = useState<number>(oneDayInSeconds * 5);
  const [statusType, setStatusType] = useState<StatusType>("Running");

  const openPresetOnPlayground = useOpenNewPreset();

  const handleStepSizeChange = (s: number) => {
    setStepSize(s);
    setStatusType("Reset");
  };

  const handleSolverNameChange = (s: SolverName) => {
    setSolverName(s);
    setStatusType("Reset");
  };

  const simulationConfig: SimulationConfig = {
    ...sunEarthJupiter,
    stepSize: stepSize,
    timeSpeed: 2,
    framesPerSecond: 20,
    graphicalConfig: {
      ...sunEarthJupiter.graphicalConfig,
      nbOfHistoryPoints: 100,
    },
  };

  return (
    <MathJaxContext>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mathematical solvers</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Numerical solvers are computational algorithms used to find
            approximate solutions to mathematical problems that cannot be solved
            analytically. They approximate the solutions by discretizing the
            problem, allowing us to compute the system's behavior at specific
            points in time or space. <br />
            <br />
          </p>
          <p>Here are four common numerical methods:</p>
          <ul className="list-inside list-disc">
            <li className="p-2">
              <span className="text-teal-600">Euler's Method: </span>
              <br />A simple, first-order method that approximates the solution
              by taking small steps along the curve of the solution.
              <br />
              For each time step Δt:
              <Formula className="p-1 pl-3">
                {`\\(
                  \\mathbf{y}_i(t + \\Delta t) = \\mathbf{y}_i(t) + \\frac{d\\mathbf{y}_i}{dt} \\Delta t
                \\)
                `}
              </Formula>
            </li>
            <li className="p-2">
              <span className="text-teal-600">Midpoint Method: </span> <br />
              A second-order method that estimates the slope at the midpoint of
              the interval to improve accuracy.
              <br />
              For each time step Δt:
              <Formula className="p-1 pl-3">{`
            \\(
              \\begin{cases}
              \\mathbf{y}_i^{\\text{mid}} = \\mathbf{y}_i(t) + \\frac{\\Delta t}{2} \\frac{d\\mathbf{y}_i}{dt}(t) \\\\
              \\mathbf{y}_i(t + \\Delta t) = \\mathbf{y}_i(t) + \\Delta t \\frac{d\\mathbf{y}_i}{dt}(t + \\frac{\\Delta t}{2}, \\mathbf{y}_i^{\\text{mid}})

              \\end{cases}
            \\)
            `}</Formula>
            </li>
            <li className="p-2">
              <span className="text-teal-600">Runge-Kutta Methods: </span>
              <br />
              More sophisticated methods that improve accuracy by considering
              the slope at multiple points within each step. The fourth-order
              Runge-Kutta (RK4) method is particularly popular.
              <br />
              For each time step Δt:
              <Formula className="p-1 pl-3">
                {`
              \\(
                  \\begin{cases}
                  \\mathbf{k}_1 = \\Delta t \\cdot \\mathbf{f}(t, \\mathbf{y}_i) \\\\
                  \\mathbf{k}_2 = \\Delta t \\cdot \\mathbf{f}\\left(t + \\frac{\\Delta t}{2}, \\mathbf{y}_i + \\frac{\\mathbf{k}_1}{2}\\right) \\\\
                  \\mathbf{k}_3 = \\Delta t \\cdot \\mathbf{f}\\left(t + \\frac{\\Delta t}{2}, \\mathbf{y}_i + \\frac{\\mathbf{k}_2}{2}\\right) \\\\
                  \\mathbf{k}_4 = \\Delta t \\cdot \\mathbf{f}(t + \\Delta t, \\mathbf{y}_i + \\mathbf{k}_3) \\\\
                  \\mathbf{y}_i(t + \\Delta t) = \\mathbf{y}_i(t) + \\frac{1}{6} (\\mathbf{k}_1 + 2\\mathbf{k}_2 + 2\\mathbf{k}_3 + \\mathbf{k}_4)
                  \\end{cases}
              \\)
                `}
              </Formula>
            </li>
            <li className="p-2">
              <span className="text-teal-600">
                Gragg-Bulirsch-Stoer (GBS) Algorithm:
              </span>
              <br />
              An adaptive method that uses extrapolation techniques to achieve
              high precision. <br />
              The method begins by applying a lower-order method (like midpoint)
              over a range of step sizes, then uses polynomial extrapolation to
              estimate the solution as if it were calculated with an
              infinitesimally small step size.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Solvers simulations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The choice of numerical method significantly affects the accuracy
            and stability of the simulation. <br />
            <span className="text-teal-600">Euler's method</span> tends to
            accumulate errors quickly because it only considers the slope at the
            current point.
            <br />
            <span className="text-teal-600">The Midpoint method</span> improves
            accuracy by using the slope at the midpoint of each interval,
            reducing some of the cumulative error. However, for highly dynamic
            systems, thoses method are not be sufficient to maintain stability
            and accuracy over long time. This can cause the orbits of celestial
            bodies in the simulation to degrade or become unstable, leading to
            unrealistic behavior such as bodies flying off into space or
            crashing unexpectedly.
            <br />
            <br />
            If you select <span className="text-teal-600">Euler</span> or
            <span className="text-teal-600"> Midpoint method</span>, the
            simulation might look choppy or unnatural. Objects may appear to
            spiral inward or outward incorrectly due to cumulative errors in the
            positions and velocities. Trajectories may drift over time,
            diverging significantly from the expected paths.
            <br />
            <span className="text-teal-600">Runge-Kutta (RK4)</span> provides a
            much better approximation by considering multiple points within each
            time step, significantly reducing the accumulation of errors. the
            trajectories of the celestial bodies in the simulation will be much
            smoother and more accurate The orbits will remain stable over long
            periods, with minimal drift or error.
            <br />
            If you select Runge-Kutta method, you might not see any error unitl
            a large time step (Δt) is used or until a long perdio of time.
            <br />
            <span className="text-teal-600"> Gragg-Bulirsch-Stoer (GBS) </span>
            is highly adaptive, adjusting the step size based on the system's
            behavior. This method ensures that the simulation remains accurate
            over long periods and under complex conditions, though at the cost
            of increased computational resources.
          </p>
          <span className=" flex flex-col justify-between gap-2 md:flex-row">
            <SolverSelector
              label="Solver: "
              className="py-3 text-lg"
              classNameTrigger="text-teal-600"
              value={solverName}
              options={solverNames.filter((x) => x !== "Gragg Bulirsch Stoer")}
              onValueChange={handleSolverNameChange}
            />
            <StepSizeSlider
              value={stepSize}
              min={oneDayInSeconds * 2}
              max={oneDayInSeconds * 40}
              step={oneDayInSeconds}
              onChange={handleStepSizeChange}
              className=" text-lg"
              classNameSlider="bg-teal-600 dark:bg-teal-600"
              label="Time step (Δt):"
              withInput={false}
              withValue
            />
          </span>

          <p className="italic">{simulationConfig.description}</p>
          <div className="flex flex-col items-stretch gap-1 md:flex-row">
            <TooltipText content="Open simulation preset" asChild={true}>
              <Card className="w-full">
                <CardContent className="p-0">
                  <SimulationAutoResized
                    statusType={statusType}
                    config={{
                      ...simulationConfig,
                      solverName: solverName,
                    }}
                    className="ring-teal-600 hover:cursor-pointer hover:ring-2"
                    onClick={() =>
                      openPresetOnPlayground("Sun Earth Jupiter", {
                        ...simulationConfig,
                        solverName: solverName,
                      })
                    }
                  />
                </CardContent>
                <CardFooter className="text-sm italic">{solverName}</CardFooter>
              </Card>
            </TooltipText>
            <TooltipText content="Open simulation preset" asChild={true}>
              <Card className="w-full">
                <CardContent className="p-0">
                  <SimulationAutoResized
                    statusType={statusType}
                    config={{
                      ...simulationConfig,
                      solverName: "Gragg Bulirsch Stoer",
                    }}
                    onClick={() =>
                      openPresetOnPlayground("Sun Earth Jupiter", {
                        ...simulationConfig,
                        solverName: solverName,
                      })
                    }
                  />
                </CardContent>
                <CardFooter className="text-sm italic">
                  Gragg Bulirsch Stoer
                </CardFooter>
              </Card>
            </TooltipText>
          </div>
        </CardContent>
      </Card>
    </MathJaxContext>
  );
};
