# import numpy as np
# from tensorflow.keras.models import load_model
# import pandas as pd
# from sklearn.preprocessing import MinMaxScaler
# import plotly.graph_objects as go
# from datetime import datetime, timedelta
# import os
# import yfinance as yf

# def create_prediction_plot(historical_dates, historical_prices, predicted_price, ticker):
#     # Create the plot to visualize historical prices and predictions
#     last_date = historical_dates[-1]
#     next_date = (pd.to_datetime(last_date) + timedelta(days=1)).strftime('%Y-%m-%d')
    
#     fig = go.Figure()
#     fig.add_trace(go.Scatter(
#         x=historical_dates,
#         y=historical_prices,
#         name='Historical Prices',
#         line=dict(color='blue')
#     ))

#     fig.add_trace(go.Scatter(
#         x=[historical_dates[-1], next_date],
#         y=[historical_prices[-1], predicted_price],
#         name='Prediction',
#         line=dict(color='red', dash='dash')
#     ))

#     fig.update_layout(
#         title=f'{ticker} Stock Price Prediction',
#         xaxis_title='Date',
#         yaxis_title='Price (USD)',
#         hovermode='x unified',
#         template='plotly_white'
#     )
    
#     return fig.to_json()

# def get_data(ticker, period='10y'):
#     # Fetch stock data using yfinance
#     stock = yf.Ticker(ticker)
#     df = stock.history(period=period)
#     return df

# def LSTM(df):
#     # Prepare the data
#     closing_prices = df['Close']
#     data_training = pd.DataFrame(closing_prices[0:int(len(df) * 0.7)])
#     data_testing = pd.DataFrame(closing_prices[int(len(df) * 0.7):])

#     scaler = MinMaxScaler(feature_range=(0, 1))
#     data_training_array = scaler.fit_transform(data_training)

#     x_train = []
#     y_train = []

#     for i in range(100, data_training_array.shape[0]):
#         x_train.append(data_training_array[i - 100:i])
#         y_train.append(data_training_array[i, 0])

#     x_train, y_train = np.array(x_train), np.array(y_train)

#     # Load pre-trained model
#     model = load_model('./utils/Saved_Models/LSTM_model.h5')

#     past_100_days = data_training.tail(100)
#     final_df = pd.concat([past_100_days, data_testing], ignore_index=True)

#     input_data = scaler.transform(final_df)  # Use transform instead of fit_transform

#     x_test = []
#     y_test = []

#     for i in range(100, input_data.shape[0]):
#         x_test.append(input_data[i - 100:i])
#         y_test.append(input_data[i, 0])

#     x_test, y_test = np.array(x_test), np.array(y_test)

#     # Predicting the stock prices
#     y_predicted = model.predict(x_test)
#     scale_factor = 1 / scaler.scale_[0]
#     y_predicted = y_predicted * scale_factor
#     y_test = y_test * scale_factor

#     # Return the predicted price
#     predicted_price = y_predicted[-1][0]
#     return round(predicted_price, 3)

# def predict_stock_price_lstm(ticker):
#     # Get stock data and predict stock price
#     period = '10y'
#     df = get_data(ticker, period)
#     predicted_price = LSTM(df)
#     return predicted_price
