# Start both backend and frontend servers
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " 🚀 Starting EDU YODHA Platform Servers" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# Start Backend Server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Starting EDU YODHA Backend on Port 5000...' -ForegroundColor Green; cd '$PSScriptRoot\server'; npm start"

# Start Frontend Vite Dev Server in this window
Write-Host "Starting Frontend on http://localhost:3000..." -ForegroundColor Yellow
npm run dev
