// import React from "react";
// import ReactDOM from "react-dom/client";
import { routes } from "./app.tsx";
import "./index.css";
// import { ThemeProvider } from "@/components/header/theme-provider.tsx";
import { ViteReactSSG } from "vite-react-ssg";

export const createRoot = ViteReactSSG({
  routes,
});

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>
// );
