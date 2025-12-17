/**
 * Tests for Task 1: Type Safety Exercise
 * 
 * Run with: npm test modules/00-why-typescript/task1-discount.test.ts
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { calculateDiscount } from './task1-discount';

test('calculateDiscount - basic discount calculation', () => {
  const result = calculateDiscount(100, 20);
  assert.strictEqual(result, 80, 'Should calculate 20% discount on $100 as $80');
});

test('calculateDiscount - 50% discount', () => {
  const result = calculateDiscount(200, 50);
  assert.strictEqual(result, 100, 'Should calculate 50% discount on $200 as $100');
});

test('calculateDiscount - no discount (0%)', () => {
  const result = calculateDiscount(100, 0);
  assert.strictEqual(result, 100, 'Should return original price with 0% discount');
});

test('calculateDiscount - full discount (100%)', () => {
  const result = calculateDiscount(100, 100);
  assert.strictEqual(result, 0, 'Should return 0 with 100% discount');
});

test('calculateDiscount - decimal discount percentage', () => {
  const result = calculateDiscount(100, 15.5);
  assert.strictEqual(result, 84.5, 'Should handle decimal discount percentages');
});

// Bonus tests - uncomment these when you implement calculateDiscountWithMax
// import { calculateDiscountWithMax } from './task1-discount';
//
// test('calculateDiscountWithMax - without max limit', () => {
//   const result = calculateDiscountWithMax(100, 20);
//   assert.strictEqual(result, 80, 'Should work without max discount parameter');
// });
//
// test('calculateDiscountWithMax - with max limit applied', () => {
//   const result = calculateDiscountWithMax(100, 50, 30);
//   assert.strictEqual(result, 70, 'Should cap discount at $30');
// });
//
// test('calculateDiscountWithMax - with max limit not reached', () => {
//   const result = calculateDiscountWithMax(100, 10, 30);
//   assert.strictEqual(result, 90, 'Should not cap discount if under max');
// });
