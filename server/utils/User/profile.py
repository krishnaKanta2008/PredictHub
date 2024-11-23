import datetime
from flask import request, jsonify
from models import User
from dotenv import load_dotenv
import os
from cloudinary import config, uploader

# Load environment variables
load_dotenv()

# Configure Cloudinary
config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

def upload_image(file):
    try:
        result = uploader.upload(file)
        return result['secure_url']
    except Exception as e:
        return None

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
    
def get_profile_details(username):
    try:
        user = User.find_by_username(username)
        if user:
            profile_data = {
                'firstname': user['firstname'],
                'lastname': user['lastname'],
                'username': user['username'],
                'email': user['email'],
                'profileImage': user['profileImage'],
                'profileBanner': user['profileBanner'],
                'bio': user['bio'],
                'location': user['location'],
                'watchlist': user['watchlist']
            }
            return jsonify({'success': True, 'data': profile_data}), 200
        return jsonify({'success': False, 'message': 'User not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    
def update_profile(username):
    try:
        # Retrieve user
        user = User.find_by_username(username)
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404

        # Get form data and files
        profile_image = request.files.get('profileImage')
        profile_banner = request.files.get('profileBanner')
        bio = request.form.get('bio')
        location = request.form.get('location')

        update_data = {}

        # Handle image uploads
        if profile_image:
            profile_image_url = upload_image(profile_image)
            if profile_image_url:
                update_data['profileImage'] = profile_image_url
            else:
                print("Failed to upload profile image")

        if profile_banner:
            profile_banner_url = upload_image(profile_banner)
            if profile_banner_url:
                update_data['profileBanner'] = profile_banner_url
            else:
                print("Failed to upload profile banner")

        # Add other form data
        if bio:
            update_data['bio'] = bio
        if location:
            update_data['location'] = location

        # Log update data
        print("Update Data:", update_data)

        if not update_data:
            return jsonify({'success': False, 'message': 'No valid fields to update'}), 400

        # Update profile
        result = User.update_profile(username, update_data)
        
        if result.get('success'):
            return jsonify({'success': True, 'message': 'Profile updated successfully'}), 200
        else:
            print("Update Profile Result:", result)
            return jsonify({'success': False, 'message': 'Failed to update profile'}), 400

    except Exception as e:
        print("Exception:", e)
        return jsonify({'success': False, 'message': str(e)}), 500
