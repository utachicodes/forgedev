# Development Workflows

This guide covers development workflows and best practices for working with the ForgeDev platform.

## Overview

ForgeDev provides integrated tools for the complete software development lifecycle. This guide explains how to effectively use these tools together.

## Workflow Patterns

### 1. AI/ML Development Workflow

#### Dataset Preparation
```
1. Gather training data
2. Upload to ForgeDev (AI Training → Datasets)
3. Verify dataset integrity
4. Add metadata and tags
```

#### Model Training
```
1. Navigate to AI Training → Train
2. Select framework and architecture
3. Configure hyperparameters
4. Start training
5. Monitor in real-time (Monitor tab)
```

#### Model Evaluation
```
1. Training completes → automatic evaluation
2. Review metrics in Models tab
3. Compare with previous versions
4. Export best-performing model
```

#### Deployment
```
1. Select model for deployment
2. Configure serving endpoint
3. Test with sample data
4. Deploy to production
5. Monitor inference performance
```

### 2. Web Development Workflow

#### Project Setup
```bash
# Create new workspace
forge workspace create my-app --template nextjs

# Install dependencies
cd my-app
npm install

# Start dev server
npm run dev
```

#### Development Cycle
```
1. Write code in integrated editor
2. Hot reload shows changes instantly
3. Run tests (npm test)
4. Commit changes
5. Push to Git
```

#### Build & Deploy
```bash
# Build for production
npm run build

# Deploy using ForgeDev CLI
forge deploy --env production
```

### 3. DevOps Workflow

#### CI/CD Pipeline Setup

**1. Create Pipeline Configuration**

Create `.forge/pipeline.yml`:

```yaml
name: Production Pipeline

on:
  push:
    branches: [main]

stages:
  - name: Test
    steps:
      - run: npm test
      - run: npm run test:e2e
  
  - name: Build
    steps:
      - run: npm run build
  
  - name: Deploy
    steps:
      - run: forge deploy --env production
    requires: [Test, Build]
```

**2. Configure Environments**

```bash
# Create production environment
forge env create production \
  --region us-east-1 \
  --instance t3.medium

# Set environment variables
forge env set DATABASE_URL postgresql://...
forge env set API_KEY your-api-key
```

**3. Monitor Deployments**

```bash
# View deployment status
forge deployments list

# Check logs
forge logs --env production --tail

# Rollback if needed
forge rollback --env production --version previous
```

### 4. Testing Workflow

#### Unit Testing

```bash
# Run all unit tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Best Practices**:
- Write tests alongside code
- Aim for 80%+ coverage
- Test edge cases
- Mock external dependencies

#### Integration Testing

```bash
# Run integration tests
npm run test:integration

# Test specific module
npm run test:integration -- --pattern api
```

#### E2E Testing

```bash
# Run E2E tests
npm run test:e2e

# Interactive mode
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug
```

## Git Workflows

### Feature Branch Workflow

```bash
# Create feature branch
git checkout -b feature/new-model-architecture

# Make changes and commit
git add .
git commit -m "feat: add new CNN architecture"

# Push to remote
git push origin feature/new-model-architecture

# Create pull request (via Git UI)
# After review and approval, merge to main
```

### Commit Message Format

Follow conventional commits:

```
feat: add dataset versioning
fix: resolve training timeout issue
docs: update API documentation
test: add E2E tests for model gallery
chore: update dependencies
```

## Environment Management

### Local Development

```bash
# .env.local
DATABASE_URL=postgresql://localhost:5432/forgedev_dev
NEXT_PUBLIC_API_URL=http://localhost:4000
GROQ_API_KEY=your_api_key
```

### Staging

```bash
# .env.staging
DATABASE_URL=postgresql://staging.db.forgedev.com/app
NEXT_PUBLIC_API_URL=https://api-staging.forgedev.com
```

### Production

```bash
# Environment variables set via ForgeDev console
# Never commit production credentials
```

## Code Quality

### Linting

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Type Checking

```bash
# TypeScript type check
npm run type-check
```

### Code Formatting

```bash
# Format with Prettier
npm run format

# Check formatting
npm run format:check
```

## Monitoring & Debugging

### Application Monitoring

**View Logs**:
```bash
# Real-time logs
forge logs --tail --env production

# Filter by service
forge logs --service api --env production

# Search logs
forge logs --search "error" --env production
```

**Performance Metrics**:
- Navigate to DevOps → Monitoring
- View CPU, memory, request latency
- Set up alerts for anomalies

### Debugging

**Local Debugging**:
1. Set breakpoints in IDE
2. Run in debug mode: `npm run dev:debug`
3. Attach debugger

**Production Debugging**:
1. Check error logs
2. Review stack traces
3. Enable debug logging temporarily
4. Use APM tools for deep insights

## Team Collaboration

### Code Reviews

**Best Practices**:
- Review code within 24 hours
- Test changes locally
- Provide constructive feedback
- Approve only when tests pass

### Documentation

- Update README for major changes
- Document complex algorithms
- Add JSDoc comments to functions
- Maintain changelog

### Communication

- Use Git commits for change history
- Link issues in commit messages
- Update project board
- Regular team syncs

## Automation

### Pre-commit Hooks

Create `.husky/pre-commit`:

```bash
#!/bin/sh
npm run lint
npm run type-check
npm test
```

### Scheduled Tasks

```yaml
# .forge/cron.yml
jobs:
  - name: Backup Database
    schedule: "0 2 * * *"  # 2 AM daily
    command: forge db backup
  
  - name: Clean Old Models
    schedule: "0 0 * * 0"  # Weekly Sunday
    command: node scripts/cleanup-models.js
```

## Security Best Practices

### Secrets Management

```bash
# Never commit secrets
# Use environment variables
forge secret set API_KEY value

# Access in code
const apiKey = process.env.API_KEY;
```

### Dependency Security

```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

### Access Control

- Use role-based access control (RBAC)
- Principle of least privilege
- Regular access reviews
- Revoke unused credentials

## Performance Optimization

### Frontend

- Code splitting
- Lazy loading
- Image optimization
- CDN for static assets

### Backend

- Database query optimization
- Caching strategies
- Connection pooling
- Load balancing

### AI/ML

- Batch inference
- Model quantization
- GPU utilization
- Distributed training for large models

## Troubleshooting Common Issues

### Build Failures

```bash
# Clear cache
rm -rf node_modules .next
npm install
npm run build
```

### Test Failures

- Check test environment setup
- Verify mocks are correct
- Review recent code changes
- Run tests in isolation

### Deployment Issues

- Verify environment variables
- Check build logs
- Ensure dependencies are installed
- Review deployment configuration

## Additional Resources

- [Getting Started Guide](./getting-started.md)
- [Dataset Upload Guide](./dataset-upload.md)
- [Model Training Guide](./model-training.md)
- [API Documentation](../api/README.md)

---

**Questions?** Contact support@forgedev.com for assistance with your workflow.
