"use client";

import { FormEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AppHeaderProps {
    ticker: string;
    setTicker: (ticker: string) => void; // Updates the ticker for fetching data
    setInputTicker: (ticker: string) => void; // Updates the input field's value
    inputTicker: string; // The temporary input field state
    fetchData: (ticker: string) => void;
    isLoading: boolean;
}

export default function AppHeader({
    ticker,
    setTicker,
    setInputTicker,
    inputTicker,
    fetchData,
    isLoading,
}: AppHeaderProps) {
    const { toast } = useToast();

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault(); // Prevent page reload

        if (!inputTicker.trim()) {
            toast({
                title: "Invalid input",
                description: "Please enter a valid ticker symbol.",
                variant: "destructive",
            });
            return;
        }

        // Show a toast notification
        toast({
            title: "Searching...",
            description: `Fetching data for ${inputTicker}`,
        });

        // Update the ticker and fetch data
        setTicker(inputTicker.trim());
        await fetchData(inputTicker.trim());
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 fixed top-0 z-10 bg-opacity-90 backdrop-blur-sm ml-1 w-full">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="" />
                <Separator orientation="vertical" className="h-6" />
            </div>
            
            <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-sm lg:mr-64">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        value={inputTicker}
                        onChange={(e) => setInputTicker(e.target.value)} // Update only the input field's state
                        className="pl-8"
                        disabled={isLoading}
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Search"}
                </Button>
            </form>
        </header>
    );
}
