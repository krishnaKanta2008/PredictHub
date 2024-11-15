from flask import Blueprint, request, jsonify
from utils.Auth.auth import signup_handler, signin_handler, github_callback 
from utils.Stock.stock import fetch_stock_data
from utils.Prediction.LSTM import predict_stock_price
from utils.User.profile import get_user_profile
import numpy as np

auth_routes = Blueprint('auth', __name__)
stock_routes = Blueprint('stock', __name__)
prediction_routes = Blueprint('prediction', __name__)

@auth_routes.route('/signup', methods=['POST'])
def signup():
    return signup_handler()

@auth_routes.route('/signin', methods=['POST'])
def signin():
    return signin_handler()

@auth_routes.route('/profile/<username>', methods=['GET'])
def profile(username):
    return get_user_profile(username)

@auth_routes.route('/api/github/callback', methods=['POST'])
def github():
    return github_callback()

@stock_routes.route('/fetchStockData/<symbol>', methods=['GET'])
def fetch_stock_data_route(symbol):
    return fetch_stock_data(symbol)

@prediction_routes.route('/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        # Get prediction
        result = predict_stock_price(ticker)
        
        # Convert numpy values to Python native types
        if isinstance(result, np.ndarray):
            result = result.tolist()
        elif isinstance(result, np.generic):
            result = result.item()
            
        # Return as JSON with proper structure
        return jsonify({
            "success": True,
            "ticker": ticker,
            "predicted_price": result
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
