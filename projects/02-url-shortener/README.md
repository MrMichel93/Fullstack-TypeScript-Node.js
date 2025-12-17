# Project 2: URL Shortener

**Difficulty:** ⭐⭐ Beginner+

Build a URL shortening service (like bit.ly) that converts long URLs into short, shareable links.

## 🎯 Learning Objectives

### Backend Concepts
- Generating unique short codes
- HTTP redirects (302 status)
- URL validation
- Handling custom routes with variables

### Frontend Concepts
- Copy to clipboard functionality
- Displaying success/error messages
- Working with URL parameters
- Dynamic content updates

## ✨ Features

Your URL Shortener will:
- ✅ Accept a long URL from the user
- ✅ Generate a unique short code (e.g., "abc123")
- ✅ Store the mapping in the database
- ✅ Redirect users from short URL to original URL
- ✅ Display statistics (click count)
- ✅ List all shortened URLs

## 🏗️ Project Structure

```
02-url-shortener/
├── README.md
├── starter/
│   ├── app.py              # Flask app with TODOs
│   ├── models.py           # URL model
│   ├── utils.py            # Helper functions (TODOs)
│   └── templates/
│       ├── base.html
│       ├── index.html      # Home page with form
│       ├── success.html    # Show shortened URL
│       └── stats.html      # List all URLs
├── solution/
└── extensions/
```

## 🚀 Key Concepts

### 1. Generating Short Codes
```python
import string
import random

def generate_short_code(length=6):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))
```

### 2. HTTP Redirects
```python
from flask import redirect

@app.route('/<short_code>')
def redirect_to_url(short_code):
    url = URL.query.filter_by(short_code=short_code).first_or_404()
    url.clicks += 1  # Track clicks
    db.session.commit()
    return redirect(url.original_url)
```

### 3. URL Validation
```python
def is_valid_url(url):
    import re
    regex = re.compile(
        r'^https?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain
        r'localhost|'  # localhost
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # or IP
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return url is not None and regex.search(url)
```

## 📝 Step-by-Step Guide

### Step 1: Set Up Database Model
Create a `URL` model with:
- `id` (primary key)
- `original_url` (the long URL)
- `short_code` (the generated code)
- `clicks` (number of times clicked)
- `created_at` (timestamp)

### Step 2: Create Home Page
- Form to input long URL
- Button to shorten
- Display recent shortened URLs

### Step 3: Implement Shortening Logic
- Validate the URL
- Generate unique short code
- Store in database
- Show success page with short URL

### Step 4: Implement Redirect
- Create catch-all route for short codes
- Look up original URL
- Increment click counter
- Redirect to original URL

### Step 5: Add Statistics Page
- List all shortened URLs
- Show original URL, short code, and click count
- Add delete functionality

## 🧪 Testing Checklist

- [ ] Can shorten a valid URL
- [ ] Invalid URLs show error message
- [ ] Short URL redirects correctly
- [ ] Click counter increments
- [ ] Can see list of all URLs
- [ ] Can delete a shortened URL
- [ ] Short codes are unique

## 🎨 Extension Ideas

1. **Custom Short Codes** - Let users choose their own code
2. **QR Codes** - Generate QR code for each short URL
3. **Expiration** - URLs expire after X days
4. **Analytics** - Track when/where clicks came from
5. **API** - Create JSON API for shortening URLs

## 📚 Resources

- [Flask Redirects](https://flask.palletsprojects.com/en/latest/api/#flask.redirect)
- [Regular Expressions in Python](https://docs.python.org/3/library/re.html)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## ⏭️ Next Project

**Next:** [Project 3 - Simple Blog](../03-simple-blog/)
