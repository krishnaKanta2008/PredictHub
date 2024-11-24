from flask import Flask, jsonify, request
from flask_cors import CORS
from routes import auth_routes , stock_routes 
import gunicorn

app = Flask(__name__)

CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["http://localhost:5173","https://predicthub.vercel.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.register_blueprint(auth_routes)  
app.register_blueprint(stock_routes)

@app.route('/')
def welcome():
    return "Welcome to the server!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
