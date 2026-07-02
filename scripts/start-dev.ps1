$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw "Missing required command: npm"
}

if (Get-Command python -ErrorAction SilentlyContinue) {
    $PythonCommand = "python"
}
elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    $PythonCommand = "python3"
}
else {
    throw "Missing required command: python or python3"
}

Write-Host "Starting mock-system-api on :3001"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$Root\mock-system-api'; npm start"

Write-Host "Starting orion-api on :8000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$Root\orion-api'; $PythonCommand manage.py runserver"

Write-Host "Starting orion-web on :4200"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$Root\orion-web'; npm run start"

Write-Host "Orion services launched in separate terminals."
