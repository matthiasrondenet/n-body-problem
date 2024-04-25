import { SimulationAutoResized } from "@/components/simulation/simulation-auto-resized";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allPresets } from "@/services/presets/presets";
import { MathJaxContext } from "better-react-mathjax";
import { Formula } from "./formula";
import { SimulationConfig } from "@/services/simulation/simulation-config-types";
import { TooltipText } from "@/components/ui-custom/tooltip-text";
import { useOpenNewPreset } from "./open-preset-link-hooks";

export const Physics2dCoordinates: React.FC = () => {
  const openPresetOnPlayground = useOpenNewPreset();

  const presetConfig = allPresets["Yarn V.I.2.A"];
  const simulationConfig: SimulationConfig = {
    ...presetConfig,
    timeSpeed: 8,
    graphicalConfig: {
      ...presetConfig.graphicalConfig,
      displayBodies: true,
      displayOrbits: false,
      displayAxis: true,
      displayBodiesBodiesAxis: true,
      minimumSizePixels: 8,
    },
  };
  return (
    <MathJaxContext>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>2D coordinates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="w-full md:w-3/5">
              <p>
                As a matter of implementation, we choose a two dimensional
                coordinate system. <br />
                <br />
                For two bodies <Formula inline>i</Formula> and{" "}
                <Formula inline>j</Formula>, with positions (
                <Formula inline>{"\\(x_i\\)"}</Formula>,
                <Formula inline>{"\\(y_i\\)"}</Formula>) and (
                <Formula inline>{"\\(x_j\\)"}</Formula>,
                <Formula inline>{"\\(y_j\\)"}</Formula>) respectively, the
                distance <Formula inline>{"\\(\\mathbf{r_{ij}}\\)"}</Formula>{" "}
                between them is:{" "}
                <Formula inline>
                  {"\\(r_{ij} = \\sqrt{(x_j - x_i)^2 + (y_j - y_i)^2}\\)"}
                </Formula>
                .
              </p>
              <p>
                The unit vector{" "}
                <Formula inline>{"\\(\\hat{\\mathbf{r}}_{ij}\\)"}</Formula>{" "}
                pointing from <Formula inline>i</Formula> to{" "}
                <Formula inline>j</Formula> is:{" "}
                <Formula inline>
                  {
                    "\\(\\hat{\\mathbf{r}}_{ij} = \\frac{\\mathbf{r}_j - \\mathbf{r}_i}{|\\mathbf{r}_j - \\mathbf{r}_i|} = \\frac{(x_j - x_i)\\hat{\\mathbf{i}} + (y_j - y_i)\\hat{\\mathbf{j}}}{\\sqrt{(x_j - x_i)^2 + (y_j - y_i)^2}} \\)"
                  }
                </Formula>{" "}
                where <Formula inline>{"\\(\\hat{\\mathbf{i}}\\)"}</Formula> and{" "}
                <Formula inline>{"\\(\\hat{\\mathbf{j}}\\)"}</Formula> are the
                unit vectors in the x and y directions.
              </p>
            </div>
            <div className="w-full md:w-2/5">
              <TooltipText content="Open simulation preset" asChild={true}>
                <Card className="w-full">
                  <CardContent>
                    <SimulationAutoResized
                      config={simulationConfig}
                      className="ring-teal-600 hover:cursor-pointer hover:ring-2"
                      onClick={() =>
                        openPresetOnPlayground("Yarn V.I.2.A", simulationConfig)
                      }
                    />
                  </CardContent>
                </Card>
              </TooltipText>
            </div>
          </div>
          <p>
            The net force on Body <Formula inline>i</Formula> will be:
            <Formula inline className="p-1 pl-3">
              {`
                  \\(
                  \\begin{cases}
                  \\mathbf{F_{i,x}} = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_i m_j (x_j - x_i)}{ (\\sqrt{(x_j - x_i)^2 + (y_j - y_i)^2})^3} \\\\
                  \\mathbf{F_{i,y}} = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_i m_j (y_j - y_i)}{ (\\sqrt{(x_j - x_i)^2 + (y_j - y_i)^2})^3}
                  \\end{cases}
                  \\)`}
            </Formula>
          </p>
          <p>
            Using Newton's second law:
            <Formula inline className="p-1 pl-3">
              {`
                  \\(
                  \\begin{cases}
                  \\mathbf{F_{i,x}} = m_i a_{i,x} \\\\
                  \\mathbf{F_{i,y}} = m_i a_{i,y}
                  \\end{cases}
                  \\)`}
            </Formula>
          </p>
          <p>
            The second-order differential equation can then be expanded into
            components:
            <Formula inline className="p-1 pl-3">
              {`
                  \\(
                  \\begin{cases}
                  \\frac{d^2 x_i}{dt^2} = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_i m_j (x_j - x_i)}{ (\\sqrt{(x_j - x_i)^2 + (y_j - y_i)^2})^3} \\\\
                  \\frac{d^2 y_i}{dt^2} = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_i m_j (y_j - y_i)}{ (\\sqrt{(x_j - x_i)^2 + (y_j - y_i)^2})^3}
                  \\end{cases}
                  \\)`}
            </Formula>
          </p>
        </CardContent>
      </Card>
    </MathJaxContext>
  );
};
