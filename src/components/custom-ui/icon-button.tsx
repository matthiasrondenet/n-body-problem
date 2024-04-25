import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface IconButtonProps extends ButtonProps {
  tooltipContent?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ tooltipContent, ...props }, ref) => {
    const wrapper = (c: React.ReactNode) =>
      tooltipContent ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{c}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltipContent}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>{c}</>
      );

    const button = (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        className="rounded-full"
        {...props}
      >
        {props.children}
      </Button>
    );

    return wrapper(button);
  }
);
