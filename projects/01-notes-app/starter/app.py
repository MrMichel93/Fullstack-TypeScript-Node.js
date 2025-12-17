"""
Notes App - Starter Code
Follow the TODO comments to build your first web app!
"""

from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notes.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'

db = SQLAlchemy(app)


# Database Model
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f'<Note {self.title}>'


# TODO 1: Create home route
# Create a route for '/' that renders 'index.html'
# Hint: Use @app.route() decorator and render_template()


# TODO 2: Create route to list all notes
# Create a route for '/notes' that:
# - Queries all notes from the database
# - Passes them to 'notes.html' template
# Hint: Use Note.query.all() to get all notes


# TODO 3: Create route to show the form for creating a new note
# Create a route for '/notes/new' that:
# - Only handles GET requests
# - Renders 'create_note.html'


# TODO 4: Create route to handle creating a new note
# Create a route for '/notes' that:
# - Only handles POST requests
# - Gets 'title' and 'content' from request.form
# - Creates a new Note object
# - Adds it to the database and commits
# - Redirects to '/notes'
# Hint: Use methods=['POST'] in the decorator


# TODO 5: Create route to view a single note
# Create a route for '/notes/<int:note_id>' that:
# - Gets the note with the given ID
# - Renders 'note_detail.html' with the note
# - Returns 404 if note not found
# Hint: Use Note.query.get_or_404(note_id)


# TODO 6: Create route to show the edit form
# Create a route for '/notes/<int:note_id>/edit' that:
# - Gets the note with the given ID
# - Renders 'edit_note.html' with the note
# Hint: Similar to TODO 5


# TODO 7: Create route to handle updating a note
# Create a route for '/notes/<int:note_id>' that:
# - Only handles POST requests (methods=['POST'])
# - Gets the note with the given ID
# - Updates its title and content from request.form
# - Commits changes to database
# - Redirects to note detail page
# Hint: Use url_for('note_detail', note_id=note_id)


# TODO 8: Create route to delete a note
# Create a route for '/notes/<int:note_id>/delete' that:
# - Only handles POST requests
# - Gets the note with the given ID
# - Deletes it from the database using db.session.delete()
# - Commits the changes
# - Redirects to '/notes'


if __name__ == '__main__':
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Run the app
    app.run(debug=True)
