import datetime
from flask import request, jsonify
from models import User

def get_user_profile(username):
    username = request.view_args['username']
    user = User.find_by_username(username)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({
        'username': user['username'],
        'email': user['email'],
        'created_at': user.get('created_at'),
        'updated_at': user.get('updated_at')
    })