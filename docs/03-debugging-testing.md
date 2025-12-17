# Debugging & Testing: Finding and Fixing Issues

Writing code is half the job. The other half is making it work correctly and keeping it working.

## 🐛 Debugging Strategies

### The Scientific Method for Debugging

1. **Observe** - What's actually happening?
2. **Hypothesize** - What might be causing it?
3. **Test** - Try one fix at a time
4. **Verify** - Did it work?
5. **Repeat** - If not, try another hypothesis

### Print Debugging (Your Best Friend)

**Simple but effective:**
```python
@app.route('/notes/<int:note_id>')
def get_note(note_id):
    print(f"🔍 Looking for note with ID: {note_id}")
    note = Note.query.filter_by(id=note_id).first()
    print(f"📝 Found note: {note}")
    
    if not note:
        print("❌ Note not found!")
        return "Not found", 404
    
    print(f"✅ Returning note: {note.title}")
    return render_template('note.html', note=note)
```

**Pro Tips:**
- Use emojis to make output easy to scan: 🔍 ✅ ❌ 📝
- Print variable types: `print(f"Type: {type(note_id)}")`
- Print at entry and exit of functions
- Remove or comment out prints before committing!

### Flask Debug Mode

**Enable it during development:**
```python
# app.py
if __name__ == '__main__':
    app.run(debug=True)
```

**Benefits:**
- Auto-reload when code changes
- Detailed error pages
- Interactive debugger in browser

**⚠️ WARNING: Never use debug=True in production!**

### Using Python's pdb Debugger

**Add breakpoints:**
```python
import pdb

@app.route('/notes', methods=['POST'])
def create_note():
    title = request.form['title']
    pdb.set_trace()  # Execution stops here
    note = Note(title=title)
    db.session.add(note)
    db.session.commit()
```

**pdb Commands:**
- `n` - next line
- `s` - step into function
- `c` - continue execution
- `p variable` - print variable
- `l` - show current location
- `q` - quit debugger

## 📊 Logging (Better than Prints)

### Why Logging?

- Can turn on/off without changing code
- Different levels (INFO, WARNING, ERROR)
- Can save to files
- Can filter by severity

### Basic Logging Setup

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

@app.route('/notes', methods=['POST'])
def create_note():
    logger.info("Creating new note")
    
    try:
        title = request.form['title']
        logger.debug(f"Note title: {title}")
        
        note = Note(title=title)
        db.session.add(note)
        db.session.commit()
        
        logger.info(f"Note created with ID: {note.id}")
        return redirect('/notes')
        
    except Exception as e:
        logger.error(f"Error creating note: {e}")
        return "Error creating note", 500
```

### Logging Levels

| Level | When to Use | Example |
|-------|-------------|---------|
| **DEBUG** | Detailed diagnostic info | Variable values, function entry/exit |
| **INFO** | General information | Request received, operation completed |
| **WARNING** | Something unexpected | Deprecated feature used, high memory usage |
| **ERROR** | Serious problem | Database connection failed, file not found |
| **CRITICAL** | System-level failure | Database corrupted, out of memory |

### Advanced Logging Configuration

```python
import logging
from logging.handlers import RotatingFileHandler

# Create logs directory if it doesn't exist
import os
if not os.path.exists('logs'):
    os.mkdir('logs')

# Configure file handler
file_handler = RotatingFileHandler(
    'logs/app.log',
    maxBytes=10240,  # 10KB
    backupCount=10
)
file_handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
))
file_handler.setLevel(logging.INFO)

# Configure console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# Add handlers to app
app.logger.addHandler(file_handler)
app.logger.addHandler(console_handler)
app.logger.setLevel(logging.INFO)
```

## 🚨 Error Handling

### Try-Except Blocks

**Always handle expected errors:**
```python
@app.route('/notes/<int:note_id>/delete', methods=['POST'])
def delete_note(note_id):
    try:
        note = Note.query.get_or_404(note_id)
        db.session.delete(note)
        db.session.commit()
        logger.info(f"Deleted note {note_id}")
        return redirect('/notes')
        
    except Exception as e:
        logger.error(f"Error deleting note {note_id}: {e}")
        db.session.rollback()
        return "Error deleting note", 500
```

### Custom Error Pages

```python
@app.errorhandler(404)
def not_found(error):
    logger.warning(f"404 error: {request.url}")
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"500 error: {error}")
    db.session.rollback()
    return render_template('500.html'), 500
