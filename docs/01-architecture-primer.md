# Architecture Primer: How Web Apps Work

Before you build, you need to understand the big picture. This guide explains the fundamental concepts that power every web application.

## 🌐 Client vs Server

### The Client (Frontend)
**What is it?** The client is what runs in your web browser.

**What does it do?**
- Displays the user interface (HTML, CSS)
- Handles user interactions (clicking buttons, filling forms)
- Sends requests to the server
- Displays data received from the server

**Example:** When you type a URL and press Enter, your browser (the client) sends a request to a server.

### The Server (Backend)
**What is it?** The server is a computer that runs your Python code and responds to client requests.

**What does it do?**
- Receives requests from clients
- Processes business logic (calculations, decisions)
- Interacts with the database
- Sends responses back to clients

**Example:** Your Flask/FastAPI app is the server. It processes requests and sends back HTML pages or data.

### Simple Analogy
Think of a restaurant:
- **Client** = Customer who orders food
- **Server** = Waiter who takes orders and brings food
- **Backend Logic** = Kitchen that prepares the food
- **Database** = Pantry that stores ingredients

## 🔄 Request/Response Lifecycle

Every interaction follows this pattern:

```
1. User Action → 2. HTTP Request → 3. Server Processing → 4. HTTP Response → 5. Display Result
```

### Step-by-Step Example: Loading a Notes Page

```
1. USER TYPES URL
   Browser: "I want to see http://localhost:5000/notes"

2. BROWSER SENDS HTTP REQUEST
   GET /notes HTTP/1.1
   Host: localhost:5000
   
3. SERVER RECEIVES REQUEST
   Flask app.py receives the request
   
4. SERVER PROCESSES
   - Routes request to correct function
   - Queries database for all notes
   - Prepares HTML with note data
   
5. SERVER SENDS HTTP RESPONSE
   HTTP/1.1 200 OK
   Content-Type: text/html
   
   <html>
     <body>
       <h1>My Notes</h1>
       <ul>
         <li>Buy groceries</li>
         <li>Study Python</li>
       </ul>
     </body>
   </html>
   
6. BROWSER DISPLAYS PAGE
   User sees the notes page with their notes listed
```

## 📡 HTTP Methods (Verbs)

HTTP methods tell the server what action you want to perform:

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Retrieve data | `GET /notes` - View all notes |
| **POST** | Create new data | `POST /notes` - Create a new note |
| **PUT** | Update existing data | `PUT /notes/5` - Update note #5 |
| **DELETE** | Remove data | `DELETE /notes/5` - Delete note #5 |

### GET vs POST (Most Common)

**GET Requests:**
- Used to retrieve/view data
- Data sent in URL (visible)
- Can be bookmarked
- Example: `http://example.com/search?q=python`

**POST Requests:**
- Used to submit/create data
- Data sent in request body (hidden)
- Cannot be bookmarked
- Example: Submitting a form to create a note

## 🗄️ Where Does Data Live?

### Three Layers of Data Storage

```
┌─────────────────────────┐
│   Frontend (Client)     │
│   Variables in Browser  │  ← Temporary, lost on refresh
└─────────────────────────┘
           ↕ HTTP
┌─────────────────────────┐
│   Backend (Server)      │
│   Variables in Python   │  ← Temporary, lost on restart
└─────────────────────────┘
           ↕ SQL
┌─────────────────────────┐
│   Database (SQLite)     │
│   Files on Disk         │  ← Permanent storage
└─────────────────────────┘
```

**Key Point:** Only data in the database survives server restarts!

## 🎯 A Complete Example: Creating a Note

Let's trace what happens when you create a note:

### 1. Frontend (HTML Form)
```html
<form action="/notes" method="POST">
  <input type="text" name="title" placeholder="Note title">
  <textarea name="content" placeholder="Note content"></textarea>
  <button type="submit">Create Note</button>
</form>
```

### 2. User Action
- User types "Buy milk" as title
- User types "Get 2% milk from store" as content
- User clicks "Create Note" button

### 3. Browser Sends POST Request
```
POST /notes HTTP/1.1
Host: localhost:5000
Content-Type: application/x-www-form-urlencoded

title=Buy+milk&content=Get+2%25+milk+from+store
```

### 4. Flask Server Receives Request
```python
@app.route('/notes', methods=['POST'])
def create_note():
    # Get data from form
    title = request.form['title']
    content = request.form['content']
    
    # Create new note object
    note = Note(title=title, content=content)
    
    # Save to database
    db.session.add(note)
    db.session.commit()
    
    # Redirect to notes list
    return redirect('/notes')
```

### 5. Database Saves Note
SQLite stores the note permanently:
```
notes table:
+----+----------+---------------------------+
| id | title    | content                   |
+----+----------+---------------------------+
| 1  | Buy milk | Get 2% milk from store    |
+----+----------+---------------------------+
```

### 6. Server Sends Response
```
HTTP/1.1 302 Found
Location: /notes
```

### 7. Browser Redirects
Browser automatically makes a new GET request to `/notes`

### 8. Server Returns Notes List
```python
@app.route('/notes')
def list_notes():
    notes = Note.query.all()  # Get all notes from database
    return render_template('notes.html', notes=notes)
```

### 9. User Sees Updated Page
The notes page now shows the newly created note!

## 🔑 Key Concepts to Remember

### 1. Stateless HTTP
Each request is independent. The server doesn't remember previous requests unless you use:
- Database (permanent storage)
- Sessions (temporary user-specific data)
- Cookies (small data stored in browser)

### 2. URL Structure
```
https://example.com:5000/notes/123?sort=date#top
│      │          │    │        │         │
scheme  domain    port  path   query   fragment
```

### 3. Status Codes
The server tells the client what happened:
- **200 OK** - Success!
- **302 Found** - Redirect to another page
- **404 Not Found** - Page doesn't exist
- **500 Internal Server Error** - Something broke on the server

## 🧪 Test Your Understanding

Before moving to Project 1, make sure you can answer:

1. What's the difference between client and server?
2. What happens when you type a URL and press Enter?
3. When should you use GET vs POST?
4. Where should you store data that needs to survive a server restart?
5. What's the role of the database in a web app?

## ⏭️ Next Steps

Now that you understand the architecture, you're ready to build!

**Start with:** [Project 1 - Notes App](../projects/01-notes-app/)

---

💡 **Pro Tip:** Keep this document open as a reference while building your first project. These concepts will make more sense as you see them in action!
