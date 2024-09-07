import { NavLink } from "vite-react-ssg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePlaygroundKeys } from "@/components/pages/playground/hooks/simulations-hooks";

export const Nav: React.FC = () => {
  const playgroundKeys = usePlaygroundKeys();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink
            to=""
            className={({ isActive }) =>
              cn(
                navigationMenuTriggerStyle(),
                isActive && "active dark:bg-slate-900 text-teal-600"
              )
            }
          >
            Home
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink
            to="presets"
            className={({ isActive }) =>
              cn(
                navigationMenuTriggerStyle(),
                isActive && "active dark:bg-slate-900 text-teal-600"
              )
            }
          >
            Preset
          </NavLink>
        </NavigationMenuItem>
        {playgroundKeys.length > 0 && (
          <NavigationMenuItem>
            <NavLink
              to="playground"
              className={({ isActive }) =>
                cn(
                  navigationMenuTriggerStyle(),
                  isActive && "active dark:bg-slate-900 text-teal-600"
                )
              }
            >
              Playground ({playgroundKeys.length})
            </NavLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
