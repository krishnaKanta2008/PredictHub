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
    setTicker: (ticker: string) => void;
    fetchData: (ticker: string) => void;
    isLoading: boolean;
}

export default function AppHeader({ ticker, setTicker, fetchData, isLoading }: AppHeaderProps) {
    const { toast } = useToast();

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();  // Ensure no page reload on form submit

        // Show a toast notification that we are searching for the stock data
        toast({
            title: "Searching...",
            description: `Fetching data for ${ticker}`,
        });

        // Call the fetchData function
        await fetchData(ticker);
    };

    return (
        <header className="flex h-16 shrink-0 items-center gap-4 border-b px-4">
            <SidebarTrigger className="-ml-2" />
            <Separator orientation="vertical" className="h-6" />
            <form onSubmit={handleSearch} className="ml-auto flex items-center gap-2 max-w-sm">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
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
