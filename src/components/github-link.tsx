import { Button } from "./ui/button";
import { Github } from "lucide-react";

export const GithubLink: React.FC = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      onClick={() => {}}
    >
      <Github />
    </Button>
  );
};
