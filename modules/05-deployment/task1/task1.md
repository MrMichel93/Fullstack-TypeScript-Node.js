# Task 1: Environment Configuration

## Objective
Learn to properly manage environment variables and configuration for different deployment environments.

## Instructions

Create a type-safe configuration system that works across development, staging, and production.

## Part 1: Environment Variables Setup

Create `.env.example`:
```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
DB_SSL_ENABLED=false

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=24h

# API Keys (for external services)
API_KEY=your-api-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## Part 2: Type-Safe Config

Create `src/config/environment.ts`:

```typescript
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Define configuration interface
interface Config {
  server: {
    port: number;
    nodeEnv: 'development' | 'staging' | 'production';
  };
  database: {
    url: string;
    sslEnabled: boolean;
  };
  auth: {
    jwtSecret: string;
    jwtExpiry: string;
  };
  api: {
    key: string;
  };
  smtp: {
    host: string;
    port: number;
    user: string;
    password: string;
  };
  frontend: {
    url: string;
  };
}

// TODO: Implement getConfig function
function getConfig(): Config {
  // Validate required environment variables
  const required = [
    'PORT',
    'NODE_ENV',
    'DATABASE_URL',
    'JWT_SECRET'
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  // Return typed configuration
  return {
    server: {
      port: parseInt(process.env.PORT || '3000', 10),
      nodeEnv: process.env.NODE_ENV as 'development' | 'staging' | 'production'
    },
    database: {
      url: process.env.DATABASE_URL!,
      sslEnabled: process.env.DB_SSL_ENABLED === 'true'
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET!,
      jwtExpiry: process.env.JWT_EXPIRY || '24h'
    },
    api: {
      key: process.env.API_KEY || ''
    },
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      user: process.env.SMTP_USER || '',
      password: process.env.SMTP_PASS || ''
    },
    frontend: {
      url: process.env.FRONTEND_URL || 'http://localhost:5173'
    }
  };
}

// Export singleton config
export const config = getConfig();
```

## Part 3: Environment-Specific Settings

Create different env files:

1. `.env.development`:
```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://localhost:5432/myapp_dev
DB_SSL_ENABLED=false
FRONTEND_URL=http://localhost:5173
```

2. `.env.staging`:
```bash
NODE_ENV=staging
PORT=3000
DATABASE_URL=postgresql://staging-db:5432/myapp_staging
DB_SSL_ENABLED=true
FRONTEND_URL=https://staging.myapp.com
```

3. `.env.production`:
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://prod-db:5432/myapp_prod
DB_SSL_ENABLED=true
FRONTEND_URL=https://myapp.com
```

## Part 4: Usage in Application

```typescript
import { config } from './config/environment';
import express from 'express';
import cors from 'cors';

const app = express();

// Use config values
app.use(cors({
  origin: config.frontend.url
}));

// Different behavior based on environment
if (config.server.nodeEnv === 'development') {
  // Enable detailed logging in development
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.listen(config.server.port, () => {
  console.log(`Server running in ${config.server.nodeEnv} mode`);
  console.log(`Port: ${config.server.port}`);
});
```

## Requirements Checklist

- [ ] `.env.example` file created (checked into git)
- [ ] `.env` file created (added to .gitignore)
- [ ] Type-safe config interface defined
- [ ] Environment variable validation implemented
- [ ] All required variables are checked on startup
- [ ] Different configs for dev/staging/prod
- [ ] No secrets in source code
- [ ] Config exported as singleton

## Security Best Practices

1. **Never commit secrets** to git
   - Add `.env` to `.gitignore`
   - Provide `.env.example` without real values

2. **Validate on startup**
   - Check all required variables exist
   - Fail fast if configuration is invalid

3. **Use strong secrets in production**
   - Generate random JWT secrets
   - Use long, complex passwords
   - Rotate secrets regularly

4. **Different secrets per environment**
   - Never reuse production secrets in dev
   - Each environment has unique credentials

## Testing Configuration

Create a test script `src/config/test-config.ts`:

```typescript
import { config } from './environment';

console.log('Configuration loaded:');
console.log('- Environment:', config.server.nodeEnv);
console.log('- Port:', config.server.port);
console.log('- Database SSL:', config.database.sslEnabled);
console.log('- JWT Secret length:', config.auth.jwtSecret.length);
console.log('- Frontend URL:', config.frontend.url);

// Verify sensitive data is not logged
console.log('✓ Configuration loaded successfully');
```

## Bonus Challenge

1. Add environment variable schema validation using Zod
2. Create a config hot-reload system for development
3. Add support for multiple .env files with overrides
4. Implement secret encryption for local development
5. Add configuration documentation generator
6. Create a CLI tool to verify configuration
