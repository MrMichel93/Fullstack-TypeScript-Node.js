# Project 1: Authentication System

Build a secure authentication API with user registration, login, and JWT tokens.

## 🎯 Learning Objectives

By completing this project, you will learn:

- Setting up a TypeScript + Express project from scratch
- Implementing user registration with password hashing (bcrypt)
- Creating login endpoints with JWT authentication
- Input validation with Zod
- Proper error handling and middleware
- Database schema design (SQLite or PostgreSQL)
- Environment variable management
- TypeScript types for Express routes

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** SQLite (easier for beginners) or PostgreSQL
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **Validation:** Zod
- **Dev Tools:** nodemon, ts-node

## 📋 Requirements

### Core Features

1. **User Registration (`POST /api/auth/register`)**
   - Accept username, email, and password
   - Validate input (email format, password strength)
   - Hash password with bcrypt
   - Save user to database
   - Return success message (don't return JWT on registration)

2. **User Login (`POST /api/auth/login`)**
   - Accept email and password
   - Verify password hash
   - Generate JWT token
   - Return token and user info (without password)

3. **Protected Route (`GET /api/auth/profile`)**
   - Require JWT token in Authorization header
   - Verify and decode token
   - Return user profile

4. **Input Validation**
   - Email must be valid format
   - Password must be at least 8 characters
   - Username must be 3-20 characters
   - All fields required

5. **Error Handling**
   - Proper HTTP status codes
   - Clear error messages
   - Handle duplicate emails
   - Handle invalid credentials

### Project Structure

```
01-auth-system/
├── starter/
│   ├── src/
│   │   ├── server.ts          # Express app setup
│   │   ├── config.ts          # Environment variables
│   │   ├── routes/
│   │   │   └── auth.ts        # Authentication routes
│   │   ├── middleware/
│   │   │   ├── auth.ts        # JWT verification middleware
│   │   │   └── errorHandler.ts # Error handling middleware
│   │   ├── models/
│   │   │   └── User.ts        # User model/interface
│   │   ├── services/
│   │   │   └── auth.ts        # Authentication logic
│   │   └── utils/
│   │       ├── jwt.ts         # JWT utilities
│   │       └── validation.ts   # Zod schemas
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
├── solution/
│   └── (complete working code)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Basic JavaScript/TypeScript knowledge
- Understanding of REST APIs
- Postman or Thunder Client for testing

### Setup

1. **Navigate to starter directory:**
   ```bash
   cd projects/01-auth-system/starter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   # Edit .env and add your JWT_SECRET
   ```

4. **Run in development mode:**
   ```bash
   npm run dev
   ```

5. **Test the API:**
   Open Postman/Thunder Client and test the endpoints

## 📝 Step-by-Step Guide

### Step 1: Setup Project

```bash
npm init -y
npm install express dotenv bcrypt jsonwebtoken zod
npm install --save-dev typescript @types/express @types/node @types/bcrypt @types/jsonwebtoken ts-node nodemon
```

### Step 2: Configure TypeScript

Create `tsconfig.json` with strict mode enabled.

### Step 3: Define User Interface

```typescript
// src/models/User.ts
export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}
```

### Step 4: Create Validation Schemas

```typescript
// src/utils/validation.ts
import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
```

### Step 5: Implement Registration

- Hash password with bcrypt
- Save user to database
- Handle duplicate emails

### Step 6: Implement Login

- Verify email exists
- Compare password with hash
- Generate JWT token

### Step 7: Create Auth Middleware

- Extract token from Authorization header
- Verify JWT
- Attach user to request

### Step 8: Test Everything

Test all endpoints with various inputs:
- Valid data
- Invalid data
- Missing fields
- Duplicate emails
- Invalid credentials

## 🔐 Security Checklist

- [ ] Passwords are hashed with bcrypt (never stored plain)
- [ ] JWT secret is in environment variable (not in code)
- [ ] Input is validated before processing
- [ ] Errors don't leak sensitive information
- [ ] SQL queries are parameterized (prevent injection)
- [ ] Password hash is never returned in API responses

## 🧪 Testing

### Manual Testing with cURL

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'

# Get profile (replace TOKEN with actual token)
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Testing Checklist

**Registration:**
- [ ] Valid registration succeeds
- [ ] Invalid email rejected
- [ ] Short password rejected
- [ ] Duplicate email rejected
- [ ] Missing fields rejected

**Login:**
- [ ] Valid credentials succeed and return token
- [ ] Invalid email rejected
- [ ] Invalid password rejected
- [ ] Missing fields rejected

**Protected Routes:**
- [ ] Request with valid token succeeds
- [ ] Request without token rejected (401)
- [ ] Request with invalid token rejected (401)
- [ ] Request with expired token rejected (401)

## 💡 Tips

1. **Start with the database schema** - Know what data you need
2. **Use TypeScript interfaces** - Define types before implementing
3. **Test as you go** - Don't wait until the end
4. **Read Zod errors carefully** - They tell you exactly what's wrong
5. **Use environment variables** - Never hardcode secrets
6. **Log important events** - Helps with debugging

## 🐛 Common Issues

### Issue: "Cannot find module"
**Solution:** Run `npm install` and check imports

### Issue: TypeScript errors about types
**Solution:** Make sure you have @types packages installed

### Issue: JWT verification fails
**Solution:** Check that JWT_SECRET is the same for signing and verifying

### Issue: Password comparison fails
**Solution:** Make sure you're comparing with bcrypt.compare, not direct comparison

## 🎓 Extensions (Optional Challenges)

Once you complete the core features, try these:

1. **Email Verification**
   - Send verification email on registration
   - Verify email before allowing login

2. **Password Reset**
   - Forgot password endpoint
   - Send reset token via email
   - Reset password with token

3. **Refresh Tokens**
   - Implement refresh tokens
   - Separate access and refresh tokens
   - Token rotation

4. **Rate Limiting**
   - Add rate limiting to prevent brute force
   - Different limits for different endpoints

5. **Account Management**
   - Update profile endpoint
   - Change password endpoint
   - Delete account endpoint

## 📚 Resources

- [bcrypt documentation](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken documentation](https://www.npmjs.com/package/jsonwebtoken)
- [Zod documentation](https://zod.dev/)
- [Express with TypeScript](https://expressjs.com/en/guide/using-typescript.html)

## ✅ Completion Criteria

Your project is complete when:

1. All core features are implemented and working
2. All tests in the testing checklist pass
3. Code compiles without TypeScript errors
4. No `any` types used (except in error handlers)
5. Environment variables are used for secrets
6. Error handling is proper with appropriate status codes
7. Code is clean and well-organized

**Next Project:** [Task Manager API](../02-task-manager-api/) - Build a full CRUD REST API

---

**Need help?** Review the [TypeScript Fundamentals](../../docs/04-typescript-fundamentals.md) and [Security Basics](../../docs/02-security-basics.md) guides.
