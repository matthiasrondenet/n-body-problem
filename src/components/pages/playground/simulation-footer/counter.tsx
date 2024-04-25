import React from "react";
import { Badge } from "@/components/ui/badge";
import { useLoopState } from "../hooks/loop-state-hooks";

type CounterProps = {
  id: string;
};
export const Counter: React.FC<CounterProps> = ({ id }) => {
  const { counter } = useLoopState(id);
  return (
    <span>
      <span className="pr-2">Counter:</span>
      <Badge className="h-5 w-20 px-2">
        <p className="w-full text-center">{counter}</p>
      </Badge>
    </span>
  );
};
