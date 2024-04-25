import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type TooltipTextProps = {
  content: string;
  asChild?: boolean;
};
export const TooltipText: React.FC<
  React.PropsWithChildren<TooltipTextProps>
> = ({ content, asChild = true, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
