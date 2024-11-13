"use client"

import { useCallback, useEffect, useState } from "react"
import { fetchStockData } from "@/app/actions"
import  StockChart  from "@/components/Dashboard/stock-chart"
import { StockMetric } from "@/components/Dashboard/stock-metrics"


export default function Page() {
    const [symbol] = useState("GOOGL")
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const result = await fetchStockData(symbol)
            setData(result)
        } catch (error) {
            console.error("Error fetching stock data:", error)
        }
        setLoading(false)
    }, [symbol])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    if (loading || !data || !data.history) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>
    }

    const { current, previous} = data

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
            <StockChart ticker="GOOGL" />
        </div>
    )
}