/**
 * Tests for Task 2: Generics in Action
 * 
 * Run with: npm test modules/04-typescript-fundamentals/task2-generics.test.ts
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { getFirst, filterArray, Repository } from './task2-generics';

test('getFirst - returns first element of number array', () => {
  const result = getFirst([1, 2, 3]);
  assert.strictEqual(result, 1);
});

test('getFirst - returns first element of string array', () => {
  const result = getFirst(['a', 'b', 'c']);
  assert.strictEqual(result, 'a');
});

test('getFirst - returns undefined for empty array', () => {
  const result = getFirst([]);
  assert.strictEqual(result, undefined);
});

test('filterArray - filters numbers', () => {
  const numbers = [1, 2, 3, 4, 5];
  const evens = filterArray(numbers, n => n % 2 === 0);
  assert.deepStrictEqual(evens, [2, 4]);
});

test('filterArray - filters objects', () => {
  interface User {
    id: number;
    name: string;
    active: boolean;
  }
  
  const users: User[] = [
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
    { id: 3, name: "Charlie", active: true }
  ];
  
  const activeUsers = filterArray(users, u => u.active);
  assert.strictEqual(activeUsers.length, 2);
  assert.strictEqual(activeUsers[0].name, "Alice");
});

test('filterArray - returns empty array when no matches', () => {
  const result = filterArray([1, 2, 3], n => n > 10);
  assert.deepStrictEqual(result, []);
});

test('Repository - add and getAll', () => {
  const repo = new Repository<number>();
  repo.add(1);
  repo.add(2);
  repo.add(3);
  
  const items = repo.getAll();
  assert.strictEqual(items.length, 3);
  assert.deepStrictEqual(items, [1, 2, 3]);
});

test('Repository - find item', () => {
  interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  const taskRepo = new Repository<Task>();
  taskRepo.add({ id: 1, title: "Learn TypeScript", completed: false });
  taskRepo.add({ id: 2, title: "Build Project", completed: false });
  
  const task = taskRepo.find(t => t.id === 1);
  assert.ok(task);
  assert.strictEqual(task?.title, "Learn TypeScript");
});

test('Repository - find returns undefined when not found', () => {
  const repo = new Repository<number>();
  repo.add(1);
  repo.add(2);
  
  const result = repo.find(n => n === 5);
  assert.strictEqual(result, undefined);
});

test('Repository - remove item', () => {
  const repo = new Repository<string>();
  repo.add("apple");
  repo.add("banana");
  repo.add("cherry");
  
  const removed = repo.remove(item => item === "banana");
  assert.strictEqual(removed, true);
  
  const items = repo.getAll();
  assert.strictEqual(items.length, 2);
  assert.ok(!items.includes("banana"));
});

test('Repository - remove returns false when item not found', () => {
  const repo = new Repository<string>();
  repo.add("apple");
  
  const removed = repo.remove(item => item === "banana");
  assert.strictEqual(removed, false);
});

test('Repository - update item', () => {
  interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  const taskRepo = new Repository<Task>();
  taskRepo.add({ id: 1, title: "Learn TypeScript", completed: false });
  
  const updated = taskRepo.update(t => t.id === 1, { completed: true });
  assert.strictEqual(updated, true);
  
  const task = taskRepo.find(t => t.id === 1);
  assert.strictEqual(task?.completed, true);
});

test('Repository - update returns false when item not found', () => {
  interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
  const taskRepo = new Repository<Task>();
  taskRepo.add({ id: 1, title: "Learn TypeScript", completed: false });
  
  const updated = taskRepo.update(t => t.id === 999, { completed: true });
  assert.strictEqual(updated, false);
});

// TODO: Add tests for createSuccessResponse when implemented
// TODO: Add tests for findById with constraints when implemented
// TODO: Add tests for mapObject when implemented
