/**
 * Task 3: Reading TypeScript Errors
 * 
 * Fix the TypeScript errors in this code by:
 * 1. Adding proper type annotations
 * 2. Fixing typos that TypeScript catches
 * 3. Ensuring proper return types
 * 
 * Bonus: Add a validate function that checks email and username requirements
 */

interface User {
  id: number;
  username: string;
  email: string;
}

// Helper function to generate user IDs
function generateId(): number {
  return Math.floor(Math.random() * 1000000);
}

// TODO: Fix the type annotation for userData parameter
// TODO: Fix the typo 'emal' -> 'email'
// TODO: Fix the return type annotation
export function registerUser(userData) {
  const user = {
    id: generateId(),
    username: userData.username,
    email: userData.emal,  // TODO: Fix this typo
    createdAt: new Date()
  };
  
  return user;
}

// Bonus TODO: Implement a validation function
// export function validateUser(userData): { valid: boolean; errors: string[] } {
//   const errors: string[] = [];
//   
//   // Check if email contains '@'
//   if (!userData.email.includes('@')) {
//     errors.push('Email must contain an @ symbol');
//   }
//   
//   // Check if username is at least 3 characters
//   if (userData.username.length < 3) {
//     errors.push('Username must be at least 3 characters long');
//   }
//   
//   return {
//     valid: errors.length === 0,
//     errors
//   };
// }
