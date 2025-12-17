/**
 * Tests for Task 1: Types vs Interfaces
 * 
 * Run with: npm test modules/04-typescript-fundamentals/task1-types-interfaces.test.ts
 * 
 * Note: These tests are placeholder tests. Once you implement the types and interfaces,
 * the main verification will be whether your code compiles without TypeScript errors.
 */

import { test } from 'node:test';
import assert from 'node:assert';

// TODO: Import your types and interfaces once implemented
// import { User, TaskStatus, Task, ValidationFunction, AuthenticatedUser, ApiResponse } from './task1-types-interfaces';

test('Types vs Interfaces - placeholder test', () => {
  // This test ensures the test file itself is valid
  assert.ok(true, 'Test runner is working');
});

// TODO: Uncomment and implement these tests once you've created the types/interfaces

// test('User interface can be extended', () => {
//   interface AdminUser extends User {
//     role: "admin";
//     permissions: string[];
//   }
//   
//   const admin: AdminUser = {
//     id: 1,
//     username: "admin",
//     email: "admin@example.com",
//     role: "admin",
//     permissions: ["read", "write", "delete"]
//   };
//   
//   assert.strictEqual(admin.role, "admin");
//   assert.strictEqual(admin.permissions.length, 3);
// });

// test('TaskStatus only accepts valid values', () => {
//   const validStatus: TaskStatus = "pending";
//   assert.strictEqual(validStatus, "pending");
//   
//   // This should cause a TypeScript error if uncommented:
//   // const invalidStatus: TaskStatus = "cancelled";
// });

// test('Task interface requires all fields', () => {
//   const task: Task = {
//     id: 1,
//     title: "Learn TypeScript",
//     description: "Study types vs interfaces",
//     status: "in-progress",
//     assignedTo: 1,
//     createdAt: new Date()
//   };
//   
//   assert.strictEqual(task.id, 1);
//   assert.strictEqual(task.status, "in-progress");
// });

// test('ValidationFunction type works correctly', () => {
//   const isPositive: ValidationFunction = (value: any) => typeof value === 'number' && value > 0;
//   
//   assert.strictEqual(isPositive(5), true);
//   assert.strictEqual(isPositive(-1), false);
//   assert.strictEqual(isPositive("test"), false);
// });

// test('AuthenticatedUser combines User with auth data', () => {
//   const authUser: AuthenticatedUser = {
//     id: 1,
//     username: "alice",
//     email: "alice@example.com",
//     token: "jwt-token-here",
//     expiresAt: new Date(Date.now() + 3600000)
//   };
//   
//   assert.ok(authUser.token);
//   assert.ok(authUser.expiresAt instanceof Date);
// });

// test('ApiResponse success type', () => {
//   const task: Task = {
//     id: 1,
//     title: "Test",
//     description: "Test task",
//     status: "pending",
//     assignedTo: 1,
//     createdAt: new Date()
//   };
//   
//   const successResponse: ApiResponse<Task> = {
//     success: true,
//     data: task
//   };
//   
//   assert.strictEqual(successResponse.success, true);
//   if (successResponse.success) {
//     assert.strictEqual(successResponse.data.id, 1);
//   }
// });

// test('ApiResponse error type', () => {
//   const errorResponse: ApiResponse<Task> = {
//     success: false,
//     error: "Task not found"
//   };
//   
//   assert.strictEqual(errorResponse.success, false);
//   if (!errorResponse.success) {
//     assert.ok(errorResponse.error.length > 0);
//   }
// });
