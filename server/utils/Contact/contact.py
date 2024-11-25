import requests
from flask import request, jsonify
from models import Contact
from pymongo import errors  

def save_contact_message():
    try:
        # Parse JSON from the request
        data = request.json
        if not data:
            return jsonify({"success": False, "message": "No data received"}), 400

        # Validate required fields
        required_fields = ["name", "email", "message"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({
                "success": False,
                "message": f"Missing fields: {', '.join(missing_fields)}"
            }), 400

        # Construct the contact data object
        contact_data = {
            "name": data["name"].strip(),
            "email": data["email"].strip(),
            "subject" : data["subject"].strip(),
            "message": data["message"].strip()
        }

        # Save the message using the Contact model
        saved_contact = Contact.save_message(contact_data)

        # Return a success response
        return jsonify({
            "success": True,
            "message": "Contact message saved successfully",
            "data": saved_contact
        }), 201

    except errors.PyMongoError as e:
        # Handle database-related errors
        return jsonify({"success": False, "message": "Database error", "error": str(e)}), 500
    except Exception as e:
        # Handle any other unexpected errors
        return jsonify({"success": False, "message": "An unexpected error occurred", "error": str(e)}), 500