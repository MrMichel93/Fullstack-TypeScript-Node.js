# TypeScript Fundamentals

This guide covers the essential TypeScript concepts you need to build the course projects.

## 📘 Basic Types

### Primitive Types

```typescript
// String
let username: string = "Alice";

// Number
let age: number = 18;
let price: number = 19.99;

// Boolean
let isActive: boolean = true;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;
```

### Type Inference

TypeScript can often figure out types automatically:

```typescript
// TypeScript infers the type from the value
let username = "Alice";  // Type: string
let age = 18;           // Type: number
let isActive = true;    // Type: boolean

// This is an error:
username = 42;  // ❌ Type 'number' is not assignable to type 'string'
```

### Arrays

```typescript
// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];

// Array of numbers
let scores: number[] = [95, 87, 92];

// Alternative syntax (less common)
let items: Array<string> = ["item1", "item2"];
```

### Objects

```typescript
// Object with specific properties
let user: { name: string; age: number } = {
  name: "Alice",
  age: 18
};

// Optional properties
let config: { host: string; port?: number } = {
  host: "localhost"
  // port is optional
};
```

## 🏗️ Interfaces vs Types

This is one of the most important decisions in TypeScript. Both create custom types, but they have different use cases.

### Interfaces

Use interfaces for **object shapes**, especially when you might extend them later:

```typescript
// Interface for a user object
interface User {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}

// Using the interface
const user: User = {
  id: 1,
  username: "alice",
  email: "alice@example.com",
  createdAt: new Date()
};

// Interfaces can be extended
interface Admin extends User {
  role: "admin";
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  username: "admin",
  email: "admin@example.com",
  createdAt: new Date(),
  role: "admin",
  permissions: ["read", "write", "delete"]
};
```

### Types

Use types for **unions, intersections, and complex types**:

```typescript
// Union types (value can be one of several types)
type Status = "pending" | "active" | "inactive";
type ID = string | number;

// Function types
type ValidationFunction = (value: string) => boolean;

// Intersection types (combine multiple types)
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type Task = {
  id: number;
  title: string;
} & Timestamped;

// This is equivalent to:
// interface Task {
//   id: number;
//   title: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
```

### When to Use Which?

**Use `interface` when:**
- Defining the shape of objects
- You might need to extend it later
- Working with classes

**Use `type` when:**
- Creating union types
- Creating intersection types
- Defining function signatures
- Creating utility types

**Example from real projects:**

```typescript
// ✅ Good: Interface for object shapes
interface User {
  id: number;
  username: string;
}

// ✅ Good: Type for union
type UserRole = "admin" | "user" | "guest";

// ✅ Good: Type for complex combinations
type AuthenticatedUser = User & {
  token: string;
  role: UserRole;
};
```

## 🔧 Functions

### Function Types

```typescript
// Function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Function with no return value
function logMessage(message: string): void {
  console.log(message);
}

// Optional parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

// Default parameters
function createUser(name: string, role: string = "user"): User {
  // ...
}

// Arrow functions
const multiply = (a: number, b: number): number => a * b;
```

### Function Type Aliases

```typescript
// Define a function type
type MathOperation = (a: number, b: number) => number;

// Use it
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// Common in Express middleware
type Middleware = (req: Request, res: Response, next: NextFunction) => void;
```

## 🎭 Union Types

Allow a value to be one of several types:

```typescript
// Simple union
let id: string | number;
id = "abc123";  // ✅ OK
id = 123;       // ✅ OK
id = true;      // ❌ Error

// Union with literal types
type Status = "loading" | "success" | "error";
let currentStatus: Status = "loading";  // ✅ OK
currentStatus = "pending";  // ❌ Error: not in union

// Unions with objects
type Response = 
  | { success: true; data: User }
  | { success: false; error: string };

function handleResponse(response: Response) {
  if (response.success) {
    // TypeScript knows response.data exists here
    console.log(response.data);
  } else {
    // TypeScript knows response.error exists here
    console.log(response.error);
  }
}
```

## 🎁 Generics

Generics allow you to write reusable code that works with multiple types:

```typescript
// Generic function
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

const firstNumber = getFirstElement([1, 2, 3]);  // Type: number | undefined
const firstName = getFirstElement(["Alice", "Bob"]);  // Type: string | undefined

// Generic interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Using the generic interface
const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, username: "alice", email: "alice@example.com", createdAt: new Date() },
  message: "User fetched successfully"
};

const tasksResponse: ApiResponse<Task[]> = {
  success: true,
  data: [/* tasks */],
  message: "Tasks fetched successfully"
};
```

### Common Generic Patterns

```typescript
// Generic Promise
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Generic array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map<number>(n => n * 2);
const strings = numbers.map<string>(n => n.toString());
```

## 🛡️ Type Assertions

Sometimes you know more about a type than TypeScript does:

```typescript
// Type assertion with 'as'
const input = document.getElementById("username") as HTMLInputElement;
input.value = "Alice";  // TypeScript knows it's an input element

// Alternative syntax (not common in TSX/JSX)
const input2 = <HTMLInputElement>document.getElementById("username");

// ⚠️ Use sparingly! Assertions bypass type checking
```

## 🔍 Type Guards

Check types at runtime:

