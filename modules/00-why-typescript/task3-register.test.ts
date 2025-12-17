/**
 * Tests for Task 3: Reading TypeScript Errors
 * 
 * Run with: npm test modules/00-why-typescript/task3-register.test.ts
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { registerUser } from './task3-register';

test('registerUser - creates user with valid data', () => {
  const userData = {
    username: "alice",
    email: "alice@example.com"
  };
  
  const user = registerUser(userData);
  
  assert.ok(user.id, 'User should have an id');
  assert.strictEqual(user.username, "alice", 'Should set username correctly');
  assert.strictEqual(user.email, "alice@example.com", 'Should set email correctly');
  assert.ok(user.createdAt instanceof Date, 'Should have createdAt as Date');
});

test('registerUser - generates unique IDs', () => {
  const userData = {
    username: "bob",
    email: "bob@example.com"
  };
  
  const user1 = registerUser(userData);
  const user2 = registerUser(userData);
  
  assert.notStrictEqual(user1.id, user2.id, 'Should generate different IDs');
});

test('registerUser - preserves all user data', () => {
  const userData = {
    username: "charlie",
    email: "charlie@test.com"
  };
  
  const user = registerUser(userData);
  
  assert.strictEqual(typeof user.id, 'number', 'ID should be a number');
  assert.strictEqual(typeof user.username, 'string', 'Username should be a string');
  assert.strictEqual(typeof user.email, 'string', 'Email should be a string');
});

// Bonus tests - uncomment when you implement validateUser
// import { validateUser } from './task3-register';
//
// test('validateUser - valid user data', () => {
//   const result = validateUser({
//     username: "alice",
//     email: "alice@example.com"
//   });
//   
//   assert.strictEqual(result.valid, true, 'Should be valid');
//   assert.strictEqual(result.errors.length, 0, 'Should have no errors');
// });
//
// test('validateUser - invalid email', () => {
//   const result = validateUser({
//     username: "alice",
//     email: "aliceexample.com"
//   });
//   
//   assert.strictEqual(result.valid, false, 'Should be invalid');
//   assert.ok(result.errors.some(e => e.includes('@')), 'Should mention @ symbol');
// });
//
// test('validateUser - username too short', () => {
//   const result = validateUser({
//     username: "ab",
//     email: "alice@example.com"
//   });
//   
//   assert.strictEqual(result.valid, false, 'Should be invalid');
//   assert.ok(result.errors.some(e => e.includes('3 characters')), 'Should mention length requirement');
// });
//
// test('validateUser - multiple errors', () => {
//   const result = validateUser({
//     username: "ab",
//     email: "aliceexample.com"
//   });
//   
//   assert.strictEqual(result.valid, false, 'Should be invalid');
//   assert.strictEqual(result.errors.length, 2, 'Should have two errors');
// });
