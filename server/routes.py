from flask import Blueprint, jsonify
from utils.Auth.auth import signup_handler, signin_handler 
from utils.Stock.stock import fetch_stock_data
from utils.User.profile import get_user_profile, get_profile_details, update_profile
from utils.Watchlist.watchlist import add_to_watchlist ,remove_from_watchlist, get_watchlist
from utils.Contact.contact import save_contact_message
from utils.Feedback.feedback import save_feedback_message
from utils.Chat.chat import chat_model

auth_routes = Blueprint('auth', __name__)
stock_routes = Blueprint('stock', __name__)
contact_routes = Blueprint('contact', __name__)
chat_routes = Blueprint('chat', __name__)

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

@contact_routes.route('/contact', methods=['POST'])
def contact():
    return save_contact_message()

@contact_routes.route('/feedback', methods=['POST'])
def feedback():
    return save_feedback_message()

@chat_routes.route('/chat', methods=['POST'])
def chat_generativeai_model():
    return chat_model()
