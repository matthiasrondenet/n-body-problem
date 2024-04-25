import { Separator } from "@/components/ui/separator";
import { GithubButton } from "./github-button";
import { ThemeSwitch } from "./theme-switch";
import { Nav } from "./nav";
import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center justify-items-center gap-2 md:flex-row md:justify-between">
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          N Body Problem
        </h1>
        <div className="flex flex-col justify-center md:flex-row">
          <Nav />
        </div>
      </div>
      <div className="flex flex-row items-center justify-items-center gap-6 md:gap-4">
        <Separator orientation="vertical" className="h-5" />
        <GithubButton />
        <Separator orientation="vertical" className="h-5" />
        <ThemeSwitch />
      </div>
    </div>
  );
};
