from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv('MONGODB_URI'))
db = client['PredictHub']  

class User:
    @staticmethod
    def create_user(data):
        user_data = {
            "firstname": data['firstname'],
            "lastname": data['lastname'],
            "username": data['username'],
            "email": data['email'],
            "password": data['password'],
            "watchlist": [] 
        }
        db.users.insert_one(user_data)
        return user_data

    @staticmethod
    def validate_user(username, password):
        user = db.users.find_one({"username": username, "password": password})  
        return user
    
    @staticmethod
    def find_by_username(username):
        return db.users.find_one({"username": username})

    @staticmethod
    def add_to_watchlist(username, ticker):
        user = db.users.find_one({"username": username})
        if not user:
            return {"success": False, "message": "User not found"}
        
        if ticker in user.get("watchlist", []):
            return {"success": False, "message": "Ticker already in watchlist"}
        
        db.users.update_one(
            {"username": username},
            {"$addToSet": {"watchlist": ticker}}
        )
        return {"success": True, "message": "Ticker added to watchlist"}

    @staticmethod
    def remove_from_watchlist(username, ticker):
        user = db.users.find_one({"username": username})
        if not user:
            return {"success": False, "message": "User not found"}
        
        if ticker not in user.get("watchlist", []):
            return {"success": False, "message": "Ticker not in watchlist"}
        
        db.users.update_one(
            {"username": username},
            {"$pull": {"watchlist": ticker}}
        )
        return {"success": True, "message": "Ticker removed from watchlist"}

    @staticmethod
    def get_watchlist(username):
        user = db.users.find_one({"username": username}, {"watchlist": 1, "_id": 0})
        if not user:
            return {"success": False, "message": "User not found"}
        return {"success": True, "watchlist": user.get("watchlist", [])}
