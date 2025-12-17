# Task 2: Effective Logging and Error Handling

## Objective
Implement proper logging and error handling patterns for debugging production applications.

## Instructions

Create a logging system and error handling middleware for an Express application.

## Requirements

### Part 1: Logging Utility

Create `logger.ts`:

```typescript
// TODO: Implement logging levels
enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  meta?: Record<string, any>;
}

class Logger {
  // TODO: Implement logging methods
  debug(message: string, meta?: Record<string, any>): void {}
  info(message: string, meta?: Record<string, any>): void {}
  warn(message: string, meta?: Record<string, any>): void {}
  error(message: string, error?: Error, meta?: Record<string, any>): void {}
}
```

### Part 2: Error Handler Middleware

Create `errorHandler.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';

// Define custom error class
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler middleware
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // TODO: Implement error handling logic
  // - Log the error
  // - Send appropriate response
  // - Hide sensitive information in production
}
```

### Part 3: Usage Example

Create `server.ts` demonstrating usage:

```typescript
import express from 'express';
import { Logger } from './logger';
import { errorHandler, AppError } from './errorHandler';

const app = express();
const logger = new Logger();

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Example route with error
app.get('/users/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      throw new AppError(400, 'Invalid user ID');
    }
    
    // Simulate database lookup
    const user = await findUser(userId);
    
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    
    logger.info('User retrieved', { userId });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(3000);
```

## Implementation Checklist

- [ ] Logger class with all log levels
- [ ] Timestamp formatting
- [ ] Structured log output (JSON in production)
- [ ] Custom AppError class
- [ ] Error handler middleware
- [ ] Request logging middleware
- [ ] Proper error propagation with try/catch
- [ ] Different error responses for dev/production

## Log Output Format

Development:
```
[2024-12-17T10:30:45.123Z] INFO: GET /users/123 { ip: '::1', userAgent: '...' }
[2024-12-17T10:30:45.456Z] ERROR: Database connection failed
  Error: Connection timeout
    at Database.connect (database.ts:45:11)
    ...
```

Production (JSON):
```json
{
  "timestamp": "2024-12-17T10:30:45.123Z",
  "level": "ERROR",
  "message": "Database connection failed",
  "stack": "Error: Connection timeout\n    at...",
  "meta": {}
}
```

## Testing Your Implementation

Test with these scenarios:
1. Successful request (should log INFO)
2. Invalid input (should log WARN and return 400)
3. Not found (should log INFO and return 404)
4. Server error (should log ERROR and return 500)

## Bonus Challenge

1. Add log rotation (write to files)
2. Add request ID tracking across logs
3. Integrate with external logging service (e.g., Winston)
4. Add performance timing logs
5. Create a debugging mode with verbose logging
