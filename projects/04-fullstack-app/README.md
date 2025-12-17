# Project 4: Full-Stack Application

Build a complete, production-ready full-stack application that combines everything you've learned.

## 🎯 Learning Objectives

- Organize a large TypeScript codebase
- Implement advanced TypeScript features
- Production environment configuration
- Build and deployment processes
- Code quality and maintainability
- Professional project structure

## 🛠️ Tech Stack

- **Backend:** TypeScript + Express
- **Frontend:** TypeScript + HTML/CSS
- **Database:** PostgreSQL (recommended) or SQLite
- **Authentication:** JWT
- **Validation:** Zod
- **Testing:** Jest
- **Deployment:** Railway, Render, or Heroku

## 📋 Project Options

Choose one of these projects or propose your own:

### Option 1: Enhanced Task Manager

Expand the task manager with:
- Team collaboration
- Task assignments
- Comments and attachments
- Activity timeline
- Email notifications
- Real-time updates (WebSockets)

### Option 2: Budget Tracker

Personal finance management:
- Transaction tracking (income/expenses)
- Category management
- Budget limits and alerts
- Monthly reports with charts
- Bank account management
- Recurring transactions

### Option 3: Project Management Tool

Simplified project management:
- Projects and milestones
- Team members and roles
- Task dependencies
- Gantt chart visualization
- Time tracking
- Status reports

### Option 4: Your Idea!

Propose your own project that includes:
- User authentication
- CRUD operations on multiple resources
- Complex business logic
- Data relationships
- Frontend with TypeScript

## 🏗️ Project Structure

```
04-fullstack-app/
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── environment.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── types/
│   │   └── utils/
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

## 📝 Requirements

### Code Quality

- [ ] TypeScript strict mode enabled
- [ ] No `any` types (use `unknown` where needed)
- [ ] Proper error handling throughout
- [ ] Comprehensive input validation
- [ ] Consistent code style
- [ ] Meaningful variable and function names

### Security

- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens properly secured
- [ ] Input sanitization
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CORS configured properly
- [ ] Rate limiting on sensitive endpoints
- [ ] Environment variables for secrets

### Testing

- [ ] Unit tests for business logic
- [ ] Integration tests for API endpoints
- [ ] At least 60% code coverage
- [ ] All tests passing

### Documentation

- [ ] README with setup instructions
- [ ] API documentation
- [ ] Deployment guide
- [ ] Architecture overview
- [ ] Code comments where needed

### DevOps

- [ ] Environment-based configuration
- [ ] Build process documented
- [ ] Database migrations (if applicable)
- [ ] Logging configured
- [ ] Error tracking
- [ ] Health check endpoint

## 🚀 Getting Started

### Phase 1: Planning (Week 1)

1. **Define requirements**
   - List all features
   - Design database schema
   - Plan API endpoints
   - Sketch UI layouts

2. **Create project structure**
   - Set up backend
   - Set up frontend
   - Configure TypeScript
   - Set up version control

### Phase 2: Backend (Week 2-3)

1. **Core functionality**
   - Authentication
   - Main resources (CRUD)
   - Business logic

2. **Advanced features**
   - Relationships between resources
   - Complex queries
   - Background jobs (if needed)

3. **Testing**
   - Write tests as you go
   - Test edge cases

### Phase 3: Frontend (Week 4)

1. **Authentication UI**
   - Login/register pages
   - Token management

2. **Main features**
   - Display data
   - Forms for CRUD
   - User interactions

3. **Polish**
   - Styling
   - Responsive design
   - Error handling

### Phase 4: Polish & Deploy (Week 5)

1. **Code review**
   - Refactor complex code
   - Remove console.logs
   - Fix TypeScript issues

2. **Documentation**
   - Write README
   - Document API
   - Deployment guide

3. **Deploy**
   - Set up production database
   - Deploy backend
   - Deploy frontend
   - Test in production

## 💡 Best Practices

### TypeScript

```typescript
// ✅ Use discriminated unions
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// ✅ Use generics for reusable code
async function fetchResource<T>(
  endpoint: string
): Promise<Result<T>> {
  // ...
}

// ✅ Use utility types
type UpdateUserDTO = Partial<Pick<User, 'username' | 'email'>>;
```

### Error Handling

```typescript
// ✅ Custom error classes
class NotFoundError extends Error {
  statusCode = 404;
  constructor(resource: string) {
    super(`${resource} not found`);
  }
}

// ✅ Centralized error handler
app.use((err: Error, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  // ...
});
```

### Code Organization

```typescript
// ✅ Separation of concerns
// Controller
export const createTask = async (req, res) => {
  const task = await taskService.create(req.body, req.user.id);
  res.status(201).json({ task });
};

// Service
export const create = async (data, userId) => {
  const validated = taskSchema.parse(data);
  return await taskRepository.create(validated, userId);
};

// Repository
export const create = async (data, userId) => {
  return await db.tasks.insert({ ...data, userId });
};
```

## 🧪 Testing Strategy

```typescript
// Unit test example
describe('TaskService', () => {
  it('should create task with valid data', async () => {
    const task = await taskService.create({
      title: 'Test',
      description: 'Test task'
    }, 1);
    
    expect(task).toHaveProperty('id');
    expect(task.title).toBe('Test');
  });
});

// Integration test example
describe('POST /api/tasks', () => {
  it('should create task when authenticated', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test',
        description: 'Test task'
      })
      .expect(201);
    
    expect(response.body).toHaveProperty('task');
  });
});
```

## 📊 Assessment Criteria

Your project will be evaluated on:

1. **Functionality (30%)**
   - All core features work
   - Edge cases handled
   - User experience

2. **Code Quality (30%)**
   - TypeScript usage
   - Code organization
   - Naming conventions
   - DRY principle

3. **Security (20%)**
   - Authentication implemented correctly
   - Input validation
   - No security vulnerabilities

4. **Documentation (10%)**
   - Clear README
   - API documentation
   - Code comments

5. **Testing (10%)**
   - Test coverage
   - Tests passing
   - Integration tests

## 📚 Resources

- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Deployment Guide](../../docs/05-deployment.md)

## ✅ Completion Criteria

1. All features implemented and working
2. TypeScript compiles without errors (strict mode)
3. No `any` types in code
4. Tests pass with 60%+ coverage
5. Security checklist complete
6. Documentation complete
7. Successfully deployed to production
8. Live demo available

---

**Congratulations!** Completing this project demonstrates you can build production-ready full-stack applications with TypeScript!

This is your portfolio piece - make it shine! 🌟
