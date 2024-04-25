import { useErrorBoundary } from "react-error-boundary";
import { Button } from "./ui/button";

export const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="flex flex-col items-stretch gap-2">
      <p className="text-red-500">Something went wrong:</p>
      <pre className="text-red-500">{error.message}</pre>
      <Button className="w-24" onClick={resetBoundary}>
        Try again
      </Button>
    </div>
  );
};
