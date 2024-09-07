import { useTheme } from "./theme-provider";
import { useIsomorphicLayoutEffect } from "react-use";
import { Moon, Sun } from "lucide-react";
import { TooltipText } from "@/components/ui-custom/tooltip-text";
import { Switch } from "@/components/ui/switch";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  /* Update theme-color meta tag
   * when theme is updated */
  useIsomorphicLayoutEffect(() => {
    const themeColor = theme === "dark" ? "#020817" : "#fff";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
  }, [theme]);

  return (
    <TooltipText
      content={
        theme === "light" ? "Switch to dark themen" : "Switch to ligh theme"
      }
    >
      <div className="flex flex-row items-center justify-items-center gap-2">
        <Moon size={20} />
        <Switch
          checked={theme === "light"}
          onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <Sun size={20} />
      </div>
    </TooltipText>
  );
};
