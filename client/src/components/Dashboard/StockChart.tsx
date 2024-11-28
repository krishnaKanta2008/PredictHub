import { useEffect, useRef } from 'react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ChartCandlestick } from 'lucide-react';

interface PageProps {
    ticker: string;
}

const StockChart = ({ ticker }: PageProps) => {
    const container = useRef<HTMLDivElement | null>(null);
    const webAppTheme = localStorage.getItem('vite-ui-theme');

    useEffect(() => {
        if (!container.current) return;

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = `{
            "autosize": true,
            "symbol": "NASDAQ:${ticker || 'GOOGL'}",
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
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 h-[600px] overflow-hidden relative">
            <div
                ref={container}
                className="tradingview-widget-container h-full w-full"
            ></div>

            <HoverCard>
                <HoverCardTrigger>
                    <button
                        className="absolute bottom-[40px] left-[11px] bg-muted text-white rounded-full w-12 h-12 flex items-center justify-center z-20"
                    >
                        <ChartCandlestick />
                    </button>
                </HoverCardTrigger>
                <HoverCardContent>
                    <h3 className="font-semibold mb-2">Candlestick Chart</h3>
                    <p className="text-[10px] text-muted-foreground">
                        A candlestick chart is a financial chart used to represent the price movements of a security, derivative, or currency over time. Each candlestick shows four key pieces of information for a specific time period: open, high, low, and close prices. The body of the candlestick indicates the price range between the open and close, while the wicks (or shadows) represent the high and low prices. It's commonly used in technical analysis for identifying patterns and trends.
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
};

export default StockChart;
