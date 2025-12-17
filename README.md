# Modern Full-Stack Development with TypeScript & Node.js

**A project-based course for ages 16-20 with basic JavaScript knowledge**

This is not a theory course. You learn by building real-world web applications the way they're built in industry today.

## 🎯 Course Goals

- Understand how data flows through a web application
- Learn backend development with Node.js and Express
- Build portfolio-ready projects with TypeScript
- Master type safety and code correctness
- Practice modern web security and maintainability
- Learn professional software engineering practices

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Language**: TypeScript (TypeScript-first mindset)
- **Database**: SQLite or PostgreSQL
- **Frontend**: HTML, CSS, vanilla JavaScript/TypeScript (no frameworks initially)
- **Tools**: npm, tsc, nodemon

## 📚 Course Structure

### 1. [Why TypeScript?](./modules/00-why-typescript/README.md)
Learn why TypeScript matters:
- Preventing bugs with the type system
- Reading and understanding compiler errors
- Building maintainable applications
- **Practice**: 3 exercises with automated tests

### 2. [TypeScript Fundamentals](./modules/04-typescript-fundamentals/README.md)
Essential TypeScript concepts:
- Types vs Interfaces
- Type inference and annotations
- Union types and generics
- Working with Express types
- **Practice**: 3 exercises covering types, generics, and advanced patterns

### 3. [Architecture Primer](./modules/01-architecture-primer/README.md)
Learn the fundamentals:
- Client vs Server
- HTTP Request/Response lifecycle
- How modern web apps work
- **Practice**: 3 exercises with TypeScript implementations

### 4. Mini Projects (Hands-on)

Each project teaches real-world development practices:

| Project | Key Concepts | Stack | Difficulty |
|---------|-------------|-------|------------|
| [Auth System](./projects/01-auth-system/) | User registration, login, JWT, password hashing | Express + TypeScript + SQLite | ⭐⭐ Intermediate |
| [Task Manager API](./projects/02-task-manager-api/) | REST API, CRUD, validation, middleware | Express + TypeScript + PostgreSQL | ⭐⭐ Intermediate |
| [Simple Dashboard](./projects/03-simple-dashboard/) | Frontend integration, API consumption, vanilla TS | HTML/CSS + TypeScript + Fetch API | ⭐⭐⭐ Intermediate+ |
| [Full-Stack App](./projects/04-fullstack-app/) | Complete application, deployment-ready | Full Stack TypeScript | ⭐⭐⭐⭐ Advanced |

### 5. Software Engineering Practices

Throughout the course, learn professional habits:
- **Folder Structure**: Organizing code for maintainability
- **Types vs Interfaces**: When to use each
- **Environment Configs**: Managing secrets and settings
- **Error Handling**: Proper middleware and error boundaries
- **Validation**: Input validation with libraries like Zod
- **Code Quality**: ESLint, Prettier, consistent patterns

### 6. [Security Basics](./modules/02-security-basics/README.md)
- Password hashing with bcrypt
- Input validation and sanitization
- JWT authentication
- Common vulnerabilities (SQL injection, XSS)

### 7. [Debugging & Testing](./modules/03-debugging-testing/README.md)
- TypeScript compiler as your first debugger
- Logging best practices
- Error handling patterns
- Testing with Jest

### 8. [Deployment Concepts](./modules/05-deployment/README.md)
- Build steps and compilation
- Environment variables
- Deploying to production
- CI/CD basics

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.x or higher (includes npm)
- **Basic JavaScript**: variables, functions, loops, promises
- **Basic HTML/CSS**: tags, forms, styling
- **Code Editor**: VS Code recommended (with TypeScript support)

### Setup

1. **Clone this repository**
```bash
git clone https://github.com/MrMichel93/Fullstack-TypeScript-Node.js.git
cd Fullstack-TypeScript-Node.js
```

2. **Install Node.js**
Download from [nodejs.org](https://nodejs.org/) (LTS version recommended)

Verify installation:
```bash
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
```

3. **Install TypeScript globally** (optional but recommended)
```bash
npm install -g typescript
```

4. **Start with Project 1**
```bash
cd projects/01-auth-system/starter
npm install
npm run dev
```

Visit http://localhost:3000 in your browser!

## 📖 How to Use This Course

1. **Start with "Why TypeScript?"** - Understand the TypeScript-first mindset
2. **Practice with exercises** - Each module has TypeScript exercises with tests
3. **Learn TypeScript Fundamentals** - Master the basics before diving into projects
4. **Read the Architecture Primer** - Understand how web apps work
5. **Complete projects in order** - Each builds on previous concepts
6. **Focus on correctness** - Let TypeScript catch bugs before they happen
7. **Review security and deployment guides** - Learn production best practices

## 🧪 Running Practice Exercises

Each module includes TypeScript practice files with automated tests using Node.js built-in test runner.

### Run a Single Exercise Test

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

### Check TypeScript Compilation

Before running tests, verify your code compiles:

```bash
cd modules/00-why-typescript
npx tsc --noEmit --strict task1-discount.ts
```

### Exercise Workflow

1. Read the task `.md` file for instructions
2. Edit the `.ts` file and implement the TODOs
3. Check TypeScript compilation errors
4. Run the tests to verify your solution
5. Iterate until tests pass and TypeScript is happy!

## 🎓 For Instructors

See [COURSE_GUIDE.md](./COURSE_GUIDE.md) for:
- Teaching tips for TypeScript
- Common student mistakes
- Additional resources
- Assessment rubrics and criteria
- How to evaluate code quality

## 📝 Project Structure

Each project folder contains:
- `README.md` - Project overview, learning objectives, and requirements
- `starter/` - Starter code with TypeScript setup and TODOs
- `solution/` - Complete working solution with best practices
- `extensions/` - Optional challenge ideas for advanced students
- `src/` - TypeScript source files
- `public/` - Static assets (HTML, CSS, client-side JS)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration

## 🎯 Learning Objectives

By completing this course, you will be able to:

**TypeScript & Language Skills:**
- Write type-safe code with TypeScript
- Choose between types and interfaces appropriately
- Use generics and union types effectively
- Read and fix TypeScript compiler errors

**Backend Development:**
- Build REST APIs with Express and TypeScript
- Implement authentication and authorization
- Design database schemas
- Write middleware for validation and error handling
- Handle environment variables securely

**Frontend Development:**
- Build interactive UIs with vanilla JavaScript/TypeScript
- Consume REST APIs with the Fetch API
- Handle forms and user input validation
- Display dynamic data without frameworks

**Software Engineering:**
- Organize code with proper folder structure
- Write maintainable, readable code
- Debug TypeScript applications
- Deploy applications to production
- Use version control effectively

## 📊 Assessment Criteria

Your projects will be evaluated on:

1. **Correctness** (30%): Does it work as specified?
2. **Type Safety** (25%): Proper TypeScript usage, no `any` types
3. **Code Quality** (25%): Clean, readable, well-structured
4. **Security** (10%): No vulnerabilities, proper input validation
5. **Documentation** (10%): Clear README with setup instructions

## 🤝 Contributing

Found a bug or have a suggestion? Open an issue or submit a pull request!

## 📄 License

MIT License - Feel free to use this for teaching or learning.

---

**Ready to build?** Start with [Why TypeScript?](./modules/00-why-typescript/README.md)!
