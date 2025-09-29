@echo off
echo Starting Elantar Referral Program - Full Stack with Docker...
echo.
echo This will start both backend and frontend services
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin credentials: username=admin, password=admin123
echo.
docker-compose up --build
pause