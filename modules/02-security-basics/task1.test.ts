import { test } from 'node:test';
import assert from 'node:assert';
import { placeholder } from './task1';

test('Task 1 - placeholder', () => {
  assert.strictEqual(placeholder(), "TODO: Implement task1");
});
