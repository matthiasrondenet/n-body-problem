import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MathJaxContext } from "better-react-mathjax";
import { Formula } from "./formula";

export const PhysicsGoverningEquations: React.FC = () => {
  return (
    <MathJaxContext>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Physics governing equations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The motion of each body is governed by Newton's laws of Motion.
            <br />
            <br />
          </p>
          <p>
            Newton's First Law of Motion states that the force of gravitational
            attraction between two bodies is proportional to the product of
            their masses and inversely proportional to the square of the
            distance between them.
          </p>
          <span className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center">
            <Formula className="w-1/3 pl-3 text-xl">
              {"\\(F = G \\frac{m_1 m_2}{r^2}\\)"}
            </Formula>
            <span className="w-2/3 pl-5 italic">
              Where:
              <ul className="list-inside list-disc">
                <li>
                  <Formula inline>F</Formula> is the gravitational force acting
                  between two objects
                </li>
                <li>
                  <Formula inline>m1</Formula> and <Formula inline>m2</Formula>{" "}
                  are the masses of the objects
                </li>
                <li>
                  <Formula inline>r</Formula> is the distance between the
                  centers of their masses
                </li>
                <li>
                  <Formula inline>G</Formula> is the gravitational constant
                </li>
              </ul>
              <br />
            </span>
          </span>
          <p>
            Newton's Second Law of Motion states that the force acting on an
            object is equal to the mass of the object multiplied by its
            acceleration.
          </p>
          <span className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center">
            <Formula className="w-1/3 pl-3 text-xl">{"\\(F = m a\\)"}</Formula>
            <span className="w-2/3 pl-5 italic">
              Where:
              <ul className="list-inside list-disc">
                <li>
                  <Formula inline>F</Formula> is the action force
                </li>
                <li>
                  <Formula inline>m</Formula> is the mass
                </li>
                <li>
                  <Formula inline>a</Formula> the acceleration
                </li>
              </ul>
              <br />
            </span>
          </span>
        </CardContent>
      </Card>
    </MathJaxContext>
  );
};
