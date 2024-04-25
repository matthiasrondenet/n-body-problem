import React from "react";
import {
  Layout,
  LayoutBody,
  LayoutHeader,
} from "@/components/custom-ui/layout";
import { SimulationsBoard } from "@/components/simulations/simulations-board";
import { Header } from "@/components/header/header";

export const App: React.FC = () => {
  return (
    <Layout>
      <LayoutHeader>
        <Header />
      </LayoutHeader>
      <LayoutBody className="space-y-4">
        <SimulationsBoard />
      </LayoutBody>
    </Layout>
  );
};
