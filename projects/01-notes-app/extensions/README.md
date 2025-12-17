# Extension Challenges for Notes App

Completed the basic Notes App? Great! Here are some challenges to level up your skills.

## 🌟 Beginner Extensions

### 1. Add Timestamps
**Goal:** Show when notes were created and updated

**What to learn:**
- Adding new columns to database models
- Working with datetime in Python
- Displaying formatted dates in templates

**Steps:**
1. Add `created_at` and `updated_at` fields to Note model
2. Set `created_at` when creating a note
3. Update `updated_at` when editing a note
4. Display timestamps in the note detail page

**Hint:**
```python
from datetime import datetime

class Note(db.Model):
    # ... existing fields ...
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### 2. Character Count
**Goal:** Show character count while typing

**What to learn:**
- Basic JavaScript for interactivity
- DOM manipulation
- Event listeners

**Steps:**
1. Add a character counter below the content textarea
2. Update the count as the user types
3. Show a warning if they exceed a limit (e.g., 1000 characters)

**Hint:**
```javascript
<script>
const textarea = document.getElementById('content');
const counter = document.getElementById('charCount');

textarea.addEventListener('input', function() {
    counter.textContent = textarea.value.length;
});
</script>
```

### 3. Note Categories
**Goal:** Add color-coded categories (Personal, Work, Ideas)

**What to learn:**
- Adding dropdown selects to forms
- Conditional styling based on data

**Steps:**
1. Add a `category` field to the Note model
2. Add a dropdown in create/edit forms
3. Display category badge on note cards
4. Style each category with different colors

## ⭐⭐ Intermediate Extensions

### 4. Search Functionality
**Goal:** Search notes by title or content

**What to learn:**
- Query parameters in URLs
- Database filtering with SQLAlchemy
- Form submissions with GET method

**Steps:**
1. Add a search form on the notes list page
2. Create a route that handles the search query
3. Filter notes based on the search term
4. Display results with highlighting

**Hint:**
```python
search = request.args.get('q', '')
if search:
    notes = Note.query.filter(
        Note.title.contains(search) | Note.content.contains(search)
    ).all()
```

### 5. Sort and Filter
**Goal:** Sort notes by date, title, or filter by category

**What to learn:**
- Database ordering
- Multiple query parameters
- Building dynamic queries

**Steps:**
1. Add sort dropdown (Newest, Oldest, A-Z, Z-A)
2. Implement sorting in the backend
3. Preserve sort choice in URL
4. Add category filter if you did Extension #3

### 6. Note Tags
**Goal:** Add multiple tags to each note

**What to learn:**
- Many-to-many relationships in databases
- Working with lists in forms
- Advanced SQLAlchemy queries

**Steps:**
1. Create a Tag model
2. Create a many-to-many relationship
3. Add tag input in forms (comma-separated)
4. Display tags on notes
5. Click tag to see all notes with that tag

## ⭐⭐⭐ Advanced Extensions

### 7. Markdown Support
**Goal:** Write notes in Markdown and render them as HTML

**What to learn:**
- Using Python libraries (markdown)
- Safe HTML rendering in Jinja2
- Text formatting basics

**Steps:**
1. Install markdown library: `pip install markdown`
2. Convert note content to HTML before displaying
3. Add a markdown cheat sheet link
4. Prevent XSS attacks (sanitize HTML)

**Hint:**
```python
import markdown
html_content = markdown.markdown(note.content)
```

### 8. Export Notes
**Goal:** Export notes as text file or PDF

**What to learn:**
- File generation in Flask
- Response headers for downloads
- Working with different file formats

**Steps:**
1. Add "Export" button on note detail page
2. Create route that generates text file
3. Set proper headers for download
4. (Advanced) Generate PDF using reportlab

### 9. Note Sharing
**Goal:** Generate shareable links for notes

**What to learn:**
- Generating unique URLs
- Public vs private routes
- Security considerations

**Steps:**
1. Add a "share_token" field to Note model
2. Generate random tokens for sharing
3. Create public route using token
4. Add "Get Shareable Link" button
5. Copy link to clipboard with JavaScript

## 🚀 Expert Extensions

### 10. Rich Text Editor
**Goal:** Use a WYSIWYG editor instead of plain textarea

**What to learn:**
- Integrating third-party JavaScript libraries
- Handling HTML content safely
- Frontend-backend integration

**Try:** Quill, TinyMCE, or CKEditor

### 11. Image Uploads
**Goal:** Allow users to add images to notes

**What to learn:**
- File uploads in Flask
- File storage and validation
- Security best practices for uploads

### 12. Collaborative Notes
**Goal:** Multiple users can edit the same note

**What to learn:**
- User authentication
- Permissions and access control
- Real-time updates (WebSockets)

## 💡 Tips for Extensions

1. **Start Small** - Complete one extension before starting another
2. **Test Thoroughly** - Make sure the base app still works
3. **Commit Often** - Use git to save your progress
4. **Read Documentation** - Learn about libraries before using them
5. **Handle Errors** - What if the user enters invalid data?

## 📚 Resources

- [SQLAlchemy Relationships](https://docs.sqlalchemy.org/en/20/orm/relationships.html)
- [Markdown in Python](https://python-markdown.github.io/)
- [Flask File Uploads](https://flask.palletsprojects.com/en/latest/patterns/fileuploads/)
- [JavaScript DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

---

**Pick an extension and start coding!** Each one teaches you something new that you'll use in future projects.
