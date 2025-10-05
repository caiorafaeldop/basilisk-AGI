@echo off
echo ========================================
echo   BASILISK AGI - Iniciando Backend
echo ========================================
echo.

echo [1/2] Iniciando MongoDB...
start "MongoDB Server" "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath C:\data\db
timeout /t 3 /nobreak > nul
echo MongoDB rodando na porta 27017
echo.

echo [2/2] Iniciando NestJS...
npm run start:dev
