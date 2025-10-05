@echo off
echo Verificando MongoDB...

REM Verifica se já está rodando
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB ja esta rodando!
) else (
    echo Iniciando MongoDB em background...
    start /MIN "MongoDB Server" "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath C:\data\db
    timeout /t 3 /nobreak > nul
    echo MongoDB iniciado na porta 27017!
)
