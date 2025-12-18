/**
 * Task 2: Interface Definition Exercise
 * 
 * Define a Product interface and implement a function to display product information.
 * 
 * Requirements:
 * 1. Define a `Product` interface with: id, name, price, inStock, category
 * 2. Create a `displayProduct` function that formats product information
 * 3. TypeScript should catch missing or wrong-typed properties
 * 
 * Bonus: Add an optional `description?: string` property
 */

// TODO: Define the Product interface here
// interface Product {
//   ...
// }

// TODO: Implement the displayProduct function with proper types
export function displayProduct(product) {
  // TODO: Format and return the product information string
  // Example: "Product: Laptop ($999) - In Stock - Category: Electronics"
  return '';
}

// Bonus TODO: Uncomment and update when you add the optional description property
// export function displayProductWithDescription(product) {
//   const baseInfo = displayProduct(product);
//   return product.description ? `${baseInfo}\nDescription: ${product.description}` : baseInfo;
// }
