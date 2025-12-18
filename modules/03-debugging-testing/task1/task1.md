# Task 1: TypeScript Compiler as Debugger

## Objective
Learn to use TypeScript compiler errors as your first line of defense against bugs.

## Instructions

Fix a TypeScript application by reading and resolving compiler errors systematically.

## Scenario

You've inherited code with multiple TypeScript errors. Use the compiler to find and fix all issues.

## Given Code (with errors)

Create a file `buggyApp.ts`:

```typescript
interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date;
}

interface User {
  id: number;
  name: string;
  email: string;
}

function createTask(title, dueDate) {
  return {
    id: Math.random(),
    title: title,
    completed: false,
    dueDate: dueDate
  };
}

function assignTaskToUser(task: Task, user) {
  console.log(`Assigning ${task.titel} to ${user.name}`);
  return {
    task: task,
    user: user,
    assignedAt: new Date()
  };
}

function completeTask(task: Task) {
  task.completed = true;
  task.completedAt = new Date();
  return task;
}

const myTask = createTask("Learn TypeScript", "2024-12-31");
const myUser = { id: 1, name: "Alice" };
const assignment = assignTaskToUser(myTask, myUser);
const done = completeTask(myTask);
```

## Requirements

1. **Run the compiler**: `tsc buggyApp.ts --noEmitOnError`
2. **Read each error carefully**
3. **Fix errors one by one**:
   - Add missing type annotations
   - Fix typos in property names
   - Fix type mismatches
   - Add missing interface properties

## Error Categories to Find

- [ ] Implicit any types
- [ ] Property typos
- [ ] Missing interface properties
- [ ] Type mismatches
- [ ] Missing properties on objects

## Debugging Process

For each error:
1. **Read**: What is the compiler saying?
2. **Locate**: Where is the error in the code?
3. **Understand**: Why is this an error?
4. **Fix**: Make the minimal change to fix it
5. **Verify**: Run compiler again

## Expected Fixes

By the end, you should have:
- All function parameters properly typed
- All typos corrected
- Proper interfaces defined
- No compiler errors
- Code that runs correctly

## Verification

Run these checks:
```bash
# Should compile without errors
tsc buggyApp.ts

# Should run without runtime errors
node buggyApp.js
```

## Bonus Challenge

1. Add strict null checks: `tsc --strict buggyApp.ts`
2. Create a `TaskAssignment` interface for the return value
3. Add JSDoc comments explaining each function
4. Create unit tests for each function
