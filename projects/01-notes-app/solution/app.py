"""
Notes App - Complete Solution
This is the working version of the notes app
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


@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')


@app.route('/notes')
def notes():
    """List all notes"""
    all_notes = Note.query.all()
    return render_template('notes.html', notes=all_notes)


@app.route('/notes/new')
def new_note():
    """Show form to create a new note"""
    return render_template('create_note.html')


@app.route('/notes', methods=['POST'])
def create_note():
    """Handle creating a new note"""
    title = request.form.get('title', '').strip()
    content = request.form.get('content', '').strip()
    
    if title and content:
        note = Note(title=title, content=content)
        db.session.add(note)
        db.session.commit()
    
    return redirect(url_for('notes'))


@app.route('/notes/<int:note_id>')
def note_detail(note_id):
    """View a single note"""
    note = Note.query.get_or_404(note_id)
    return render_template('note_detail.html', note=note)


@app.route('/notes/<int:note_id>/edit')
def edit_note(note_id):
    """Show form to edit a note"""
    note = Note.query.get_or_404(note_id)
    return render_template('edit_note.html', note=note)


@app.route('/notes/<int:note_id>', methods=['POST'])
def update_note(note_id):
    """Handle updating a note"""
    note = Note.query.get_or_404(note_id)
    
    title = request.form.get('title', '').strip()
    content = request.form.get('content', '').strip()
    
    if title and content:
        note.title = title
        note.content = content
        db.session.commit()
    
    return redirect(url_for('note_detail', note_id=note.id))


@app.route('/notes/<int:note_id>/delete', methods=['POST'])
def delete_note(note_id):
    """Delete a note"""
    note = Note.query.get_or_404(note_id)
    db.session.delete(note)
    db.session.commit()
    
    return redirect(url_for('notes'))


if __name__ == '__main__':
    # Create database tables
    with app.app_context():
        db.create_all()
    
    # Run the app
    app.run(debug=True)
