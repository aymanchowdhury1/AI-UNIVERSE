@echo off
title "AI UNIVERSE v6.9.7 - PC Bridge and Multi-AI Proxy"
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo [!] Node.js 18+ is required. Install from https://nodejs.org/
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Installing PC Bridge dependencies...
  call npm install
)
echo Starting AI UNIVERSE v6.9.7 PC Bridge...
node pc-bridge.js
pause
