# Task Manager API - Starter

This project builds upon the authentication system from Project 1.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## What You'll Build

A complete REST API for task management with:
- Full CRUD operations
- User-specific tasks
- Filtering and sorting
- Proper validation
- Authentication required

## Structure

```
src/
├── server.ts
├── config.ts
├── routes/
│   ├── auth.ts      # From Project 1
│   └── tasks.ts     # New: Task routes
├── middleware/
│   ├── auth.ts      # From Project 1
│   └── errorHandler.ts
├── models/
│   ├── User.ts      # From Project 1
│   └── Task.ts      # New: Task model
├── services/
│   ├── auth.ts      # From Project 1
│   └── tasks.ts     # New: Task logic
└── utils/
    ├── jwt.ts       # From Project 1
    └── validation.ts # Extend with task schemas
```

## API Endpoints to Implement

- `GET /api/tasks` - List all user's tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

All endpoints require authentication!

See main README for full requirements.
