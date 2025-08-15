import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/Theme/theme-provider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    // Toggle between light and dark
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            variant="ghost"
            className="rounded-full"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <Sun
                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all 
                   dark:-rotate-90 dark:scale-0"
            />
            <Moon
                className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all 
                   dark:rotate-0 dark:scale-100"
            />
        </Button>
    );
}
