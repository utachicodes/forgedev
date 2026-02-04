# ForgeDev

ForgeDev is a unified software development platform designed to consolidate workflows across AI/ML, web development, DevOps, and testing. It provides a single environment for designing, building, deploying, and monitoring software projects.

## Architecture

The system is built on a microservices architecture:

- **Frontend**: Next.js 14 (TypeScript)
- **API Gateway**: Node.js (Express)
- **AI Engine**: Python (FastAPI, PyTorch)
- **Infrastructure**: Go
- **Persistence**: PostgreSQL, Redis

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository.
2. Run the application stack:

```bash
docker-compose up --build
```

The services will be available at:

- Web Dashboard: http://localhost:3000
- API Service: http://localhost:4000
- AI Engine: http://localhost:8000

## License

This project is licensed under the MIT License - see the LICENSE file for details.
