import { test } from 'node:test';
import assert from 'node:assert';
import { placeholder } from './task2';

test('Task 2 - placeholder', () => {
  assert.strictEqual(placeholder(), "TODO: Implement task2");
});
