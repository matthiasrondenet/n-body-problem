import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRef } from "react";
import { SimulationHeader } from "./simulation-header/simulation-header";
import React from "react";
import { SimulationContent } from "./simulation-content/simulation-content";
import { SimulationFooter } from "./simulation-footer/simulation-footer";
import { SimulationSettings } from "./simulation-settings/simulation-settings";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/error-fallback";
import useFullscreen from "react-use/lib/useFullscreen";
import { useFullScreen } from "./hooks/fullscreen-state-hooks";

export type SimulationCardProps = {
  index?: number;
  id: string;
};
export const SimulationCard: React.FC<SimulationCardProps> = ({
  index,
  id,
}) => {
  const ref = useRef(null);
  const { isFullScreen, toggleFullScreen } = useFullScreen(id);

  useFullscreen(ref, isFullScreen, {
    onClose: toggleFullScreen,
  });

  return (
    <>
      <Card ref={ref} className="h-full bg-background">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CardHeader>
            <SimulationHeader index={index} id={id} />
          </CardHeader>
          <CardContent>
            <SimulationContent id={id} />
          </CardContent>
          <CardFooter>
            <SimulationFooter id={id} />
          </CardFooter>
          <SimulationSettings id={id} />
        </ErrorBoundary>
      </Card>
    </>
  );
};
