'use client'

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from 'lucide-react'
import { useState } from "react"
import { ReactNode } from "react"

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute right-2 top-2 h-8 w-8 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
      onClick={copyToClipboard}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 text-primary" />
      )}
    </Button>
  )
}

const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative mt-4">
    <CopyButton code={code} />
    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
      <code className="text-primary">{code}</code>
    </pre>
  </div>
)

const DocumentationSection = ({ title, children }: { title: string, children: ReactNode }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

const pythonCode = `
from tensorflow.keras.models import load_model
import numpy as np

# Load the pre-trained model
model = load_model('model.h5')

# Assume \`recent_data\` is a sequence of the last 60 days of normalized stock data
# Reshape data to match the model input shape (batch_size, time_steps, features)
recent_data = np.reshape(recent_data, (1, recent_data.shape[0], recent_data.shape[1]))

# Predict the stock price
predicted_price = model.predict(recent_data)
print("Predicted Stock Price:", predicted_price)
`

const Lstm = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 border-b px-4">
          <SidebarTrigger className="-ml-2" />
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-xl md:text-2xl font-bold">LSTM Model for Stock Price Prediction</h1>
        </header>
        <ScrollArea className="h-[calc(100vh-4rem)] px-2 md:px-4 py-4 md:py-6">
          <DocumentationSection title="Overview">
            <p className="text-sm md:text-base">
              This project utilizes a Long Short-Term Memory (LSTM) neural network model to predict stock prices based on historical data. LSTMs, a type of recurrent neural network (RNN), are particularly suited for time-series forecasting due to their ability to capture long-term dependencies.
            </p>
          </DocumentationSection>

          <DocumentationSection title="Data Preparation and Preprocessing">
            <p className="text-sm md:text-base">The model uses historical stock data with the following attributes:</p>
            <ul className="list-disc pl-4 md:pl-6 mt-2 text-sm md:text-base">
              <li>Open: The price at which the stock opens for trading</li>
              <li>High: The highest price reached within a trading day</li>
              <li>Low: The lowest price during the day</li>
              <li>Close: The final trading price at the end of the day</li>
              <li>Volume: The number of shares or contracts traded</li>
            </ul>
            <p className="mt-2 text-sm md:text-base">Preprocessing steps include:</p>
            <ol className="list-decimal pl-4 md:pl-6 mt-2 text-sm md:text-base">
              <li>Data Cleaning: Handling missing or outlier values</li>
              <li>Normalization: Scaling data to a range between 0 and 1</li>
              <li>Sequence Creation: Constructing input sequences of fixed length (typically 60 days)</li>
            </ol>
          </DocumentationSection>

          <DocumentationSection title="LSTM Model Architecture">
            <p className="text-sm md:text-base">The model architecture consists of:</p>
            <ul className="list-disc pl-4 md:pl-6 mt-2 text-sm md:text-base">
              <li>Input Layer: Takes preprocessed sequential data</li>
              <li>LSTM Layers: Multiple layers with memory cells to capture long-term dependencies</li>
              <li>Dropout Regularization: Prevents overfitting</li>
              <li>Dense Layer: Produces the final prediction</li>
            </ul>
          </DocumentationSection>

          <DocumentationSection title="Key Hyperparameters">
            <ul className="list-disc pl-4 md:pl-6 text-sm md:text-base">
              <li>Units: Number of LSTM units per layer</li>
              <li>Batch Size: Number of samples processed per training iteration</li>
              <li>Epochs: Number of complete passes through the dataset during training</li>
            </ul>
          </DocumentationSection>

          <DocumentationSection title="Training Process">
            <ol className="list-decimal pl-4 md:pl-6 text-sm md:text-base">
              <li>Forward Pass: Compute predictions based on current weights</li>
              <li>Loss Calculation: Compare predictions to actual stock prices</li>
              <li>Backward Pass and Optimization: Adjust weights to minimize error</li>
              <li>Epochs and Convergence: Repeat until model converges or shows minimal improvement</li>
            </ol>
          </DocumentationSection>

          <DocumentationSection title="Prediction Process">
            <p className="mb-2 md:mb-4 text-sm md:text-base">To make predictions:</p>
            <ol className="list-decimal pl-4 md:pl-6 space-y-1 md:space-y-2 mb-2 md:mb-4 text-sm md:text-base">
              <li>Load the trained model from the saved .h5 file</li>
              <li>Prepare recent stock data (last 60 days) for prediction</li>
              <li>Feed the prepared data into the model to generate a prediction</li>
            </ol>
            <CodeBlock code={pythonCode} />
          </DocumentationSection>

          <DocumentationSection title="Limitations">
            <p className="text-sm md:text-base">While powerful, LSTM models for stock prediction face challenges due to:</p>
            <ul className="list-disc pl-4 md:pl-6 mt-2 text-sm md:text-base">
              <li>Market Volatility: Influenced by external factors not captured in historical data</li>
              <li>Data Quality and Availability: Dependence on extensive, high-quality historical data</li>
              <li>Overfitting Risk: Potential to memorize past trends that may not generalize to future data</li>
            </ul>
          </DocumentationSection>

          <DocumentationSection title="Example Use Case">
            <p className="text-sm md:text-base">
              The LSTM model can be integrated into stock analysis dashboards or algorithmic trading systems, providing predictive inputs to inform trading decisions. However, it should be used in conjunction with other analytical tools and real-time data sources for comprehensive financial analysis.
            </p>
          </DocumentationSection>

          <DocumentationSection title="Conclusion">
            <p className="text-sm md:text-base">
              LSTM models offer a promising approach to understanding market patterns based on historical data. However, due to the stock market's inherent complexity, these predictions should be viewed as one element of a broader investment strategy, complemented by domain expertise and other analytical tools.
            </p>
          </DocumentationSection>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Lstm