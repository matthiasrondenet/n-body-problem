import { routes } from "./app.tsx";
import "./index.css";
import { ViteReactSSG } from "vite-react-ssg";

export const createRoot = ViteReactSSG({
  routes,
});
