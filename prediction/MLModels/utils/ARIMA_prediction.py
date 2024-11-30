from flask import Flask, jsonify, request
import joblib
import yfinance as yf
import pandas as pd
import os

current_directory = os.getcwd()
print(f"Current working directory: {current_directory}")

model_file = './utils/Saved_Models/arima_model.pkl'

try:
    arima_model = joblib.load(model_file)
except FileNotFoundError:
    print(f"Model file '{model_file}' not found. Make sure to train and save the ARIMA model first.")
    arima_model = None

# Function to fetch the latest stock price
def fetch_latest_stock_price(ticker):
    try:
        stock_data = yf.download(ticker, period="1d", interval="1d")  # Fetch last 1 day of data
        if stock_data.empty:
            print(f"No data found for ticker: {ticker}")
            return None
        return stock_data['Close'].iloc[-1]
    except Exception as e:
        print(f"Error fetching stock price: {e}")
        return None

# Function to predict the next day's price using ARIMA model
def predict_stock_price_arima(ticker):
    try:
        if arima_model is None:
            return jsonify({"error": "ARIMA model not loaded. Make sure the model file exists and is loaded properly."}), 500

        # Fetch historical data for the ticker
        stock_data = yf.download(ticker, period="1y", interval="1d")  # Fetch last 1 year of data
        if stock_data.empty:
            return jsonify({"error": f"No data found for ticker: {ticker}"}), 400

        # Ensure the index is a datetime index
        stock_data.index = pd.to_datetime(stock_data.index)

        # Prepare the data for prediction
        latest_price = stock_data['Close'].iloc[-1]
        prediction = arima_model.get_forecast(steps=1)
        predicted_price = prediction.predicted_mean.iloc[0]  # Convert to a float

        return jsonify({
            "ticker": ticker,
            "latest_price": float(latest_price),  # Ensure native Python float
            "predicted_price_next_day": float(predicted_price)  # Ensure native Python float
        })
    except Exception as e:
        return jsonify({"error": f"Error during prediction: {str(e)}"}), 500