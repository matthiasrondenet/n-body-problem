import { Separator } from "@/components/ui/separator";
import { GithubLink } from "./github-link";
import { Reset } from "./reset";
import { ThemeSwitch } from "./theme-switch";

export const Header: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        N Body Problem
      </h1>
      <div className="ml-auto flex flex-row items-center justify-items-center gap-2">
        <Reset />
        <Separator orientation="vertical" className="h-5" />
        <GithubLink />
        <ThemeSwitch />
      </div>
    </>
  );
};
