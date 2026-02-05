# ForgeDev - Unified Software Development Platform

## Overview

ForgeDev consolidates all software development workflows into a single, powerful platform. Design, build, deploy and monitor software projects across **AI/ML**, **Web Development**, **DevOps**, and **Testing** without context switching.

## Features

### 🤖 AI/ML Training
- Framework-agnostic model training (PyTorch, TensorFlow, Scikit-learn)
- Real-time training monitoring and visualization
- Dataset management and versioning
- Model deployment and serving

### 💻 Web Development
- Full-stack development tools
- Next.js, React, and TypeScript support
- Integrated code editor and live preview
- Component library and design system

### 🚀 DevOps Automation
- Complete CI/CD pipelines
- Infrastructure management
- Deployment automation
- Cloud integration (Vercel, Railway, AWS)

### 🧪 Testing Suite
- Unit testing with Jest and React Testing Library
- E2E testing with Playwright (multi-browser support)
- Integration testing
- Coverage reporting (80% threshold)

### 💾 Database Management
- Neon PostgreSQL integration
- Schema management and migrations
- Query optimization
- Real-time database insights

### 🔒 Enterprise Security
- Role-based access control (RBAC)
- Audit logs and compliance
- SOC2-ready features
- Secure by design

## Access

ForgeDev is an **enterprise platform** requiring a subscription.

**Pricing**: $10,000/month

**Request Access**:
Visit [forgedev.com](https://forgedev.com) and submit an access request form.
Accounts are created manually after approval.

**Login**:
Access the platform at: [forgedev.com/auth/login](https://forgedev.com/auth/login)

> **Note**: No self-signup available. Contact the administrator for account creation.

## Technology Stack

### Frontend
- **Framework**: Next.js 14, React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks
- **Charts**: Chart.js, React-Chartjs-2

### Backend
- **API Gateway**: Node.js, Express
- **AI Engine**: Python, FastAPI
- **Authentication**: JWT, Neon Auth
- **Real-time**: WebSockets

### Database
- **Primary**: Neon PostgreSQL
- **ORM**: Prisma
- **Migrations**: Prisma Migrate

### AI/ML
- **Frameworks**: PyTorch, TensorFlow, Scikit-learn
- **Deployment**: Model serving APIs
- **Monitoring**: Training metrics and logs

### Testing
- **Unit**: Jest, React Testing Library
- **E2E**: Playwright (Chromium, Firefox, WebKit)
- **Coverage**: 80% threshold
- **CI/CD**: GitHub Actions

### Infrastructure
- **Frontend Hosting**: Vercel
- **API Hosting**: Railway / AWS
- **Database**: Neon (serverless PostgreSQL)
- **DNS & CDN**: Cloudflare

## Development

### Prerequisites

- Node.js 18+
- Python 3.10+
- npm or pnpm
- Neon account (for database)

### Local Setup

1. **Clone the repository**:
```bash
git clone https://github.com/your-org/forgedev.git
cd forgedev
```

2. **Install dependencies**:
```bash
# Root dependencies
npm install

# Frontend
cd apps/web
npm install

# API
cd apps/api
npm install

# AI Engine
cd apps/ai-engine
pip install -r requirements.txt
```

3. **Configure environment variables**:

Create `.env` files in each service:

**apps/web/.env.local**:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

**apps/api/.env**:
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
PORT=4000
```

**apps/ai-engine/.env**:
```env
DATABASE_URL="postgresql://..."
API_PORT=8000
```

4. **Run database migrations**:
```bash
cd apps/api
npx prisma migrate dev
```

5. **Start development servers**:

```bash
# Frontend (port 3000)
cd apps/web
npm run dev

# API (port 4000)
cd apps/api
npm run dev

# AI Engine (port 8000)
cd apps/ai-engine
python -m uvicorn app.main:app --reload
```

### Testing

```bash
# Unit tests
cd apps/web
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# E2E UI mode
npm run test:e2e:ui
```

## Documentation

- [API Documentation](docs/api/README.md)
- [Component Library](docs/components/README.md)
- [User Guides](docs/guides/README.md)
- [Development Workflows](docs/guides/workflows.md)

## Project Structure

```
forgedev/
├── apps/
│   ├── web/              # Next.js frontend
│   ├── api/              # Node.js API gateway
│   ├── ai-engine/        # Python AI/ML engine
│   └── infra-core/       # Infrastructure management
├── docs/                 # Documentation
│   ├── api/             # API documentation
│   ├── components/      # Component docs
│   └── guides/          # User guides
├── scripts/             # Build and deployment scripts
└── .github/             # CI/CD workflows
```

## Contributing

This is a proprietary enterprise platform. Contributions are limited to authorized team members.

## Support

For enterprise support, contact: [support@forgedev.com](mailto:support@forgedev.com)

## License

Proprietary - All rights reserved © 2026 ForgeDev Inc.

---

**Built with 💙 by the ForgeDev team**
