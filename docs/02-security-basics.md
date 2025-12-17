# Security Basics: Protecting Your Web App

Security isn't optional—it's essential. This guide covers fundamental security practices every developer must know.

## 🔐 Password Security

### ❌ Never Store Plain Text Passwords!

**Bad Example:**
```python
# NEVER DO THIS!
password = "mypassword123"
db.execute("INSERT INTO users (username, password) VALUES (?, ?)", 
           (username, password))
```

**Why is this bad?** If your database is compromised, all passwords are exposed!

### ✅ Always Hash Passwords

**Good Example:**
```python
from werkzeug.security import generate_password_hash, check_password_hash

# When user registers
password = request.form['password']
hashed_password = generate_password_hash(password)
# Store hashed_password in database

# When user logs in
stored_hash = get_user_hash_from_db(username)
if check_password_hash(stored_hash, password):
    # Login successful!
    pass
```

### How Password Hashing Works

```
User Password: "mypassword123"
      ↓
Hash Function (bcrypt/scrypt)
      ↓
Hashed: "$2b$12$KIXvZ8qLwJ3..."
      ↓
Stored in Database
```

**Key Points:**
- Hashing is one-way (cannot reverse)
- Same password = different hash each time (due to salt)
- Fast to verify, slow to crack

### Using bcrypt (Recommended)

```python
import bcrypt

# Hash password
password = "mypassword123".encode('utf-8')
hashed = bcrypt.hashpw(password, bcrypt.gensalt())

# Check password
if bcrypt.checkpw(password, hashed):
    print("Password matches!")
```

## 🛡️ Input Validation

**Golden Rule:** Never trust user input!

### SQL Injection Attack

**Vulnerable Code:**
```python
# NEVER DO THIS!
username = request.form['username']
query = f"SELECT * FROM users WHERE username = '{username}'"
db.execute(query)
```

**Attack:** User enters: `' OR '1'='1`
```sql
SELECT * FROM users WHERE username = '' OR '1'='1'
-- This returns ALL users!
```

### ✅ Protection: Use Parameterized Queries

```python
# ALWAYS DO THIS!
username = request.form['username']
query = "SELECT * FROM users WHERE username = ?"
db.execute(query, (username,))
```

**With SQLAlchemy/Flask:**
```python
# Even better - use ORM
user = User.query.filter_by(username=username).first()
```

### Cross-Site Scripting (XSS) Attack

**Vulnerable Code:**
```html
<!-- NEVER DO THIS! -->
<h1>Welcome {{ username }}</h1>
```

**Attack:** User sets username to: `<script>alert('Hacked!')</script>`

### ✅ Protection: Escape HTML

```html
<!-- Flask/Jinja2 does this by default! -->
<h1>Welcome {{ username }}</h1>
<!-- Outputs: Welcome &lt;script&gt;alert('Hacked!')&lt;/script&gt; -->
```

**Important:** Jinja2 auto-escapes, but be careful with `| safe` filter!

```html
<!-- DANGEROUS! -->
{{ user_content | safe }}

<!-- SAFE -->
{{ user_content }}
```

## ✅ Validation Checklist

### 1. Validate Data Types
```python
# Check if ID is a number
try:
    note_id = int(request.form['id'])
except ValueError:
    return "Invalid ID", 400
```

### 2. Validate Length
```python
# Limit input length
title = request.form['title']
if len(title) > 100:
    return "Title too long", 400
```

### 3. Validate Format
```python
import re

# Check email format
email = request.form['email']
if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
    return "Invalid email", 400
```

### 4. Whitelist, Don't Blacklist
```python
# Good: Only allow specific values
allowed_statuses = ['active', 'pending', 'completed']
status = request.form['status']
if status not in allowed_statuses:
    return "Invalid status", 400

# Bad: Trying to block every possible bad value
# (you'll always miss something!)
```

## 🚨 Common Vulnerabilities

### 1. SQL Injection
**Problem:** Attacker manipulates database queries
**Solution:** Use parameterized queries or ORM

### 2. Cross-Site Scripting (XSS)
**Problem:** Attacker injects malicious scripts
**Solution:** Escape all user input, use Content Security Policy

### 3. Broken Authentication
**Problem:** Weak passwords, exposed sessions
**Solution:** Hash passwords, use secure session management

### 4. Sensitive Data Exposure
**Problem:** Storing secrets in code, unencrypted data
**Solution:** Use environment variables, HTTPS, encrypt sensitive data

### 5. Missing Access Controls
**Problem:** Users can access others' data
**Solution:** Always check user owns the resource

```python
# Bad: Anyone can delete any note
@app.route('/notes/<id>/delete')
def delete_note(id):
    Note.query.filter_by(id=id).delete()
    db.session.commit()
    return redirect('/notes')

# Good: Check ownership
@app.route('/notes/<id>/delete')
def delete_note(id):
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if not note:
        return "Not found", 404
    db.session.delete(note)
    db.session.commit()
    return redirect('/notes')
```

## 🔒 Session Security

### Flask Session Configuration
```python
app.config['SECRET_KEY'] = 'change-this-to-random-string'
app.config['SESSION_COOKIE_SECURE'] = True  # HTTPS only
app.config['SESSION_COOKIE_HTTPONLY'] = True  # No JS access
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # CSRF protection
```

### Using Environment Variables
```python
# .env file (NEVER commit this!)
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=sqlite:///app.db

# app.py
from dotenv import load_dotenv
import os

load_dotenv()
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
```

## 📋 Security Checklist for Your Projects

Before deploying, verify:

- [ ] Passwords are hashed, never stored as plain text
- [ ] All database queries use parameterization
- [ ] User input is validated (type, length, format)
- [ ] HTML output is escaped (Jinja2 does this by default)
- [ ] Users can only access/modify their own data
- [ ] Secret keys are in environment variables, not code
- [ ] Error messages don't reveal sensitive information
- [ ] File uploads are validated (if applicable)
- [ ] Rate limiting is implemented (for production)
- [ ] HTTPS is enabled (for production)

## 🧪 Practice: Spot the Vulnerabilities

Can you identify the security issues in this code?

```python
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    # Issue #1?
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    user = db.execute(query).fetchone()
    
    if user:
        # Issue #2?
        session['user'] = username
        return f"Welcome {username}!"
    else:
        # Issue #3?
        return "Login failed! Username or password is incorrect."

@app.route('/profile/<username>')
def profile(username):
    # Issue #4?
    user = User.query.filter_by(username=username).first()
    return render_template('profile.html', user=user)
```

<details>
<summary>Click to see answers</summary>

**Issue #1:** SQL Injection - use parameterized queries
**Issue #2:** Password stored as plain text - should be hashed
**Issue #3:** Too specific error message - helps attackers know if username exists
**Issue #4:** No access control - any user can view any profile (might be okay depending on requirements)

</details>

## 📚 Learn More

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Most critical web security risks
- [Flask Security](https://flask.palletsprojects.com/en/latest/security/) - Official Flask security guide
- [Python Security Best Practices](https://python.readthedocs.io/en/latest/library/security.html)

## ⏭️ Next Steps

Understanding security is crucial. Review these concepts as you build each project.

**Continue to:** [Debugging & Testing Guide](./03-debugging-testing.md)

---

💡 **Remember:** Security is not a feature you add at the end—it's built in from the start!
