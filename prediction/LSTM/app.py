from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import plotly.graph_objects as go
from datetime import datetime, timedelta
import os
import yfinance as yf
import gunicorn

app = Flask(__name__)

CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["http://localhost:5173","https://predicthub.vercel.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

def create_prediction_plot(historical_dates, historical_prices, predicted_price, ticker):
    # Create the plot to visualize historical prices and predictions
    last_date = historical_dates[-1]
    next_date = (pd.to_datetime(last_date) + timedelta(days=1)).strftime('%Y-%m-%d')
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=historical_dates,
        y=historical_prices,
        name='Historical Prices',
        line=dict(color='blue')
    ))

    fig.add_trace(go.Scatter(
        x=[historical_dates[-1], next_date],
        y=[historical_prices[-1], predicted_price],
        name='Prediction',
        line=dict(color='red', dash='dash')
    ))

    fig.update_layout(
        title=f'{ticker} Stock Price Prediction',
        xaxis_title='Date',
        yaxis_title='Price (USD)',
        hovermode='x unified',
        template='plotly_white'
    )
    
    return fig.to_json()

def get_data(ticker, period='10y'):
    # Fetch stock data using yfinance
    stock = yf.Ticker(ticker)
    df = stock.history(period=period)
    return df

def LSTM(df):
    # Prepare the data
    closing_prices = df['Close']
    data_training = pd.DataFrame(closing_prices[0:int(len(df) * 0.7)])
    data_testing = pd.DataFrame(closing_prices[int(len(df) * 0.7):])

    scaler = MinMaxScaler(feature_range=(0, 1))
    data_training_array = scaler.fit_transform(data_training)

    x_train = []
    y_train = []

    for i in range(100, data_training_array.shape[0]):
        x_train.append(data_training_array[i - 100:i])
        y_train.append(data_training_array[i, 0])

    x_train, y_train = np.array(x_train), np.array(y_train)
    
    # Save the current directory
    current_directory = os.getcwd()
    print(f"Current directory: {current_directory}")

    # Load pre-trained model
    model = load_model('stock_price_prediction_model.h5')

    past_100_days = data_training.tail(100)
    final_df = pd.concat([past_100_days, data_testing], ignore_index=True)

    input_data = scaler.transform(final_df)  # Use transform instead of fit_transform

    x_test = []
    y_test = []

    for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i - 100:i])
        y_test.append(input_data[i, 0])

    x_test, y_test = np.array(x_test), np.array(y_test)

    # Predicting the stock prices
    y_predicted = model.predict(x_test)
    scale_factor = 1 / scaler.scale_[0]
    y_predicted = y_predicted * scale_factor
    y_test = y_test * scale_factor

    # Extract last month's data
    last_month_original = y_test[-30:]  # Assuming daily data
    last_month_predicted = y_predicted[-30:].flatten()

    # Predict the next day's price
    last_100_days = input_data[-100:].reshape(1, 100, 1)  # Prepare data for the next day's prediction
    next_day_prediction = model.predict(last_100_days)
    next_day_price = next_day_prediction[0][0] * scale_factor  # Rescale to original price

    # Return both predictions
    return last_month_original, last_month_predicted, next_day_price


def predict_stock_price_lstm(ticker):
    # Get stock data and predict stock price
    period = '10y'
    df = get_data(ticker, period)
    predicted_price = LSTM(df)
    return predicted_price


@app.route('/')
def home():
    return "Welcome to LSTM Prediction!"

@app.route('/lstm/<ticker>', methods=['GET'])
def lstm(ticker):
    # Get stock data and predictions
    period = '10y'
    df = get_data(ticker, period)
    last_month_original, last_month_predicted, next_day_price = LSTM(df)
    
    # Return original vs predicted data for plotting and the next day's prediction
    response_data = {
        "ticker": ticker,
        "original_prices": last_month_original.tolist(),
        "predicted_prices": last_month_predicted.tolist(),
        "next_day_prediction": round(next_day_price, 3)
    }
    return jsonify(response_data)

 
if __name__ == '__main__':
    app.run(debug=True)