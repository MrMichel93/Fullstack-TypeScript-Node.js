# Task 2: Interface Definition Exercise

## Objective
Learn to define object shapes using TypeScript interfaces to prevent runtime errors.

## Instructions

Create a TypeScript interface for a `Product` and implement a function that validates product data.

## Requirements

1. Define a `Product` interface with these properties:
   - `id`: number
   - `name`: string
   - `price`: number
   - `inStock`: boolean
   - `category`: string

2. Create a function `displayProduct` that:
   - Takes a `Product` as parameter
   - Returns a formatted string with product information
   - Example: "Product: Laptop ($999) - In Stock - Category: Electronics"

3. Try creating product objects with:
   - Missing properties (should error)
   - Wrong type for properties (should error)
   - Valid properties (should work)

## Example Usage

```typescript
const laptop: Product = {
  id: 1,
  name: "Laptop",
  price: 999,
  inStock: true,
  category: "Electronics"
};

console.log(displayProduct(laptop));
```

## Verification
- TypeScript should show errors when required properties are missing
- TypeScript should show errors when property types are wrong
- Your editor should provide autocomplete for Product properties

## Bonus Challenge
Add an optional `description?: string` property to the interface and update the function to include it when present.
