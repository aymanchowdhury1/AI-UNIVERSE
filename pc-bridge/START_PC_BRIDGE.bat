@echo off
title AI UNIVERSE - PC Control & Ollama Bridge
cd /d "%~dp0"
if not exist "node_modules" (
  echo Installing PC Bridge dependencies for the first time...
  npm install
)
echo Starting AI UNIVERSE PC Bridge...
node pc-bridge.js
pause
