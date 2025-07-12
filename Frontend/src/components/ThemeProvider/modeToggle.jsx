import { useTheme } from "./themeProvider";
import { Button } from "@/components/ui/button";
import { LaptopMinimal, Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        onClick={() => setTheme("light")}
        className="rounded-xl p-1 text-[12px] font-medium w-full"
      >
        <Sun className="h-[0.8rem] w-[0.8rem]" />
        {/* Light */}
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        onClick={() => setTheme("dark")}
        className="rounded-xl p-1 text-[12px] font-medium w-full"
      >
        <Moon className="h-[0.8rem] w-[0.8rem]" />
        {/* Dark */}
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        onClick={() => setTheme("system")}
        className="rounded-xl p-1 text-[12px] font-medium w-full"
      >
        <LaptopMinimal className="h-[0.8rem] w-[0.8rem]" />
        {/* System */}
      </Button>
    </div>
  );
}
