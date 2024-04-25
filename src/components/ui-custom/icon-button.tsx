import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { TooltipText } from "./tooltip-text";

export interface IconButtonProps extends ButtonProps {
  tooltipContent?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ tooltipContent, ...props }, ref) => {
    const wrapper = (c: React.ReactNode) =>
      tooltipContent ? (
        <TooltipText content={tooltipContent}>{c}</TooltipText>
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
