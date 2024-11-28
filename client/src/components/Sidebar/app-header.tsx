"use client";

import { FormEvent, useState, useEffect, useRef } from "react";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { tickerData } from "@/lib/tickers";

interface AppHeaderProps {
    ticker: string;
    setTicker: (ticker: string) => void;
    setInputTicker: (ticker: string) => void;
    inputTicker: string;
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
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionRef = useRef<HTMLDivElement>(null);

    const validTickers = tickerData.map(t => t.ticker);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getFilteredSuggestions = () => {
        if (!inputTicker.trim()) return [];

        return tickerData.filter(item =>
            item.ticker.toLowerCase().startsWith(inputTicker.toLowerCase()) ||
            item.company_name.toLowerCase().includes(inputTicker.toLowerCase())
        );
    };

    const handleInputChange = (value: string) => {
        setInputTicker(value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (ticker: string) => {
        setInputTicker(ticker);
        setShowSuggestions(false);
    };

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();

        if (!validTickers.includes(inputTicker.toUpperCase())) {
            toast.error("Invalid ticker");
            return;
        }
        console.log(ticker);
        setTicker(inputTicker.trim().toUpperCase());
        await fetchData(inputTicker.trim().toUpperCase());
    };

    const filteredSuggestions = getFilteredSuggestions();

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 fixed top-0 z-10 bg-opacity-90 backdrop-blur-sm ml-[2px] w-full">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="" />
                <Separator orientation="vertical" className="h-6" />
            </div>

            <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-sm lg:mr-64 relative">
                <div className="relative flex-grow">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search ticker..."
                        value={inputTicker}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="pl-8"
                        disabled={isLoading}
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Search"}
                </Button>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div
                        ref={suggestionRef}
                        className="absolute top-full left-0 w-full mt-1 bg-background border rounded-md shadow-lg z-50"
                    >
                        <Command>
                            <CommandList>
                                <CommandGroup>
                                    {filteredSuggestions.map((item) => (
                                        <CommandItem
                                            key={item.ticker}
                                            onSelect={() => handleSuggestionClick(item.ticker)}
                                            className="flex flex-col items-start"
                                        >
                                            <div className="font-medium">{item.ticker}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {item.company_name}
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                )}
            </form>
        </header>
    );
}

