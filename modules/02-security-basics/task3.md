# Task 3: SQL Injection Prevention

## Objective
Understand SQL injection attacks and implement protection using parameterized queries.

## Instructions

Compare vulnerable and secure database query implementations.

## Part 1: Understanding the Vulnerability

Given this vulnerable code:
```typescript
// VULNERABLE - DO NOT USE IN PRODUCTION!
async function getUserByUsername(username: string) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  return await db.query(query);
}
```

**Questions:**
1. What happens if username is: `' OR '1'='1`?
2. What would the resulting SQL query look like?
3. Why is this dangerous?

## Part 2: Secure Implementation

Create a file `secureQueries.ts` with secure implementations:

### Setup (using pg library as example)

```bash
npm install pg
npm install --save-dev @types/pg
```

### Requirements

Implement these secure query functions:

1. **Get User by Username** (SELECT)
   ```typescript
   async function getUserByUsername(username: string): Promise<User | null>
   ```

2. **Create New User** (INSERT)
   ```typescript
   async function createUser(username: string, email: string, passwordHash: string): Promise<User>
   ```

3. **Update User Email** (UPDATE)
   ```typescript
   async function updateUserEmail(userId: number, newEmail: string): Promise<void>
   ```

4. **Delete User** (DELETE)
   ```typescript
   async function deleteUser(userId: number): Promise<void>
   ```

### Secure Pattern

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// ✅ SECURE: Using parameterized query
async function getUserByUsername(username: string): Promise<User | null> {
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]  // Parameters are safely escaped
  );
  return result.rows[0] || null;
}
```

## Testing SQL Injection Attempts

Test your functions with malicious inputs:

```typescript
const maliciousInputs = [
  "' OR '1'='1",
  "'; DROP TABLE users; --",
  "admin'--",
  "' UNION SELECT * FROM passwords--"
];

// These should all be safely handled
for (const input of maliciousInputs) {
  const result = await getUserByUsername(input);
  console.log(`Input: ${input}`);
  console.log(`Result: ${result ? 'Found user' : 'No user found'}`);
}
```

## Verification Checklist

- [ ] All queries use parameterized statements ($1, $2, etc.)
- [ ] No string concatenation or template literals in SQL
- [ ] Malicious inputs don't execute as SQL commands
- [ ] All functions have proper TypeScript types
- [ ] Error handling is implemented
- [ ] SQL injection attempts are safely handled

## Key Security Rules

1. **Always** use parameterized queries
2. **Never** build SQL with string concatenation
3. **Never** trust user input
4. **Always** validate input before database queries
5. **Use** ORMs when possible (they handle escaping)

## Bonus Challenge

1. Implement the same queries using an ORM like Prisma or TypeORM
2. Add a function that safely handles dynamic ORDER BY clauses
3. Create middleware that logs all SQL queries for audit purposes
4. Implement rate limiting to prevent brute force attacks

## Additional Resources

- Learn about prepared statements
- Research other injection types (NoSQL injection, LDAP injection)
- Study how ORMs prevent SQL injection
