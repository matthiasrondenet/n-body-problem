import { TooltipText } from "@/components/ui-custom/tooltip-text";
import { Github } from "lucide-react";

export const GithubButton: React.FC = () => {
  return (
    <TooltipText content={"Open project on github"}>
      <a
        aria-label="Open project on github"
        href="https://github.com/matthiasrondenet/n-body-problem"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={20} />
      </a>
    </TooltipText>
  );
};
