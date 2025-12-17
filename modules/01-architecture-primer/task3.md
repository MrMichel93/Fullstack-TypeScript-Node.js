# Task 3: Building a Simple Express Server

## Objective
Create a basic Express server with TypeScript that demonstrates client-server communication.

## Instructions

Build a simple Express server that handles different types of requests and responses.

## Requirements

Create a file `server.ts` with:

1. **Setup**: Initialize Express with TypeScript
2. **Routes**:
   - `GET /` - Return a welcome message
   - `GET /api/status` - Return server status (uptime, timestamp)
   - `POST /api/echo` - Echo back the JSON body sent by the client
   - `GET /api/random` - Return a random number between 1-100

3. **Type Safety**: Define interfaces for:
   - Request bodies
   - Response objects

4. **Error Handling**: Handle 404 for unknown routes

## Starter Code Structure

```typescript
import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// TODO: Define your routes here

// TODO: Handle 404 errors

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Testing Your Server

After implementation, test with:
```bash
# Start server
npm run dev

# In another terminal, test endpoints:
curl http://localhost:3000/
curl http://localhost:3000/api/status
curl -X POST http://localhost:3000/api/echo -H "Content-Type: application/json" -d '{"message":"Hello"}'
curl http://localhost:3000/api/random
```

## Verification Checklist

- [ ] Server starts without TypeScript errors
- [ ] All routes return proper JSON responses
- [ ] POST endpoint correctly echoes the body
- [ ] Unknown routes return 404
- [ ] All responses are properly typed

## Bonus Challenge

Add these features:
1. Request logging middleware that prints method + path
2. GET /api/users/:id endpoint that returns a user by ID
3. Input validation for POST requests
4. CORS middleware to allow cross-origin requests
