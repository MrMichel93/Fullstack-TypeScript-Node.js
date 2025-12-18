# Task 1: Type Safety Exercise

## Objective
Practice catching bugs early with TypeScript's type system by converting JavaScript code to TypeScript.

## Instructions

Convert the following JavaScript function to TypeScript with proper type annotations:

```javascript
// JavaScript version - has potential bugs!
function calculateDiscount(price, discountPercent) {
  return price - (price * discountPercent / 100);
}

const result1 = calculateDiscount(100, 20);    // OK
const result2 = calculateDiscount("100", 20);  // Bug: string instead of number
const result3 = calculateDiscount(100);        // Bug: missing argument
```

## Requirements
1. Add proper type annotations to parameters and return type
2. The function should only accept numbers
3. Both parameters should be required
4. Run the TypeScript compiler to verify errors are caught

## Expected Outcome
Your TypeScript version should catch both bugs at compile time before the code runs.

## Verification
Create a new file `discount.ts` and try calling the function with invalid arguments. TypeScript should show errors for:
- Passing a string instead of a number
- Calling the function with missing arguments

## Bonus Challenge
Add a third optional parameter `maxDiscount: number` that caps the maximum discount amount.
