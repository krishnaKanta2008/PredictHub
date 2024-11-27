import { CodeFileDisplay } from "@/components/CodeFileDisplay/CodeFileDisplay"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

const RANDOMFORESTStockAnalysis = () => {
  return (
    <Card className="w-full border-none">
      <h2 className="text-2xl font-bold mb-4">Stock Analysis Workflow</h2>
      <CodeFileDisplay
        filename="random-forest"
        file="https://drive.google.com/file/d/1Pi7ACHurArb5V_LIBpJGjC6-OFcbZP5p/view?usp=drive_link"
      />
      <p className="text-sm mt-5">A comprehensive guide to analyzing stock data using Random Forest model</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>1. Download Stock Data</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def get_stock_data(ticker, start_date, end_date):
    data = yf.download(ticker, start=start_date, end=end_date)
    return data`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Fetches stock data using <code>yfinance</code> for the given stock ticker and date range.</li>
              <li><strong>Inputs</strong>:
                <ul className="list-circle pl-6">
                  <li><code>ticker</code>: Stock symbol (e.g., "AAPL").</li>
                  <li><code>start_date</code>, <code>end_date</code>: Date range for data download.</li>
                </ul>
              </li>
              <li><strong>Output</strong>: Returns a DataFrame containing stock data (Open, High, Low, Close, Volume, etc.).</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>2. Feature Engineering</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def prepare_features(data):
    data['Return'] = data['Close'].pct_change()
    data['Volatility'] = data['Close'].rolling(window=5).std()
    data['Momentum'] = data['Close'] / data['Close'].shift(5) - 1
    data['AvgVolume'] = data['Volume'].rolling(window=5).mean()
    data['PriceDirection'] = (data['Close'].shift(-1) > data['Close']).astype(int)
    data = data.dropna()
    return data`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Creates additional features from raw data to improve model performance.</li>
              <li><strong>Features Added</strong>:
                <ul className="list-circle pl-6">
                  <li><strong>Return</strong>: Daily percentage change in closing price.</li>
                  <li><strong>Volatility</strong>: Rolling standard deviation of the closing price over 5 days.</li>
                  <li><strong>Momentum</strong>: Relative price change over the last 5 days.</li>
                  <li><strong>AvgVolume</strong>: Average trading volume over 5 days.</li>
                  <li><strong>PriceDirection</strong>: Classification target indicating if the next day's price is higher (1) or lower (0).</li>
                </ul>
              </li>
              <li><strong>Outputs</strong>: The updated DataFrame with new features, dropping rows with missing values.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>3. Train and Evaluate Model</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def train_model(data):
    X = data[['Open', 'High', 'Low', 'Volume', 'Return', 'Volatility', 'Momentum', 'AvgVolume']]
    y = data['Close']
    y_class = data['PriceDirection']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(X, y_class, test_size=0.2, random_state=42)

    # Regression Model
    reg_model = RandomForestRegressor(n_estimators=100, random_state=42)
    reg_model.fit(X_train, y_train)
    y_pred = reg_model.predict(X_test)

    # Classification Model
    clf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    clf_model.fit(X_train_c, y_train_c)
    y_pred_class = np.round(clf_model.predict(X_test_c))

    # Metrics
    mse = mean_squared_error(y_test, y_pred)
    print(f"Mean Squared Error (Regression): {mse:.4f}")

    accuracy = accuracy_score(y_test_c, y_pred_class)
    print(f"Accuracy (Classification): {accuracy:.4f}")
    print("\\nClassification Report:\\n", classification_report(y_test_c, y_pred_class))

    return reg_model, clf_model, X_test, y_test, y_pred`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Trains two models and evaluates their performance.
                <ul className="list-circle pl-6">
                  <li><strong>Regression Model</strong>: Predicts closing prices.</li>
                  <li><strong>Classification Model</strong>: Predicts if the next day's price will increase.</li>
                </ul>
              </li>
              <li><strong>Steps</strong>:
                <ul className="list-circle pl-6">
                  <li><strong>Features (<code>X</code>) and Targets (<code>y</code>)</strong>:
                    <ul className="list-square pl-6">
                      <li>Regression target: <code>y</code> (Closing price).</li>
                      <li>Classification target: <code>y_class</code> (PriceDirection).</li>
                    </ul>
                  </li>
                  <li><strong>Train-Test Split</strong>: Splits data into 80% training and 20% testing sets for both regression and classification tasks.</li>
                  <li><strong>Model Training</strong>: <code>RandomForestRegressor</code> is used for both regression and classification.</li>
                  <li><strong>Evaluation</strong>:
                    <ul className="list-square pl-6">
                      <li>Regression: Mean Squared Error (MSE).</li>
                      <li>Classification: Accuracy and detailed metrics (e.g., precision, recall).</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><strong>Outputs</strong>: Trained regression and classification models, along with test data and predictions.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>4. Predict Future Prices</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def predict_future_prices(model, recent_data):
    prediction = model.predict(recent_data)
    return prediction`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Uses the trained regression model to predict future stock prices based on the most recent feature data.</li>
              <li><strong>Inputs</strong>:
                <ul className="list-circle pl-6">
                  <li><code>model</code>: Trained regression model.</li>
                  <li><code>recent_data</code>: Recent data with feature columns for prediction.</li>
                </ul>
              </li>
              <li><strong>Output</strong>: Array of predicted prices.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>5. Plot Results</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def plot_results(y_test, y_pred):
    plt.figure(figsize=(10, 6))
    plt.plot(y_test.index, y_test.values, label="Actual Price", color="blue")
    plt.plot(y_test.index, y_pred, label="Predicted Price", color="orange")
    plt.xlabel("Time")
    plt.ylabel("Stock Price")
    plt.title("Actual vs Predicted Stock Prices")
    plt.legend()
    plt.show()`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Visualizes the comparison between actual and predicted prices for regression.</li>
              <li><strong>Inputs</strong>:
                <ul className="list-circle pl-6">
                  <li><code>y_test</code>: Actual stock prices.</li>
                  <li><code>y_pred</code>: Predicted stock prices.</li>
                </ul>
              </li>
              <li><strong>Output</strong>: A line plot showing how well the model's predictions match the actual prices.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Workflow</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-6">
              <li><strong>Data Loading</strong>: Fetch stock data for the specified ticker and date range (<code>get_stock_data</code>).</li>
              <li><strong>Feature Engineering</strong>: Prepare features like returns, volatility, momentum, etc. (<code>prepare_features</code>).</li>
              <li><strong>Model Training and Evaluation</strong>: Train regression and classification models to predict stock prices and price directions. Evaluate both models using metrics like MSE (regression) and accuracy (classification) (<code>train_model</code>).</li>
              <li><strong>Future Price Prediction</strong>: Use the trained regression model to predict stock prices for recent feature data (<code>predict_future_prices</code>).</li>
              <li><strong>Visualization</strong>: Compare actual and predicted stock prices using a plot (<code>plot_results</code>).</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>Key Notes</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6">
              <li><strong>Feature Engineering</strong>: Ensures the model has access to informative variables, improving accuracy.</li>
              <li><strong>Random Forest</strong>: A flexible model that handles nonlinear relationships well, suitable for both regression and classification tasks.</li>
              <li><strong>Evaluation Metrics</strong>: Provides insight into model performance for both tasks, allowing iterative improvement.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}



export default RANDOMFORESTStockAnalysis