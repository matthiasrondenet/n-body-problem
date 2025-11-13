import type { RouteRecord } from "vite-react-ssg";
import { presetKeys } from "@/services/presets/presets";

export const routes: RouteRecord[] = [
  {
    path: "/",
    lazy: async () => {
      const module = await import("./components/layout/main-layout");
      return { Component: module.default };
    },
    entry: "src/components/layout/main-layout.tsx",
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import("@/components/pages/home/home");
          return { Component: module.default };
        },
        entry: "src/components/pages/home/home.tsx",
      },
      {
        path: "playground",
        lazy: async () => {
          const module = await import("@/components/pages/playground/playground");
          return { Component: module.default };
        },
        entry: "src/components/pages/playground/playground.tsx",
      },
      {
        path: "presets/:preset?",
        lazy: async () => {
          const module = await import("@/components/pages/playground/playground");
          return { Component: module.default };
        },
        entry: "src/components/pages/playground/playground.tsx",
        getStaticPaths: () => {
          return Object.values(presetKeys).map((key) => `presets/${key}`);
        },
      },
      {
        path: "*",
        element: <p>not found</p>,
      },
    ],
  },
];
