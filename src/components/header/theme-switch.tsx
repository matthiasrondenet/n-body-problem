import { useTheme } from "./theme-provider";
import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "../custom-ui/icon-button";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  /* Update theme-color meta tag
   * when theme is updated */
  useLayoutEffect(() => {
    const themeColor = theme === "dark" ? "#020817" : "#fff";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
  }, [theme]);

  return (
    <IconButton
      tooltipContent={
        theme === "light" ? "Switch to dark themen" : "Switch to ligh theme"
      }
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </IconButton>
  );
};
