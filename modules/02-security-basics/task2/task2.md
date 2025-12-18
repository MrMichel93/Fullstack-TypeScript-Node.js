# Task 2: Input Validation and Sanitization

## Objective
Learn to validate and sanitize user input to prevent security vulnerabilities.

## Instructions

Create input validation functions using Zod or custom validators with TypeScript.

## Requirements

Create a file `validation.ts` with validation for a user registration form:

1. **Define User Input Interface**:
   ```typescript
   interface UserRegistration {
     username: string;
     email: string;
     password: string;
     age: number;
   }
   ```

2. **Validation Rules**:
   - Username: 3-20 characters, alphanumeric only
   - Email: Must be valid email format
   - Password: Minimum 8 characters
   - Age: Must be between 13 and 120

3. **Create Validation Function**:
   ```typescript
   function validateUserRegistration(data: unknown): ValidationResult
   ```
   Returns: `{ valid: boolean; errors: string[] }`

## Option 1: Using Zod (Recommended)

```bash
npm install zod
```

```typescript
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(13).max(120)
});
```

## Option 2: Manual Validation

```typescript
function validateUserRegistration(data: any): ValidationResult {
  const errors: string[] = [];
  
  // TODO: Implement validation logic
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

## Test Cases

Create test cases in your file:

```typescript
// Valid input
const validUser = {
  username: "john_doe",
  email: "john@example.com",
  password: "SecurePass123",
  age: 25
};

// Invalid inputs to test
const invalidUsername = { ...validUser, username: "ab" }; // Too short
const invalidEmail = { ...validUser, email: "not-an-email" };
const invalidPassword = { ...validUser, password: "short" };
const invalidAge = { ...validUser, age: 10 }; // Too young
```

## Verification Checklist

- [ ] Valid input passes all checks
- [ ] Invalid username is rejected
- [ ] Invalid email is rejected  
- [ ] Invalid password is rejected
- [ ] Invalid age is rejected
- [ ] All functions are properly typed
- [ ] Error messages are descriptive

## Expected Output

```
Validating valid user: ✓ Valid
Validating invalid username: ✗ Invalid - Username must be 3-20 characters
Validating invalid email: ✗ Invalid - Invalid email format
Validating invalid password: ✗ Invalid - Password must be at least 8 characters
Validating invalid age: ✗ Invalid - Age must be at least 13
```

## Bonus Challenge

1. Add validation for:
   - Phone number (optional field)
   - Profile bio (max 500 characters)
   - Terms acceptance (must be true)

2. Create an Express middleware that validates request bodies
3. Add XSS prevention by sanitizing HTML input
