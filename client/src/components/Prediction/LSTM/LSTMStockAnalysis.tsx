import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { CodeFileDisplay } from "@/components/CodeFileDisplay/CodeFileDisplay"

const LSTMStockAnalysis = () => {
  return (
    <Card className="w-full border-none">
      <h2 className="text-2xl font-bold mb-4">Stock Analysis Workflow</h2>
      <CodeFileDisplay
        filename="LSTM"
        file="https://colab.research.google.com/drive/1A2UVXjvOa-T_8paQbxM6L0pxxNQR45Vs?usp=sharing"
      />
      <p className="text-sm mt-5">A comprehensive guide to analyzing stock data using LSTM model</p>
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
              <li><strong>Purpose</strong>: Fetches historical stock data using <code>yfinance</code>.</li>
              <li><strong>Inputs</strong>:
                <ul className="list-circle pl-6">
                  <li><code>ticker</code>: Stock symbol (e.g., "AAPL").</li>
                  <li><code>start_date</code>, <code>end_date</code>: Date range for data download.</li>
                </ul>
              </li>
              <li><strong>Output</strong>: A DataFrame with stock data (e.g., Open, High, Low, Close, Volume).</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>2. Preprocess Data</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def preprocess_data(data):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data[['Close']].values)
    return scaler, scaled_data`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Normalize the 'Close' prices for better performance with LSTM.</li>
              <li><strong>Inputs</strong>:
                <ul className="list-circle pl-6">
                  <li><code>data</code>: DataFrame containing the stock data.</li>
                </ul>
              </li>
              <li><strong>Output</strong>: A scaler object for inverse transformation and normalized price data.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>3. Create Training and Testing Datasets</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def create_datasets(scaled_data, train_size, time_step):
    train_data = scaled_data[:train_size]
    test_data = scaled_data[train_size:]

    def create_sequences(data):
        X, y = [], []
        for i in range(len(data) - time_step - 1):
            X.append(data[i:(i + time_step), 0])
            y.append(data[i + time_step, 0])
        return np.array(X), np.array(y)

    X_train, y_train = create_sequences(train_data)
    X_test, y_test = create_sequences(test_data)

    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
    X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)

    return X_train, y_train, X_test, y_test`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Splits normalized data into training and testing sets and creates sequences for LSTM input.</li>
              <li><strong>Outputs</strong>: Sequences and targets for training and testing datasets reshaped for LSTM.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>4. Build and Train LSTM Model</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def build_lstm_model(input_shape):
    model = Sequential([
        Bidirectional(LSTM(50, return_sequences=True), input_shape=input_shape),
        Dropout(0.2),
        Bidirectional(LSTM(50)),
        Dropout(0.2),
        Dense(25),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

model = build_lstm_model((time_step, 1))
early_stopping = EarlyStopping(monitor='val_loss', patience=10)
model.fit(X_train, y_train, epochs=100, batch_size=32, validation_data=(X_test, y_test), callbacks=[early_stopping])`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Builds a bidirectional LSTM model and trains it using the training data.</li>
              <li><strong>Features</strong>: Includes dropout for regularization and bidirectional layers for capturing past and future context.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>5. Evaluate and Save the Model</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`model.save('lstm_stock_model.h5')

predictions = model.predict(X_test)

# Reshape predictions and scale back to original values
predictions_extended = np.zeros((len(predictions), scaled_data.shape[1]))
predictions_extended[:, 3] = predictions.flatten()
predictions = scaler.inverse_transform(predictions_extended)[:, 3]

# Calculate RMSE
rmse = np.sqrt(np.mean((y_test_inverse - predictions) ** 2))
print(f"RMSE: {rmse}")`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Saves the trained model and evaluates its performance on test data using RMSE.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>6. Plot Predictions</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`def plot_predictions(actual, predicted):
    plt.figure(figsize=(12, 6))
    plt.plot(actual, label="Actual Prices", color="blue")
    plt.plot(predicted, label="Predicted Prices", color="orange")
    plt.title("Actual vs Predicted Stock Prices")
    plt.xlabel("Date")
    plt.ylabel("Price")
    plt.legend()
    plt.show()`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose</strong>: Visualizes the model's predictions against actual prices.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default LSTMStockAnalysis