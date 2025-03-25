import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.BUILD_BASE ?? (mode === "production" ? "/n-body-problem/" : "/"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ["react-use", "konva", "react-konva", "better-react-mathjax"],
  },
}));
