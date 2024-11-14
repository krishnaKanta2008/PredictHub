"use client"

import  StockChart  from "@/components/Dashboard/stock-chart"
import { StockMetric } from "@/components/Dashboard/stock-metrics"
import PredictionCard from "./Prediction-card";

interface PageProps {
    data: any;
    loading: boolean;
    ticker: string;
}

export default function Page({ data, loading, ticker }: PageProps) {
    if (loading || !data || !data.history) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>
    }

    const { current, previous } = data

    return (
        <div className="container h-screen mx-auto p-4">
            <div className="mb-8">
            </div>
            <div className="mb-8 grid gap-4 md:grid-cols-3">
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
            </div>
            <StockChart ticker={ticker} />
            <PredictionCard ticker={ticker} />
        </div>
    )
}