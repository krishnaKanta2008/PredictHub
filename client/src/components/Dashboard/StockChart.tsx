import { useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { ImageDown } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface PageProps {
    ticker: string;
}

const StockChart = ({ ticker }: PageProps) => {
    const container = useRef<HTMLDivElement | null>(null);
    const webAppTheme = localStorage.getItem('vite-ui-theme');

    const handleDownloadClick = async () => {
        if (!container.current) {
            alert('Chart not loaded. Please try again later.');
            return;
        }

        try {
            const dataUrl = await toPng(container.current, { cacheBust: true });
            const link = document.createElement('a');
            link.download = `${ticker || 'chart'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to download chart:', error);
            alert('Unable to download chart. Cross-origin content blocking might be the issue.');
        }
    };

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
            
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={handleDownloadClick}
                            aria-label={`Download ${ticker} chart as PNG`}
                            className="absolute bottom-[40px] left-[11px] bg-muted text-white rounded-full w-12 h-12 flex items-center justify-center z-20"
                        >
                            <ImageDown />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>save as png</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default StockChart;
