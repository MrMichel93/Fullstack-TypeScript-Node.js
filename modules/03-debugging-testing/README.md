# Debugging & Testing: Finding and Fixing Issues

Writing code is half the job. The other half is making it work correctly and keeping it working.

## 🎯 TypeScript: Your First Debugger

### Compiler as Your Friend

The TypeScript compiler catches many bugs before your code even runs:

```typescript
// TypeScript catches this at compile time!
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User) {
  console.log(`Hello, ${user.name}!`);
}

const user = {
  id: 1,
  name: "Alice"
  // ❌ Error: Property 'email' is missing
};

greetUser(user);
```

**Strategy:** Always fix TypeScript errors before running your code!

## 🐛 Debugging Strategies

### The Scientific Method for Debugging

1. **Observe** - What's actually happening? What's the error?
2. **Hypothesize** - What might be causing it?
3. **Test** - Try one fix at a time
4. **Verify** - Did it work?
5. **Repeat** - If not, try another hypothesis

### Console Debugging (Your Best Friend)

**Simple but effective:**
```typescript
app.get('/api/tasks/:id', async (req, res) => {
  console.log('🔍 Looking for task with ID:', req.params.id);
  console.log('🔍 Type:', typeof req.params.id);
  
  const task = await db.tasks.findOne({ where: { id: req.params.id } });
  console.log('📝 Found task:', task);
  
  if (!task) {
    console.log('❌ Task not found!');
    return res.status(404).json({ error: 'Not found' });
  }
  
  console.log('✅ Returning task:', task.title);
  res.json({ task });
});
```

**Pro Tips:**
- Use emojis to make output easy to scan: 🔍 ✅ ❌ 📝
- Log variable types: `console.log('Type:', typeof value)`
- Log at entry and exit of functions
- Use `console.table()` for arrays of objects
- Remove console.logs before committing (or use a logger)

### Development Mode with Auto-Reload

**Using nodemon with ts-node:**
```json
// package.json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

**Benefits:**
- Auto-reload when code changes
- Faster development cycle
- See errors immediately

**⚠️ WARNING: Never use in production! Use `npm start` with compiled code.**

### VS Code Debugger

**Setup launch.json:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TypeScript",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${workspaceFolder}/src/server.ts"],
      "env": {
        "NODE_ENV": "development"
      },
      "sourceMaps": true
    }
  ]
}
```

**Add breakpoints:**
```typescript
app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  // Click in the gutter to add a breakpoint here
  const task = await createTask(title, description);
  res.status(201).json({ task });
});
```

**Debugger Features:**
- Pause execution at breakpoints
- Step through code line by line
- Inspect variables and call stack
- Evaluate expressions in debug console

## 📊 Logging (Better than Console.log)

### Why Logging?

- Can turn on/off based on environment
- Different levels (DEBUG, INFO, WARN, ERROR)
- Can save to files
- Can filter by severity
- Structured logging for production

### Simple Logger Setup

```typescript
// src/utils/logger.ts
export const logger = {
  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, meta || '');
    }
  },
  
  info: (message: string, meta?: any) => {
    console.log(`[INFO] ${message}`, meta || '');
  },
  
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${message}`, meta || '');
  },
  
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error?.message || '');
    if (error?.stack) {
      console.error(error.stack);
    }
  }
};

// Usage in routes
app.post('/api/tasks', async (req, res) => {
  logger.info('Creating new task');
  
  try {
    const { title, description } = req.body;
    logger.debug('Task data:', { title, description });
    
    const task = await createTask(title, description);
    
    logger.info(`Task created with ID: ${task.id}`);
    res.status(201).json({ task });
    
  } catch (error) {
    logger.error('Error creating task', error as Error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});
```

### Logging Levels

| Level | When to Use | Example |
|-------|-------------|---------|
| **DEBUG** | Detailed diagnostic info | Variable values, function entry/exit |
| **INFO** | General information | Request received, operation completed |
| **WARNING** | Something unexpected | Deprecated feature used, high memory usage |
| **ERROR** | Serious problem | Database connection failed, file not found |
| **CRITICAL** | System-level failure | Database corrupted, out of memory |

### Production Logging with Winston

For production, use a proper logging library:

```typescript
// npm install winston
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Write to console
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    // Write to file
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

// Usage
logger.info('Server started', { port: 3000 });
logger.error('Database connection failed', { error: error.message });
```

## 🚨 Error Handling

### Try-Catch Blocks

**Always handle expected errors:**
```typescript
app.delete('/api/tasks/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const task = await db.tasks.findOne({
      where: { 
        id: req.params.id,
        userId: req.user!.id 
      }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    await db.tasks.delete({ where: { id: task.id } });
    logger.info(`Deleted task ${task.id}`);
    
    res.json({ success: true });
    
  } catch (error) {
    logger.error('Error deleting task', error as Error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});
```

### Global Error Handler Middleware

```typescript
// Error handler middleware (must be last!)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error', err);
  
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error'
      : err.message
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  logger.warn(`404 error: ${req.url}`);
  res.status(404).json({ error: 'Not found' });
});
```

### Async Error Handling

**Problem:** Async errors don't get caught by Express automatically

**Solution:** Use a wrapper function or express-async-errors

```typescript
// npm install express-async-errors
import 'express-async-errors';

// Now async errors are caught automatically!
app.get('/api/tasks', async (req, res) => {
  const tasks = await db.tasks.findAll();
  res.json({ tasks });
  // If this throws, Express catches it!
});
```

### Validation with Zod

```typescript
import { z } from 'zod';

const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  priority: z.enum(['low', 'medium', 'high'])
});

