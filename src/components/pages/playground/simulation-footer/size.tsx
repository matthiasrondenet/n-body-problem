import React from "react";
import { round } from "lodash-es";
import { Badge } from "@/components/ui/badge";
import { useSize } from "../hooks/size-state-hooks";

type SizeProps = {
  id: string;
};
export const Size: React.FC<SizeProps> = ({ id }) => {
  const { width, height } = useSize(id);

  return (
    <>
      {width && height && (
        <span className="w-32">
          <span className="pr-2">Size:</span>
          <Badge className="h-5 w-20 px-2">
            <p className="w-full text-center">
              {round(width)}:{round(height)}
            </p>
          </Badge>
        </span>
      )}
    </>
  );
};
