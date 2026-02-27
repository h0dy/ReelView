import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const DarkMode = () => {
  const [theme, setTheme] = useState(() => {
    // check if user previously chose a theme or default to system
    return localStorage.getItem("theme") || "system";
  });

  const [systemDark, setSystemDark] = useState(
    // check the OS preference
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => {
      setSystemDark(e.matches);
    };

    // listen for live changes to system theme
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    }; // cleanup to avoid memory leaks
  }, []);

  useEffect(() => {
    const actualTheme =
      theme === "system" ? (systemDark ? "dark" : "light") : theme;

    document.documentElement.classList.toggle("dark", actualTheme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme, systemDark]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer ml-3 relative"
        >
          <Sun className="size-4.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-20">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <div className="border-b border-gray-600 dark:border-gray-400" />

        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" className="cursor-pointer">
            Light
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="dark" className="cursor-pointer">
            Dark
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="system" className="cursor-pointer">
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DarkMode;
