from flask import Flask, request, jsonify
import os
import re
# You might need to install a Python Supabase client (or use another database library)
# For demonstration, we'll just simulate the waitlist insertion

app = Flask(__name__)

def valid_email(email):
    return re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email)

@app.route("/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json() or {}
    email = data.get("email")
    if not email or not valid_email(email):
        return jsonify(error="Please enter a valid email address."), 400

    # Here you would add the code to insert the email into your database
    # For example, using the Supabase Python client or another service.
    # Simulate a delay if needed:
    import time
    time.sleep(0.5)

    return jsonify(
        message="Subscription successful! Thanks for joining our waitlist."
    ), 200

if __name__ == "__main__":
    app.run()