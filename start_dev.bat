@echo off
echo Starting Elantar Referral Program - Development Mode...
echo.
echo This will start both services in development mode with hot reload
echo Backend: http://localhost:5000 (with debug mode)
echo Frontend: http://localhost:3000 (with hot reload)
echo Admin credentials: username=admin, password=admin123
echo.
docker-compose -f docker-compose.dev.yml up --build
pause