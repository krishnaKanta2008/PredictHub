import yfinance as yf
import pandas as pd
import joblib
import numpy as np
from flask import jsonify

# Load the trained Random Forest model
model_file = './utils/Saved_Models/randomforest_model.pkl'
rf_model = joblib.load(model_file)

# Feature engineering function
def prepare_features(data):
    data['Return'] = data['Close'].pct_change()
    data['Volatility'] = data['Close'].rolling(window=5).std()
    data['Momentum'] = data['Close'] / data['Close'].shift(5) - 1
    data['AvgVolume'] = data['Volume'].rolling(window=5).mean()
    data = data.dropna()
    return data

# Fetch stock data
def get_stock_data(ticker, period='1mo', interval='1d'):
    try:
        data = yf.download(ticker, period=period, interval=interval)
        return data
    except Exception as e:
        print(f"Error fetching stock data: {e}")
        return None

# Fetch latest stock price
def fetch_latest_stock_price(ticker):
    try:
        stock_data = yf.download(ticker, period="1d", interval="1d")
        return stock_data['Close'].iloc[-1]
    except Exception as e:
        print(f"Error fetching stock price: {e}")
        return None

# Predict stock price
def predict_stock_price_randomforest(ticker):
    if rf_model is None:
        return jsonify({"error": "Random Forest model not loaded. Train and save the model first."}), 500

    # Fetch latest stock price for the given ticker
    latest_price = fetch_latest_stock_price(ticker)

    # Fetch recent stock data
    stock_data = get_stock_data(ticker)
    if stock_data is None or stock_data.empty:
        return jsonify({"error": f"Could not fetch stock data for ticker '{ticker}'."}), 400

    # Prepare features
    stock_data = prepare_features(stock_data)
    if len(stock_data) < 5:  # Ensure at least 5 days of data
        return jsonify({"error": f"Not enough data to make predictions for ticker '{ticker}'."}), 400

    recent_data = stock_data.iloc[-5:][['Open', 'High', 'Low', 'Volume', 'Return', 'Volatility', 'Momentum', 'AvgVolume']]

    # Predict next day's price
    try:
        predicted_price = rf_model.predict(recent_data)
        return jsonify({
            "ticker": ticker,
            "latest_price": float(latest_price),  # Convert to native Python type
            "predicted_price_next_day": float(predicted_price[-1])  # Convert to float
        })
    except Exception as e:
        return jsonify({"error": f"Error during prediction: {str(e)}"}), 500
