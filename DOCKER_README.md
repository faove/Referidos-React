# Docker Setup for Elantar Referral Program

This document provides instructions for running the Elantar Referral Program using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

### Production Environment

1. **Build and start the services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin credentials: username=admin, password=admin123

### Development Environment

1. **Build and start the services in development mode:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000 (with hot reload)
   - Backend API: http://localhost:5000 (with debug mode)

## Services

### Backend Service
- **Container**: elantar-backend
- **Port**: 5000
- **Technology**: Flask (Python 3.11)
- **Database**: SQLite (persistent volume)
- **Features**: 
  - User authentication
  - Referral link management
  - Analytics and statistics
  - Admin dashboard API

### Frontend Service
- **Container**: elantar-frontend
- **Port**: 3000
- **Technology**: React 18 with Tailwind CSS
- **Features**:
  - User dashboard
  - Admin dashboard
  - Referral link generation
  - Real-time analytics

## Docker Commands

### Basic Operations

```bash
# Start services
docker-compose up

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and start services
docker-compose up --build

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
```

### Development Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# View development logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Database Operations

```bash
# Access backend container
docker-compose exec backend bash

# Create admin user manually
docker-compose exec backend python create_admin.py

# View database
docker-compose exec backend python -c "from app import app, db; app.app_context().push(); print('Database tables:', db.metadata.tables.keys())"
```

## Volumes and Data Persistence

- **Backend Data**: Stored in `backend_data` volume
- **Database**: SQLite file persisted in `/app/data/referral_program.db`
- **Frontend**: Node modules cached for faster rebuilds

## Environment Variables

### Backend
- `FLASK_ENV`: Environment (production/development)
- `FLASK_APP`: Application entry point
- `FLASK_DEBUG`: Debug mode (development only)

### Frontend
- `REACT_APP_API_URL`: Backend API URL
- `CHOKIDAR_USEPOLLING`: File watching for development
- `WATCHPACK_POLLING`: Webpack polling for development

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 5000 are available
2. **Database issues**: Remove volumes and restart: `docker-compose down -v && docker-compose up --build`
3. **Frontend not updating**: Check if volumes are properly mounted
4. **CORS errors**: Verify backend CORS configuration includes frontend URL

### Reset Everything

```bash
# Stop and remove everything
docker-compose down -v

# Remove all containers and images
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Use `.env` files for sensitive data
2. **Reverse Proxy**: Use nginx or similar for production
3. **Database**: Consider PostgreSQL for production
4. **SSL**: Configure HTTPS certificates
5. **Monitoring**: Add health checks and logging

## File Structure

```
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── backend/
│   ├── Dockerfile              # Production backend image
│   ├── Dockerfile.dev          # Development backend image
│   ├── .dockerignore           # Backend ignore patterns
│   └── ...
├── frontend/
│   ├── Dockerfile              # Production frontend image
│   ├── Dockerfile.dev          # Development frontend image
│   ├── .dockerignore           # Frontend ignore patterns
│   └── ...
└── DOCKER_README.md            # This file
```

## Support

For issues related to Docker setup, check:
1. Docker and Docker Compose versions
2. Port availability
3. Volume permissions
4. Network connectivity between services