# Task 1: Types vs Interfaces

## Objective
Understand when to use types vs interfaces and practice creating both.

## Instructions

Refactor a codebase to use appropriate types and interfaces based on best practices.

## Scenario

You're building a task management system. Decide whether to use `type` or `interface` for each data structure.

## Requirements

### Part 1: Identify Correct Usage

For each scenario below, decide if you should use `type` or `interface` and explain why:

1. Defining the shape of a Task object
2. Creating a union of task statuses: "pending" | "in-progress" | "completed"
3. Defining a User object that might be extended later
4. Creating a type for a validation function
5. Combining User with authentication properties

## Part 2: Implementation

Create `types.ts` with proper implementations:

```typescript
// TODO: User object - needs to be extended later
// Should this be type or interface?

// TODO: Task status - one of several string values
// Should this be type or interface?

// TODO: Task object - standard object shape
// Should this be type or interface?

// TODO: Validation function signature
// Should this be type or interface?

// TODO: Authenticated user - combines User with auth data
// Should this be type or interface?

// TODO: API response that can be success or error
// Should this be type or interface?
```

### Expected Definitions

1. **User** (extensible object)
   - id: number
   - username: string
   - email: string

2. **TaskStatus** (union of literals)
   - "pending", "in-progress", "completed"

3. **Task** (object shape)
   - id: number
   - title: string
   - description: string
   - status: TaskStatus
   - assignedTo: number (user id)
   - createdAt: Date

4. **ValidationFunction** (function signature)
   - Takes any value
   - Returns boolean

5. **AuthenticatedUser** (combination)
   - All User properties
   - Plus: token: string
   - Plus: expiresAt: Date

6. **ApiResponse<T>** (generic union)
   - Success: { success: true, data: T }
   - Error: { success: false, error: string }

## Part 3: Usage Examples

After implementing, create usage examples:

```typescript
// Example 1: Creating objects
const task: Task = {
  // TODO: Fill in
};

// Example 2: Using union types
const status: TaskStatus = "in-progress"; // ✓ Valid
// const badStatus: TaskStatus = "cancelled"; // ✗ Should error

// Example 3: Extending interfaces
interface AdminUser extends User {
  role: "admin";
  permissions: string[];
}

// Example 4: Using generic response
const successResponse: ApiResponse<Task> = {
  success: true,
  data: task
};

const errorResponse: ApiResponse<Task> = {
  success: false,
  error: "Task not found"
};
```

## Decision Guide

Use this to make your choices:

| Scenario | Use Type | Use Interface |
|----------|----------|---------------|
| Object shape | ✓ OK | ✓ Better |
| Needs extending | ✗ No | ✓ Yes |
| Union types | ✓ Yes | ✗ No |
| Function signature | ✓ Yes | ✓ OK |
| Intersection | ✓ Yes | ✓ OK |
| Generic wrapper | ✓ Better | ✓ OK |

## Verification Checklist

- [ ] All types compile without errors
- [ ] Object shapes use interfaces
- [ ] Union types use type
- [ ] Interfaces can be extended
- [ ] Function signatures are properly typed
- [ ] Generic types work with different data types
- [ ] Invalid assignments are caught by TypeScript

## Bonus Challenge

1. Create a `Partial<Task>` for task updates
2. Use `Pick<User, 'id' | 'username'>` for public profiles
3. Create a `TaskFilter` type for filtering tasks
4. Implement a `TaskRepository` interface with CRUD methods
5. Add readonly modifiers to prevent mutations
