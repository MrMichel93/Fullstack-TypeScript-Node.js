/**
 * Tests for Task 2: Interface Definition Exercise
 * 
 * Run with: npm test modules/00-why-typescript/task2-product.test.ts
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { displayProduct } from './task2-product';

test('displayProduct - in stock product', () => {
  const laptop = {
    id: 1,
    name: "Laptop",
    price: 999,
    inStock: true,
    category: "Electronics"
  };
  
  const result = displayProduct(laptop);
  assert.strictEqual(
    result,
    "Product: Laptop ($999) - In Stock - Category: Electronics",
    'Should display in-stock product correctly'
  );
});

test('displayProduct - out of stock product', () => {
  const phone = {
    id: 2,
    name: "Phone",
    price: 599,
    inStock: false,
    category: "Electronics"
  };
  
  const result = displayProduct(phone);
  assert.strictEqual(
    result,
    "Product: Phone ($599) - Out of Stock - Category: Electronics",
    'Should display out-of-stock product correctly'
  );
});

test('displayProduct - different category', () => {
  const shirt = {
    id: 3,
    name: "T-Shirt",
    price: 29.99,
    inStock: true,
    category: "Clothing"
  };
  
  const result = displayProduct(shirt);
  assert.ok(result.includes("T-Shirt"), 'Should include product name');
  assert.ok(result.includes("$29.99"), 'Should include price');
  assert.ok(result.includes("In Stock"), 'Should show stock status');
  assert.ok(result.includes("Clothing"), 'Should include category');
});

// Bonus tests - uncomment when you implement the optional description
// import { displayProductWithDescription } from './task2-product';
//
// test('displayProductWithDescription - with description', () => {
//   const laptop = {
//     id: 1,
//     name: "Laptop",
//     price: 999,
//     inStock: true,
//     category: "Electronics",
//     description: "High-performance laptop for professionals"
//   };
//   
//   const result = displayProductWithDescription(laptop);
//   assert.ok(result.includes("High-performance laptop"), 'Should include description');
// });
//
// test('displayProductWithDescription - without description', () => {
//   const phone = {
//     id: 2,
//     name: "Phone",
//     price: 599,
//     inStock: true,
//     category: "Electronics"
//   };
//   
//   const result = displayProductWithDescription(phone);
//   assert.ok(!result.includes("Description:"), 'Should not show description line when missing');
// });
