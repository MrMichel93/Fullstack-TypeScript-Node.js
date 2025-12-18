/**
 * Tests for Task 1: Understanding Request/Response Cycle
 * 
 * Run with: npm test modules/01-architecture-primer/task1-request-response.test.ts
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { parseRequest, handleUserRequest, formatResponse } from './task1-request-response';

test('parseRequest - parses GET request', () => {
  const raw = "GET /users/123 HTTP/1.1\nHost: localhost:3000";
  const request = parseRequest(raw);
  
  assert.strictEqual(request.method, "GET");
  assert.strictEqual(request.path, "/users/123");
  assert.ok(request.headers);
});

test('handleUserRequest - returns 200 for valid user', () => {
  const response = handleUserRequest("123");
  
  assert.strictEqual(response.statusCode, 200);
  assert.ok(response.body);
  assert.strictEqual(response.headers["Content-Type"], "application/json");
});

test('formatResponse - formats HTTP response', () => {
  const response = {
    statusCode: 200,
    body: '{"id": 123}',
    headers: { "Content-Type": "application/json" }
  };
  
  const formatted = formatResponse(response);
  assert.ok(formatted.includes("200"));
  assert.ok(formatted.includes("application/json"));
});
