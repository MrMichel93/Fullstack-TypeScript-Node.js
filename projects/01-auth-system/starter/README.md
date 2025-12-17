# Project 1: Authentication System - Starter

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your JWT_SECRET
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   Use Postman or Thunder Client to test endpoints

## Project Structure

```
src/
├── server.ts          # Entry point, Express setup
├── config.ts          # Environment configuration
├── routes/
│   └── auth.ts        # Authentication routes
├── middleware/
│   ├── auth.ts        # JWT verification
│   └── errorHandler.ts # Global error handler
├── models/
│   └── User.ts        # User interface/model
├── services/
│   └── auth.ts        # Business logic
└── utils/
    ├── jwt.ts         # JWT utilities
    └── validation.ts   # Zod schemas
```

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript (production)
- `npm run type-check` - Check TypeScript types without building

## API Endpoints

### POST /api/auth/register
Register a new user

**Request:**
```json
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@example.com"
  }
}
```

### POST /api/auth/login
Login with email and password

**Request:**
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@example.com"
  }
}
```

### GET /api/auth/profile
Get current user profile (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## TODO

Follow the TODO comments in the code to implement each feature:

1. Set up database connection
2. Create User model/interface
3. Implement registration logic
4. Implement login logic
5. Create JWT middleware
6. Add input validation
7. Implement error handling

## Need Help?

- Review [TypeScript Fundamentals](../../../modules/04-typescript-fundamentals/README.md)
- Read [Security Basics](../../../modules/02-security-basics/README.md)
- Check [Debugging & Testing](../../../modules/03-debugging-testing/README.md)
