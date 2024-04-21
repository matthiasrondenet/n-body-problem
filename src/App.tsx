import React from "react";
import {
  Layout,
  LayoutBody,
  LayoutHeader,
} from "./components/custom-ui/layout";
import { ThemeSwitch } from "./components/theme-switch";
import { GithubLink } from "./components/github-link";
import { SimulationsBoard } from "./simulations/simulations-board";

export const App: React.FC = () => {
  return (
    <Layout>
      <LayoutHeader>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          N Body Problem
        </h1>
        <div className="ml-auto flex items-center space-x-4">
          <GithubLink />
          <ThemeSwitch />
        </div>
      </LayoutHeader>
      <LayoutBody className="space-y-4">
        <SimulationsBoard />
      </LayoutBody>
    </Layout>
  );
};
