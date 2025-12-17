# Task 1: Understanding Request/Response Cycle

## Objective
Trace and document the complete flow of an HTTP request through a web application.

## Instructions

Create a diagram or written explanation showing what happens when a user visits `http://localhost:3000/users/123`.

## Requirements

Your explanation should include:
1. **Client Action**: What the user does
2. **HTTP Request**: The exact HTTP request sent (method, path, headers)
3. **Server Processing**: How the server handles the request
4. **Database Query**: If data is retrieved from the database
5. **HTTP Response**: The response sent back (status code, body)
6. **Client Display**: How the browser shows the result

## Example Format

```
Step 1: USER ACTION
- User types URL in browser: http://localhost:3000/users/123
- Browser sends request

Step 2: HTTP REQUEST
GET /users/123 HTTP/1.1
Host: localhost:3000
Accept: application/json

Step 3: SERVER PROCESSING
[Your explanation here]

Step 4: DATABASE QUERY
[Your explanation here]

Step 5: HTTP RESPONSE
[Your explanation here]

Step 6: DISPLAY RESULT
[Your explanation here]
```

## Verification

Your explanation should answer:
- What HTTP method is used and why?
- Where does the user ID (123) come from?
- What data structures are involved?
- What happens if the user doesn't exist?

## Bonus Challenge

Explain what changes if:
1. The request is POST /users instead of GET /users/123
2. The user is not authenticated
3. The database is unavailable
