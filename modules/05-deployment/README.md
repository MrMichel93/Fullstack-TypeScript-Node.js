# Deployment Concepts

Moving from development to production requires understanding build steps, environment management, and deployment strategies.

## 🏗️ Build Steps

### Why Build?

TypeScript code must be compiled to JavaScript before it can run in production:

```bash
# Development: TypeScript runs directly with ts-node
npm run dev

# Production: TypeScript compiles to JavaScript
npm run build
npm start
```

### The Build Process

**1. Compilation**
```bash
# TypeScript compiler reads tsconfig.json
tsc

# Output: dist/ folder with compiled JavaScript
```

**Example project structure:**
```
src/
  ├── server.ts
  ├── routes/
  │   └── users.ts
  └── models/
      └── User.ts

# After build:
dist/
  ├── server.js
  ├── routes/
  │   └── users.js
  └── models/
      └── User.js
```

**2. Type Checking**
```bash
# Check for type errors without emitting files
tsc --noEmit
```

**3. Source Maps**

Source maps help debug TypeScript code in production:

```json
// tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

This creates `.js.map` files that map compiled JS back to original TS.

## 🔐 Environment Variables

### Why Environment Variables?

Different environments (development, staging, production) need different configurations:

```typescript
// ❌ BAD: Hardcoded values
const DATABASE_URL = "postgresql://localhost:5432/myapp";
const JWT_SECRET = "my-secret-key";

// ✅ GOOD: Environment variables
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
```

### Using .env Files

**Install dotenv:**
```bash
npm install dotenv
```

**Create .env file (never commit this!):**
```env
# .env (local development)
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://localhost:5432/myapp_dev
JWT_SECRET=dev-secret-key-change-in-production
```

**Load in your application:**
```typescript
// src/config.ts
import dotenv from "dotenv";

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET
};

// Validate required variables
if (!config.jwtSecret) {
  throw new Error("JWT_SECRET environment variable is required");
}
```

### Environment-Specific Files

```bash
.env                 # Default values
.env.local          # Local overrides (gitignored)
.env.development    # Development environment
.env.production     # Production environment
.env.test           # Test environment
```

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "NODE_ENV=development ts-node src/server.ts",
    "build": "tsc",
    "start": "NODE_ENV=production node dist/server.js"
  }
}
```

## 📦 Preparing for Production

### Production Checklist

**1. Update tsconfig.json for production:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "sourceMap": true,
    "strict": true
  }
}
```

**2. Update package.json:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "dist/server.js",
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src/**/*.ts",
    "type-check": "tsc --noEmit"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**3. Add production dependencies:**
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0",
    "nodemon": "^3.0.0"
  }
}
```

**4. Build the project:**
```bash
npm run build
```

**5. Test the production build locally:**
```bash
# Set production environment variables
export NODE_ENV=production
export PORT=3000
export DATABASE_URL=your_db_url
export JWT_SECRET=your_secret

# Run the built application
npm start
```

## 🚀 Deployment Platforms

### Heroku

**1. Install Heroku CLI:**
```bash
npm install -g heroku
```

**2. Create Heroku app:**
```bash
heroku create my-app-name
```

**3. Set environment variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-production-secret
heroku config:set DATABASE_URL=your-production-db-url
```

**4. Create Procfile:**
```
web: npm start
```

**5. Deploy:**
```bash
git push heroku main
```

**heroku.yml (alternative):**
```yaml
build:
  languages:
    - nodejs

run:
  web: npm start
```

### Railway

**1. Create railway.json:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

**2. Deploy via Railway CLI or GitHub integration**

### Render

**1. Create render.yaml:**
```yaml
services:
  - type: web
    name: my-app
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
```

**2. Connect GitHub repository and deploy**

### Vercel (for serverless)

**Install Vercel CLI:**
```bash
npm install -g vercel
```

**vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

## 🔒 Security Best Practices

### 1. Never Commit Secrets

```bash
# .gitignore
.env
.env.local
.env.*.local
*.pem
*.key
secrets/
```

### 2. Use Strong Secrets

```typescript
// Generate strong secrets
import crypto from "crypto";

const generateSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

console.log("JWT_SECRET=" + generateSecret());
```

### 3. Validate Environment Variables

```typescript
// src/config.ts
const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_SECRET",
  "NODE_ENV"
];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}
```

### 4. Use HTTPS in Production

```typescript
// Force HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && !req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});
```

## 📊 Monitoring and Logging

### Production Logging

```typescript
// Simple logging setup
const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({
      level: "info",
      message,
      timestamp: new Date().toISOString(),
      ...meta
    }));
  },
  error: (message: string, error?: Error) => {
    console.error(JSON.stringify({
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      error: error?.message,
      stack: error?.stack
    }));
  }
};

// Use in your app
logger.info("Server started", { port: 3000 });
logger.error("Database connection failed", error);
```

### Health Check Endpoint

```typescript
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🔄 CI/CD Basics

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "my-app-name"
          heroku_email: "your-email@example.com"
```

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All TypeScript compiles without errors
- [ ] Tests pass
- [ ] Environment variables are set
- [ ] Secrets are not in code
- [ ] Database migrations are ready
- [ ] Error handling is in place
- [ ] Logging is configured
- [ ] Health check endpoint exists
- [ ] HTTPS is enforced
- [ ] CORS is properly configured
- [ ] Rate limiting is in place
- [ ] Database connection pooling is configured

## 🎯 Common Issues

### "Module not found" in production

**Problem:** Dev dependencies not installed

**Solution:**
```bash
# Install only production dependencies
npm ci --production
```

### "Cannot find module" after build

**Problem:** TypeScript paths not resolved

**Solution:** Use absolute imports or configure path mapping:
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

Then install tsconfig-paths:
```bash
npm install tsconfig-paths
```

### Port already in use

**Problem:** Another process is using the port

**Solution:** Use environment variable:
```typescript
const PORT = process.env.PORT || 3000;
app.listen(PORT);
```

## 🚀 Next Level

### Database Migrations

Use a migration tool like `node-pg-migrate` or `knex`:

```bash
npm install node-pg-migrate
```

### Process Management

Use PM2 for production:

```bash
npm install -g pm2
pm2 start dist/server.js --name my-app
pm2 startup
pm2 save
```

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

## 📚 Additional Resources

- [The Twelve-Factor App](https://12factor.net/) - Best practices for web apps
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Remember:** Deployment is not the end—it's the beginning of maintaining your application in production. Monitor, log, and iterate!

---

## 🏋️ Practice Exercises

This module includes hands-on TypeScript exercises with automated tests.

### Available Tasks

Each task has:
- A `.md` file with detailed instructions
- A `.ts` file with starter code and TODOs
- A `.test.ts` file with automated tests

### How to Work on Exercises

1. **Read the task markdown file** for detailed instructions:
   ```bash
   cat task1.md
   ```

2. **Open the TypeScript file** and implement the TODOs:
   ```bash
   code task1.ts
   ```

3. **Check TypeScript compilation**:
   ```bash
   npx tsc --noEmit --strict task1.ts
   ```

4. **Run the tests** to verify your solution:
   ```bash
   npm run test:module task1.test.ts
   ```

### Running All Tests for This Module

```bash
# Replace <module-name> with the actual module directory name
npm run test:module "modules/<module-name>/*.test.ts"
```

### Tips

- Complete tasks in order (task1 → task2 → task3)
- Read compiler errors carefully
- Run tests frequently for immediate feedback
- Refer back to the main README content for concepts
