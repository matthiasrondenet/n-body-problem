import React, { useEffect } from "react";
import { useMeasure } from "react-use";
import { Loader } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Simulation, SimulationProps } from "./simulation";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../error-fallback";

type SimulationAutoResizedProps = Omit<SimulationProps, "width" | "height"> & {
  id?: string;
  withBorder?: boolean;
  className?: string;
  onResized?: (arg: { width: number; height: number }) => void;
  onClick?: () => void;
};

export const SimulationAutoResized: React.FC<SimulationAutoResizedProps> = ({
  withBorder = true,
  className,
  onResized,
  onClick,
  ...props
}) => {
  const [measureRef, { width: w, height: h }] = useMeasure<HTMLDivElement>();

  const width = Math.round(w);
  const height = Math.round(h);

  useEffect(() => {
    if (width > 0 && height > 0) onResized?.({ width, height });
  }, [onResized, width, height]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AspectRatio ratio={3}>
        <div
          onClick={() => onClick?.()}
          ref={measureRef}
          className={cn("h-full", className, withBorder && "rounded-lg border")}
        >
          {width > 0 && height > 0 ? (
            <Simulation width={width} height={height} {...props} />
          ) : (
            <div className="flex h-full flex-row items-center justify-center self-center">
              <Loader />
            </div>
          )}
        </div>
      </AspectRatio>
    </ErrorBoundary>
  );
};
