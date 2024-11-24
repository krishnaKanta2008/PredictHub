import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const StockDetails = ({ ticker }: { ticker: string }) => {
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
        <div>
            {data ? (
                <>
                <h2 className="text-xl font-semibold ml-2 mt-3">{data.company_info.name}</h2>
                    <ScrollArea className="h-[540px] p-2">

                        <p className="text-gray-700 mb-4">{data.company_info.description}</p>
                    </ScrollArea>
                </>
                
               
            ) : (
                <p className="text-center text-gray-600">Enter a stock symbol to fetch details.</p>
            )}
        </div>
    );
};

export default StockDetails;