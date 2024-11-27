import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ARIMAStockAnalysis from "./ARIMAStockAnalysis"
import { LineChart, TrendingUp, FileText } from 'lucide-react'

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

const ARIMAPage = ({ data, loading, ticker }: PageProps) => {
    console.log(data,loading,ticker);
  return (
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
          <div className="grid gap-4 ">
              <Card className="w-full md:col-span-3">
                  <CardHeader>
                      <CardTitle className="text-2xl font-bold flex items-center gap-2">
                          <TrendingUp className="w-6 h-6" />
                          Stock Prediction using ARIMA
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 p-6 w-full">
                      <Card className="w-full">
                          <CardHeader>
                              <CardTitle className="text-lg font-medium flex items-center gap-2">
                                  <LineChart className="w-5 h-5" />
                                  Prediction
                              </CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="p-2 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                                  Prediction chart will be displayed here
                              </div>
                          </CardContent>
                      </Card>
                      <Card className="w-full">
                          <CardHeader>
                              <CardTitle className="text-lg font-medium flex items-center gap-2">
                                  <FileText className="w-5 h-5" />
                                  Report
                              </CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="p-2 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                                  <div>
                                      <p>Evaluation Metrics:</p>
                                      <p>Mean Absolute Error (MAE): 11.43</p>
                                      <p>Root Mean Squared Error (RMSE): 13.49</p>
                                      <p>Mean Absolute Percentage Error (MAPE): 7.86%</p>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  </CardContent>
              </Card>

              {/* Full width bottom section */}
              <Card className="p-6 md:col-span-3">
                  <div className="w-full flex  text-muted-foreground">
                      <ARIMAStockAnalysis/>
                  </div>
              </Card>
          </div>
      </div>
  )
}

export default ARIMAPage