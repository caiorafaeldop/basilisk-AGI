# Script para adicionar alias ao PowerShell Profile
# Execute como Administrador ou ignore os erros de permissão

$aliasCommand = 'function Start-Mongo { & "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath C:\data\db }'
$aliasShort = 'Set-Alias mongo Start-Mongo'

# Verifica se o profile existe
if (!(Test-Path -Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
    Write-Host "Profile criado em: $PROFILE" -ForegroundColor Green
}

# Adiciona o alias se não existir
$content = Get-Content -Path $PROFILE -ErrorAction SilentlyContinue
if ($content -notcontains $aliasCommand) {
    Add-Content -Path $PROFILE -Value "`n# MongoDB Alias"
    Add-Content -Path $PROFILE -Value $aliasCommand
    Add-Content -Path $PROFILE -Value $aliasShort
    Write-Host "Alias 'mongo' adicionado ao PowerShell Profile!" -ForegroundColor Green
    Write-Host "Reinicie o PowerShell ou execute: . `$PROFILE" -ForegroundColor Yellow
} else {
    Write-Host "Alias já existe no profile!" -ForegroundColor Cyan
}
