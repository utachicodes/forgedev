# ForgeDev: Enterprise Engineering Platform

ForgeDev is a unified development environment consolidating AI/ML, web development, DevOps, and testing workflows into a single interface. It is designed to streamline the software lifecycle for engineering teams by reducing context switching and enabling rapid deployment.

## Core Capabilities

### AI & Machine Learning
- **Framework Agnostic**: Native support for PyTorch, TensorFlow, and Scikit-learn without configuration overhead.
- **Training Visualization**: Real-time telemetry for loss, accuracy, and resource utilization.
- **Dataset Management**: Version-controlled dataset storage and preprocessing pipelines.

### Web Development
- **Modern Stack**: Built on Next.js 14, React 18, and TypeScript for robust application development.
- **Integrated Environment**: Includes feature-rich code editing and live preview capabilities.
- **Component System**: Comprehensive UI library based on Tailwind CSS.

### DevOps & Infrastructure
- **Automated Pipelines**: Pre-configured CI/CD workflows for testing and deployment.
- **Multi-Cloud Support**: Deploy to Vercel, Railway, or AWS contexts seamlessly.
- **Infrastructure as Code**: Manage resources declaratively with built-in configurations.

### Security
- **Access Control**: Granular Role-Based Access Control (RBAC) for managing team permissions.
- **Compliance**: Audit logging and SOC2-ready architecture.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database (Neon recommended)
- Python 3.10 or higher (for AI Engine)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/forgedev.git
   cd forgedev
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in `apps/api` and `apps/web` following the templates provided in `.env.example`.

4. **Start the Platform**:
   Use the unified runner to start all services (Web, API, AI Engine):
   ```bash
   npm run dev
   ```

   The platform will be available at `http://localhost:3000`.

## Architecture

The platform follows a monorepo structure:

- `apps/web`: Frontend application (Next.js)
- `apps/api`: Backend API Gateway (Node.js/Express)
- `apps/ai-engine`: Python service for model training and inference
- `apps/infra-core`: Infrastructure management tools

## Access & Licensing

ForgeDev is a proprietary enterprise platform. Access is granted through an approval process.

- **Request Access**: Visit the landing page to submit an access request.
- **Pricing**: 10,000 FCFA/month per user.
- **Administration**: Administrators can manage user approvals via the Admin Dashboard.

---

© 2026 ForgeDev Inc. All rights reserved.
