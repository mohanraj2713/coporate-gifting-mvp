# Install dependencies for Corporate Gifting MVP

Write-Host "Installing dependencies for Corporate Gifting MVP..." -ForegroundColor Cyan
Write-Host ""

# Change to the project directory
Set-Location $PSScriptRoot

# Install dependencies
Write-Host "Running npm install..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Installation completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the application, run: npm run dev" -ForegroundColor Cyan
    Write-Host "Or run: .\start.ps1" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Installation failed. Please check the error messages above." -ForegroundColor Red
}
