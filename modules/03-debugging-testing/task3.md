# Task 3: Writing Unit Tests with Jest

## Objective
Learn to write unit tests for TypeScript code using Jest testing framework.

## Instructions

Write comprehensive tests for utility functions using Jest and TypeScript.

## Setup

```bash
npm install --save-dev jest @types/jest ts-jest
npx ts-jest config:init
```

Create `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};
```

## Part 1: Functions to Test

Create `src/utils.ts`:

```typescript
export function calculateDiscount(
  price: number,
  discountPercent: number
): number {
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid input');
  }
  return price - (price * discountPercent) / 100;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export async function fetchUserData(userId: number): Promise<User> {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'Test User',
        email: 'test@example.com'
      });
    }, 100);
  });
}

interface User {
  id: number;
  name: string;
  email: string;
}
```

## Part 2: Write Tests

Create `src/utils.test.ts`:

```typescript
import {
  calculateDiscount,
  validateEmail,
  formatCurrency,
  fetchUserData
} from './utils';

describe('calculateDiscount', () => {
  test('should calculate discount correctly', () => {
    // TODO: Test normal case
  });

  test('should return 0 with 100% discount', () => {
    // TODO: Test edge case
  });

  test('should throw error for negative price', () => {
    // TODO: Test error case
  });

  test('should throw error for discount > 100', () => {
    // TODO: Test error case
  });
});

describe('validateEmail', () => {
  test('should validate correct email', () => {
    // TODO: Test valid emails
  });

  test('should reject invalid email', () => {
    // TODO: Test invalid emails
  });
});

describe('formatCurrency', () => {
  test('should format USD correctly', () => {
    // TODO: Test formatting
  });

  test('should use default currency', () => {
    // TODO: Test default parameter
  });
});

describe('fetchUserData', () => {
  test('should fetch user data', async () => {
    // TODO: Test async function
  });
});
```

## Test Requirements

Your tests should cover:

1. **Normal Cases**: Expected behavior
2. **Edge Cases**: Boundaries (0, negative, max values)
3. **Error Cases**: Invalid inputs
4. **Async Cases**: Promises and async/await

## Example Test Implementation

```typescript
describe('calculateDiscount', () => {
  test('should calculate 20% discount correctly', () => {
    const result = calculateDiscount(100, 20);
    expect(result).toBe(80);
  });

  test('should throw error for negative price', () => {
    expect(() => calculateDiscount(-100, 20)).toThrow('Invalid input');
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run specific test file
npm test utils.test.ts
```

## Verification Checklist

- [ ] All tests pass
- [ ] Code coverage is > 80%
- [ ] Tests are readable and well-named
- [ ] Edge cases are covered
- [ ] Error cases are tested
- [ ] Async functions are properly tested
- [ ] Tests are independent (no shared state)

## Expected Output

```
 PASS  src/utils.test.ts
  calculateDiscount
    ✓ should calculate 20% discount correctly (2ms)
    ✓ should return 0 with 100% discount (1ms)
    ✓ should throw error for negative price (1ms)
    ✓ should throw error for discount > 100 (1ms)
  validateEmail
    ✓ should validate correct email (1ms)
    ✓ should reject invalid email (1ms)
  formatCurrency
    ✓ should format USD correctly (2ms)
    ✓ should use default currency (1ms)
  fetchUserData
    ✓ should fetch user data (105ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Coverage:    100% statements, 100% branches, 100% functions, 100% lines
```

## Bonus Challenge

1. Add tests for Express route handlers using `supertest`
2. Mock external API calls
3. Test database operations with an in-memory database
4. Set up GitHub Actions for CI/CD testing
5. Add snapshot testing for complex objects
