/**
 * Task 1: Type Safety Exercise
 * 
 * Convert this JavaScript function to TypeScript with proper type annotations.
 * 
 * Requirements:
 * 1. Add proper type annotations to parameters and return type
 * 2. The function should only accept numbers
 * 3. Both parameters should be required
 * 
 * Bonus: Add a third optional parameter `maxDiscount: number` that caps the maximum discount amount
 */

// TODO: Add type annotations to the parameters and return type
export function calculateDiscount(price, discountPercent) {
  return price - (price * discountPercent / 100);
}

// Bonus TODO: Uncomment and implement this version with maxDiscount parameter
// export function calculateDiscountWithMax(price, discountPercent, maxDiscount?) {
//   const discount = price * discountPercent / 100;
//   const cappedDiscount = maxDiscount !== undefined ? Math.min(discount, maxDiscount) : discount;
//   return price - cappedDiscount;
// }
