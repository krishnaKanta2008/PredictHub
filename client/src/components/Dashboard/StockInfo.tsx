import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";
import React from "react";

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


    return (
        <Card>
            <CardContent className="mb-[-20px] mt-[20px]">
                <div className="flex items-center gap-2">
                    {data ? (
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
                                    <br/>
                                        Volume: {Intl.NumberFormat().format(data.current.volume)}
                                    </>
                                )}
                            </p>
                            
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">Enter a stock symbol to fetch details.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}