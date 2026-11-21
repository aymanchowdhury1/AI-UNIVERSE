@echo off
title AI UNIVERSE v6.8 - Online Tunnel for Mobile
echo Starting Cloudflare Quick Tunnel for Port 5050...
where cloudflared >nul 2>nul
if %errorlevel% neq 0 (
  echo Install cloudflared: winget install --id Cloudflare.cloudflared
  pause
  exit /b 1
)
cloudflared tunnel --url http://localhost:5050
pause
