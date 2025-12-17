# Project 3: Simple Dashboard (Frontend)

Build an interactive dashboard using vanilla TypeScript (no frameworks!) that consumes your Task Manager API.

## 🎯 Learning Objectives

- Write TypeScript for the browser
- Fetch data from REST APIs
- Handle authentication in the frontend
- Dynamic DOM manipulation
- Form handling and validation
- Error handling in async operations
- Local storage for token management

## 🛠️ Tech Stack

- **Language:** TypeScript (compiled to JavaScript)
- **Styling:** CSS3
- **Bundler:** None (keep it simple) or Vite
- **Backend:** Your Task Manager API from Project 2

## 📋 Requirements

### Core Features

1. **Login Page**
   - Email and password inputs
   - Call `/api/auth/login` endpoint
   - Store JWT token in localStorage
   - Redirect to dashboard on success

2. **Dashboard Page**
   - Display user's tasks
   - Filter by status (todo, in-progress, done)
   - Filter by priority
   - Visual status indicators

3. **Task Management**
   - Create new task (modal or form)
   - Mark task as complete
   - Delete task
   - Edit task (optional)

4. **User Experience**
   - Loading states
   - Error messages
   - Success notifications
   - Responsive design (mobile-friendly)

5. **Authentication Flow**
   - Redirect to login if no token
   - Logout functionality
   - Show user info

## 🚀 Getting Started

### Prerequisites

- Complete Project 2 (Task Manager API)
- Task Manager API running on http://localhost:3000

### Setup

```bash
cd projects/03-simple-dashboard/starter
npm install
npm run dev
```

## 📝 Implementation Guide

### Step 1: Project Structure

```
public/
├── index.html         # Login page
├── dashboard.html     # Main dashboard
├── styles/
│   ├── main.css
│   └── dashboard.css
├── dist/              # Compiled JavaScript
└── src/
    ├── types.ts       # TypeScript interfaces
    ├── api.ts         # API client
    ├── auth.ts        # Authentication logic
    ├── login.ts       # Login page script
    └── dashboard.ts   # Dashboard page script
```

### Step 2: Define Types

```typescript
// src/types.ts
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Step 3: Create API Client

```typescript
// src/api.ts
const API_URL = 'http://localhost:3000/api';

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
```

### Step 4: Implement Login

Handle form submission, store token, redirect to dashboard.

### Step 5: Build Dashboard

Fetch and display tasks, implement filtering, handle user interactions.

### Step 6: Style Your Dashboard

Make it look professional and user-friendly.

## 🎨 Design Guidelines

### Layout Suggestions

- **Header:** Logo, user info, logout button
- **Sidebar:** Filters (status, priority)
- **Main Area:** Task cards or list
- **Footer:** Statistics (total tasks, completed, etc.)

### Color Scheme

- Use different colors for priority levels
- Visual indicators for task status
- Consistent styling throughout

## 🧪 Testing Checklist

**Login:**
- [ ] Valid credentials login successfully
- [ ] Invalid credentials show error
- [ ] Token is stored in localStorage
- [ ] Redirect to dashboard works

**Dashboard:**
- [ ] Tasks load and display correctly
- [ ] Filters work properly
- [ ] Create task works
- [ ] Mark complete works
- [ ] Delete task works
- [ ] Logout clears token

**Error Handling:**
- [ ] Network errors show user-friendly message
- [ ] 401 errors redirect to login
- [ ] Loading states display during API calls

## 💡 Tips

1. **Use TypeScript's DOM types** - Type your elements properly
2. **Handle errors gracefully** - Never let the app crash silently
3. **Show loading states** - Users should know something is happening
4. **Validate on frontend too** - Don't rely only on backend validation
5. **Use async/await** - Easier to read than Promise chains
6. **Separate concerns** - Keep API calls separate from DOM manipulation

## 🐛 Common Issues

### CORS Errors

If you get CORS errors, add this to your backend:

```typescript
import cors from 'cors';
app.use(cors());
```

### Token Not Being Sent

Make sure you're setting the Authorization header correctly.

### TypeScript Compilation

Run `tsc` to compile TypeScript to JavaScript before testing.

## 🎓 Extensions

1. **Search Functionality** - Search tasks by title or description
2. **Drag and Drop** - Reorder tasks or change status by dragging
3. **Dark Mode** - Toggle between light and dark themes
4. **Charts** - Visualize task completion statistics
5. **Keyboard Shortcuts** - Add keyboard navigation
6. **Offline Support** - Cache data with Service Workers
7. **Real-time Updates** - Use WebSockets for live updates

## 📚 Resources

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript DOM Types](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## ✅ Completion Criteria

1. Login and logout work correctly
2. Tasks are displayed from API
3. Can create, complete, and delete tasks
4. Filters work properly
5. Error handling is user-friendly
6. TypeScript compiles without errors
7. No `any` types used
8. Responsive design works on mobile

**Prerequisite:** [Task Manager API](../02-task-manager-api/)  
**Next Project:** [Full-Stack Application](../04-fullstack-app/)

---

**Tip:** This project teaches you how SPAs (Single Page Applications) work without the complexity of frameworks!
