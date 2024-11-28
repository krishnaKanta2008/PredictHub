import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { CodeFileDisplay } from "@/components/CodeFileDisplay/CodeFileDisplay"

export default function ARIMAStockAnalysis() {
    return (
        <Card className="w-full border-none p-4">
            <h2 className="text-2xl font-bold mb-4">Stock Analysis Workflow</h2>
            <div className="overflow-x-auto">
                <CodeFileDisplay
                    filename="arima"
                    file="https://colab.research.google.com/drive/14ejZ6VLvxdUIVAonkyetwxXyAIlqsfKa?usp=sharing"
                />
            </div>
            <p className="text-sm mt-5">A comprehensive guide to analyzing stock data using ARIMA model</p>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>1. Fetch Stock Data</AccordionTrigger>
                    <AccordionContent>
                        <div className="overflow-x-auto">
                            <pre className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-md whitespace-pre-wrap break-words">
                                <code>{`def fetch_stock_data(ticker, start_date, end_date):
    stock_data = yf.download(ticker, start=start_date, end=end_date)
    return stock_data['Close']`}</code>
                            </pre>
                        </div>
                        <p className="mt-2"><strong>Purpose:</strong> Downloads historical stock data for a specific ticker using the <code>yfinance</code> library.</p>
                        <p><strong>Inputs:</strong></p>
                        <ul className="list-disc list-inside">
                            <li><code>ticker</code>: Stock symbol (e.g., "AAPL" for Apple).</li>
                            <li><code>start_date</code>, <code>end_date</code>: Date range for fetching data.</li>
                        </ul>
                        <p><strong>Output:</strong> The closing prices of the stock within the specified date range.</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger>2. Plot the Time Series</AccordionTrigger>
                    <AccordionContent>
                        <div className="overflow-x-auto">
                            <pre className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-md whitespace-pre-wrap break-words">
                                <code>{`def plot_time_series(data, title):
    plt.figure(figsize=(10, 6))
    plt.plot(data, label='Stock Prices')
    plt.title(title)
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.legend()
    plt.show()`}</code>
                            </pre>
                        </div>
                        <p className="mt-2"><strong>Purpose:</strong> Visualizes the stock price time series to understand trends and patterns.</p>
                        <p><strong>Inputs:</strong></p>
                        <ul className="list-disc list-inside">
                            <li><code>data</code>: Time series of stock prices.</li>
                            <li><code>title</code>: Title of the plot.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger>3. Automatically Determine ARIMA Parameters</AccordionTrigger>
                    <AccordionContent>
                        <div className="overflow-x-auto">
                            <pre className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-md whitespace-pre-wrap break-words">
                                <code>{`def determine_arima_params(data):
    model = auto_arima(data, seasonal=False, trace=True, error_action='ignore', suppress_warnings=True)
    return model.order`}</code>
                            </pre>
                        </div>
                        <p className="mt-2"><strong>Purpose:</strong> Uses <code>pmdarima</code>'s <code>auto_arima</code> function to find optimal ARIMA parameters (<code>p</code>, <code>d</code>, <code>q</code>) based on the input data.</p>
                        <ul className="list-disc list-inside">
                            <li><code>p</code>: Number of lag observations in the model (AR terms).</li>
                            <li><code>d</code>: Number of times the data needs differencing to make it stationary.</li>
                            <li><code>q</code>: Number of lagged forecast errors (MA terms).</li>
                        </ul>
                        <p><strong>Output:</strong> The optimal <code>(p, d, q)</code> values.</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger>4. Fit ARIMA Model</AccordionTrigger>
                    <AccordionContent>
                        <div className="overflow-x-auto">
                            <pre className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-md whitespace-pre-wrap break-words">
                                <code>{`def fit_arima_model(data, order):
    model = ARIMA(data, order=order)
    fitted_model = model.fit()
    return fitted_model`}</code>
                            </pre>
                        </div>
                        <p className="mt-2"><strong>Purpose:</strong> Fits an ARIMA model with the determined <code>(p, d, q)</code> values.</p>
                        <p><strong>Inputs:</strong></p>
                        <ul className="list-disc list-inside">
                            <li><code>data</code>: Stock price time series.</li>
                            <li><code>order</code>: Tuple of <code>(p, d, q)</code> parameters.</li>
                        </ul>
                        <p><strong>Output:</strong> A fitted ARIMA model.</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                    <AccordionTrigger>5. Forecast Future Prices</AccordionTrigger>
                    <AccordionContent>
                        <div className="overflow-x-auto">
                            <pre className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-md whitespace-pre-wrap break-words">
                                <code>{`def forecast_prices(model, steps):
    forecast = model.forecast(steps=steps)
    return forecast`}</code>
                            </pre>
                        </div>
                        <p className="mt-2"><strong>Purpose:</strong> Generates predictions for the next <code>steps</code> periods using the fitted ARIMA model.</p>
                        <p><strong>Inputs:</strong></p>
                        <ul className="list-disc list-inside">
                            <li><code>model</code>: The fitted ARIMA model.</li>
                            <li><code>steps</code>: Number of future periods to forecast.</li>
                        </ul>
                        <p><strong>Output:</strong> Forecasted values.</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                    <AccordionTrigger>6. Evaluate the Forecast</AccordionTrigger>
                    <AccordionContent>
                        <div className="overflow-x-auto">
                            <pre className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-md whitespace-pre-wrap break-words">
                                <code>{`def evaluate_forecast(actual, predicted):
    mae = mean_absolute_error(actual, predicted)
    rmse = np.sqrt(mean_squared_error(actual, predicted))
    mape = np.mean(np.abs((actual - predicted) / actual)) * 100
    return {"MAE": mae, "RMSE": rmse, "MAPE": mape}`}</code>
                            </pre>
                        </div>
                        <p className="mt-2"><strong>Purpose:</strong> Evaluates the model's forecast performance using error metrics:</p>
                        <ul className="list-disc list-inside">
                            <li><strong>MAE:</strong> Average magnitude of errors.</li>
                            <li><strong>RMSE:</strong> Gives higher weight to larger errors.</li>
                            <li><strong>MAPE:</strong> Percentage error.</li>
                        </ul>
                        <p><strong>Inputs:</strong></p>
                        <ul className="list-disc list-inside">
                            <li><code>actual</code>: Observed stock prices.</li>
                            <li><code>predicted</code>: Forecasted values.</li>
                        </ul>
                        <p><strong>Output:</strong> A dictionary of error metrics.</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                    <AccordionTrigger>Workflow</AccordionTrigger>
                    <AccordionContent>
                        <p>Here's how the pieces fit together:</p>
                        <ol className="list-decimal list-inside space-y-2">
                            <li><strong>Data Preprocessing:</strong>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Fetch historical stock data (<code>fetch_stock_data</code>).</li>
                                    <li>Plot the time series (<code>plot_time_series</code>) for an initial understanding.</li>
                                </ul>
                            </li>
                            <li><strong>Model Selection and Training:</strong>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Use <code>determine_arima_params</code> to identify optimal ARIMA parameters.</li>
                                    <li>Fit the ARIMA model to historical data (<code>fit_arima_model</code>).</li>
                                </ul>
                            </li>
                            <li><strong>Forecasting:</strong>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Predict stock prices for a specified number of future periods using <code>forecast_prices</code>.</li>
                                </ul>
                            </li>
                            <li><strong>Evaluation:</strong>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Compare the predicted prices against actual prices (if available) using <code>evaluate_forecast</code>.</li>
                                </ul>
                            </li>
                            <li><strong>Visualization:</strong>
                                <ul className="list-disc list-inside ml-4">
                                    <li>Plot both historical prices and forecasted values for interpretation.</li>
                                </ul>
                            </li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

