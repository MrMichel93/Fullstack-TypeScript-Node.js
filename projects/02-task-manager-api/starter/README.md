# Task Manager API - Starter

This project builds upon the authentication system from Project 1.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Reusing Components from Project 1

Copy these files from your completed Project 1:

**Authentication:**
- `src/middleware/auth.ts` - JWT verification middleware
- `src/utils/jwt.ts` - JWT token utilities
- `src/models/User.ts` - User interface/model

**Configuration:**
- `.env` - Update with your JWT_SECRET
- `src/config.ts` - Environment configuration

You'll extend the validation schemas to include task-specific rules.

## What You'll Build

A complete REST API for task management with:
- Full CRUD operations
- User-specific tasks
- Filtering and sorting
- Proper validation
- Authentication required (using Project 1 middleware)

## Structure

```
src/
├── server.ts
├── config.ts
├── routes/
│   ├── auth.ts      # From Project 1
│   └── tasks.ts     # New: Task routes
├── middleware/
│   ├── auth.ts      # COPY from Project 1
│   └── errorHandler.ts
├── models/
│   ├── User.ts      # COPY from Project 1
│   └── Task.ts      # New: Task model
├── services/
│   ├── auth.ts      # From Project 1 (if needed)
│   └── tasks.ts     # New: Task logic
└── utils/
    ├── jwt.ts       # COPY from Project 1
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
