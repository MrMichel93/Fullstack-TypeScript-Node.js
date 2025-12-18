/**
 * Task 1: Types vs Interfaces
 * 
 * Understand when to use types vs interfaces and practice creating both.
 * 
 * Decision Guide:
 * - Use Interface for: Object shapes, Needs extending, Better for objects
 * - Use Type for: Union types, Function signatures, Generic wrappers
 */

// TODO: User object - needs to be extended later
// Should this be type or interface?
// Hint: Use interface because it needs to be extended

// TODO: Task status - one of several string values
// Should this be type or interface?
// Hint: Use type for union types
// export type TaskStatus = ...

// TODO: Task object - standard object shape
// Should this be type or interface?
// Hint: Interface is better for object shapes

// TODO: Validation function signature
// Should this be type or interface?
// Hint: Type is better for function signatures
// export type ValidationFunction = ...

// TODO: Authenticated user - combines User with auth data
// Should this be type or interface?
// Hint: Can use either, but type is more common for intersections
// export type AuthenticatedUser = ...

// TODO: API response that can be success or error (generic union)
// Should this be type or interface?
// Hint: Use type for unions and generics
// export type ApiResponse<T> = ...

// Example usage (uncomment when you implement the types above):
// const task: Task = {
//   id: 1,
//   title: "Learn TypeScript",
//   description: "Study types vs interfaces",
//   status: "in-progress",
//   assignedTo: 1,
//   createdAt: new Date()
// };

// const status: TaskStatus = "in-progress"; // ✓ Valid
// const badStatus: TaskStatus = "cancelled"; // ✗ Should error

// interface AdminUser extends User {
//   role: "admin";
//   permissions: string[];
// }

// const successResponse: ApiResponse<Task> = {
//   success: true,
//   data: task
// };

// const errorResponse: ApiResponse<Task> = {
//   success: false,
//   error: "Task not found"
// };
