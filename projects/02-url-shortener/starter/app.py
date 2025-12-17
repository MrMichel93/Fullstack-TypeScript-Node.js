"""
URL Shortener - Starter Code
Follow the TODO comments to build a URL shortening service!
"""

from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import string
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///urls.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'

db = SQLAlchemy(app)


# Database Model
class URL(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    original_url = db.Column(db.String(500), nullable=False)
    short_code = db.Column(db.String(10), unique=True, nullable=False)
    clicks = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<URL {self.short_code}>'


# TODO 1: Create a function to generate random short codes
# Requirements:
# - Use letters (uppercase and lowercase) and digits
# - Default length should be 6 characters
# - Return a string like "aB3xYz"
def generate_short_code(length=6):
    pass  # Replace with your implementation


# TODO 2: Create a function to validate URLs
# Requirements:
# - Check if URL starts with http:// or https://
# - Basic format validation
# - Return True if valid, False otherwise
def is_valid_url(url):
    pass  # Replace with your implementation


# TODO 3: Create home route
# Display the home page with the URL shortening form
@app.route('/')
def index():
    pass  # Replace with your implementation


# TODO 4: Create route to handle URL shortening
# This route should:
# - Accept POST requests from the form
# - Get the original URL from the form
# - Validate the URL
# - Generate a unique short code
# - Save to database
# - Redirect to success page with the short code
@app.route('/shorten', methods=['POST'])
def shorten_url():
    pass  # Replace with your implementation


# TODO 5: Create route to display the shortened URL
# Show the short URL and provide a copy button
@app.route('/success/<short_code>')
def success(short_code):
    pass  # Replace with your implementation


# TODO 6: Create redirect route
# This is the most important route!
# When someone visits /<short_code>:
# - Look up the original URL in the database
# - Increment the click counter
# - Redirect to the original URL
@app.route('/<short_code>')
def redirect_to_url(short_code):
    pass  # Replace with your implementation


# TODO 7: Create stats page
# Display a list of all shortened URLs with:
# - Original URL
# - Short code
# - Click count
# - Created date
@app.route('/stats')
def stats():
    pass  # Replace with your implementation


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