```

### Validation with Helpful Error Messages

```python
@app.route('/notes', methods=['POST'])
def create_note():
    title = request.form.get('title', '').strip()
    content = request.form.get('content', '').strip()
    
    # Validate input
    errors = []
    
    if not title:
        errors.append("Title is required")
    
    if len(title) > 100:
        errors.append("Title must be less than 100 characters")
    
    if not content:
        errors.append("Content is required")
    
    if errors:
        logger.warning(f"Validation errors: {errors}")
        return render_template('new_note.html', errors=errors)
    
    # Proceed with creation
    note = Note(title=title, content=content)
    db.session.add(note)
    db.session.commit()
    
    return redirect('/notes')
```

## 🧪 Testing Basics

### Why Test?

- Catch bugs before users do
- Confidence when making changes
- Documents how code should work
- Prevents regression (old bugs coming back)

### Manual Testing Checklist

For each feature, test:

**Happy Path:**
- [ ] Feature works with valid input
- [ ] Success message/redirect works
- [ ] Data appears correctly

**Edge Cases:**
- [ ] Empty input
- [ ] Very long input
- [ ] Special characters
- [ ] Duplicate data

**Error Cases:**
- [ ] Invalid input
- [ ] Missing required fields
- [ ] Unauthorized access

### Simple Automated Testing

**test_app.py:**
```python
import pytest
from app import app, db, Note

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_home_page(client):
    """Test home page loads"""
    response = client.get('/')
    assert response.status_code == 200

def test_create_note(client):
    """Test creating a note"""
    response = client.post('/notes', data={
        'title': 'Test Note',
        'content': 'Test Content'
    }, follow_redirects=True)
    
    assert response.status_code == 200
    assert b'Test Note' in response.data

def test_empty_title(client):
    """Test validation for empty title"""
    response = client.post('/notes', data={
        'title': '',
        'content': 'Test Content'
    })
    
    assert b'Title is required' in response.data
```

**Run tests:**
```bash
pytest test_app.py
```

## 🔍 Common Debugging Scenarios

### Issue: "Cannot find module"
```
ModuleNotFoundError: No module named 'flask'
```

**Solution:**
```bash
# Check if venv is activated
which python  # Should show path to venv

# Install missing module
pip install flask
```

### Issue: "Template not found"
```
jinja2.exceptions.TemplateNotFound: notes.html
```

**Solution:**
```python
# Check file structure
project/
  app.py
  templates/
    notes.html  # Must be in templates folder!

# In app.py, just use filename
return render_template('notes.html')
```

### Issue: Database errors
```
sqlalchemy.exc.IntegrityError: UNIQUE constraint failed
```

**Solution:**
```python
# Add try-except for database operations
try:
    db.session.commit()
except IntegrityError:
    db.session.rollback()
    return "Duplicate entry", 400
```

### Issue: Form data not received
```python
# Returns None
title = request.form['title']
```

**Solutions:**
1. Check form method matches route: `methods=['POST']`
2. Check input has `name` attribute: `<input name="title">`
3. Use `.get()` for safer access: `request.form.get('title', '')`

## 📋 Debugging Checklist

When something isn't working:

1. **Read the error message** - It usually tells you what's wrong
2. **Check recent changes** - What did you change last?
3. **Verify assumptions** - Is the data what you think it is?
4. **Isolate the problem** - Where exactly does it break?
5. **Google the error** - Others have likely had the same issue
6. **Check documentation** - Are you using the function correctly?
7. **Ask for help** - Explain the problem to someone (or a rubber duck!)

## 🛠️ Useful Debugging Tools

### Flask Debug Toolbar
```python
from flask_debugtoolbar import DebugToolbarExtension

app.config['SECRET_KEY'] = 'dev'
toolbar = DebugToolbarExtension(app)
```

### Check Database Contents
```bash
# Open SQLite database
sqlite3 app.db

# List tables
.tables

# Query data
SELECT * FROM notes;

# Exit
.quit
```

### Browser DevTools
- **Console** - JavaScript errors, network requests
- **Network** - See all HTTP requests/responses
- **Elements** - Inspect HTML/CSS

## 💡 Best Practices

1. **Test as you build** - Don't wait until the end
2. **Fix one thing at a time** - Don't make multiple changes
3. **Use version control** - Commit working code frequently
4. **Write error messages for humans** - "Title is required" not "Error 400"
5. **Log important events** - You'll thank yourself later
6. **Handle expected errors** - Database failures, invalid input
7. **Don't catch all exceptions** - Only catch what you can handle

## ⏭️ Next Steps

You now have the tools to debug and test your projects. Apply these techniques as you build!

**Start building:** [Project 1 - Notes App](../projects/01-notes-app/)

---

💡 **Remember:** Every expert programmer was once a beginner who never gave up debugging!
