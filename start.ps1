# Start the Corporate Gifting MVP application

Write-Host "Starting Corporate Gifting MVP..." -ForegroundColor Cyan
Write-Host ""

# Change to the project directory
Set-Location $PSScriptRoot

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "Dependencies not found. Running npm install..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies. Please run install.ps1 first." -ForegroundColor Red
        exit 1
    }
}

# Start the development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
Write-Host ""
Write-Host "Open your browser and go to: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

npm run dev
