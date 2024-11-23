import { StockMetric } from "@/components/Dashboard/StockMetrics"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import StockDetails from "./StockDetails";
import { StockInfo } from "./StockInfo";
import { useEffect, useRef } from 'react';
import TopStocks from "./TopStocks";
import Marquee from "@/components/ui/marquee";


interface PageProps {
    data: StockData | null;
    loading: boolean;
    ticker: string;
}

interface StockData {
    current: {
        high: number;
        open: number;
        close: number;
    };
    previous: {
        high: number;
        open: number;
        close: number;
    };
}

export default function Dashboard({ data, loading, ticker }: PageProps) {
    const marqueeItems = [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
    ]
    if (loading || !data ) {
        return(
            <div className="w-full space-y-4 p-4">
                <div className="overflow-hidden w-full">
                    <Marquee pauseOnHover className="[--duration:20s]">
                        {marqueeItems.map((item, index) => (
                            <Skeleton
                                key={`${item}-${index}`}
                                className="inline-flex items-center justify-center w-40 h-20 p-4 shrink-0"
                            >
                            </Skeleton>
                        ))}
                    </Marquee>
                </div>
               
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Skeleton className="flex items-center gap-2 p-6 h-24" />
                    <Skeleton className="flex items-center gap-2 p-6 h-24" />
                    <Skeleton className="flex items-center gap-2 p-6 h-24" />
                    <Skeleton className="lg:col-span-1 lg:row-span-2 flex items-center gap-2 p-6" />
                    <Skeleton className="col-span-1 sm:col-span-2 lg:col-span-3 p-4 h-[600px]" />
                </div>
            </div>
        )
    }

    const { current, previous } = data

    const webAppTheme = localStorage.getItem('vite-ui-theme');

    const container = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (!container.current) return;

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:${ticker || "GOOGL"}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "${webAppTheme}",
          "style": "1",
          "locale": "en",
          "backgroundColor": "${webAppTheme === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)'}",
          "gridColor": "rgba(201, 218, 248, 0.06)",
          "hide_top_toolbar": true,
          "allow_symbol_change": true,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current.appendChild(script);

        return () => {
            container.current?.removeChild(script);
        };
    }, [ticker, webAppTheme]);


    return (
        <div className="w-full p-4 space-y-4 relative">
            {/* <TopStocks /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1 flex">
                <StockInfo
                    ticker={ticker}
                />
                <StockMetric
                    title="High"
                    value={current.high}
                    change={((current.high - previous.high) / previous.high) * 100}
                    prefix="$"
                />
                <StockMetric
                    title="Open"
                    value={current.open}
                    change={((current.open - previous.open) / previous.open) * 100}
                    prefix="$"
                />
                <StockMetric
                    title="Close"
                    value={current.close}
                    change={((current.close - previous.close) / previous.close) * 100}
                    prefix="$"
                />
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 h-[600px] overflow-hidden">
                    <div ref={container} className="tradingview-widget-container h-full w-full">
                        <div className="tradingview-widget-container__widget w-full"></div>
                    </div>
                </div>
                <Card className="rounded-none">
                    <StockDetails ticker={ticker} />
                </Card>
            </div>
        </div>
    )
}