import { routes } from "./app-routes.tsx";
import "./index.css";
import { ViteReactSSG } from "vite-react-ssg";

export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
});
