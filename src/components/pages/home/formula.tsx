import { cn } from "@/lib/utils";
import { MathJaxProps, MathJax } from "better-react-mathjax";

export const Formula: React.FC<
  React.PropsWithChildren<MathJaxProps & { className?: string }>
> = ({ className, ...props }) => {
  return (
    <MathJax className={cn("text-teal-600 italic", className)} {...props} />
  );
};