app.post('/api/tasks', async (req, res) => {
  try {
    const data = createTaskSchema.parse(req.body);
    const task = await createTask(data);
    res.status(201).json({ task });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    throw error;  // Let global handler catch it
  }
});
```

## 🧪 Testing Basics

### Why Test?

- Catch bugs before users do
- Confidence when making changes
- Documents how code should work
- Prevents regression (old bugs coming back)

### Manual Testing Checklist

For each feature, test:

**Happy Path:**
- [ ] Feature works with valid input
- [ ] Success message/redirect works
- [ ] Data appears correctly

**Edge Cases:**
- [ ] Empty input
- [ ] Very long input
- [ ] Special characters
- [ ] Duplicate data

**Error Cases:**
- [ ] Invalid input
- [ ] Missing required fields
- [ ] Unauthorized access

### Automated Testing with Jest

**Setup:**
```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

**jest.config.js:**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts']
};
```

**src/\_\_tests\_\_/tasks.test.ts:**
```typescript
import request from 'supertest';
import { app } from '../server';

describe('Tasks API', () => {
  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('tasks');
      expect(Array.isArray(response.body.tasks)).toBe(true);
    });
  });
  
  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high'
      };
      
      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);
      
      expect(response.body.task).toHaveProperty('id');
      expect(response.body.task.title).toBe('Test Task');
    });
    
    it('should reject invalid data', async () => {
      const invalidTask = {
        title: '',  // Empty title should fail
        description: 'Test'
      };
      
      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });
  });
});
```

**package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

**Run tests:**
```bash
npm test
```

## 🔍 Common Debugging Scenarios

### Issue: "Cannot find module"
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
npm install

# If specific module is missing
npm install express
npm install --save-dev @types/express
```

### Issue: TypeScript errors after compile
```
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'
```

**Solution:**
- Read the error carefully - TypeScript is helping you!
- Fix the type mismatch
- Don't use `any` to silence errors
- Use proper type conversion if needed

```typescript
// ❌ Wrong
const id = req.params.id;  // string
await findTask(id);  // expects number

// ✅ Right
const id = parseInt(req.params.id, 10);
if (isNaN(id)) {
  return res.status(400).json({ error: 'Invalid ID' });
}
await findTask(id);
```

### Issue: Database connection fails
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Check DATABASE_URL environment variable
echo $DATABASE_URL

# For SQLite, check file permissions
ls -l database.sqlite
```

### Issue: Async/await not working
```typescript
// Returns Promise { <pending> }
const tasks = getTasks();
console.log(tasks);
```

**Solution:**
```typescript
// ❌ Wrong: Missing await
const tasks = getTasks();

// ✅ Right: Use await
const tasks = await getTasks();

// Or use .then()
getTasks().then(tasks => {
  console.log(tasks);
});
```



## 📋 Debugging Checklist

When something isn't working:

1. **Read the error message** - It usually tells you what's wrong
2. **Check recent changes** - What did you change last?
3. **Verify assumptions** - Is the data what you think it is?
4. **Isolate the problem** - Where exactly does it break?
5. **Google the error** - Others have likely had the same issue
6. **Check documentation** - Are you using the function correctly?
7. **Ask for help** - Explain the problem to someone (or a rubber duck!)

## 🛠️ Useful Debugging Tools

### API Testing Tools

**Thunder Client (VS Code Extension):**
- Built into VS Code
- Test API endpoints
- Save request collections

**Postman:**
- Standalone application
- Advanced API testing
- Environment variables

**cURL (Command Line):**
```bash
# Test GET endpoint
curl http://localhost:3000/api/tasks

# Test POST endpoint
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test task"}'

# Test with authentication
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Database Tools

**SQLite:**
```bash
# Open SQLite database
sqlite3 database.sqlite

# List tables
.tables

# Query data
SELECT * FROM tasks;

# Check schema
.schema tasks

# Exit
.quit
```

**PostgreSQL:**
```bash
# Connect to database
psql -d myapp

# List tables
\dt

# Query data
SELECT * FROM tasks;

# Describe table
\d tasks

# Exit
\q
```

### Browser DevTools

Essential for frontend debugging:

- **Console** - JavaScript errors, logs, warnings
- **Network** - See all HTTP requests/responses, timing
- **Elements** - Inspect HTML/CSS
- **Application** - View localStorage, cookies
- **Sources** - Set breakpoints in JavaScript

**Tips:**
```typescript
// Log objects in a readable format
console.table([{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }]);

// Group related logs
console.group('Task Creation');
console.log('Validating...');
console.log('Saving...');
console.groupEnd();

// Measure performance
console.time('API Call');
await fetch('/api/tasks');
console.timeEnd('API Call');
```

## 💡 Best Practices

### Development Workflow

1. **TypeScript first** - Fix compiler errors before running
2. **Test as you build** - Don't wait until the end
3. **Fix one thing at a time** - Don't make multiple changes
4. **Use version control** - Commit working code frequently
5. **Write error messages for humans** - "Title is required" not "Error 400"
6. **Log important events** - You'll thank yourself later
7. **Handle expected errors** - Database failures, invalid input, network issues
8. **Let unexpected errors bubble up** - Let global error handler catch them

### Code Quality

```typescript
// ✅ Good: Type-safe error handling
try {
  const user = await getUser(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
} catch (error) {
  if (error instanceof NotFoundError) {
    // Handle specific error
  }
  throw error;  // Rethrow unknown errors
}

// ❌ Bad: Swallowing all errors
try {
  const user = await getUser(userId);
  return user;
} catch (error) {
  return null;  // Silent failure!
}
```

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

## ⏭️ Next Steps

You now have the tools to debug and test your TypeScript projects. Apply these techniques as you build!

**Start building:** [Project 1 - Authentication System](../../projects/01-auth-system/)

---

💡 **Remember:** TypeScript is your first line of defense against bugs. Trust the compiler, and debugging becomes much easier!
