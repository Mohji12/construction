# Run FastAPI backend using the jointlly venv inside app folder
# Usage: from jointlly_backend folder, run: .\run_server.ps1

$venvPython = Join-Path $PSScriptRoot "app\jointlly\Scripts\python.exe"
if (-not (Test-Path $venvPython)) {
    Write-Error "Venv not found at app\jointlly. Expected: $venvPython"
    exit 1
}

Set-Location $PSScriptRoot
& $venvPython -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
