# Task 1: Password Hashing with bcrypt

## Objective
Implement secure password hashing and verification using bcrypt with TypeScript.

## Instructions

Create a module that demonstrates proper password security practices.

## Requirements

Create a file `passwordUtils.ts` with:

1. **Hash Function**: 
   ```typescript
   async function hashPassword(password: string): Promise<string>
   ```
   - Use bcrypt with 10 salt rounds
   - Return the hashed password

2. **Verify Function**:
   ```typescript
   async function verifyPassword(password: string, hash: string): Promise<boolean>
   ```
   - Compare plain password with stored hash
   - Return true if match, false otherwise

3. **Demo Function**:
   ```typescript
   async function demo(): Promise<void>
   ```
   - Hash a sample password
   - Verify correct password (should return true)
   - Verify incorrect password (should return false)
   - Print results to console

## Setup

```bash
npm install bcrypt
npm install --save-dev @types/bcrypt
```

## Implementation Checklist

- [ ] Install bcrypt and its TypeScript types
- [ ] Create `passwordUtils.ts` with proper imports
- [ ] Implement `hashPassword` function
- [ ] Implement `verifyPassword` function
- [ ] Create demo function to test both functions
- [ ] All functions have proper TypeScript types
- [ ] Run demo to verify it works

## Expected Output

```
Original password: mySecurePassword123
Hashed password: $2b$10$KIXvZ8qLwJ3...
Verifying correct password: true
Verifying incorrect password: false
Hash is different each time: true
```

## Verification Questions

1. Why is the hash different each time for the same password?
2. Can you reverse a bcrypt hash to get the original password?
3. Why use 10 salt rounds instead of 1 or 20?

## Bonus Challenge

Add a password strength validator that checks:
- Minimum 8 characters
- Contains at least one uppercase letter
- Contains at least one number
- Contains at least one special character
