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
      <h2 className="text-2xl font-bold mb-4">Stock Price Prediction Workflow</h2>
      <CodeFileDisplay
        filename="LSTM"
        file="https://colab.research.google.com/drive/1qvn92boppiTPbixUmvEp1vwhGu1KR-9l?usp=sharing"
      />
      <p className="text-sm mt-5">A comprehensive workflow for analyzing and predicting stock prices using an LSTM model.</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>1. Download Stock Data</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`import yfinance as yf

# Download stock data
ticker = 'AAPL'
data = yf.download(ticker, start='2010-01-01', end='2024-01-01')`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose:</strong> Fetch historical stock data for training and testing the model.</li>
              <li><strong>Library:</strong> <code>yfinance</code>.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>2. Preprocess Data</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`from sklearn.preprocessing import MinMaxScaler

# Scale the data
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data[['Close']].values)`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose:</strong> Normalize the 'Close' prices to a 0-1 range for better LSTM performance.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>3. Create Training and Testing Datasets</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`# Split data into training and testing
train_size = int(len(scaled_data) * 0.8)
train_data = scaled_data[:train_size]
test_data = scaled_data[train_size:]

# Define a function to create sequences
def create_dataset(data, time_step=60):
    X, y = [], []
    for i in range(len(data) - time_step - 1):
        X.append(data[i:(i + time_step), 0])
        y.append(data[i + time_step, 0])
    return np.array(X), np.array(y)

# Create sequences for training and testing
time_step = 60
X_train, y_train = create_dataset(train_data, time_step)
X_test, y_test = create_dataset(test_data, time_step)

# Reshape data for LSTM input
X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)
X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose:</strong> Create sequences of data for LSTM training and reshape for the input format.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>4. Build and Train LSTM Model</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout

# Build the LSTM model
model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], 1)),
    Dropout(0.2),
    LSTM(50, return_sequences=False),
    Dropout(0.2),
    Dense(25),
    Dense(1)
])

# Compile the model
model.compile(optimizer='adam', loss='mean_squared_error')

# Train the model
from keras.callbacks import EarlyStopping
early_stopping = EarlyStopping(monitor='val_loss', patience=10)
model.fit(X_train, y_train, epochs=100, batch_size=32, validation_data=(X_test, y_test), callbacks=[early_stopping])`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose:</strong> Build and train an LSTM model for predicting stock prices.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>5. Evaluate the Model</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`# Make predictions and inverse transform
predictions = model.predict(X_test)
predictions = scaler.inverse_transform(predictions)

# Inverse transform the test labels
y_test = scaler.inverse_transform(y_test.reshape(-1, 1))

# Calculate RMSE
rmse = np.sqrt(np.mean((predictions - y_test) ** 2))
print(f'RMSE: {rmse}')`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose:</strong> Evaluate the trained model's performance using RMSE.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>6. Plot Predictions</AccordionTrigger>
          <AccordionContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto dark:bg-zinc-900">
              <code className="text-sm">
                {`import matplotlib.pyplot as plt

# Plot the actual and predicted prices
plt.figure(figsize=(16, 8))
plt.title('Stock Price Prediction')
plt.xlabel('Date')
plt.ylabel('Close Price USD')
plt.plot(data[:train_size]['Close'], label='Training Data')
valid = data[train_size:train_size + len(predictions)].copy()
valid['Close'] = predictions.flatten()
plt.plot(valid['Close'], label='Predictions')
plt.legend()
plt.show()`}
              </code>
            </pre>
            <ul className="list-disc pl-6 mt-4">
              <li><strong>Purpose:</strong> Visualize the predictions compared to actual stock prices.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default LSTMStockAnalysis
