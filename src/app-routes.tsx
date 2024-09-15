import React from "react";
import type { RouteRecord } from "vite-react-ssg";

const MainLayout = React.lazy(() => import("./components/layout/main-layout"));
const Home = React.lazy(() => import("@/components/pages/home/home"));
const Playground = React.lazy(
  () => import("@/components/pages/playground/playground")
);

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <MainLayout />,
    entry: "src/main-layout.tsx",
    children: [
      {
        index: true,
        Component: Home,
        entry: "src/components/pages/home/home.tsx",
      },
      {
        path: "playground",
        Component: Playground,
        entry: "src/components/pages/playground/playground.tsx",
      },
      {
        path: "presets/:preset?",
        Component: Playground,
        entry: "src/components/pages/playground/playground.tsx",
      },
      {
        path: "*",
        element: <p>not found</p>,
      },
    ],
  },
];
