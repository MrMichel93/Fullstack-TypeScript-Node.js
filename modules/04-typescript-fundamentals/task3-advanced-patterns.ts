/**
 * Task 3: Advanced TypeScript Patterns
 * 
 * Apply advanced TypeScript features including utility types, type guards, and discriminated unions.
 */

// Part 1: Utility Types

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
// type UserProfile = ...

// TODO: User update payload (all fields optional except id)
// type UserUpdate = ...

// TODO: User creation payload (no id, dates auto-generated)
// type CreateUserPayload = ...

// TODO: Read-only user (can't modify after creation)
// type ReadonlyUser = ...

// TODO: User authentication result
// type AuthResult = ...

// TODO: Implement these functions using the utility types above
// export function getUserProfile(user: User): UserProfile {
//   ...
// }

// export function updateUser(update: UserUpdate): User {
//   ...
// }

// export function createUser(payload: CreateUserPayload): User {
//   ...
// }

// export function authenticate(username: string, password: string): AuthResult {
//   ...
// }

// Part 2: Type Guards

interface SuccessResponse {
  status: "success";
  data: any;
}

interface ErrorResponse {
  status: "error";
  message: string;
  code: number;
}

export type ApiResponse = SuccessResponse | ErrorResponse;

// TODO: Implement type guard for success response
export function isSuccessResponse(response: ApiResponse): response is SuccessResponse {
  // TODO: Implement
  return false;
}

// TODO: Implement type guard for error response
export function isErrorResponse(response: ApiResponse): response is ErrorResponse {
  // TODO: Implement
  return false;
}

// TODO: Type guard for checking if value is a string array
export function isStringArray(value: unknown): value is string[] {
  // TODO: Implement
  return false;
}

// TODO: Generic type guard for objects with specific property
export function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  // TODO: Implement
  return false;
}

// Part 3: Discriminated Unions

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

export type Shape = Circle | Rectangle | Triangle;

// TODO: Calculate area using discriminated union
export function calculateArea(shape: Shape): number {
  // TODO: Implement with switch statement and exhaustiveness checking
  return 0;
}

// TODO: Calculate perimeter using discriminated union
export function calculatePerimeter(shape: Shape): number {
  // TODO: Implement
  return 0;
}
