import { test } from 'node:test';
import assert from 'node:assert';
import { placeholder } from './task3';

test('Task 3 - placeholder', () => {
  assert.strictEqual(placeholder(), "TODO: Implement task3");
});
