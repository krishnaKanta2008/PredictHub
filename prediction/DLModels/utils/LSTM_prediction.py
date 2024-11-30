from flask import Flask, jsonify, request
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime, timedelta
import os
import yfinance as yf

# Function to fetch stock data
def get_data(ticker, period='10y'):
    # Fetch stock data using yfinance
    stock = yf.Ticker(ticker)
    df = stock.history(period=period)
    return df

# LSTM Model Function
def LSTM_Model(df):
    # Prepare the data
    closing_prices = df['Close']
    data_training = pd.DataFrame(closing_prices[0:int(len(df) * 0.7)])
    data_testing = pd.DataFrame(closing_prices[int(len(df) * 0.7):])

    scaler = MinMaxScaler(feature_range=(0, 1))
    data_training_array = scaler.fit_transform(data_training)

    x_train = []
    y_train = []

    # Use sequence length of 60
    for i in range(60, data_training_array.shape[0]):
        x_train.append(data_training_array[i - 60:i])
        y_train.append(data_training_array[i, 0])

    x_train, y_train = np.array(x_train), np.array(y_train)
    
    # Save the current directory
    current_directory = os.getcwd()
    print(f"Current directory: {current_directory}")

    # Load pre-trained LSTM model
    model = load_model('./utils/Saved_Models/LSTM_model.h5')

    past_60_days = data_training.tail(60)
    final_df = pd.concat([past_60_days, data_testing], ignore_index=True)

    input_data = scaler.transform(final_df)  # Use transform instead of fit_transform

    x_test = []
    y_test = []

    for i in range(60, input_data.shape[0]):
        x_test.append(input_data[i - 60:i])
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
    last_60_days = input_data[-60:].reshape(1, 60, 1)  # Prepare data for the next day's prediction
    next_day_prediction = model.predict(last_60_days)
    next_day_price = next_day_prediction[0][0] * scale_factor  # Rescale to original price

    # Return both predictions
    return last_month_original, last_month_predicted, next_day_price

def predict_stock_price_lstm(ticker):
    try:
        if not ticker:
            return jsonify({'error': 'Ticker symbol is required'}), 400

        # Get stock data and predictions
        period = '10y'
        df = get_data(ticker, period)
        last_month_original, last_month_predicted, next_day_price = LSTM_Model(df)

        # Return original vs predicted data for plotting and the next day's prediction
        response_data = {
            "ticker": ticker,
            "original_prices": last_month_original.tolist(),
            "predicted_prices": last_month_predicted.tolist(),
            "next_day_prediction": round(next_day_price, 3)
        }
        return jsonify(response_data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500