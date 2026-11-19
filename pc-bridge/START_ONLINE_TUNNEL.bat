@echo off
title AI UNIVERSE - Online Tunnel (Control PC from Phone)
echo ==============================================================
echo   Starting Cloudflare Quick Tunnel for PC Bridge (Port 5050)
echo   Make sure START_PC_BRIDGE.bat is already running!
echo ==============================================================
echo.
where cloudflared >nul 2>nul
if %errorlevel% neq 0 (
  echo [!] cloudflared is not installed yet.
  echo Install it on Windows with:  winget install --id Cloudflare.cloudflared
  echo Or download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
  pause
  exit /b
)
cloudflared tunnel --url http://localhost:5050
pause
