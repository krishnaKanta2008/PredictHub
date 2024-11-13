from flask import Blueprint, request, jsonify
from utils.Auth.auth import signup_handler, signin_handler, github_callback 
from utils.Stock.stock import fetch_stock_data

auth_routes = Blueprint('auth', __name__)
stock_routes = Blueprint('stock', __name__)

@auth_routes.route('/signup', methods=['POST'])
def signup():
    return signup_handler()

@auth_routes.route('/signin', methods=['POST'])
def signin():
    return signin_handler()

@auth_routes.route('/api/github/callback', methods=['POST'])
def github():
    return github_callback()

@stock_routes.route('/fetchStockData/<symbol>')
def fetch_stock_data_route(symbol):
    return fetch_stock_data(symbol)
