# Deployment Guide

This guide covers deploying the ForgeDev platform to production using Vercel (frontend) and Railway (backend).

## Prerequisites

Before deploying, ensure you have:
- GitHub repository with ForgeDev code
- Vercel account ([vercel.com](https://vercel.com))
- Railway account ([railway.app](https://railway.app))
- Neon database ([neon.tech](https://neon.tech))
- Groq API key ([groq.com](https://groq.com))

## Quick Start

### 1. Set Up Vercel (Frontend)

**Via Vercel Dashboard**:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select `apps/web` as the root directory
4. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Railway API URL
5. Click "Deploy"

**Via CLI**:
```bash
cd apps/web
npm install -g vercel
vercel login
vercel --prod
```

### 2. Set Up Railway (Backend Services)

**API Service**:
1. Go to [railway.app/new](https://railway.app/new)
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Select `apps/api` as the root directory
5. Add environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `JWT_SECRET`: Random secure string
   - `GROQ_API_KEY`: Your Groq API key
6. Deploy

**AI Engine Service**:
1. Create new service in Railway
2. Select your repository
3. Select `apps/api-engine` as root directory
4. Add environment variables:
   - `DATABASE_URL`: Same Neon connection string
   - `GROQ_API_KEY`: Your Groq API key
   - `MODEL_STORAGE_PATH`: `/app/models`
5. Deploy

### 3. Configure GitHub Secrets

Add these secrets to your GitHub repository:

**Vercel Secrets**:
- `VERCEL_TOKEN`: Get from [vercel.com/account/tokens](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID`: Found in Vercel project settings
- `VERCEL_PROJECT_ID`: Found in Vercel project settings

**Railway Secrets**:
- `RAILWAY_TOKEN`: Get from Railway account settings

**Application Secrets**:
- `DATABASE_URL_PRODUCTION`: Neon connection string
- `JWT_SECRET_PRODUCTION`: Random secure string
- `GROQ_API_KEY_PRODUCTION`: Your Groq API key
- `NEXT_PUBLIC_API_URL_PRODUCTION`: Your Railway API URL
- `MODEL_STORAGE_PATH`: `/app/models`

**To add secrets**:
1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret

## GitHub Actions Workflows

The repository includes 4 workflows:

### 1. CI Workflow (`.github/workflows/ci.yml`)
- **Triggers**: Pull requests and pushes to `main`
- **Purpose**: Run tests, linting, type checks
- **Services**: Frontend, API, AI Engine

### 2. Frontend Deploy (`.github/workflows/frontend-deploy.yml`)
- **Triggers**: Push to `main` with changes in `apps/web/`
- **Purpose**: Deploy frontend to Vercel
- **Steps**: Lint → Build → Deploy → E2E tests

### 3. API Deploy (`.github/workflows/api-deploy.yml`)
- **Triggers**: Push to `main` with changes in `apps/api/`
- **Purpose**: Deploy API to Railway
- **Steps**: Test → Build → Deploy

### 4. AI Engine Deploy (`.github/workflows/ai-engine-deploy.yml`)
- **Triggers**: Push to `main` with changes in `apps/ai-engine/`
- **Purpose**: Deploy AI engine to Railway
- **Steps**: Test → Deploy

## Environment Variables

### Frontend (`apps/web`)

**Build-time**:
- `NEXT_PUBLIC_API_URL`: API endpoint (https://api.forgedev.com)

### Backend (`apps/api`)

**Runtime**:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing secret
- `GROQ_API_KEY`: Groq API key
- `PORT`: Server port (default: 4000)

### AI Engine (`apps/ai-engine`)

**Runtime**:
- `DATABASE_URL`: PostgreSQL connection string
- `GROQ_API_KEY`: Groq API key
- `MODEL_STORAGE_PATH`: Path for model files
- `PORT`: Server port (default: 5000)

## Database Setup

### Neon Database

1. Create account at [neon.tech](https://neon.tech)
2. Create new project: "forgedev-production"
3. Create database: "forgedev"
4. Get connection string from dashboard
5. Add to environment variables

**Connection String Format**:
```
postgresql://user:password@host/database?sslmode=require
```

### Run Migrations

```bash
# Using Prisma (if configured)
npx prisma migrate deploy

# Or using custom migration scripts
npm run migrate:prod
```

## Deployment Process

### Automatic Deployment (Recommended)

1. **Develop locally**:
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Create Pull Request**:
   - CI workflow runs automatically
   - All tests must pass

3. **Merge to Main**:
   - Once approved and merged
   - Deploy workflows trigger automatically
   - Frontend deploys to Vercel
   - Backend deploys to Railway

### Manual Deployment

**Frontend**:
```bash
cd apps/web
vercel --prod
```

**API**:
```bash
cd apps/api
railway up
```

**AI Engine**:
```bash
cd apps/ai-engine
railway up
```

## Post-Deployment Verification

### 1. Check Frontend

```bash
curl https://forgedev.com
# Should return HTML
```

### 2. Check API Health

```bash
curl https://api.forgedev.com/health
# Should return: {"status": "ok"}
```

### 3. Check AI Engine

```bash
curl https://ai.forgedev.com/health
# Should return: {"status": "ok"}
```

### 4. Run E2E Tests

```bash
cd apps/web
npm run test:e2e
```

## Monitoring

### Vercel Analytics

- Navigate to Vercel dashboard
- View real-time traffic, performance
- Check error logs

### Railway Logs

```bash
railway logs
```

Or view in Railway dashboard:
- Navigate to service → Deployments
- Click on active deployment
- View logs tab

### Application Monitoring

**Custom Logging**:
- Logs are stored in Railway
- Access via dashboard or CLI

**Alerts**:
- Configure via Railway dashboard
- Set up notifications for:
  - Deployment failures
  - High error rates
  - Resource limits

## Rollback

### Vercel Rollback

1. Go to Vercel dashboard → Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Railway Rollback

1. Go to Railway dashboard → Deployments
2. Find previous deployment
3. Click "Redeploy"

Or via CLI:
```bash
railway rollback
```

## Troubleshooting

### Build Failures

**Check**:
- Environment variables are set correctly
- Dependencies are installed
- No TypeScript errors

**Fix**:
```bash
# Clear cache and rebuild
rm -rf node_modules .next
npm install
npm run build
```

### Deployment Not Triggering

**Check**:
- Push is to `main` branch
- Changes are in monitored paths
- GitHub Actions are enabled

### Runtime Errors

**Check**:
- Railway logs for errors
- Environment variables
- Database connectivity

**Debug**:
```bash
railway logs --tail
```

## Custom Domains

### Vercel

1. Go to project settings → Domains
2. Add custom domain: `forgedev.com`
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
4. Wait for verification

### Railway

1. Go to service settings → Domains
2. Add custom domain: `api.forgedev.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: api
   Value: [railway-url]
   ```

## Cost Optimization

**Vercel**:
- Free tier: 100GB bandwidth/month
- Pro: $20/month for unlimited

**Railway**:
- Free: $5 credit/month
- Developer: $20/month
- Pro: Usage-based pricing

**Neon**:
- Free: 3 projects, 0.5GB storage
- Pro: $19/month

## Security Best Practices

1. **Never commit secrets**: Use `.env.local`, add to `.gitignore`
2. **Rotate keys regularly**: Update JWT_SECRET, API keys
3. **Use HTTPS only**: Enforce SSL/TLS
4. **Enable CORS**: Restrict API access
5. **Monitor logs**: Watch for suspicious activity

## Scaling

### Horizontal Scaling

**Railway**:
- Auto-scales based on load
- Configure in service settings

**Vercel**:
- Automatic edge scaling
- Global CDN distribution

### Database Scaling

**Neon**:
- Auto-scales compute
- Adjust storage limits in dashboard

## Backup & Recovery

### Database Backups

**Neon**:
- Automatic daily backups
- Point-in-time recovery
- Configure in project settings

### Code Backups

- Git repository (GitHub)
- Deployment history (Vercel/Railway)

## Support

**Issues**:
- Check GitHub Actions logs
- Review Railway/Vercel logs
- Consult this guide

**Contact**:
- Email: support@forgedev.com
- GitHub Issues: Create issue in repository

---

**Next Steps**:
- Set up staging environment
- Configure monitoring and alerts
- Implement blue-green deployment (advanced)
- Add performance monitoring (APM)
