from flask import Flask, jsonify, request
from flask_cors import CORS
# from utils.LSTM_prediction import predict_stock_price_lstm
from utils.RANDOMFOREST_prediction import predict_stock_price_randomforest
from utils.ARIMA_prediction import predict_stock_price_arima
import gunicorn

app = Flask(__name__)

CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["http://localhost:5173","https://predicthub.vercel.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.route('/')
def home():
    return "Welcome to Predictions!"

# @app.route('/lstm/<ticker>', methods=['GET'])
# def lstm(ticker):
#     return predict_stock_price_lstm(ticker)
 
@app.route('/randomforest/<ticker>', methods=['GET'])
def randomforest(ticker):
    return predict_stock_price_randomforest(ticker)

@app.route('/arima/<ticker>', methods=["GET"])
def arima(ticker):
    return predict_stock_price_arima(ticker)

if __name__ == '__main__':
    app.run(debug=True)