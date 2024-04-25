import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MathJaxContext } from "better-react-mathjax";
import { Formula } from "./formula";

export const PhysicsNBodySystem: React.FC = () => {
  return (
    <MathJaxContext>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Applying to a N Body System</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            In the context of a system with n bodies, each exerting
            gravitational forces on each other, the gravitational force exerted
            on body <Formula inline>i</Formula> by body{" "}
            <Formula inline>j</Formula> is given by:
          </p>
          <span className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center">
            <Formula className="w-1/3 pl-3 text-xl">
              {`\\(
                \\mathbf{F}_{ij} = G \\frac{m_i m_j}{|\\mathbf{r}_j - \\mathbf{r}_i|^2} \\hat{\\mathbf{r}}_{ij}
                \\)`}
            </Formula>
            <span className="w-2/3 pb-5 pl-5 italic">
              Where:
              <ul className="list-inside list-disc">
                <li>
                  <Formula inline>G</Formula> is the gravitational constant
                </li>
                <li>
                  <Formula inline>{"\\(m_i\\)"}</Formula> and{" "}
                  <Formula inline>{"\\(m_j\\)"}</Formula> are the masses of body{" "}
                  <Formula inline>{"\\(i\\)"}</Formula> and{" "}
                  <Formula inline>{"\\(j\\)"}</Formula>
                </li>
                <li>
                  <Formula inline>{"\\(r_i\\)"}</Formula> and{" "}
                  <Formula inline>{"\\(r_j\\)"}</Formula> are the masses of body{" "}
                  <Formula inline>{"\\(i\\)"}</Formula> and{" "}
                  <Formula inline>{"\\(j\\)"}</Formula>
                </li>
                <li>
                  <Formula inline>{"\\(\\hat{\\mathbf{r}}_{ij}\\)"}</Formula> is
                  the unit vector pointing from body <Formula inline>i</Formula>{" "}
                  to body <Formula inline>j</Formula> defined as{" "}
                  <Formula inline>
                    {
                      "\\(\\hat{\\mathbf{r}}_{ij} = \\frac{\\mathbf{r}_j - \\mathbf{r}_i}{|\\mathbf{r}_j - \\mathbf{r}_i|} \\)"
                    }
                  </Formula>{" "}
                  (it is obtained by dividing the vector{" "}
                  <Formula inline>{"\\(\\mathbf{r_{ij}}\\)"}</Formula> by its
                  magnitude distance <Formula inline>{"\\(r_{ij}\\)"}</Formula>)
                </li>
              </ul>
            </span>
          </span>
          <p>
            So, the net force on a body <Formula inline>i</Formula> will be:
            <Formula inline className="p-1 pl-3 text-xl">
              {`\\(
                \\mathbf{F}_i = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n \\mathbf{F}_{ij} = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_i m_j}{|\\mathbf{r}_j - \\mathbf{r}_i|^2} \\hat{\\mathbf{r}}_{ij}
                \\)`}
            </Formula>
          </p>
          <p>
            and this net force causes an acceleration of body{" "}
            <Formula inline>i</Formula>:
            <Formula inline className="p-1 pl-3 text-xl">
              {"\\(\\mathbf{F}_i = m_i \\mathbf{a}_i\\)"}
            </Formula>
          </p>
          <p>
            Giving the equation of motion for Body <Formula inline>i</Formula>{" "}
            in an n-Body System:
            <Formula inline className="p-1 pl-3 text-xl">
              {`\\(
                  m_i \\mathbf{a}_i = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_i m_j}{|\\mathbf{r}_j - \\mathbf{r}_i|^2} \\hat{\\mathbf{r}}_{ij}
                \\)`}
            </Formula>
            or equivalently
            <Formula inline className="p-1 pl-3 text-xl">
              {`\\(
                \\mathbf{a}_i = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_j}{|\\mathbf{r}_j - \\mathbf{r}_i|^2} \\hat{\\mathbf{r}}_{ij}
                \\)`}
            </Formula>
          </p>
          <p>
            And since acceleration is the second derivative of position with
            respect to time, we can write the second order differential equation
            for the motion of body <Formula inline>i</Formula> in an n-body
            system:
            <Formula className="p-1 pl-3 text-xl">
              {`\\(
                \\mathbf{a}_i = \\frac{d^2 \\mathbf{r}_i}{dt^2} = \\sum_{\\substack{j=1 \\\\ j \\neq i}}^n G \\frac{m_j}{|\\mathbf{r}_j - \\mathbf{r}_i|^2} \\hat{\\mathbf{r}}_{ij}
                \\)`}
            </Formula>
          </p>
        </CardContent>
      </Card>
    </MathJaxContext>
  );
};
