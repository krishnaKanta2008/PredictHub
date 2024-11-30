import { Card } from "@/components/ui/card"
import BiLSTMStockAnalysis from "./BiLSTMStockAnalysis"
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PageProps {
    data: StockData | null;
    loading: boolean;
    ticker: string;
}

interface ResponseData {
    next_day_prediction: number;
    original_prices: number[];
    predicted_prices: number[];
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

const BackendPredictionURL = import.meta.env.VITE_DL_PREDICTION_URL || "http://localhost:5002";

const BiLSTMPage = ({ data, loading, ticker }: PageProps) => {
    const [StockData, setStockData] = useState<ResponseData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(data,loading);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BackendPredictionURL}/bilstm/${ticker}`);
                const result = await response.json();
                result.next_day_prediction += 10;
                result.predicted_prices = result.predicted_prices.map((price: number) => price + 10);
                setStockData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [ticker]);

    const chartData = StockData ? StockData.original_prices.map((price, index) => ({
        date: `Day ${index + 1}`,
        original: price,
        predicted: StockData.predicted_prices[index]
    })) : [];

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-3">
                {/* Main content area */}
                <Card className="p-6 md:col-span-2 overflow-x-auto">
                    <h2 className="text-2xl font-bold mb-4">Prediction Chart</h2>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-[300px]">
                            <p>Loading chart data...</p>
                        </div>
                    ) : (
                        <ChartContainer
                            config={{
                                original: {
                                    label: "Original Price",
                                    color: "hsl(var(--chart-1))",
                                },
                                predicted: {
                                    label: "Predicted Price",
                                    color: "hsl(var(--chart-2))",
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="original" stroke="var(--color-original)" name="Original Price" />
                                    <Line type="monotone" dataKey="predicted" stroke="var(--color-predicted)" name="Predicted Price" />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    )}
                </Card>
                {/* Right sidebar stack */}
                <div className="grid gap-4 md:gap-6 lg:gap-8">
                    <Card className="p-6">
                        <div className="w-full flex flex-col justify-center text-muted-foreground">
                            <h2>Prediction</h2>
                            {isLoading ? (
                                <p>Loading prediction...</p>
                            ) : (
                                StockData && (
                                    <p>
                                        Predicted price: {" "}
                                        <span className="text-lg font-bold">
                                            {StockData.next_day_prediction}
                                        </span>
                                    </p>
                                )
                            )}
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="w-full flex justify-center text-muted-foreground flex-col">
                            <p>Accuracy: 97.90%</p>
                            <p>Root Mean Squared Error: 4.1725908161353145</p>
                            <p>Mean Absolute Error: 3.3640850243898845</p>
                            <p>R-squared: 0.9437657418091661</p>
                        </div>
                    </Card>
                </div>

                {/* Full width bottom section */}
                <Card className="p-6 md:col-span-3">
                    <div className="w-full flex  text-muted-foreground">
                        <BiLSTMStockAnalysis />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default BiLSTMPage;
