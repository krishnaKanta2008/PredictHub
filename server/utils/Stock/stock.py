import os
import yfinance as yf
from datetime import datetime, timedelta
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

        # Fetch stock history
        history = stock.history(start=start, end=end, interval='1d')
        if history.empty:
            print("No data found for the ticker")  
            return jsonify({"error": "No data found for ticker"}), 404

        # Convert history to formatted data
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

        stock_info = stock.info
        market_cap = stock_info.get('marketCap', 'N/A')
        company_name = stock_info.get('longName', 'N/A')
        description = stock_info.get('longBusinessSummary', 'Description not available.')

        response = jsonify({
            'current': formatted_data[-1] if formatted_data else None,
            'history': formatted_data,
            'previous': formatted_data[-2] if len(formatted_data) > 1 else None,
            'company_info': {
                'name': company_name,
                'market_cap': market_cap,
                'description': description
            }
        })
        
        response.headers.add("Content-Type", "application/json")
        return response

    except Exception as e:
        print(f"Error in API: {e}") 
        return jsonify({"error": str(e)}), 500
