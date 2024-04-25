import { IconButton } from "../custom-ui/icon-button";
import { Github } from "lucide-react";

export const GithubLink: React.FC = () => {
  return (
    <IconButton tooltipContent="Open project on github" onClick={() => {}}>
      <Github size={20} />
    </IconButton>
  );
};
