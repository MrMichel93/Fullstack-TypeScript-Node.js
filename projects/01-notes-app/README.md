# Project 1: Notes App

**Difficulty:** ⭐ Beginner

Build a simple note-taking application where users can create, read, update, and delete notes.

## 🎯 Learning Objectives

### Backend Concepts
- Setting up a Flask application
- Creating database models with SQLAlchemy
- Implementing CRUD operations (Create, Read, Update, Delete)
- Using routes and view functions
- Working with SQLite database

### Frontend Concepts
- Creating HTML forms
- Understanding GET vs POST requests
- Displaying dynamic data with Jinja2 templates
- Basic CSS styling

## ✨ Features

Your Notes App will allow users to:
- ✅ View a list of all notes
- ✅ Create a new note with title and content
- ✅ View a single note in detail
- ✅ Edit an existing note
- ✅ Delete a note

## 🏗️ Project Structure

```
01-notes-app/
├── README.md (you are here)
├── starter/
│   ├── app.py                 # Flask app with TODOs
│   ├── models.py              # Database model (completed)
│   ├── templates/
│   │   ├── base.html         # Base template (completed)
│   │   ├── index.html        # Home page with TODOs
│   │   ├── notes.html        # List all notes (TODOs)
│   │   ├── note_detail.html  # View single note (TODOs)
│   │   ├── create_note.html  # Create form (TODOs)
│   │   └── edit_note.html    # Edit form (TODOs)
│   └── static/
│       └── style.css         # Basic CSS (completed)
├── solution/
│   └── (complete working code)
└── extensions/
    └── README.md             # Challenge ideas
```

## 🚀 Getting Started

### 1. Navigate to Starter Code
```bash
cd projects/01-notes-app/starter
```

### 2. Set Up Virtual Environment (if not already done)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install Flask Flask-SQLAlchemy
```

### 3. Review the Starter Code
- Read `app.py` - Look for `TODO` comments
- Check `models.py` - Understand the Note model
- Browse `templates/` - See what's provided

### 4. Initialize Database
```bash
python
>>> from app import app, db
>>> with app.app_context():
...     db.create_all()
>>> exit()
```

### 5. Run the Application
```bash
python app.py
```

Visit http://localhost:5000

## 📝 Step-by-Step Guide

### Step 1: Create Home Route (app.py)
Look for `TODO 1` in `app.py`. Create a route that displays the home page.

**What you'll learn:**
- Creating routes with `@app.route()`
- Rendering templates with `render_template()`

### Step 2: List All Notes (app.py + notes.html)
Look for `TODO 2` and `TODO 3`. Display all notes from the database.

**What you'll learn:**
- Querying the database with SQLAlchemy
- Passing data to templates
- Looping through data in Jinja2

### Step 3: Create New Note (app.py + create_note.html)
Look for `TODO 4` and `TODO 5`. Build a form to create notes.

**What you'll learn:**
- Handling GET and POST requests
- Accessing form data with `request.form`
- Adding records to the database

### Step 4: View Single Note (app.py + note_detail.html)
Look for `TODO 6` and `TODO 7`. Show details of one note.

**What you'll learn:**
- Using URL parameters
- Handling 404 errors

### Step 5: Edit Note (app.py + edit_note.html)
Look for `TODO 8` and `TODO 9`. Update existing notes.

**What you'll learn:**
- Pre-filling forms with existing data
- Updating database records

### Step 6: Delete Note (app.py)
Look for `TODO 10`. Delete notes from the database.

**What you'll learn:**
- Handling DELETE operations
- Database transactions

## 🧪 Testing Your App

After completing each step, test it:

### Test Create
1. Go to http://localhost:5000/notes/new
2. Fill in title and content
3. Click "Create Note"
4. Verify note appears in the list

### Test Read
1. Click on a note from the list
2. Verify title and content display correctly

### Test Update
1. Click "Edit" on a note
2. Change the title or content
3. Click "Update Note"
4. Verify changes are saved

### Test Delete
1. Click "Delete" on a note
2. Verify note is removed from the list

## 🎨 Customization Ideas

Once your basic app works, try:

1. **Add Timestamps**
   - Show when each note was created
   - Display "last updated" time

2. **Add Categories/Tags**
   - Let users categorize notes
   - Filter notes by category

3. **Improve Styling**
   - Make it look professional
   - Add colors and better layout

4. **Add Search**
   - Search notes by title or content

## 🐛 Common Issues

### "Module not found"
```bash
# Make sure you're in the virtual environment
source venv/bin/activate
pip install Flask Flask-SQLAlchemy
```

### "Template not found"
- Check that templates are in `templates/` folder
- Check spelling of template filename

### "Database locked"
- Only one request at a time in SQLite
- Restart the server
- Check you're not accessing database from multiple terminals

### Changes Not Showing
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check you saved the file
- Restart Flask server

## 📚 Resources

- [Flask Quickstart](https://flask.palletsprojects.com/en/latest/quickstart/)
- [Jinja2 Template Documentation](https://jinja.palletsprojects.com/en/latest/templates/)
- [SQLAlchemy Basics](https://docs.sqlalchemy.org/en/20/tutorial/)

## ✅ Completion Checklist

Before moving to Project 2, make sure you can:

- [ ] Explain what CRUD stands for
- [ ] Describe the difference between GET and POST
- [ ] Create a form that submits data
- [ ] Query a database and display results
- [ ] Handle URL parameters (e.g., `/notes/5`)
- [ ] Understand how templates inherit from base.html

## ⏭️ Next Project

Great job! You've built your first full-stack app.

**Next:** [Project 2 - URL Shortener](../02-url-shortener/)

---

💡 **Stuck?** Check the `solution/` folder for the complete code. But try to solve it yourself first!
