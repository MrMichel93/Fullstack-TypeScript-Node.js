# Task 2: Generics in Action

## Objective
Master TypeScript generics by creating reusable, type-safe utility functions and classes.

## Instructions

Build a collection of generic utilities that work with any data type while maintaining type safety.

## Part 1: Generic Functions

Create `generics.ts` with these implementations:

### 1. Array Wrapper

```typescript
// TODO: Implement a generic function that returns the first element
function getFirst<T>(array: T[]): T | undefined {
  // Implementation here
}

// Usage examples
const firstNumber = getFirst([1, 2, 3]); // Type: number | undefined
const firstString = getFirst(["a", "b"]); // Type: string | undefined
```

### 2. Response Wrapper

```typescript
// TODO: Create a generic API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// TODO: Function that creates a success response
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  // Implementation here
}

// Usage
const userResponse = createSuccessResponse({ id: 1, name: "Alice" });
// Type: ApiResponse<{ id: number; name: string; }>
```

### 3. Filter Function

```typescript
// TODO: Generic filter with predicate
function filterArray<T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] {
  // Implementation here
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const evens = filterArray(numbers, n => n % 2 === 0);
// Type: number[]

interface User {
  id: number;
  name: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false }
];

const activeUsers = filterArray(users, u => u.active);
// Type: User[]
```

## Part 2: Generic Class

```typescript
// TODO: Implement a generic Repository class
class Repository<T> {
  private items: T[] = [];

  // TODO: Add item
  add(item: T): void {
    // Implementation
  }

  // TODO: Get all items
  getAll(): T[] {
    // Implementation
  }

  // TODO: Find item by condition
  find(predicate: (item: T) => boolean): T | undefined {
    // Implementation
  }

  // TODO: Remove item
  remove(predicate: (item: T) => boolean): boolean {
    // Implementation
  }

  // TODO: Update item
  update(predicate: (item: T) => boolean, updates: Partial<T>): boolean {
    // Implementation
  }
}
```

### Usage Example

```typescript
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const taskRepo = new Repository<Task>();

taskRepo.add({ id: 1, title: "Learn TypeScript", completed: false });
taskRepo.add({ id: 2, title: "Build Project", completed: false });

const allTasks = taskRepo.getAll(); // Type: Task[]
const task = taskRepo.find(t => t.id === 1); // Type: Task | undefined
taskRepo.update(t => t.id === 1, { completed: true });
```

## Part 3: Generic Constraints

```typescript
// TODO: Generic function that works only with objects having an 'id' property
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  // Implementation
}

// Usage
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

const user = findById(users, 1); // Works!
// const invalid = findById(["a", "b"], 1); // Error: string doesn't have 'id'
```

## Part 4: Multiple Type Parameters

```typescript
// TODO: Generic function with two type parameters
function mapObject<K extends string, V, R>(
  obj: Record<K, V>,
  mapper: (value: V, key: K) => R
): Record<K, R> {
  // Implementation
}

// Usage
const scores = { math: 90, english: 85, science: 92 };
const grades = mapObject(scores, (score) => score >= 90 ? 'A' : 'B');
// Type: Record<"math" | "english" | "science", string>
```

## Requirements Checklist

- [ ] All generic functions maintain type safety
- [ ] Generic class works with different types
- [ ] Constraints properly restrict generic types
- [ ] Multiple type parameters work correctly
- [ ] Type inference works without explicit type arguments
- [ ] No use of `any` type
- [ ] All code compiles without errors

## Test Cases

Create test cases for each implementation:

```typescript
// Test generic functions
console.assert(getFirst([1, 2, 3]) === 1);
console.assert(getFirst([]) === undefined);

// Test Repository
const numRepo = new Repository<number>();
numRepo.add(1);
numRepo.add(2);
console.assert(numRepo.getAll().length === 2);

// Test with constraints
interface Product extends HasId {
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 25 }
];

const laptop = findById(products, 1);
console.assert(laptop?.name === "Laptop");
```

## Bonus Challenge

1. Add pagination to Repository with generic parameters
2. Create a `pipe` function that chains generic transformations
3. Implement a generic `Cache<K, V>` class with TTL
4. Create a type-safe event emitter with generics
5. Build a generic state manager (like Redux)