```typescript
// typeof type guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is a string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is a number here
    console.log(value.toFixed(2));
  }
}

// instanceof type guard
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// Custom type guard
interface User {
  id: number;
  username: string;
}

function isUser(obj: any): obj is User {
  return obj && typeof obj.id === "number" && typeof obj.username === "string";
}

function processData(data: unknown) {
  if (isUser(data)) {
    // TypeScript knows data is a User here
    console.log(data.username);
  }
}
```

## 🌟 Utility Types

TypeScript provides built-in utility types:

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;
// Equivalent to:
// {
//   id?: number;
//   username?: string;
//   email?: string;
//   password?: string;
// }

// Pick - select specific properties
type UserPublic = Pick<User, "id" | "username">;
// Equivalent to:
// {
//   id: number;
//   username: string;
// }

// Omit - remove specific properties
type UserWithoutPassword = Omit<User, "password">;
// Equivalent to:
// {
//   id: number;
//   username: string;
//   email: string;
// }

// Readonly - make all properties readonly
type ReadonlyUser = Readonly<User>;

// Record - create an object type with specific keys
type UserRoles = Record<string, string[]>;
// Example:
const roles: UserRoles = {
  admin: ["read", "write", "delete"],
  user: ["read"]
};
```

## 🔗 Working with Express Types

When building Express applications, you'll use these patterns:

```typescript
import express, { Request, Response, NextFunction } from "express";

// Basic route handler
app.get("/users", (req: Request, res: Response) => {
  res.json({ users: [] });
});

// Extended Request with custom properties
interface AuthRequest extends Request {
  user?: User;
}

app.get("/profile", (req: AuthRequest, res: Response) => {
  if (req.user) {
    res.json({ user: req.user });
  }
});

// Typed request body
interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

app.post("/users", (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
  const { username, email, password } = req.body;
  // TypeScript knows the types!
});

// Middleware
const authenticate: Middleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Authentication logic
  next();
};
```

## 📝 Best Practices

### 1. Avoid `any`

```typescript
// ❌ Bad
function processData(data: any) {
  // Defeats the purpose of TypeScript
}

// ✅ Good
function processData(data: unknown) {
  if (isUser(data)) {
    // Now we know it's a User
  }
}
```

### 2. Use `const` for immutable values

```typescript
// ✅ Good
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// ❌ Bad (unless you need to reassign)
let API_URL = "https://api.example.com";
```

### 3. Type function returns

```typescript
// ✅ Good - explicit return type
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ⚠️ OK but implicit (TypeScript infers it)
function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### 4. Use readonly for arrays and objects that shouldn't change

```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// ❌ Error
config.apiUrl = "https://other-api.com";
```

## 🎯 Practice Exercise

Try typing this JavaScript code:

```javascript
// JavaScript
function createTask(title, description, userId) {
  return {
    id: Math.random().toString(36),
    title: title,
    description: description,
    userId: userId,
    completed: false,
    createdAt: new Date()
  };
}

function updateTask(task, updates) {
  return { ...task, ...updates };
}
```

<details>
<summary>Solution</summary>

```typescript
// TypeScript
interface Task {
  id: string;
  title: string;
  description: string;
  userId: number;
  completed: boolean;
  createdAt: Date;
}

function createTask(
  title: string,
  description: string,
  userId: number
): Task {
  return {
    id: Math.random().toString(36),
    title,
    description,
    userId,
    completed: false,
    createdAt: new Date()
  };
}

function updateTask(
  task: Task,
  updates: Partial<Task>
): Task {
  return { ...task, ...updates };
}
```

</details>

## 🚀 Next Steps

Now that you understand TypeScript fundamentals, you're ready to start building projects!

**Next:** [Architecture Primer](../01-architecture-primer/README.md) to understand how web applications work, then dive into [Project 1: Auth System](../../projects/01-auth-system/).

---

**Remember:** TypeScript is a tool to help you write better code. When you get a compiler error, read it carefully—it's trying to help you avoid bugs!

---

## 🏋️ Practice Exercises

This module includes comprehensive TypeScript exercises with automated tests.

### Available Tasks

1. **task1-types-interfaces.ts** - Types vs Interfaces
   - Learn when to use `type` vs `interface`
   - Practice creating both for different scenarios
   - See [task1.md](./task1.md) for details

2. **task2-generics.ts** - Generics in Action
   - Master type-safe generic functions and classes
   - Build a reusable Repository class
   - See [task2.md](./task2.md) for details

3. **task3-advanced-patterns.ts** - Advanced TypeScript Patterns
   - Work with utility types (Pick, Omit, Partial)
   - Implement type guards and discriminated unions
   - See [task3.md](./task3.md) for details

### How to Work on Exercises

1. **Read the task markdown file** for detailed instructions:
   ```bash
   cat task1.md
   ```

2. **Open the TypeScript file** and implement the TODOs:
   ```bash
   code task1-types-interfaces.ts
   ```

3. **Check TypeScript compilation**:
   ```bash
   npx tsc --noEmit --strict task1-types-interfaces.ts
   ```

4. **Run the tests** to verify your solution:
   ```bash
   npm run test:module task1-types-interfaces.test.ts
   ```

### Running All Tests for This Module

```bash
npm run test:module "modules/04-typescript-fundamentals/*.test.ts"
```

### Learning Path

1. Start with **Task 1** to understand types vs interfaces
2. Move to **Task 2** to master generics
3. Finish with **Task 3** for advanced patterns

Each task builds on concepts from previous ones, so complete them in order.
