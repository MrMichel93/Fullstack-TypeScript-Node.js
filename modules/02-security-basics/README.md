# Security Basics: Protecting Your Web App

Security isn't optional—it's essential. This guide covers fundamental security practices every developer must know.

## 🔐 Password Security

### ❌ Never Store Plain Text Passwords!

**Bad Example:**
```typescript
// NEVER DO THIS!
const password = "mypassword123";
await db.query(
  "INSERT INTO users (username, password) VALUES ($1, $2)", 
  [username, password]
);
```

**Why is this bad?** If your database is compromised, all passwords are exposed!

### ✅ Always Hash Passwords

**Good Example:**
```typescript
import bcrypt from 'bcrypt';

// When user registers
const password: string = req.body.password;
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
// Store hashedPassword in database

// When user logs in
const storedHash: string = await getUserHashFromDb(username);
const isValid = await bcrypt.compare(password, storedHash);
if (isValid) {
  // Login successful!
}
```

### How Password Hashing Works

```
User Password: "mypassword123"
      ↓
Hash Function (bcrypt with salt)
      ↓
Hashed: "$2b$10$KIXvZ8qLwJ3..."
      ↓
Stored in Database
```

**Key Points:**
- Hashing is one-way (cannot reverse)
- Same password = different hash each time (due to salt)
- Fast to verify, slow to crack
- TypeScript ensures proper types for security functions

### Using bcrypt in TypeScript

```typescript
import bcrypt from 'bcrypt';

// Hash password with async/await
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Check password
async function verifyPassword(
  password: string, 
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Usage
const hashed = await hashPassword("mypassword123");
const isValid = await verifyPassword("mypassword123", hashed);
console.log(isValid);  // true
```

## 🛡️ Input Validation

**Golden Rule:** Never trust user input!

### SQL Injection Attack

**Vulnerable Code:**
```typescript
// NEVER DO THIS!
const username = req.body.username;
const query = `SELECT * FROM users WHERE username = '${username}'`;
await db.query(query);
```

**Attack:** User enters: `' OR '1'='1`
```sql
SELECT * FROM users WHERE username = '' OR '1'='1'
-- This returns ALL users!
```

### ✅ Protection: Use Parameterized Queries

```typescript
// ALWAYS DO THIS!
const username: string = req.body.username;
const query = "SELECT * FROM users WHERE username = $1";
await db.query(query, [username]);
```

**With an ORM (e.g., Prisma or TypeORM):**
```typescript
// Even better - use ORM with TypeScript types
const user = await userRepository.findOne({
  where: { username }
});
```

### Cross-Site Scripting (XSS) Attack

**Vulnerable Code:**
```typescript
// Backend sends unescaped user content
app.get('/user/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  // Sending raw HTML
  res.send(`<h1>Welcome ${user.name}</h1>`);
});
```

**Attack:** User sets name to: `<script>alert('Hacked!')</script>`

### ✅ Protection: Escape HTML and Validate Input

**Backend:**
```typescript
import { escape } from 'html-escaper';

app.get('/user/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  // Escape user content
  const safeName = escape(user.name);
  res.send(`<h1>Welcome ${safeName}</h1>`);
});

// Or better: send JSON and let frontend handle rendering
app.get('/api/user/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.json({ user });  // Send as JSON
});
```

**Frontend:**
```typescript
// When inserting into DOM
const username = getUsernameFromAPI();
const element = document.createElement('h1');
element.textContent = username;  // textContent auto-escapes
document.body.appendChild(element);

// NEVER use innerHTML with user data!
// ❌ element.innerHTML = username;  // Vulnerable to XSS
```

## ✅ Validation Checklist

### Using Zod for Type-Safe Validation

Zod is a TypeScript-first schema validation library:

```typescript
import { z } from 'zod';

// Define schema
const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(['low', 'medium', 'high'])
});

// Validate in route handler
app.post('/api/tasks', async (req, res) => {
  try {
    // Parse and validate
    const data = createTaskSchema.parse(req.body);
    
    // TypeScript knows the exact type now!
    const task = await createTask(data);
    res.status(201).json({ task });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
});
```

### 1. Validate Data Types

