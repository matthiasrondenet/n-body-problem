import { cn } from "@/lib/utils";
import { MathJaxProps, MathJax } from "better-react-mathjax";
import { ClientOnly } from "vite-react-ssg";

export const Formula: React.FC<
  React.PropsWithChildren<MathJaxProps & { className?: string }>
> = ({ className, ...props }) => {
  return (
    <ClientOnly
      fallback={
        <span className={cn("text-teal-600 italic", className)}>{
          props.children
        }</span>
      }
    >
      {() => (
        <MathJax className={cn("text-teal-600 italic", className)} {...props} />
      )}
    </ClientOnly>
  );
};
