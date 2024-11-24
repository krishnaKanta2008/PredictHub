import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "sonner";
import { CirclePlus } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const StockInfo: React.FC<{ ticker: string }> = ({ ticker }) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!ticker) return;
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/fetchStockData/${ticker}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
        fetchData();
    }, [ticker]);

    const [addingTicker, setAddingTicker] = useState<string | null>(null);

    const addToWatchlist = async (ticker: string) => {
        const username = localStorage.getItem('predicthub_username');
        if (!username) {
            toast.error('Please login first');
            return;
        }

        setAddingTicker(ticker);
        try {
            const response = await fetch(`${BACKEND_URL}/watchlist/add/${username}/${ticker}`, {
                method: 'POST'
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to watchlist');
            }

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.warning(data.message);
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to add to watchlist');
            console.error('Error adding to watchlist:', err);
        } finally {
            setAddingTicker(null);
        }
    };


    return (
        <Card>
            <CardContent className="mb-[-20px] mt-[20px]">
                <div className="flex items-center gap-2">
                    {data ? (
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 -mt-4 items-center justify-center rounded-full bg-muted">
                                <button
                                    onClick={() => addToWatchlist(ticker)}
                                    aria-label={`Remove ${ticker} from watchlist`}
                                   
                                >
                                    <CirclePlus className={`w-5 h-5 ${addingTicker === ticker ? 'animate-pulse' : ''}`} />
                                </button>
                            </div>
                            <div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold">
                                        {data.company_info.name}
                                    </h3>
                                </div>
                                <p className="text-white-800 font-small mb-4 text-sm">
                                    Market Cap: ${Intl.NumberFormat().format(Number(data.company_info.market_cap))}
                                    {data.current && (
                                        <>
                                            <br />
                                            Volume: {Intl.NumberFormat().format(data.current.volume)}
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">Enter a stock symbol to fetch details.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}