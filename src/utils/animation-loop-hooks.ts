import { StatusType } from "@/components/pages/playground/store/simulations-store";
import { useRef, useCallback, useEffect } from "react";
import { useRafLoop } from "react-use";

export interface ControllableLoopArguments {
  time: DOMHighResTimeStamp; // DOMHighResTimeStamp, which indicates the current time (based on the number of milliseconds since time origin).
  counter: number;
  startTime: number;
  elapsed: number;
}
export interface ControllableLoopRequestCallback {
  (loopProps: ControllableLoopArguments): void;
}

const useControllableLoop = ({
  callback,
  throttling,
}: {
  callback: ControllableLoopRequestCallback;
  throttling?: number;
}) => {
  const startTime = useRef<number>(performance.now()); // time when loop first start
  const previous = useRef<number>(); // keep track of previous loop call time
  const counter = useRef<number>(0); // count of each loop call

  const previousRunning = useRef<number>(); // keep track of previous loop call time, keeping only effectives run times
  const counterRunning = useRef<number>(0); // count of each loop call when callback is called (usefull if throttling enabled)
  const elapsedRunning = useRef<number>(0); // total elasped time, keeping only effectives run times

  const loop = (time: number) => {
    counter.current += 1;

    const interval = time - (previous.current ?? time);
    const intervalRunning = time - (previousRunning.current ?? time);

    elapsedRunning.current += intervalRunning;

    previous.current = time;
    previousRunning.current = time;

    if (throttling && interval < throttling) {
      previous.current -= interval % throttling;
      return;
    }

    counterRunning.current += 1;

    try {
      callback({
        time: time,
        counter: counterRunning.current,
        startTime: startTime.current,
        elapsed: elapsedRunning.current,
      });
    } catch (error) {
      console.error("Error in animation loop callback:", error);
      loopStop();
    }
  };

  const [loopStop, loopStart, isActive] = useRafLoop(loop, true);

  const play = useCallback(() => {
    if (!isActive()) {
      loopStart();
    }
  }, [loopStart, isActive]);

  const pause = useCallback(() => {
    loopStop();
    previousRunning.current = undefined;
  }, [loopStop]);

  const reset = useCallback(() => {
    loopStop();
    startTime.current = performance.now();
    counter.current = 0;
    previous.current = undefined;
    previousRunning.current = undefined;
    elapsedRunning.current = 0;
    counterRunning.current = 0;
    loopStart();
  }, [loopStart, loopStop]);

  return {
    pause,
    play,
    reset,
  };
};

/**
 * throttle animation loop to 30 fps by default
 */
export const defaultFrameRates = 30;

export const useSimulationLoop = ({
  statusType = "Running",
  frameRates = defaultFrameRates,
  onStatusTypeChanged,
  callback,
}: {
  statusType?: StatusType;
  frameRates?: number;
  onStatusTypeChanged?: (statusType: StatusType) => void;
  callback: ControllableLoopRequestCallback;
}) => {
  const { pause, play, reset } = useControllableLoop({
    callback: callback,
    throttling: 1000 / frameRates,
  });

  useEffect(() => {
    if (statusType === "Running") play();
    if (statusType === "Paused" || statusType === "Ended") pause();
    if (statusType === "Reset") {
      reset();
      onStatusTypeChanged?.("Running");
    }
  }, [statusType, pause, play, reset, onStatusTypeChanged]);
};
