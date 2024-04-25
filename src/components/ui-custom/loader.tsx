import { Loader2 } from "lucide-react";

export const Loader: React.FC = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <Loader2 className="animate-spin" size={50} />
    </div>
  );
};
