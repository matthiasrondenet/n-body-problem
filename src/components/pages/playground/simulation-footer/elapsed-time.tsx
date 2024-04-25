import React from "react";
import { Badge } from "@/components/ui/badge";
import { useElapsedTime } from "../hooks/elapsed-time-hooks";
import { timeToHumanReadableFormat } from "@/services/graphical/graphical";

type ElapsedTimeProps = {
  id: string;
  showEstimated?: boolean;
  showElapsedMs?: boolean;
};
export const ElapsedTime: React.FC<ElapsedTimeProps> = ({
  id,
  showEstimated,
  showElapsedMs,
}) => {
  const { elapsed, elapsedEstimatedInRealTime } = useElapsedTime(id);

  return (
    <>
      {/* {timeScaleFactor && (
        <span className="w-32">
          <span className="pr-2">Unit:</span>
          <Badge className="h-5 w-20 px-2">
            <p className="w-full text-center">
              {timeToHumanReadableFormat(timeScaleFactor * 1000)}
            </p>
          </Badge>
        </span>
      )} */}

      {/* <span className="w-32">
        <span className="pr-2">Step:</span>
        <Badge className="h-5 w-20 px-2">
          <p className="w-full text-center">
            {timeToHumanReadableFormat(stepSize * 1000)}
          </p>
        </Badge>
      </span> */}

      {showElapsedMs && (
        <span className="w-56">
          <span className="pr-2">Elapsed:</span>
          <Badge className="h-5 w-36 px-2">
            <p className="w-full text-center">
              {timeToHumanReadableFormat(elapsed)}
            </p>
          </Badge>
        </span>
      )}

      {showEstimated && (
        <span className="w-48">
          <span className="pr-2">Time:</span>
          <Badge className="h-5 w-36 px-2">
            <p className="w-full text-center">
              {timeToHumanReadableFormat(elapsedEstimatedInRealTime)}
            </p>
          </Badge>
        </span>
      )}
    </>
  );
};
