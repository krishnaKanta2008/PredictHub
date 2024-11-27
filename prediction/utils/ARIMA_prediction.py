from flask import Flask, jsonify, request
import joblib
import yfinance as yf
import pandas as pd

model_file = './Saved_Models/arima_model.pkl'

try:
    arima_model = joblib.load(model_file)
except FileNotFoundError:
    print(f"Model file '{model_file}' not found. Make sure to train and save the ARIMA model first.")
    arima_model = None

# Function to fetch the latest stock price
def fetch_latest_stock_price(ticker):
    try:
        stock_data = yf.download(ticker, period="2d", interval="1d")  # Fetch last 2 days of data
        return stock_data['Close'].iloc[-1]
    except Exception as e:
        print(f"Error fetching stock price: {e}")
        return None
    
def predict_stock_price_arima(ticker):
    if arima_model is None:
        return jsonify({"error": "ARIMA model not loaded. Train and save the model first."}), 500

    # Fetch latest stock price for the given ticker
    latest_price = fetch_latest_stock_price(ticker)
    if latest_price is None:
        return jsonify({"error": f"Could not fetch stock data for ticker '{ticker}'."}), 400

    # Forecast the next day's price
    try:
        forecast = arima_model.forecast(steps=1)
        next_day_prediction = forecast[0]
        return jsonify({
            "ticker": ticker,
            "latest_price": latest_price,
            "predicted_price_next_day": next_day_prediction
        })
    except Exception as e:
        return jsonify({"error": f"Error during prediction: {str(e)}"}), 500


    