```typescript
// TypeScript + Zod catch type errors
const userSchema = z.object({
  age: z.number().int().min(16).max(20),
  email: z.string().email()
});

// This will fail validation
userSchema.parse({ age: "16", email: "invalid" });
```

### 2. Validate Length

```typescript
const titleSchema = z.string()
  .min(1, "Title required")
  .max(100, "Title too long");
```

### 3. Validate Format

```typescript
const emailSchema = z.string().email();
const urlSchema = z.string().url();
const uuidSchema = z.string().uuid();
```

### 4. Whitelist, Don't Blacklist

```typescript
// Good: Only allow specific values with enum
const statusSchema = z.enum(['active', 'pending', 'completed']);

// TypeScript enforces this at compile time too!
type Status = z.infer<typeof statusSchema>;
// Status is 'active' | 'pending' | 'completed'

// Bad: Trying to block every possible bad value
// (you'll always miss something!)
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

```typescript
// Bad: Anyone can delete any task
app.delete('/api/tasks/:id', async (req, res) => {
  await db.tasks.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// Good: Check ownership
interface AuthRequest extends Request {
  user?: { id: number };
}

app.delete('/api/tasks/:id', authenticate, async (req: AuthRequest, res) => {
  const task = await db.tasks.findOne({
    where: { 
      id: req.params.id,
      userId: req.user!.id  // TypeScript ensures user exists via authenticate middleware
    }
  });
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  await db.tasks.delete({ where: { id: task.id } });
  res.json({ success: true });
});
```

## 🔒 JWT Authentication

### Why JWT (JSON Web Tokens)?

JWTs are stateless tokens that contain user information, signed with a secret key:

```typescript
import jwt from 'jsonwebtoken';

// Sign a token when user logs in
function generateToken(userId: number): string {
  const payload = { userId };
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, secret, { 
    expiresIn: '7d'  // Token expires in 7 days
  });
  return token;
}

// Verify token in middleware
interface TokenPayload {
  userId: number;
}

function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];  // "Bearer TOKEN"
  
  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as TokenPayload;
    
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

### Using Environment Variables

```typescript
// .env file (NEVER commit this!)
JWT_SECRET=your-super-secret-key-here-at-least-32-chars
DATABASE_URL=postgresql://localhost:5432/myapp
NODE_ENV=development

// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET!,
  databaseUrl: process.env.DATABASE_URL!,
  nodeEnv: process.env.NODE_ENV || 'development'
};

// Validate required variables
if (!config.jwtSecret) {
  throw new Error('JWT_SECRET is required');
}
```

## 📋 Security Checklist for Your Projects

Before deploying, verify:

- [ ] Passwords are hashed with bcrypt, never stored as plain text
- [ ] All database queries use parameterization or ORM
- [ ] User input is validated with Zod or similar library
- [ ] TypeScript strict mode is enabled (catches type-related bugs)
- [ ] HTML output is escaped (use textContent, not innerHTML)
- [ ] Users can only access/modify their own data (check ownership)
- [ ] JWT tokens are signed and verified properly
- [ ] Environment variables are used for secrets (never in code)
- [ ] Secret keys are in environment variables, not code
- [ ] Error messages don't reveal sensitive information
- [ ] File uploads are validated (if applicable)
- [ ] Rate limiting is implemented (for production)
- [ ] HTTPS is enabled (for production)

## 🧪 Practice: Spot the Vulnerabilities

Can you identify the security issues in this code?

```typescript
// TypeScript/Express version
app.post('/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // Issue #1?
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    const user = db.query(query);
    
    if (user) {
        // Issue #2?
        req.session.user = username;
        return res.send(`Welcome ${username}!`);
    } else {
        // Issue #3?
        return res.status(401).send("Login failed! Username or password is incorrect.");
    }
});

app.get('/profile/:username', (req: Request, res: Response) => {
    // Issue #4?
    const username = req.params.username;
    const user = db.query(`SELECT * FROM users WHERE username='${username}'`);
    res.render('profile', { user });
});
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

**Continue to:** [Debugging & Testing Guide](../03-debugging-testing/README.md)

---

💡 **Remember:** Security is not a feature you add at the end—it's built in from the start!
