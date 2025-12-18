# Task 2: Build and Production Preparation

## Objective
Prepare a TypeScript application for production deployment with proper build configuration.

## Instructions

Set up a complete build pipeline that compiles TypeScript, optimizes code, and prepares for deployment.

## Part 1: TypeScript Build Configuration

Create/update `tsconfig.json` for production:

```json
{
  "compilerOptions": {
    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    
    // Module system
    "module": "commonjs",
    "target": "ES2020",
    "lib": ["ES2020"],
    
    // Type checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    
    // Module resolution
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    
    // Source maps for debugging
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    
    // Skip type checking of declaration files
    "skipLibCheck": true,
    
    // Ensure consistent casing
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## Part 2: Build Scripts

Update `package.json` with build scripts:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "npm run clean && npm run compile",
    "clean": "rm -rf dist",
    "compile": "tsc",
    "start": "node dist/server.js",
    "start:prod": "NODE_ENV=production node dist/server.js",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "type-check": "tsc --noEmit",
    "prebuild": "npm run lint && npm run type-check",
    "postbuild": "npm run copy-files",
    "copy-files": "cp -r src/public dist/ && cp package*.json dist/"
  },
  "main": "dist/server.js",
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

## Part 3: Production Dependencies

Separate dev and production dependencies:

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "dotenv": "^16.0.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "pg": "^8.11.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/node": "^20.0.0",
    "@types/bcrypt": "^5.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0",
    "nodemon": "^3.0.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.0",
    "@types/jest": "^29.5.0"
  }
}
```

## Part 4: Build Verification Script

Create `scripts/verify-build.sh`:

```bash
#!/bin/bash

echo "🔍 Verifying production build..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ dist directory not found. Run 'npm run build' first."
    exit 1
fi

# Check if main entry point exists
if [ ! -f "dist/server.js" ]; then
    echo "❌ dist/server.js not found."
    exit 1
fi

# Check for TypeScript files in dist (should only have .js)
if find dist -name "*.ts" -not -name "*.d.ts" | grep -q .; then
    echo "⚠️  Warning: TypeScript source files found in dist/"
fi

# Check for source maps
if [ ! -f "dist/server.js.map" ]; then
    echo "⚠️  Warning: Source maps not found."
fi

# Verify package.json
if [ ! -f "dist/package.json" ]; then
    echo "⚠️  Warning: package.json not copied to dist/"
fi

echo "✅ Build verification passed!"
echo ""
echo "To test the production build:"
echo "  cd dist"
echo "  npm install --production"
echo "  node server.js"
```

## Part 5: Production Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --production

# Copy built application
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

## Part 6: .dockerignore

Create `.dockerignore`:

```
node_modules
npm-debug.log
dist
.env
.env.*
.git
.gitignore
README.md
.vscode
.idea
*.test.ts
coverage
.github
```

## Build Workflow Checklist

- [ ] TypeScript compiles without errors
- [ ] Source maps are generated
- [ ] Dev dependencies are separated
- [ ] Build script cleans old builds
- [ ] Type checking runs before build
- [ ] Linting runs before build
- [ ] Static files are copied to dist
- [ ] package.json is copied to dist
- [ ] Build can be verified with script
- [ ] Docker build works

## Testing Production Build

1. **Local production build**:
```bash
npm run build
cd dist
npm install --production
NODE_ENV=production node server.js
```

2. **Docker build**:
```bash
docker build -t myapp:latest .
docker run -p 3000:3000 --env-file .env myapp:latest
```

3. **Size check**:
```bash
du -sh dist/
du -sh node_modules/
```

## Production Optimizations

1. **Minimize bundle size**
   - Remove unused dependencies
   - Use tree-shaking
   - Compress static assets

2. **Performance**
   - Enable gzip compression
   - Set cache headers
   - Optimize database queries

3. **Security**
   - Remove source maps in production
   - Set secure headers
   - Hide error details

## Bonus Challenge

1. Add webpack or esbuild for advanced bundling
2. Implement code splitting for large apps
3. Add build performance monitoring
4. Create multi-stage Docker builds
5. Add health check endpoint for containers
6. Implement blue-green deployment strategy
7. Add build cache optimization
