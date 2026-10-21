import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.BUILD_BASE ?? (mode === "production" ? "/n-body-problem/" : "/"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    // emit <route>/index.html so GitHub Pages can serve "/presets/"
    dirStyle: "nested",
  },
  ssr: {
    noExternal: ["react-use", "konva", "react-konva", "better-react-mathjax"],
  },
}));
