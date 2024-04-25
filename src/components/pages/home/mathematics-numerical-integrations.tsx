import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Formula } from "./formula";
import { MathJaxContext } from "better-react-mathjax";

export const MathematicsNumericalIntegrations: React.FC = () => {
  return (
    <MathJaxContext>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mathematical integration</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Since the n-body problem has no general analytical solution, we use
            numerical methods to approximate the equations.
          </p>
          <p>
            The second-order differential equations we have defined previously:{" "}
          </p>
          <span className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center">
            <Formula inline className="p-1 pl-3 text-xl">
              {`\\(
                \\frac{d^2 \\mathbf{r}_i}{dt^2} = \\mathbf{a}_i
                \\)`}
            </Formula>
            <span className="w-2/3 pl-5 italic">
              Where:
              <ul className="list-inside list-disc">
                <li>
                  <Formula inline>
                    {
                      "\\(\\mathbf{r}_i({t}) = ( \\mathbf{x}_i({t}),\\mathbf{y}_i({t}) ) \\)"
                    }
                  </Formula>{" "}
                  is the position vector of the body <Formula inline>i</Formula>{" "}
                  at time <Formula inline>t</Formula>.
                </li>
                <li>
                  <Formula inline>{"\\(\\mathbf{a}_i\\)"}</Formula> is the
                  acceleration vector of the body <Formula inline>i</Formula>
                </li>
              </ul>
              <br />
            </span>
          </span>

          <p>
            To use numerical integration methods, we express the equations as
            first-order differential equations.
          </p>
          <p>
            In order to transform the second-order differential equation into
            first-order form, we introduce a new variable: the velocity{" "}
            <Formula inline>{"\\(\\mathbf{v}_i\\)"}</Formula> of body{" "}
            <Formula inline>i</Formula>. <br />
            The velocity <Formula inline>{`\\(\\mathbf{v}_i(t)\\)`}</Formula> is
            the first derivative of the position{" "}
            <Formula inline>{`\\(\\mathbf{r}_i(t)\\)`}</Formula> with respect to
            time:{" "}
            <Formula inline>
              {`\\(\\mathbf{v}_i(t) = \\frac{d \\mathbf{r}_i(t)}{dt}\\)`}
            </Formula>
          </p>
          <p>
            Now, we rewrite the second-order equation as two coupled first-order
            equations. These equations will express: the rate of change of
            position (which is just the velocity) and the rate of change of
            velocity (which is the acceleration). <br />
            For each body <Formula inline>i</Formula>, we have:
            <Formula inline className="p-1 pl-3">
              {`\\(
              \\begin{pmatrix} 
                \\frac{d \\mathbf{r}_i(t)}{dt} = \\mathbf{v}_i(t) \\\\
                \\frac{d \\mathbf{v}_i(t)}{dt} = \\mathbf{a}_i(t)
              \\end{pmatrix}
              \\)`}
            </Formula>
          </p>
          <h4 className="py-2 text-lg text-teal-600">State vector</h4>
          <p>
            The state vector is a way to represent the complete state of a
            system at a given time. For an n-body system, the state vector
            includes the positions and velocities of all the bodies.
          </p>
          <p>
            For a body <Formula inline>i</Formula>, with position vectors
            <Formula inline className="p-1 pl-3">
              {`\\(r_i = (x_i,y_i)\\)`}
            </Formula>{" "}
            and velocity vectors
            <Formula inline className="p-1 pl-3">
              {`\\(v_i = (v_{i,x},v_{i,y})\\)`}
            </Formula>{" "}
            <br />
            The state vector will be:
            <Formula inline className="p-1 pl-3">
              {`\\(
              \\mathbf{y}_i = 
              \\begin{pmatrix} 
                x_i \\\\ 
                y_i \\\\ 
                v_{i,x} \\\\ 
                v_{i,y} 
              \\end{pmatrix}
              \\)`}
            </Formula>
          </p>
          <p>
            And then the first-order differential equations are:
            <Formula className="p-1 pl-3">
              {`\\(
                \\frac{d}{dt}
                \\begin{pmatrix} 
                  x_i \\\\ 
                  y_i \\\\ 
                  v_{i,x} \\\\ 
                  v_{i,y} 
                \\end{pmatrix} = 
                \\begin{pmatrix} 
                  v_{i,x} \\\\ 
                  v_{i,y} \\\\ 
                  \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_j (x_j - x_i)}{r_{ij}^3} \\\\ 
                  \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_j (y_j - y_i)}{r_{ij}^3} \\\\
                  \\end{pmatrix}
                \\)
                `}
            </Formula>
            <br />
            This system of equations can now be solved using numerical
            integration techniques.
          </p>
        </CardContent>
      </Card>
    </MathJaxContext>
  );
};
