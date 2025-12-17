# Project 3: Simple Blog

**Difficulty:** ⭐⭐⭐ Intermediate

Build a multi-user blog where users can register, login, create posts, and comment on others' posts.

## 🎯 Learning Objectives

### Backend Concepts
- User authentication and sessions
- Password hashing with bcrypt
- User-specific data (posts belong to users)
- Relationships between models (User → Posts → Comments)
- Protected routes (login required)

### Frontend Concepts
- Login and registration forms
- Session management (showing logged-in user)
- Conditional rendering (show/hide based on auth)
- Form validation feedback

## ✨ Features

Your Blog will:
- ✅ User registration with hashed passwords
- ✅ User login/logout with sessions
- ✅ Create, edit, delete own blog posts
- ✅ View all posts from all users
- ✅ Add comments to posts
- ✅ User profile page
- ✅ Author attribution on posts

## 🏗️ Database Models

### User
- id
- username (unique)
- email (unique)
- password_hash
- created_at

### Post
- id
- title
- content
- author_id (foreign key to User)
- created_at
- updated_at

### Comment (Optional Extension)
- id
- content
- post_id (foreign key to Post)
- author_id (foreign key to User)
- created_at

## 🔐 Security Considerations

**Critical:** Never store plain text passwords!

```python
from werkzeug.security import generate_password_hash, check_password_hash

# When registering
password_hash = generate_password_hash(password)

# When logging in
if check_password_hash(user.password_hash, password):
    # Login successful
```

**Session Management:**
```python
from flask import session

# After successful login
session['user_id'] = user.id
session['username'] = user.username

# Check if logged in
def is_logged_in():
    return 'user_id' in session

# Logout
session.clear()
```

## 📝 Step-by-Step Guide

### Step 1: User Registration
- Create registration form
- Validate username/email uniqueness
- Hash password before storing
- Auto-login after registration

### Step 2: User Login
- Create login form
- Check credentials
- Create session
- Redirect to homepage

### Step 3: Create Posts (Auth Required)
- Check if user is logged in
- Create post linked to current user
- Display author name on posts

### Step 4: Edit/Delete Own Posts
- Verify post belongs to current user
- Only show edit/delete buttons on own posts
- Handle unauthorized attempts

### Step 5: View Posts
- Show all posts from all users
- Display author name and date
- Link to author profile

### Step 6: User Profile
- Show user's information
- List all posts by that user
- Show total post count

## 🧪 Testing Checklist

**Authentication:**
- [ ] Can register new user
- [ ] Cannot register duplicate username
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong password
- [ ] Can logout
- [ ] Session persists across requests

**Posts:**
- [ ] Logged-in users can create posts
- [ ] Cannot create post when logged out
- [ ] Can edit own posts only
- [ ] Can delete own posts only
- [ ] Cannot edit/delete others' posts

**Security:**
- [ ] Passwords are hashed in database
- [ ] Protected routes redirect to login
- [ ] Session data is validated

## 🎨 Extension Ideas

1. **Comments** - Add commenting system
2. **Post Categories** - Tag posts with categories
3. **Like System** - Users can like posts
4. **Profile Pictures** - Upload avatar images
5. **Markdown** - Support markdown in posts
6. **Follow Users** - Follow other bloggers
7. **Email Verification** - Verify email on registration
8. **Password Reset** - Forgot password functionality
9. **Search** - Search posts by title/content
10. **Pagination** - Show posts in pages (10 per page)

## 🐛 Common Issues

### Session Not Persisting
- Make sure `app.config['SECRET_KEY']` is set
- Check browser cookies are enabled

### Authorization Failing
- Always check `'user_id' in session` before accessing
- Redirect to login if not authenticated

### Circular Imports
- Put models in separate file
- Import app in models: `from app import db`

## 📚 Resources

- [Flask Sessions](https://flask.palletsprojects.com/en/latest/quickstart/#sessions)
- [Werkzeug Security](https://werkzeug.palletsprojects.com/en/latest/utils/#module-werkzeug.security)
- [SQLAlchemy Relationships](https://docs.sqlalchemy.org/en/20/orm/relationships.html)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## ⏭️ Next Project

**Next:** [Project 4 - Inventory Tracker](../04-inventory-tracker/)
