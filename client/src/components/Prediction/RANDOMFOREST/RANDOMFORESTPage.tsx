import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RANDOMFORESTStockAnalysis from "./RANDOMFORESTStockAnalysis"
import { LineChart, TrendingUp, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface PageProps {
    data: StockData | null;
    loading: boolean;
    ticker: string;
}

interface ResponseData {
    ticker: string;
    latest_price: number;
    predicted_price_next_day: number;
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

const BackendPredictionURL = import.meta.env.VITE_PREDICTION_URL || "http://localhost:5000";

const RANDOMFORESTPage = ({ data, loading, ticker }: PageProps) => {
    const [stockData, setStockData] = useState<ResponseData | null>(null);
    useEffect(() => {
        fetch(`${BackendPredictionURL}/randomforest/${ticker}`)
            .then(response => response.json())
            .then(data => setStockData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [ticker]);
    console.log(data, loading, ticker);
    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1">
                {/* Main content area */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                            Stock Prediction using ARIMA
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 w-full">
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="text-base md:text-lg font-medium flex items-center gap-2">
                                    <LineChart className="w-4 h-4 md:w-5 md:h-5" />
                                    Prediction
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="p-2 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                                    {
                                        stockData ? (
                                            <div className="grid gap-2 text-sm md:text-base">
                                                <p>Stock Symbol: {stockData.ticker}</p>
                                                <p>Latest Price: {stockData.latest_price}</p>
                                                <p>Next Day Predicted Price: {stockData.predicted_price_next_day}</p>
                                            </div>
                                        ) : (
                                            <p>Loading...</p>
                                        )
                                    }
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="text-base md:text-lg font-medium flex items-center gap-2">
                                    <FileText className="w-4 h-4 md:w-5 md:h-5" />
                                    Report
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                                    <div className="w-full space-y-4 md:space-y-6 md:p-4">
                                        <ScrollArea className="h-[300px] md:h-[350px] rounded-md border p-2 md:p-4">
                                            <ScrollArea className="w-[280px] md:w-full">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-sm md:text-base">General Metrics</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <Table>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell className="font-medium text-xs md:text-sm">Mean Squared Error (Regression)</TableCell>
                                                                <TableCell className="text-xs md:text-sm">1.0633</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell className="font-medium text-xs md:text-sm">Accuracy (Classification)</TableCell>
                                                                <TableCell className="text-xs md:text-sm">0.5357</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </CardContent>
                                            </Card>

                                            <Card className="mt-4">
                                                <CardHeader>
                                                    <CardTitle className="text-sm md:text-base">Classification Report</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    
                                                        <div className="min-w-[500px]">
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead className="w-[80px] md:w-[100px] text-xs md:text-sm">Class</TableHead>
                                                                        <TableHead className="text-xs md:text-sm">Precision</TableHead>
                                                                        <TableHead className="text-xs md:text-sm">Recall</TableHead>
                                                                        <TableHead className="text-xs md:text-sm">F1-score</TableHead>
                                                                        <TableHead className="text-xs md:text-sm">Support</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className="font-medium text-xs md:text-sm">0</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.59</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.45</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.51</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">105</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className="font-medium text-xs md:text-sm">1</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.50</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.64</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.56</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">91</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className="font-medium text-xs md:text-sm">Accuracy</TableCell>
                                                                        <TableCell colSpan={3} className="text-xs md:text-sm">0.54</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">196</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className="font-medium text-xs md:text-sm">Macro avg</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.54</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.54</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.53</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">196</TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className="font-medium text-xs md:text-sm">Weighted avg</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.55</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.54</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">0.53</TableCell>
                                                                        <TableCell className="text-xs md:text-sm">196</TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                       
                                                   
                                                </CardContent>
                                            </Card>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                        </ScrollArea>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                {/* Full width bottom section */}
                <Card className="p-4 md:p-6">
                    <div className="w-full flex text-muted-foreground">
                        <RANDOMFORESTStockAnalysis />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default RANDOMFORESTPage

