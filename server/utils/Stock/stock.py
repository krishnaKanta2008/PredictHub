import os
import yfinance as yf
from datetime import datetime, timedelta
import plotly.graph_objs as go
from flask import jsonify
import json

def fetch_stock_data(symbol='GOOGL'):
    stock = yf.Ticker(symbol)
    end = datetime.now()
    start = end - timedelta(days=30)
    
    history = stock.history(start=start, end=end, interval='1d')
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
    
    # Create candlestick chart using Plotly
    fig = go.Figure(data=[go.Candlestick(
        x=[record['date'] for record in formatted_data],
        open=[record['open'] for record in formatted_data],
        high=[record['high'] for record in formatted_data],
        low=[record['low'] for record in formatted_data],
        close=[record['close'] for record in formatted_data]
    )])
    
    fig.update_layout(title=f'{symbol} Stock Price', xaxis_title='Date', yaxis_title='Price')
    
    # Convert Plotly figure to JSON format
    graph_json = json.loads(fig.to_json())

    # Update the response structure
    return jsonify({
        'graph': {
            'data': graph_json['data'],
            'layout': graph_json['layout']
        },
        'current': formatted_data[-1] if formatted_data else None,
        'history': formatted_data,
        'previous': formatted_data[-2] if len(formatted_data) > 1 else None
    })
