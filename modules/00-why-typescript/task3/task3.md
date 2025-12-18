# Task 3: Reading TypeScript Errors

## Objective
Practice reading and understanding TypeScript compiler error messages to fix type-related bugs.

## Instructions

Given the following TypeScript code with intentional errors, read the compiler errors and fix them:

```typescript
interface User {
  id: number;
  username: string;
  email: string;
}

function registerUser(userData) {
  const user = {
    id: generateId(),
    username: userData.username,
    email: userData.emal,  // Typo: should be 'email'
    createdAt: new Date()
  };
  
  return user;
}

const newUser = registerUser({
  username: "alice",
  email: "alice@example.com"
});

console.log(newUser.usrname);  // Typo: should be 'username'
```

## Requirements

1. **Fix the function parameter**: Add proper type annotation for `userData`
2. **Fix the typo**: Correct the typo `emal` to `email`
3. **Fix the return value**: Ensure the function returns the correct type
4. **Fix the console.log**: Correct the property name typo

## Steps to Complete

1. Copy the code above into a file called `register.ts`
2. Run `tsc register.ts` to see compiler errors
3. Read each error message carefully
4. Fix one error at a time
5. Re-run the compiler after each fix

## Expected Error Messages

You should see errors like:
- Parameter 'userData' implicitly has an 'any' type
- Property 'emal' does not exist on type 'User'
- Property 'usrname' does not exist on type...

## Verification

After fixing all errors:
- The code should compile without errors
- TypeScript should provide proper autocomplete for all properties
- All types should be properly inferred

## Bonus Challenge

Add a `validate` function that checks:
- Email contains an '@' symbol
- Username is at least 3 characters long
- Return a typed result indicating success or failure
