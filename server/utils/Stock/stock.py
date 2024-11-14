import os
import yfinance as yf
from datetime import datetime, timedelta
import plotly.graph_objs as go
from flask import jsonify, request
import json

def fetch_stock_data(symbol=None):
    ticker = symbol if symbol else request.args.get('ticker', 'GOOGL')
    ticker = ticker.upper()
    print(f"Received ticker: {ticker}") 

    try:
        stock = yf.Ticker(ticker)
        end = datetime.now()
        start = end - timedelta(days=30)

        history = stock.history(start=start, end=end, interval='1d')
        if history.empty:
            print("No data found for the ticker")  # Debugging statement
            return jsonify({"error": "No data found for ticker"}), 404

        data = history.reset_index().to_dict('records')
        
        formatted_data = [
            {
                'date': record['Date'].strftime('%Y-%m-%d'),
                'open': record['Open'],
                'high': record['High'],
                'low': record['Low'],
                'close': record['Close'],
                'volume': record['Volume']
            } for record in data
        ]
        
        fig = go.Figure(data=[go.Candlestick(
            x=[record['date'] for record in formatted_data],
            open=[record['open'] for record in formatted_data],
            high=[record['high'] for record in formatted_data],
            low=[record['low'] for record in formatted_data],
            close=[record['close'] for record in formatted_data]
        )])
        
        fig.update_layout(title=f'{ticker} Stock Price', xaxis_title='Date', yaxis_title='Price')
        graph_json = json.loads(fig.to_json())
        
        response = jsonify({
            'graph': {
                'data': graph_json['data'],
                'layout': graph_json['layout']
            },
            'current': formatted_data[-1] if formatted_data else None,
            'history': formatted_data,
            'previous': formatted_data[-2] if len(formatted_data) > 1 else None
        })
        
        response.headers.add("Content-Type", "application/json")
        return response

    except Exception as e:
        print(f"Error in API: {e}")  # Debugging statement
        return jsonify({"error": str(e)}), 500
