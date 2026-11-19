const express = require('express');
const cors = require('cors');
const axios = require('axios');
const os = require('os');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5050;
const TOKEN_FILE = path.join(__dirname, '.bridge-token');

function getOrCreateToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    const existing = fs.readFileSync(TOKEN_FILE, 'utf8').trim();
    if (existing.length >= 8) return existing;
  }
  const newToken = 'AIU-' + crypto.randomBytes(8).toString('hex').toUpperCase();
  fs.writeFileSync(TOKEN_FILE, newToken, 'utf8');
  return newToken;
}

const BRIDGE_TOKEN = getOrCreateToken();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-bridge-token, x-ollama-url');
  res.header('Access-Control-Allow-Private-Network', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(cors({ origin: true }));
app.use(express.json({ limit: '50mb' }));

function requireBridgeToken(req, res, next) {
  const token = req.headers['x-bridge-token'] || req.query.token;
  if (!token || token !== BRIDGE_TOKEN) {
    return res.status(401).json({
      error: 'Invalid or missing PC Bridge Token. Copy the token from the PC Bridge terminal and paste it into ⚙️ Web Settings.'
    });
  }
  next();
}

app.get('/bridge/ping', (req, res) => {
  res.json({ ok: true, service: 'AI UNIVERSE PC Bridge v6' });
});

app.get('/bridge/status', requireBridgeToken, (req, res) => {
  res.json({
    connected: true,
    hostname: os.hostname(),
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    user: os.userInfo().username,
    totalRamGB: Math.round(os.totalmem() / (1024 ** 3)),
    freeRamGB: Math.round(os.freemem() / (1024 ** 3))
  });
});

app.get('/bridge/ollama/tags', requireBridgeToken, async (req, res) => {
  const ollamaUrl = (req.headers['x-ollama-url'] || req.query.ollamaUrl || 'http://localhost:11434').replace(/\/$/, '');
  try {
    const response = await axios.get(`${ollamaUrl}/api/tags`, { timeout: 5000 });
    res.json({ ok: true, ollamaUrl, models: response.data?.models || [] });
  } catch (err) {
    res.status(502).json({
      ok: false,
      error: `Cannot reach Ollama at ${ollamaUrl}. Make sure Ollama is running on your PC.`,
      models: []
    });
  }
});

app.post('/bridge/ollama/chat', requireBridgeToken, async (req, res) => {
  const ollamaUrl = (req.headers['x-ollama-url'] || req.body.ollamaUrl || 'http://localhost:11434').replace(/\/$/, '');
  const { model, messages } = req.body;
  try {
    const response = await axios.post(
      `${ollamaUrl}/api/chat`,
      { model: model || 'llama3.2', messages: messages || [], stream: false },
      { timeout: 180000 }
    );
    res.json({
      ok: true,
      reply: response.data?.message?.content || 'No response returned by Ollama.',
      model: response.data?.model || model
    });
  } catch (err) {
    const msg = err.response?.data?.error || err.message;
    res.status(502).json({ ok: false, error: `Ollama error: ${msg}` });
  }
});

app.post('/bridge/exec', requireBridgeToken, (req, res) => {
  const { command, permissionPolicy = 'ask' } = req.body;
  if (!command || typeof command !== 'string') {
    return res.status(400).json({ ok: false, error: 'No command provided.' });
  }

  const blockedPatterns = ['rm -rf /', 'rm -rf /*', 'format c:', 'mkfs.', 'del /f /s /q c:\\'];
  const lower = command.toLowerCase();
  if (blockedPatterns.some(p => lower.includes(p))) {
    return res.status(403).json({ ok: false, error: 'Blocked catastrophic system wipe command.' });
  }

  console.log(`[PC-EXEC | Policy: ${permissionPolicy.toUpperCase()}] > ${command}`);

  exec(command, { timeout: 45000, maxBuffer: 1024 * 1024 * 8, windowsHide: false }, (error, stdout, stderr) => {
    res.json({
      ok: !error,
      command,
      platform: os.platform(),
      stdout: (stdout || '').trim(),
      stderr: (stderr || (error ? error.message : '')).trim()
    });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('==============================================================');
  console.log('  🌌 AI UNIVERSE — ONLINE PC CONTROL & OLLAMA BRIDGE v6.0');
  console.log('==============================================================');
  console.log(`  Local Bridge URL : http://localhost:${PORT}`);
  console.log(`  PC Bridge Token  : ${BRIDGE_TOKEN}`);
  console.log('--------------------------------------------------------------');
  console.log('  1. Open your ONLINE AI UNIVERSE website in Chrome/Edge.');
  console.log('  2. Click ⚙️ Settings -> "2. Ollama & PC" tab.');
  console.log('  3. Paste the Bridge URL and PC Bridge Token above.');
  console.log('  4. Saved automatically to your Firebase Realtime Database!');
  console.log('==============================================================\n');
});
