/**
 * Task 1: Understanding Request/Response Cycle
 * 
 * This task is primarily conceptual. Study the example below and document
 * what happens at each step of the HTTP request/response cycle.
 */

/**
 * Simulates a simple HTTP request/response cycle
 * 
 * TODO: Document each step of this process:
 * 1. What happens when parseRequest is called?
 * 2. How does the server determine which handler to use?
 * 3. What would happen if the user doesn't exist?
 * 4. How is the response formatted?
 */

interface Request {
  method: string;
  path: string;
  headers: Record<string, string>;
}

interface Response {
  statusCode: number;
  body: string;
  headers: Record<string, string>;
}

// TODO: Implement this function to parse a raw HTTP request string
export function parseRequest(rawRequest: string): Request {
  // Example: "GET /users/123 HTTP/1.1\nHost: localhost:3000"
  // Should return: { method: "GET", path: "/users/123", headers: {...} }
  return {
    method: "",
    path: "",
    headers: {}
  };
}

// TODO: Implement this function to handle user requests
export function handleUserRequest(userId: string): Response {
  // Simulate fetching user from database
  // Return appropriate response with status code and body
  return {
    statusCode: 200,
    body: "",
    headers: { "Content-Type": "application/json" }
  };
}

// TODO: Implement this function to format the HTTP response
export function formatResponse(response: Response): string {
  // Convert Response object to HTTP response string
  // Example: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{...}"
  return "";
}
