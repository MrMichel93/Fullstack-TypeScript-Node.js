# Project 2: Task Manager REST API

Build a complete REST API for managing tasks with full CRUD operations, user authentication, and proper TypeScript types.

## 🎯 Learning Objectives

- Design and implement a RESTful API
- Perform CRUD operations (Create, Read, Update, Delete)
- Implement user-specific resources
- Use middleware for authentication
- Proper error handling and validation
- API documentation best practices
- TypeScript with Express advanced patterns

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** SQLite or PostgreSQL
- **Authentication:** JWT (from Project 1)
- **Validation:** Zod
- **Testing:** Jest + Supertest (optional)

## 📋 Requirements

### Core Features

1. **Task CRUD Operations**
   - `GET /api/tasks` - Get all tasks for current user
   - `GET /api/tasks/:id` - Get single task
   - `POST /api/tasks` - Create new task
   - `PUT /api/tasks/:id` - Update task
   - `DELETE /api/tasks/:id` - Delete task

2. **Task Model**
   ```typescript
   interface Task {
     id: number;
     userId: number;
     title: string;
     description: string;
     status: 'todo' | 'in-progress' | 'done';
     priority: 'low' | 'medium' | 'high';
     dueDate?: Date;
     createdAt: Date;
     updatedAt: Date;
   }
   ```

3. **Filtering and Sorting**
   - Filter by status: `GET /api/tasks?status=todo`
   - Filter by priority: `GET /api/tasks?priority=high`
   - Sort by due date, created date, priority

4. **Access Control**
   - Users can only see their own tasks
   - Users can only modify/delete their own tasks
   - Proper 403/404 error responses

5. **Validation**
   - Title: required, 1-100 characters
   - Description: required, max 500 characters
   - Status: must be one of the enum values
   - Priority: must be one of the enum values
   - Due date: optional, must be future date

## 🚀 Getting Started

Complete Project 1 (Authentication System) first, as this project builds on those concepts.

### Setup

```bash
cd projects/02-task-manager-api/starter
npm install
cp .env.example .env
npm run dev
```

## 📝 Implementation Guide

### Step 1: Database Schema

Design the tasks table with proper relationships to users.

### Step 2: Define Types and Interfaces

Create TypeScript interfaces for tasks, request bodies, and responses.

### Step 3: Implement CRUD Routes

Create routes for all CRUD operations with proper authentication.

### Step 4: Add Filtering

Implement query parameter filtering for status and priority.

### Step 5: Add Validation

Use Zod schemas to validate all inputs.

### Step 6: Test Everything

Test all endpoints with various scenarios and edge cases.

## 🧪 Testing Checklist

**Create Task:**
- [ ] Valid task creation succeeds
- [ ] Invalid data rejected
- [ ] Missing required fields rejected
- [ ] Unauthorized request rejected

**Get Tasks:**
- [ ] User sees only their tasks
- [ ] Filtering by status works
- [ ] Filtering by priority works
- [ ] Sorting works correctly

**Update Task:**
- [ ] User can update their own task
- [ ] User cannot update others' tasks
- [ ] Partial updates work
- [ ] Invalid data rejected

**Delete Task:**
- [ ] User can delete their own task
- [ ] User cannot delete others' tasks
- [ ] Deleting non-existent task returns 404

## 💡 Tips

- Reuse authentication middleware from Project 1
- Create helper functions for common queries
- Use TypeScript generics for API responses
- Document your API endpoints
- Use proper HTTP status codes

## 🎓 Extensions

1. **Task Categories/Tags**
2. **Task Comments**
3. **Task Assignment (collaboration)**
4. **File Attachments**
5. **Search Functionality**
6. **Pagination**

## 📚 Resources

- [REST API Best Practices](https://restfulapi.net/)
- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

**Prerequisite:** [Authentication System](../01-auth-system/)  
**Next Project:** [Simple Dashboard](../03-simple-dashboard/)
