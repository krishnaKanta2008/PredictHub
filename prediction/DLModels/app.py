from flask import Flask, jsonify, request
from flask_cors import CORS
from utils.LSTM_prediction import predict_stock_price_lstm
from utils.BiLSTM_prediction import predict_stock_price_bilstm
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
    return "Welcome to DL Predictions!"
 
@app.route('/lstm/<ticker>', methods=['GET'])
def lstm(ticker):
    return predict_stock_price_lstm(ticker)

@app.route('/bilstm/<ticker>', methods=["GET"])
def bilstm(ticker):
    return predict_stock_price_bilstm(ticker)

if __name__ == '__main__':
    app.run(debug=True, port=5002)