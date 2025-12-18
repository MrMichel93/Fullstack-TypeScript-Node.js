# Task 3: CI/CD Pipeline with GitHub Actions

## Objective
Set up automated testing, building, and deployment using GitHub Actions for continuous integration and deployment.

## Instructions

Create a complete CI/CD pipeline that runs tests, builds the application, and deploys to production.

## Part 1: Basic CI Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 7
```

## Part 2: Deployment Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
    tags:
      - 'v*'

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: ${{ secrets.RAILWAY_SERVICE }}
      
      # Alternative: Deploy to Render
      # - name: Deploy to Render
      #   uses: johnbeynon/render-deploy-action@v0.0.8
      #   with:
      #     service-id: ${{ secrets.RENDER_SERVICE_ID }}
      #     api-key: ${{ secrets.RENDER_API_KEY }}

  notify:
    name: Notify
    runs-on: ubuntu-latest
    needs: deploy
    if: always()
    
    steps:
      - name: Send deployment notification
        run: |
          echo "Deployment completed with status: ${{ needs.deploy.result }}"
          # Add Slack/Discord notification here
```

## Part 3: Docker Build and Push

Create `.github/workflows/docker.yml`:

```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]
    tags:
      - 'v*'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## Part 4: Security Scanning

Create `.github/workflows/security.yml`:

```yaml
name: Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday

jobs:
  dependency-scan:
    name: Dependency Scan
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run npm audit
        run: npm audit --audit-level=moderate
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  code-scan:
    name: Code Scan
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript
      
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
```

## Part 5: Environment Secrets

Set up secrets in GitHub repository settings:

**Required Secrets:**
- `RAILWAY_TOKEN` - Railway deployment token
- `RAILWAY_SERVICE` - Railway service name
- `DATABASE_URL` - Production database URL
- `JWT_SECRET` - JWT signing secret
- `SNYK_TOKEN` - Snyk security scanning token

**Setting up secrets:**
1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret with its value

## Part 6: Deployment Verification Script

Create `scripts/verify-deployment.sh`:

```bash
#!/bin/bash

DEPLOYMENT_URL=$1

if [ -z "$DEPLOYMENT_URL" ]; then
    echo "Usage: ./verify-deployment.sh <url>"
    exit 1
fi

echo "🔍 Verifying deployment at $DEPLOYMENT_URL"

# Check health endpoint
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/health")

if [ "$HEALTH_STATUS" -eq 200 ]; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed (Status: $HEALTH_STATUS)"
    exit 1
fi

# Check API endpoint
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOYMENT_URL/api/status")

if [ "$API_STATUS" -eq 200 ]; then
    echo "✅ API check passed"
else
    echo "❌ API check failed (Status: $API_STATUS)"
    exit 1
fi

echo ""
echo "✅ All deployment checks passed!"
```

## Requirements Checklist

- [ ] CI workflow runs on push/PR
- [ ] Tests run on multiple Node versions
- [ ] Linting and type checking in CI
- [ ] Code coverage reporting
- [ ] Build artifacts uploaded
- [ ] Deployment workflow configured
- [ ] Docker builds automated
- [ ] Security scanning enabled
- [ ] Environment secrets configured
- [ ] Deployment verification script

## Testing Workflows Locally

Use `act` to test GitHub Actions locally:

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Run CI workflow
act push

# Run specific job
act -j test

# Run with secrets
act --secret-file .secrets
```

## Monitoring Deployments

Add a health check endpoint in your app:

```typescript
// src/routes/health.ts
import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version
  });
});

router.get('/api/status', (req, res) => {
  // Check database connection, etc.
  res.json({
    database: 'connected',
    redis: 'connected',
    // other service checks
  });
});

export default router;
```

## Bonus Challenge

1. Add staging environment deployment
2. Implement blue-green deployment
3. Add automated rollback on failure
4. Create deployment notifications (Slack/Discord)
5. Add performance testing in CI
6. Implement canary deployments
7. Add automatic version bumping
8. Create release notes generation
9. Add database migration automation
10. Implement deployment approval workflow
