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
**What is it?** The server is a computer that runs your TypeScript/Node.js code and responds to client requests.

**What does it do?**
- Receives requests from clients
- Processes business logic (calculations, decisions)
- Interacts with the database
- Sends responses back to clients

**Example:** Your Express app is the server. It processes requests and sends back HTML pages or JSON data.

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

### Step-by-Step Example: Loading a Task List

```
1. USER TYPES URL
   Browser: "I want to see http://localhost:3000/tasks"

2. BROWSER SENDS HTTP REQUEST
   GET /tasks HTTP/1.1
   Host: localhost:3000
   
3. SERVER RECEIVES REQUEST
   Express server.ts receives the request
   
4. SERVER PROCESSES
   - Routes request to correct handler
   - Queries database for all tasks
   - Sends JSON data or renders HTML
   
5. SERVER SENDS HTTP RESPONSE
   HTTP/1.1 200 OK
   Content-Type: application/json
   
   {
     "tasks": [
       { "id": 1, "title": "Buy groceries", "completed": false },
       { "id": 2, "title": "Study TypeScript", "completed": false }
     ]
   }
   
6. BROWSER DISPLAYS DATA
   JavaScript in the browser renders the task list
   User sees their tasks displayed
```

## 📡 HTTP Methods (Verbs)

HTTP methods tell the server what action you want to perform:

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Retrieve data | `GET /api/tasks` - Get all tasks |
| **POST** | Create new data | `POST /api/tasks` - Create a new task |
| **PUT** | Update existing data | `PUT /api/tasks/5` - Update task #5 |
| **DELETE** | Remove data | `DELETE /api/tasks/5` - Delete task #5 |

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
- Example: API call to create a new task with JSON data

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
│Variables in TypeScript  │  ← Temporary, lost on restart
└─────────────────────────┘
           ↕ SQL
┌─────────────────────────┐
│   Database              │
│ SQLite or PostgreSQL    │  ← Permanent storage
└─────────────────────────┘
```

**Key Point:** Only data in the database survives server restarts!

## 🎯 A Complete Example: Creating a Task

Let's trace what happens when you create a task via a REST API:

### 1. Frontend (JavaScript Fetch)
```typescript
// User fills out a form, JavaScript sends request
async function createTask() {
  const task = {
    title: "Buy milk",
    description: "Get 2% milk from store",
    completed: false
  };

  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

  const result = await response.json();
  console.log('Task created:', result);
}
```

### 2. User Action
- User types "Buy milk" as title
- User types "Get 2% milk from store" as description
- User clicks "Create Task" button
- JavaScript function runs

### 3. Browser Sends POST Request
```
POST /api/tasks HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "title": "Buy milk",
  "description": "Get 2% milk from store",
  "completed": false
}
```

### 4. Express Server Receives Request
```typescript
// src/routes/tasks.ts
import { Router, Request, Response } from 'express';

const router = Router();

interface CreateTaskBody {
  title: string;
  description: string;
  completed: boolean;
}

router.post('/', async (req: Request<{}, {}, CreateTaskBody>, res: Response) => {
  try {
    // Get data from request body
    const { title, description, completed } = req.body;
    
    // Validate input
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }
    
    // Save to database
    const task = await db.tasks.create({
      title,
      description,
      completed
    });
    
    // Send success response
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
```

### 5. Database Saves Task
Database stores the task permanently:
```
tasks table:
+----+----------+---------------------------+-----------+
| id | title    | description               | completed |
+----+----------+---------------------------+-----------+
| 1  | Buy milk | Get 2% milk from store    | false     |
+----+----------+---------------------------+-----------+
```

### 6. Server Sends Response
```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "task": {
    "id": 1,
    "title": "Buy milk",
    "description": "Get 2% milk from store",
    "completed": false
  }
}
```

### 7. Frontend Receives Response
JavaScript receives the response and can:
- Display a success message
- Add the task to the UI
- Clear the form

### 8. User Sees Updated Interface
The task list updates dynamically without a page reload!

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

**Start with:** [Project 1 - Authentication System](../projects/01-auth-system/)

---

💡 **Pro Tip:** Keep this document open as a reference while building your first project. These concepts will make more sense as you see them in action!
