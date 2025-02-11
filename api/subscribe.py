from flask import Flask, request, jsonify
import os
import re
import time
from supabase import create_client  # make sure you have the proper supabase package installed

app = Flask(__name__)

# Get environment variables (adjust the names as needed)
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

# Initialize the Python Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def is_valid_email(email: str) -> bool:
    # Basic regex check for an email address
    return re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email) is not None

@app.route("/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json() or {}
    email = data.get("email")
    if not email or not is_valid_email(email):
        return jsonify({"error": "Please enter a valid email address."}), 400

    try:
        # Insert the email into the "waitlist" table
        response = supabase.table("waitlist").insert({"email": email}).execute()
        if response.get("error"):
            # Log the error if desired: print(response.get("error"))
            return jsonify({
                "error": "Error adding email to the waitlist. Please try again later."
            }), 500
    except Exception as ex:
        # Log the error if needed: print(ex)
        return jsonify({
            "error": "Internal server error. Please try again later."
        }), 500

    # Simulate a delay if needed
    time.sleep(0.5)
    return jsonify({
        "message": "Subscription successful! Thank you for joining our waitlist."
    }), 200

if __name__ == "__main__":
    app.run(debug=True)