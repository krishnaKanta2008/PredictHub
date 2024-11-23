from flask import request, jsonify
from models import User

def add_to_watchlist(username,ticker):
    if not username or not ticker:
        return jsonify({"success": False, "message": "Username and ticker are required"}), 400
    
    result = User.add_to_watchlist(username, ticker)
    return jsonify(result), 200 if result["success"] else 400

def remove_from_watchlist(username,ticker):
    if not username or not ticker:
        return jsonify({"success": False, "message": "Username and ticker are required"}), 400
    
    result = User.remove_from_watchlist(username, ticker)
    return jsonify(result), 200 if result["success"] else 400

def get_watchlist(username):
    result = User.get_watchlist(username)
    return jsonify(result), 200 if result["success"] else 400