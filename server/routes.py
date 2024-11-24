from flask import Blueprint, jsonify
from utils.Auth.auth import signup_handler, signin_handler 
from utils.Stock.stock import fetch_stock_data
# from utils.Prediction.LSTM import predict_stock_price
from utils.User.profile import get_user_profile, get_profile_details, update_profile
from utils.Watchlist.watchlist import add_to_watchlist ,remove_from_watchlist, get_watchlist
import numpy as np

auth_routes = Blueprint('auth', __name__)
stock_routes = Blueprint('stock', __name__)

@auth_routes.route('/signup', methods=['POST'])
def signup():
    return signup_handler()

@auth_routes.route('/signin', methods=['POST'])
def signin():
    return signin_handler()

@auth_routes.route('/profile/<username>', methods=['GET'])
def profile(username):
    return get_user_profile(username)

@auth_routes.route('/profile/details/<username>', methods=['GET'])
def profileDetails(username):
    return get_profile_details(username)

@auth_routes.route('/profile/update/<username>', methods=['PUT'])
def update_profile_route(username):
    return update_profile(username)

@stock_routes.route('/fetchStockData/<symbol>', methods=['GET'])
def fetch_stock_data_route(symbol):
    return fetch_stock_data(symbol)

@stock_routes.route('/watchlist/add/<username>/<ticker>', methods=['POST'])
def add_to_user_watchlist(username,ticker):
    return add_to_watchlist(username,ticker)

@stock_routes.route('/watchlist/remove/<username>/<ticker>', methods=['POST'])
def remove_from_user_watchlist(username,ticker):
    return remove_from_watchlist(username,ticker)

@stock_routes.route('/watchlist/<username>', methods=['GET'])
def get_user_watchlist(username):
    return get_watchlist(username)

# @stock_routes.route('/predict/<ticker>', methods=['GET'])
# def predict_stock(ticker):
#     try:
#         # Get prediction
#         result = predict_stock_price(ticker)
        
#         # Convert numpy values to Python native types
#         if isinstance(result, np.ndarray):
#             result = result.tolist()
#         elif isinstance(result, np.generic):
#             result = result.item()
            
#         # Return as JSON with proper structure
#         return jsonify({
#             "success": True,
#             "ticker": ticker,
#             "predicted_price": result
#         })
        
#     except Exception as e:
#         return jsonify({
#             "success": False,
#             "error": str(e)
#         }), 500
