# Practice Exercises Guide

This repository includes comprehensive TypeScript practice exercises with automated tests using Node.js built-in test runner.

## 📁 Structure

Each module contains:
- `taskN.md` - Detailed instructions and requirements
- `taskN.ts` or `taskN-name.ts` - Starter code with TODOs
- `taskN.test.ts` - Automated tests to verify your solution

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Choose an Exercise

Navigate to any module and read the task instructions:

```bash
cd modules/00-why-typescript
cat task1.md
```

### 3. Implement the Solution

Open the TypeScript file and complete the TODOs:

```bash
code task1-discount.ts
```

### 4. Check TypeScript Compilation

Verify your code compiles without errors:

```bash
npx tsc --noEmit --strict task1-discount.ts
```

### 5. Run the Tests

Verify your solution passes all tests:

```bash
npm run test:module task1-discount.test.ts
```

## 📚 Available Modules

### Module 00: Why TypeScript? (Beginner)
- ✅ **task1-discount.ts** - Type Safety Exercise
- ✅ **task2-product.ts** - Interface Definition Exercise  
- ✅ **task3-register.ts** - Reading TypeScript Errors

**Skills**: Basic type annotations, interfaces, fixing type errors

### Module 04: TypeScript Fundamentals (Intermediate)
- ✅ **task1-types-interfaces.ts** - Types vs Interfaces
- ✅ **task2-generics.ts** - Generics in Action
- ✅ **task3-advanced-patterns.ts** - Advanced TypeScript Patterns

**Skills**: Types vs interfaces, generics, utility types, type guards, discriminated unions

### Module 01: Architecture Primer (Intermediate)
- ⚙️ **task1-request-response.ts** - HTTP Request/Response Cycle
- ⚙️ **task2.ts** - Architecture patterns
- ⚙️ **task3.ts** - Advanced architecture

**Skills**: HTTP basics, request/response lifecycle, web architecture

### Module 02: Security Basics (Intermediate)
- ⚙️ **task1.ts** - Password hashing
- ⚙️ **task2.ts** - Input validation
- ⚙️ **task3.ts** - Security patterns

**Skills**: bcrypt, validation, security best practices

### Module 03: Debugging & Testing (Intermediate)
- ⚙️ **task1.ts** - TypeScript compiler debugging
- ⚙️ **task2.ts** - Error handling
- ⚙️ **task3.ts** - Testing patterns

**Skills**: Using TypeScript as debugger, error handling, testing

### Module 05: Deployment (Advanced)
- ⚙️ **task1.ts** - Build configuration
- ⚙️ **task2.ts** - Environment setup
- ⚙️ **task3.ts** - Deployment strategies

**Skills**: Build process, environment variables, deployment

**Legend**: ✅ Full implementation | ⚙️ Placeholder (to be completed)

## 🧪 Running Tests

### Run a Single Test

```bash
npm run test:module modules/00-why-typescript/task1-discount.test.ts
```

### Run All Tests in a Module

```bash
npm run test:module "modules/00-why-typescript/*.test.ts"
```

### Run All Tests

```bash
npm test
```

## 🎯 Exercise Workflow

1. **Read** the `.md` file for detailed instructions
2. **Edit** the `.ts` file and implement the TODOs
3. **Check** TypeScript compilation:
   ```bash
   npx tsc --noEmit --strict taskN.ts
   ```
4. **Run** the tests to verify your solution:
   ```bash
   npm run test:module taskN.test.ts
   ```
5. **Iterate** until tests pass and TypeScript is happy!

## ✨ Features

- ✅ **Node.js Built-in Test Runner** - No Jest or Mocha needed
- ✅ **TypeScript Support** - Via tsx for seamless TypeScript execution
- ✅ **Immediate Feedback** - Tests run instantly
- ✅ **Type Safety** - Compiler catches errors before runtime
- ✅ **Progressive Difficulty** - Start easy, build up skills

## 📖 Tips for Success

1. **Start with Module 00** - Build foundational TypeScript skills
2. **Read error messages carefully** - TypeScript errors are helpful
3. **Use your IDE** - Autocomplete and inline errors are your friends
4. **Run tests frequently** - Get immediate feedback on your code
5. **Don't skip TypeScript compilation checks** - Fix type errors first

## 🆘 Common Issues

### Tests pass but TypeScript shows errors

This is expected! The tests verify runtime behavior, but TypeScript catches type errors at compile time. Fix the TypeScript errors to complete the exercise properly.

### Can't find tsx

Run `npm install` in the root directory to install all dependencies.

### Tests fail with import errors

Make sure you're running tests from the repository root directory.

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Node.js Test Runner Documentation](https://nodejs.org/api/test.html)
- Course README files in each module

## 🎓 For Students

These exercises are designed to:
- Build muscle memory for TypeScript patterns
- Provide immediate feedback through tests
- Teach you to read and fix TypeScript errors
- Prepare you for real-world TypeScript development

Complete them in order, take your time, and don't hesitate to experiment!
