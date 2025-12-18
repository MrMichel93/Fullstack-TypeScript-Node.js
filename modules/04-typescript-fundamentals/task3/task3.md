# Task 3: Advanced TypeScript Patterns

## Objective
Apply advanced TypeScript features including utility types, type guards, and discriminated unions.

## Instructions

Build a type-safe API layer using advanced TypeScript patterns.

## Part 1: Utility Types

Create `userTypes.ts` demonstrating utility types:

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Public user profile (no password, no role)
type UserProfile = Pick<User, 'id' | 'username' | 'email'>;

// TODO: User update payload (all fields optional except id)
type UserUpdate = Partial<Omit<User, 'id' | 'createdAt'>> & Pick<User, 'id'>;

// TODO: User creation payload (no id, dates auto-generated)
type CreateUserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// TODO: Read-only user (can't modify after creation)
type ReadonlyUser = Readonly<User>;

// TODO: User authentication result
type AuthResult = 
  | { success: true; user: UserProfile; token: string }
  | { success: false; error: string };
```

### Implementation Requirements

```typescript
// Test your types
function getUserProfile(user: User): UserProfile {
  // TODO: Return only id, username, email
}

function updateUser(update: UserUpdate): User {
  // TODO: Update user with partial data
}

function createUser(payload: CreateUserPayload): User {
  // TODO: Create new user with generated id and dates
}

function authenticate(username: string, password: string): AuthResult {
  // TODO: Return success or error result
}
```

## Part 2: Type Guards

Create `typeGuards.ts`:

```typescript
// Define types for different API responses
interface SuccessResponse {
  status: "success";
  data: any;
}

interface ErrorResponse {
  status: "error";
  message: string;
  code: number;
}

type ApiResponse = SuccessResponse | ErrorResponse;

// TODO: Implement type guard for success response
function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  // Implementation
}

// TODO: Implement type guard for error response  
function isErrorResponse(response: ApiResponse): response is ErrorResponse {
  // Implementation
}

// Usage example
function handleResponse(response: ApiResponse) {
  if (isSuccessResponse(response)) {
    // TypeScript knows this is SuccessResponse
    console.log(response.data);
  } else {
    // TypeScript knows this is ErrorResponse
    console.log(response.message, response.code);
  }
}
```

### Additional Type Guards

```typescript
// TODO: Type guard for checking if value is a string array
function isStringArray(value: unknown): value is string[] {
  // Implementation
}

// TODO: Type guard for User object
interface User {
  id: number;
  username: string;
  email: string;
}

function isUser(value: unknown): value is User {
  // Implementation
}

// TODO: Generic type guard for objects with specific property
function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  // Implementation
}
```

## Part 3: Discriminated Unions

Create `shapes.ts`:

```typescript
// Define discriminated union for shapes
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

// TODO: Calculate area using discriminated union
function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // TypeScript knows shape is Circle here
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      // TypeScript knows shape is Rectangle here
      return shape.width * shape.height;
    case "triangle":
      // TypeScript knows shape is Triangle here
      return (shape.base * shape.height) / 2;
    default:
      // Exhaustiveness check
      const _exhaustive: never = shape;
      throw new Error(`Unhandled shape: ${_exhaustive}`);
  }
}

// TODO: Get perimeter using discriminated union
function calculatePerimeter(shape: Shape): number {
  // Implementation
}
```

## Part 4: Real-World Application

Build a type-safe action handler:

```typescript
// Action types
interface LoginAction {
  type: "LOGIN";
  payload: { username: string; password: string };
}

interface LogoutAction {
  type: "LOGOUT";
}

interface UpdateProfileAction {
  type: "UPDATE_PROFILE";
  payload: Partial<UserProfile>;
}

interface DeleteAccountAction {
  type: "DELETE_ACCOUNT";
  payload: { userId: number; confirm: boolean };
}

type Action = LoginAction | LogoutAction | UpdateProfileAction | DeleteAccountAction;

// State type
interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  lastAction: string;
}

// TODO: Implement type-safe reducer
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOGIN":
      // TypeScript knows action.payload has username and password
      return {
        ...state,
        // Handle login
      };
    case "LOGOUT":
      // TypeScript knows action has no payload
      return {
        ...state,
        // Handle logout
      };
    case "UPDATE_PROFILE":
      // TypeScript knows action.payload is Partial<UserProfile>
      return {
        ...state,
        // Handle update
      };
    case "DELETE_ACCOUNT":
      // TypeScript knows action.payload has userId and confirm
      return {
        ...state,
        // Handle deletion
      };
    default:
      // Exhaustiveness check
      const _exhaustive: never = action;
      return state;
  }
}
```

## Verification Checklist

- [ ] Utility types correctly transform base types
- [ ] Type guards properly narrow types
- [ ] Discriminated unions enable exhaustive checking
- [ ] No `any` types used
- [ ] All code compiles without errors
- [ ] Type inference works in all cases
- [ ] Invalid operations are caught at compile time

## Test Cases

```typescript
// Test utility types
const user: User = {
  id: 1,
  username: "alice",
  email: "alice@example.com",
  password: "hashed",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date()
};

const profile = getUserProfile(user);
// profile should only have id, username, email

// Test type guards
const response: ApiResponse = { status: "success", data: { id: 1 } };
if (isSuccessResponse(response)) {
  console.log(response.data); // ✓ Works
  // console.log(response.message); // ✗ Error
}

// Test discriminated unions
const circle: Circle = { kind: "circle", radius: 5 };
console.assert(calculateArea(circle) === Math.PI * 25);

// Test reducer
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  lastAction: ""
};

const newState = reducer(initialState, {
  type: "LOGIN",
  payload: { username: "alice", password: "secret" }
});
```

## Bonus Challenge

1. Create a type-safe query builder for databases
2. Implement a type-safe event bus with typed events
3. Build a type-safe form validation system
4. Create a type-safe API client with typed endpoints
5. Implement a type-safe state machine
