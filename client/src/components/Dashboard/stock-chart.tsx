"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Plot from 'react-plotly.js'
import { Layout, Data } from 'plotly.js'

interface StockChartProps {
    ticker: string
}

export default function StockChart({ ticker }: StockChartProps) {
    const [graphData, setGraphData] = useState<{ data: Data[], layout: Partial<Layout> } | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/fetchStockData/${ticker}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                console.log('Received data:', data) 

                if (Array.isArray(data.history)) {
                    const chartData = {
                        data: [{
                            type: 'candlestick',
                            x: data.history.map((d: { date: string }) => d.date),
                            open: data.history.map((d: { open: number }) => d.open),
                            high: data.history.map((d: { high: number }) => d.high),
                            low: data.history.map((d: { low: number }) => d.low),
                            close: data.history.map((d: { close: number }) => d.close),
                        }],
                        layout: { title: `${ticker} Stock Price History`, xaxis: { title: 'Date' }, yaxis: { title: 'Price' } }
                    } as { data: Data[], layout: Partial<Layout> }
                    setGraphData(chartData)
                } else {
                    throw new Error('Invalid data structure received')
                }
            } catch (error) {
                console.error('Error fetching stock data:', error)
                setError(error instanceof Error ? error.message : 'An unknown error occurred')
            }
        }

        fetchData()
    }, [ticker])

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Stock Price History for {ticker}</CardTitle>
            </CardHeader>
            <CardContent>
                {error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : graphData ? (
                    <Plot
                        data={graphData.data}
                        layout={{
                            ...graphData.layout,
                            autosize: true,
                        }}
                        style={{ width: '100%', height: '400px' }}
                        config={{ responsive: true }}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </CardContent>
        </Card>
    )
}
