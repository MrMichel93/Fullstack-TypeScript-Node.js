/**
 * Tests for Task 3: Advanced TypeScript Patterns
 * 
 * Run with: npm test modules/04-typescript-fundamentals/task3-advanced-patterns.test.ts
 */

import { test } from 'node:test';
import assert from 'node:assert';
import {
  ApiResponse,
  isSuccessResponse,
  isErrorResponse,
  isStringArray,
  hasProperty,
  Shape,
  calculateArea,
  calculatePerimeter
} from './task3-advanced-patterns';

// Type Guard Tests

test('isSuccessResponse - identifies success response', () => {
  const response: ApiResponse = {
    status: "success",
    data: { id: 1, name: "Test" }
  };
  
  assert.strictEqual(isSuccessResponse(response), true);
});

test('isSuccessResponse - rejects error response', () => {
  const response: ApiResponse = {
    status: "error",
    message: "Not found",
    code: 404
  };
  
  assert.strictEqual(isSuccessResponse(response), false);
});

test('isErrorResponse - identifies error response', () => {
  const response: ApiResponse = {
    status: "error",
    message: "Not found",
    code: 404
  };
  
  assert.strictEqual(isErrorResponse(response), true);
});

test('isErrorResponse - rejects success response', () => {
  const response: ApiResponse = {
    status: "success",
    data: { id: 1 }
  };
  
  assert.strictEqual(isErrorResponse(response), false);
});

test('isStringArray - identifies string array', () => {
  assert.strictEqual(isStringArray(['a', 'b', 'c']), true);
  assert.strictEqual(isStringArray([]), true); // Empty array is still a string array
});

test('isStringArray - rejects non-string arrays', () => {
  assert.strictEqual(isStringArray([1, 2, 3]), false);
  assert.strictEqual(isStringArray(['a', 1, 'b']), false);
  assert.strictEqual(isStringArray('not an array'), false);
  assert.strictEqual(isStringArray(null), false);
});

test('hasProperty - identifies object with property', () => {
  const obj = { name: 'Alice', age: 25 };
  assert.strictEqual(hasProperty(obj, 'name'), true);
  assert.strictEqual(hasProperty(obj, 'age'), true);
});

test('hasProperty - rejects object without property', () => {
  const obj = { name: 'Alice' };
  assert.strictEqual(hasProperty(obj, 'age'), false);
  assert.strictEqual(hasProperty(null, 'name'), false);
  assert.strictEqual(hasProperty('string', 'name'), false);
});

// Discriminated Union Tests

test('calculateArea - circle', () => {
  const circle: Shape = { kind: "circle", radius: 5 };
  const area = calculateArea(circle);
  assert.strictEqual(Math.round(area * 100) / 100, Math.round(Math.PI * 25 * 100) / 100);
});

test('calculateArea - rectangle', () => {
  const rectangle: Shape = { kind: "rectangle", width: 10, height: 5 };
  const area = calculateArea(rectangle);
  assert.strictEqual(area, 50);
});

test('calculateArea - triangle', () => {
  const triangle: Shape = { kind: "triangle", base: 10, height: 6 };
  const area = calculateArea(triangle);
  assert.strictEqual(area, 30);
});

test('calculatePerimeter - circle', () => {
  const circle: Shape = { kind: "circle", radius: 5 };
  const perimeter = calculatePerimeter(circle);
  assert.strictEqual(Math.round(perimeter * 100) / 100, Math.round(2 * Math.PI * 5 * 100) / 100);
});

test('calculatePerimeter - rectangle', () => {
  const rectangle: Shape = { kind: "rectangle", width: 10, height: 5 };
  const perimeter = calculatePerimeter(rectangle);
  assert.strictEqual(perimeter, 30);
});

test('calculatePerimeter - triangle', () => {
  const triangle: Shape = { kind: "triangle", base: 3, height: 4 };
  // For a right triangle with base 3 and height 4, hypotenuse is 5
  // Perimeter = 3 + 4 + 5 = 12
  const perimeter = calculatePerimeter(triangle);
  assert.strictEqual(perimeter, 12);
});

// TODO: Add tests for utility type functions when implemented
// - getUserProfile
// - updateUser
// - createUser
// - authenticate
