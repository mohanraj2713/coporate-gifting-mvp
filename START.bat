@echo off
echo ========================================
echo Corporate Gifting MVP - Setup & Start
echo ========================================
echo.

echo Step 1: Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed.

echo.
echo Step 2: Checking MongoDB...
mongod --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB is not installed!
    echo You can either:
    echo   1. Install MongoDB locally, OR
    echo   2. Use MongoDB Atlas (cloud - free)
    echo.
    echo For MongoDB Atlas:
    echo   1. Go to https://www.mongodb.com/cloud/atlas
    echo   2. Create a free account
    echo   3. Get your connection string
    echo   4. Update MONGODB_URI in .env.local
    echo.
)

echo.
echo Step 3: Installing dependencies...
echo This may take a few minutes.
echo.
npm install

if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation completed successfully!
echo ========================================
echo.
echo Starting the application...
echo.
echo Open your browser and go to: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server.
echo ========================================
echo.

npm run dev

pause
