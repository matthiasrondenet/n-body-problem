import React from "react";
import { TracingBeam } from "@/components/ui-custom/tracing-beam";
import { Separator } from "@/components/ui/separator";
import { Introduction } from "./introduction";
import { MathematicsNumericalIntegrations } from "./mathematics-numerical-integrations";
import { PhysicsGoverningEquations } from "./physics-governing-equations";
import { PhysicsNBodySystem } from "./physics-n-body-system";
import { Physics2dCoordinates } from "./physics-2d-ccordinates";
import { MathematicsSolversSimulations } from "./mathematics-solvers-simulation";
import { PhysicsCoM } from "./physics-com";

const Home: React.FC = () => {
  return (
    <TracingBeam className="px-6">
      <div className="relative mx-2 pt-4 antialiased">
        <div className="flex w-full flex-row flex-wrap gap-1">
          <Introduction />
          <Separator orientation="horizontal" />
          <PhysicsGoverningEquations />
          <Separator orientation="horizontal" />
          <PhysicsNBodySystem />
          <Separator orientation="horizontal" />
          <Physics2dCoordinates />
          <Separator orientation="horizontal" />
          <MathematicsNumericalIntegrations />
          <Separator orientation="horizontal" />
          <MathematicsSolversSimulations />
          <Separator orientation="horizontal" />
          <PhysicsCoM />
          <Separator orientation="horizontal" />
        </div>
      </div>
    </TracingBeam>
  );
};

export default Home;
