from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from routes import auth_routes 
from dotenv import load_dotenv
import gunicorn
import os
import yfinance as yf
from datetime import datetime, timedelta
import plotly.graph_objs as go
import json

load_dotenv()

app = Flask(__name__)

CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.register_blueprint(auth_routes)  

@app.route('/')
def welcome():
    return "Welcome to the server!"

@app.route('/fetchStockData/<symbol>')
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



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
