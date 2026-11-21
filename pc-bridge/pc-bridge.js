/**
 * AI UNIVERSE v6.8 — Autonomous PC Bridge, Multi-Provider API Proxy & Sandboxed PC Executor
 * Creator of AI UNIVERSE: Ayman Chowdhury (TLTOM)
 */
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const os = require('os');
const crypto = require('crypto');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = Number(process.env.PORT || 5050);
const BIND_HOST = process.env.BIND_HOST || '127.0.0.1';

const TOKEN_FILE = path.join(__dirname, '.bridge-token');
const KEYS_FILE = path.join(__dirname, '.bridge-keys.json');
const CONFIG_FILE = path.join(__dirname, '.bridge-config.json');
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'bridge-actions.log');
fs.mkdirSync(LOG_DIR, { recursive: true });

function getOrCreateToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    const existing = fs.readFileSync(TOKEN_FILE, 'utf8').trim();
    if (existing.length >= 16) return existing;
  }
  const newToken = 'AIU-' + crypto.randomBytes(16).toString('hex').toUpperCase();
  fs.writeFileSync(TOKEN_FILE, newToken, { encoding: 'utf8', mode: 0o600 });
  return newToken;
}
const BRIDGE_TOKEN = getOrCreateToken();

function safeCompareToken(provided, expected) {
  if (!provided || typeof provided !== 'string') return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function getDefaultApprovedRoots() {
  const home = os.homedir();
  const candidates = [
    path.join(home, 'Documents'),
    path.join(home, 'Desktop'),
    path.join(home, 'Downloads'),
    path.join(home, 'Projects'),
    path.join(home, 'AI_UNIVERSE_Workspace'),
    path.resolve(__dirname, '..')
  ];
  const unique = [];
  for (const p of candidates) {
    const resolved = path.resolve(p);
    if (!unique.includes(resolved)) unique.push(resolved);
  }
  try { fs.mkdirSync(path.join(home, 'AI_UNIVERSE_Workspace'), { recursive: true }); } catch (_) {}
  return unique;
}

function loadBridgeConfig() {
  const defaults = { approvedRoots: getDefaultApprovedRoots(), sessionTtlMinutes: 180 };
  if (!fs.existsSync(CONFIG_FILE)) return defaults;
  try {
    const parsed = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    if (Array.isArray(parsed.approvedRoots) && parsed.approvedRoots.length) {
      defaults.approvedRoots = parsed.approvedRoots.map(p => path.resolve(p));
    }
    if (typeof parsed.sessionTtlMinutes === 'number' && parsed.sessionTtlMinutes >= 5 && parsed.sessionTtlMinutes <= 360) {
      defaults.sessionTtlMinutes = parsed.sessionTtlMinutes;
    }
  } catch (_) {}
  return defaults;
}
let bridgeConfig = loadBridgeConfig();
function saveBridgeConfig() {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(bridgeConfig, null, 2), { encoding: 'utf8', mode: 0o600 });
}

function loadServerKeys() {
  const keys = {
    geminiKey: process.env.GEMINI_API_KEY || '',
    openaiKey: process.env.OPENAI_API_KEY || '',
    claudeKey: process.env.ANTHROPIC_API_KEY || '',
    grokKey: process.env.XAI_API_KEY || '',
    deepseekKey: process.env.DEEPSEEK_API_KEY || ''
  };
  if (fs.existsSync(KEYS_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
      for (const k of Object.keys(keys)) {
        if (saved[k]) keys[k] = String(saved[k]).trim();
      }
    } catch (_) {}
  }
  return keys;
}
let serverKeys = loadServerKeys();
function saveServerKeys(updates) {
  for (const k of ['geminiKey', 'openaiKey', 'claudeKey', 'grokKey', 'deepseekKey']) {
    if (typeof updates[k] === 'string') serverKeys[k] = updates[k].trim();
  }
  fs.writeFileSync(KEYS_FILE, JSON.stringify(serverKeys, null, 2), { encoding: 'utf8', mode: 0o600 });
}

const recentAuditLogs = [];
function writeAuditLog(entry) {
  const record = {
    id: 'log_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex'),
    timestamp: new Date().toISOString(),
    ...entry
  };
  recentAuditLogs.unshift(record);
  if (recentAuditLogs.length > 250) recentAuditLogs.pop();
  try { fs.appendFileSync(LOG_FILE, JSON.stringify(record) + '\n', 'utf8'); } catch (_) {}
  console.log(`[AUDIT ${record.timestamp}] ${record.event || 'action'} | ${record.actionType || '-'} | ${record.status || '-'} | ${record.detail || ''}`);
  return record;
}

const activeSessions = new Map();
const pendingApprovals = new Map();
const taskStore = new Map();

function cleanupExpiredState() {
  const now = Date.now();
  for (const [id, sess] of activeSessions.entries()) {
    if (sess.expiresAt <= now) {
      activeSessions.delete(id);
      writeAuditLog({ event: 'session_expired', status: 'expired', detail: `Session ${id} expired.` });
    }
  }
  for (const [id, appr] of pendingApprovals.entries()) {
    if (appr.expiresAt <= now || appr.used) pendingApprovals.delete(id);
  }
}
setInterval(cleanupExpiredState, 30000).unref();

function getValidSessionGrant(grantId) {
  if (!grantId || typeof grantId !== 'string') return null;
  const sess = activeSessions.get(grantId);
  if (!sess) return null;
  if (sess.expiresAt <= Date.now()) {
    activeSessions.delete(grantId);
    writeAuditLog({ event: 'session_expired', status: 'expired', detail: `Session ${grantId} expired.` });
    return null;
  }
  return sess;
}

const FORBIDDEN_SYSTEM_PREFIXES = [
  'c:\\windows', 'c:\\program files', 'c:\\program files (x86)', 'c:\\programdata',
  'c:\\system volume information', '/etc', '/usr', '/bin', '/sbin', '/boot',
  '/dev', '/proc', '/sys', '/system', '/library'
];

function isForbiddenSystemPath(resolvedPath) {
  const norm = path.resolve(resolvedPath).toLowerCase();
  if (norm === '/' || /^[a-z]:\\?$/.test(norm)) return true;
  return FORBIDDEN_SYSTEM_PREFIXES.some(prefix => norm === prefix || norm.startsWith(prefix + path.sep) || norm.startsWith(prefix + '/'));
}

function resolveInsideApprovedRoots(rawTargetPath, allowNonExistent = false) {
  if (!rawTargetPath || typeof rawTargetPath !== 'string') throw new Error('A valid target path is required.');
  const trimmed = rawTargetPath.trim();
  if (!trimmed || trimmed.includes('\0')) throw new Error('Invalid path characters.');

  let candidate = trimmed;
  const aliasMatch = candidate.match(/^(downloads|downloadfs|desktop|documents|projects|workspace)(?:[\\/](.*))?$/i);
  if (aliasMatch) {
    const key = aliasMatch[1].toLowerCase();
    const rest = aliasMatch[2] || '';
    const folderMap = {
      downloads: path.join(os.homedir(), 'Downloads'),
      downloadfs: path.join(os.homedir(), 'Downloads'),
      desktop: path.join(os.homedir(), 'Desktop'),
      documents: path.join(os.homedir(), 'Documents'),
      projects: path.join(os.homedir(), 'Projects'),
      workspace: path.join(os.homedir(), 'AI_UNIVERSE_Workspace')
    };
    candidate = rest ? path.resolve(folderMap[key], rest) : path.resolve(folderMap[key]);
  } else if (candidate.startsWith('~')) {
    candidate = path.join(os.homedir(), candidate.slice(1));
  } else if (!path.isAbsolute(candidate)) {
    candidate = path.resolve(path.join(os.homedir(), 'AI_UNIVERSE_Workspace'), candidate);
  } else {
    candidate = path.resolve(candidate);
  }

  if (isForbiddenSystemPath(candidate)) {
    throw new Error(`Access denied: "${candidate}" is inside a protected system directory.`);
  }

  let realCandidate = candidate;
  if (fs.existsSync(candidate)) {
    try { realCandidate = fs.realpathSync(candidate); } catch (_) {}
  } else if (!allowNonExistent) {
    throw new Error(`Path does not exist: ${candidate}`);
  } else {
    let parent = path.dirname(candidate);
    while (parent && parent !== path.dirname(parent) && !fs.existsSync(parent)) {
      parent = path.dirname(parent);
    }
    if (fs.existsSync(parent)) {
      try {
        const realParent = fs.realpathSync(parent);
        realCandidate = path.resolve(realParent, path.relative(parent, candidate));
      } catch (_) {}
    }
  }

  const normalizedReal = realCandidate.toLowerCase();
  const isApproved = bridgeConfig.approvedRoots.some(root => {
    let realRoot = path.resolve(root);
    if (fs.existsSync(realRoot)) {
      try { realRoot = fs.realpathSync(realRoot); } catch (_) {}
    }
    const normRoot = realRoot.toLowerCase();
    return normalizedReal === normRoot || normalizedReal.startsWith(normRoot + path.sep);
  });

  if (!isApproved) {
    throw new Error(`Access denied: "${realCandidate}" is outside your approved PC Bridge workspace directories.`);
  }
  return realCandidate;
}

const WINDOWS_ALLOWED_APPS = {
  notepad: { cmd: 'notepad.exe', args: [], label: 'Notepad' },
  calculator: { cmd: 'calc.exe', args: [], label: 'Calculator' },
  calc: { cmd: 'calc.exe', args: [], label: 'Calculator' },
  explorer: { cmd: 'explorer.exe', args: [], label: 'File Explorer' },
  thispc: { cmd: 'explorer.exe', args: ['shell:MyComputerFolder'], label: 'This PC' },
  'this pc': { cmd: 'explorer.exe', args: ['shell:MyComputerFolder'], label: 'This PC' },
  paint: { cmd: 'mspaint.exe', args: [], label: 'Microsoft Paint' },
  mspaint: { cmd: 'mspaint.exe', args: [], label: 'Microsoft Paint' },
  vscode: { cmd: 'code', args: [], label: 'Visual Studio Code' },
  code: { cmd: 'code', args: [], label: 'Visual Studio Code' },
  androidstudio: { cmd: 'studio64.exe', args: [], label: 'Android Studio' },
  'android studio': { cmd: 'studio64.exe', args: [], label: 'Android Studio' },
  studio64: { cmd: 'studio64.exe', args: [], label: 'Android Studio' },
  chrome: { cmd: 'chrome', args: [], label: 'Google Chrome' },
  edge: { cmd: 'msedge', args: [], label: 'Microsoft Edge' },
  msedge: { cmd: 'msedge', args: [], label: 'Microsoft Edge' },
  firefox: { cmd: 'firefox', args: [], label: 'Mozilla Firefox' },
  terminal: { cmd: 'wt.exe', args: [], label: 'Windows Terminal' },
  wt: { cmd: 'wt.exe', args: [], label: 'Windows Terminal' },
  brave: { cmd: 'brave', args: [], label: 'Brave Browser' },
  'brave browser': { cmd: 'brave', args: [], label: 'Brave Browser' }
};

const ALLOWED_DEV_BINARIES = new Set([
  'node', 'npm', 'npx', 'git', 'python', 'python3', 'py', 'pip', 'pip3',
  'tsc', 'vite', 'eslint', 'prettier', 'jest', 'gradle', 'gradlew', 'adb', 'java', 'javac', 'flutter', 'dart'
]);

const READONLY_DEV_PATTERNS = [
  /^node\s+(-v|--version)$/,
  /^npm\s+(-v|--version|test|run\s+build|run\s+lint|run\s+test|list|outdated)$/,
  /^git\s+(status|log(\s+-n\s+\d+|\s+--oneline)*|diff(\s+--stat)?|branch(\s+-a)?|remote\s+-v|rev-parse\s+--abbrev-ref\s+HEAD)$/,
  /^(python|python3|py)\s+(--version|-V|-m\s+pytest)$/,
  /^(pip|pip3)\s+(list|freeze|--version)$/
];

const BLOCKED_DEV_SUBSTRINGS = [
  '&&', '||', ';', '|', '>', '<', '`', '$(', '\n', '\r',
  '--force', '-f', 'reset --hard', 'clean -fd', 'clean -fdx',
  'format ', 'diskpart', 'bcdedit', 'reg ', 'regedit', 'shutdown',
  'powershell', 'pwsh', 'cmd.exe', 'taskkill', 'net user', 'icacls', 'takeown',
  'rm -rf', 'del /f', 'rd /s', 'rmdir /s', 'mkfs'
];

function tokenizeSafeArgs(commandStr) {
  const args = [];
  let current = '';
  let quote = null;
  for (let i = 0; i < commandStr.length; i++) {
    const ch = commandStr[i];
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (/\s/.test(ch)) {
      if (current) { args.push(current); current = ''; }
    } else {
      current += ch;
    }
  }
  if (quote) throw new Error('Unclosed quote in command.');
  if (current) args.push(current);
  return args;
}

function parseLegacyCommandToAction(rawCommand, defaultCwd) {
  const cmd = String(rawCommand || '').trim();
  if (!cmd) throw new Error('Empty command.');
  const lower = cmd.toLowerCase();
  for (const bad of BLOCKED_DEV_SUBSTRINGS) {
    if (lower.includes(bad)) throw new Error(`Blocked unsafe shell operator or destructive command pattern: "${bad.trim()}"`);
  }

  const startMatch = cmd.match(/^start\s+(?:""\s+)?([a-zA-Z0-9._-]+)(?:\s+(.*))?$/i);
  if (startMatch) {
    const appKey = startMatch[1].replace(/\.exe$/i, '').toLowerCase();
    if (WINDOWS_ALLOWED_APPS[appKey]) {
      return { type: 'open_app', app: appKey, targetPath: startMatch[2] ? startMatch[2].replace(/^"|"$/g, '').trim() : '' };
    }
  }
  const bareKey = cmd.replace(/\.exe$/i, '').toLowerCase();
  if (WINDOWS_ALLOWED_APPS[bareKey]) return { type: 'open_app', app: bareKey };

  const dirMatch = cmd.match(/^(dir|ls)(?:\s+(.*))?$/i);
  if (dirMatch) {
    const rawPath = (dirMatch[2] || '').replace(/^"|"$/g, '').trim();
    return { type: 'list_dir', path: rawPath || defaultCwd || path.join(os.homedir(), 'AI_UNIVERSE_Workspace') };
  }

  const mkdirMatch = cmd.match(/^mkdir\s+(.+)$/i);
  if (mkdirMatch) return { type: 'create_folder', path: mkdirMatch[1].replace(/^"|"$/g, '').trim() };

  if (/^(systeminfo|hostname|whoami|ver|uname(\s+-a)?)$/i.test(cmd)) return { type: 'system_info' };

  const tokens = tokenizeSafeArgs(cmd);
  if (!tokens.length) throw new Error('Invalid command.');
  const bin = tokens[0].replace(/\.exe$/i, '').toLowerCase();
  if (!ALLOWED_DEV_BINARIES.has(bin)) {
    throw new Error(`Command "${tokens[0]}" is not allowed. Permitted tools: ${[...ALLOWED_DEV_BINARIES].join(', ')}.`);
  }
  return { type: 'run_dev_cmd', binary: bin, args: tokens.slice(1), cwd: defaultCwd || path.join(os.homedir(), 'AI_UNIVERSE_Workspace') };
}

function validateAndClassifyAction(rawAction) {
  if (!rawAction || typeof rawAction !== 'object') throw new Error('Action object is required.');
  const type = String(rawAction.type || '').trim();
  const defaultWorkspace = path.join(os.homedir(), 'AI_UNIVERSE_Workspace');

  switch (type) {
    case 'system_info':
      return { action: { type: 'system_info' }, sensitive: false, reason: 'Read-only system info', preview: 'Inspect system info (hostname, OS, RAM, approved folders)' };
    case 'open_app': {
      const requestedApp = rawAction.app ?? rawAction.app_name ?? rawAction.name ?? rawAction.target ?? '';
      const appKey = String(requestedApp || '').replace(/\.exe$/i, '').trim().toLowerCase();
      const appDef = WINDOWS_ALLOWED_APPS[appKey];
      if (!appDef) throw new Error(`Application "${requestedApp || 'undefined'}" is not in the approved launcher list (${Object.keys(WINDOWS_ALLOWED_APPS).join(', ')}).`);
      let targetPath = '';
      let targetUrl = '';
      if (rawAction.url) {
        const rawUrl = String(rawAction.url || '').trim();
        let parsedUrl;
        try { parsedUrl = new URL(rawUrl); } catch (_) { throw new Error('Invalid URL provided to open_app.'); }
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
          throw new Error('Only http:// and https:// URLs are allowed in open_app.');
        }
        targetUrl = parsedUrl.toString();
      }
      if (rawAction.targetPath) targetPath = resolveInsideApprovedRoots(rawAction.targetPath, false);
      const labelDetail = targetUrl || targetPath || '';
      return {
        action: { type: 'open_app', app: appKey, targetPath, url: targetUrl },
        sensitive: false,
        reason: `Launch desktop app: ${appDef.label}`,
        preview: labelDetail ? `Open ${appDef.label} -> "${labelDetail}"` : `Open ${appDef.label}`
      };
    }
    case 'list_dir': {
      const target = resolveInsideApprovedRoots(rawAction.path || defaultWorkspace, false);
      return { action: { type: 'list_dir', path: target }, sensitive: false, reason: 'Inspect approved directory', preview: `List files and folders in "${target}"` };
    }
    case 'inspect_project': {
      const target = resolveInsideApprovedRoots(rawAction.path || defaultWorkspace, false);
      const maxDepth = Math.min(Math.max(Number(rawAction.maxDepth || 3), 1), 5);
      return { action: { type: 'inspect_project', path: target, maxDepth }, sensitive: false, reason: 'Inspect project directory tree', preview: `Inspect project folder "${target}" (depth ${maxDepth})` };
    }
    case 'read_file': {
      const target = resolveInsideApprovedRoots(rawAction.path, false);
      return { action: { type: 'read_file', path: target }, sensitive: false, reason: 'Read file inside approved workspace', preview: `Read file "${target}"` };
    }
    case 'create_folder': {
      const target = resolveInsideApprovedRoots(rawAction.path, true);
      return { action: { type: 'create_folder', path: target }, sensitive: false, reason: 'Create folder inside approved workspace', preview: `Create folder "${target}"` };
    }
    case 'write_file':
    case 'edit_file': {
      const target = resolveInsideApprovedRoots(rawAction.path, true);
      const content = typeof rawAction.content === 'string' ? rawAction.content : '';
      const exists = fs.existsSync(target);
      return { action: { type: 'write_file', path: target, content }, sensitive: exists, reason: exists ? 'Overwrites an existing file (sensitive)' : 'Create new file in workspace', preview: `${exists ? 'OVERWRITE existing' : 'Create new'} file "${target}" (${content.length} chars)` };
    }
    case 'scaffold_project': {
      const projectDir = resolveInsideApprovedRoots(rawAction.projectDir || rawAction.path || defaultWorkspace, true);
      const files = Array.isArray(rawAction.files) ? rawAction.files : [];
      if (!files.length || files.length > 80) throw new Error('scaffold_project requires between 1 and 80 files.');
      const resolvedFiles = [];
      let overwrites = 0;
      for (const f of files) {
        if (!f || !f.path) throw new Error('Each file in scaffold_project needs a relative path.');
        const rel = String(f.path).replace(/^[\\/]+/, '');
        const absFile = resolveInsideApprovedRoots(path.join(projectDir, rel), true);
        if (!absFile.toLowerCase().startsWith(projectDir.toLowerCase())) {
          throw new Error(`Path traversal blocked in scaffold_project: ${f.path}`);
        }
        if (fs.existsSync(absFile)) overwrites++;
        resolvedFiles.push({ path: absFile, relPath: rel, content: typeof f.content === 'string' ? f.content : '' });
      }
      return {
        action: { type: 'scaffold_project', projectDir, files: resolvedFiles, openIn: rawAction.openIn || '' },
        sensitive: overwrites > 0,
        reason: overwrites > 0 ? `Scaffolds project & overwrites ${overwrites} existing file(s) (sensitive)` : `Scaffolds ${resolvedFiles.length} project file(s) inside approved workspace`,
        preview: `Create ${resolvedFiles.length} file(s) in "${projectDir}"${rawAction.openIn ? ` and open in ${rawAction.openIn}` : ''}`
      };
    }
    case 'move_file': {
      const source = resolveInsideApprovedRoots(rawAction.source, false);
      const destination = resolveInsideApprovedRoots(rawAction.destination, true);
      const destExists = fs.existsSync(destination);
      return { action: { type: 'move_file', source, destination }, sensitive: destExists, reason: destExists ? 'Overwrites destination (sensitive)' : 'Move/rename file in workspace', preview: `Move "${source}" -> "${destination}"` };
    }
    case 'organize_files': {
      const target = resolveInsideApprovedRoots(rawAction.path || defaultWorkspace, false);
      const dryRun = Boolean(rawAction.dryRun);
      return { action: { type: 'organize_files', path: target, dryRun }, sensitive: !dryRun, reason: dryRun ? 'Preview folder organization' : 'Reorganize files into subfolders (sensitive)', preview: `${dryRun ? 'Preview organizing' : 'Organize'} files inside "${target}"` };
    }
    case 'delete_file': {
      const target = resolveInsideApprovedRoots(rawAction.path, false);
      return { action: { type: 'delete_file', path: target }, sensitive: true, reason: 'Irreversible deletion', preview: `DELETE "${target}" (irreversible — explicit approval required)` };
    }
    case 'run_dev_cmd': {
      const bin = String(rawAction.binary || '').replace(/\.exe$/i, '').trim().toLowerCase();
      if (!ALLOWED_DEV_BINARIES.has(bin)) throw new Error(`Development command "${bin}" is not allowed.`);
      const args = Array.isArray(rawAction.args) ? rawAction.args.map(a => String(a)) : [];
      const joined = `${bin} ${args.join(' ')}`.trim();
      const lowerJoined = joined.toLowerCase();
      for (const bad of BLOCKED_DEV_SUBSTRINGS) {
        if (lowerJoined.includes(bad)) throw new Error(`Blocked unsafe pattern in dev command: "${bad.trim()}"`);
      }
      const cwd = resolveInsideApprovedRoots(rawAction.cwd || defaultWorkspace, false);
      const isReadOnly = READONLY_DEV_PATTERNS.some(rx => rx.test(joined));
      return { action: { type: 'run_dev_cmd', binary: bin, args, cwd }, sensitive: !isReadOnly, reason: isReadOnly ? 'Read-only dev check' : 'Mutating dev command (sensitive)', preview: `Run "${joined}" in "${cwd}"` };
    }
    case 'search_freelancer_jobs': {
      const query = String(rawAction.query || rawAction.keywords || '').trim().slice(0, 120);
      const skills = Array.isArray(rawAction.skills)
        ? rawAction.skills.map(s => String(s || '').trim().toLowerCase()).filter(Boolean).slice(0, 10)
        : (typeof rawAction.skills === 'string'
            ? rawAction.skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean).slice(0, 10)
            : []);
      const minBudget = Number.isFinite(Number(rawAction.minBudget)) ? Number(rawAction.minBudget) : 0;
      const maxBudget = Number.isFinite(Number(rawAction.maxBudget)) && Number(rawAction.maxBudget) > 0 ? Number(rawAction.maxBudget) : 0;
      const limit = Math.min(Math.max(Number(rawAction.limit || 15), 1), 30);
      return {
        action: { type: 'search_freelancer_jobs', query, skills, minBudget, maxBudget, limit },
        sensitive: false,
        reason: 'Search active Freelancer.com project listings via public projects API',
        preview: `Search Freelancer projects${query ? ` for "${query}"` : ''}${skills.length ? ` [skills: ${skills.join(', ')}]` : ''}`
      };
    }
    default:
      throw new Error(`Unsupported action type: "${type}"`);
  }
}

async function executeValidatedAction(taskId, validated) {
  const task = taskStore.get(taskId);
  const { action } = validated;
  task.status = 'running';
  task.progress = `Executing ${action.type}...`;

  try {
    switch (action.type) {
      case 'system_info': {
        const info = {
          hostname: os.hostname(), platform: os.platform(), release: os.release(), arch: os.arch(),
          user: os.userInfo().username, cpus: os.cpus().length,
          totalRamGB: +(os.totalmem() / (1024 ** 3)).toFixed(1),
          freeRamGB: +(os.freemem() / (1024 ** 3)).toFixed(1),
          approvedRoots: bridgeConfig.approvedRoots
        };
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: 'Confirmed system info.', result: info, stdout: JSON.stringify(info, null, 2), finishedAt: Date.now() });
        return task;
      }
      case 'open_app': {
        const appDef = WINDOWS_ALLOWED_APPS[action.app];
        const spawnArgs = [...appDef.args];
        if (action.url) spawnArgs.push(action.url);
        if (action.targetPath) spawnArgs.push(action.targetPath);
        let cmdToRun = appDef.cmd;
        if (cmdToRun === 'studio64.exe' && os.platform() === 'win32') {
          const studioCandidates = [
            'C:\\Program Files\\Android\\Android Studio\\bin\\studio64.exe',
            path.join(os.homedir(), 'AppData\\Local\\Programs\\Android Studio\\bin\\studio64.exe')
          ];
          const foundStudio = studioCandidates.find(p => fs.existsSync(p));
          if (foundStudio) cmdToRun = foundStudio;
        } else if (cmdToRun === 'brave' && os.platform() === 'win32') {
          const braveCandidates = [
            'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
            'C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
            path.join(os.homedir(), 'AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe')
          ];
          const foundBrave = braveCandidates.find(p => fs.existsSync(p));
          if (foundBrave) cmdToRun = foundBrave;
        } else if (cmdToRun === 'chrome' && os.platform() === 'win32') {
          const chromeCandidates = [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe')
          ];
          const foundChrome = chromeCandidates.find(p => fs.existsSync(p));
          if (foundChrome) cmdToRun = foundChrome;
        }
        const launched = await new Promise((resolve, reject) => {
          const child = spawn(cmdToRun, spawnArgs, { shell: false, detached: true, stdio: 'ignore', windowsHide: false });
          let settled = false;
          child.once('error', err => { if (!settled) { settled = true; reject(err); } });
          child.once('spawn', () => { if (!settled) { settled = true; child.unref(); resolve({ pid: child.pid, app: appDef.label }); } });
        });
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Confirmed launch of ${appDef.label} (PID ${launched.pid}).`, result: launched, stdout: `Opened ${appDef.label} (PID ${launched.pid}).`, finishedAt: Date.now() });
        return task;
      }
      case 'list_dir': {
        const entries = await fsp.readdir(action.path, { withFileTypes: true });
        const items = await Promise.all(entries.slice(0, 200).map(async ent => {
          const full = path.join(action.path, ent.name);
          let size = 0;
          try { size = (await fsp.stat(full)).size; } catch (_) {}
          return { name: ent.name, type: ent.isDirectory() ? 'folder' : 'file', size };
        }));
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Listed ${items.length} items.`, result: { path: action.path, items }, stdout: items.map(i => `${i.type === 'folder' ? '[DIR] ' : '      '}${i.name}`).join('\n') || '(Empty directory)', finishedAt: Date.now() });
        return task;
      }
      case 'inspect_project': {
        const tree = [];
        const skipDirs = new Set(['node_modules', '.git', 'dist', 'build', '.next', '__pycache__']);
        async function walk(dir, depth) {
          if (depth > action.maxDepth || tree.length >= 250) return;
          const entries = await fsp.readdir(dir, { withFileTypes: true });
          for (const ent of entries) {
            if (tree.length >= 250) break;
            if (ent.isDirectory() && skipDirs.has(ent.name)) continue;
            const rel = path.relative(action.path, path.join(dir, ent.name));
            tree.push(ent.isDirectory() ? `${rel}/` : rel);
            if (ent.isDirectory()) await walk(path.join(dir, ent.name), depth + 1);
          }
        }
        await walk(action.path, 1);
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Inspected ${tree.length} items.`, result: { root: action.path, tree }, stdout: `Root: ${action.path}\n${tree.join('\n')}`, finishedAt: Date.now() });
        return task;
      }
      case 'read_file': {
        const st = await fsp.stat(action.path);
        if (st.isDirectory()) throw new Error('Target is a directory.');
        if (st.size > 1024 * 512) throw new Error('File exceeds 512 KB read limit.');
        const content = await fsp.readFile(action.path, 'utf8');
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Read ${st.size} bytes.`, result: { path: action.path, size: st.size, content }, stdout: content, finishedAt: Date.now() });
        return task;
      }
      case 'create_folder': {
        await fsp.mkdir(action.path, { recursive: true });
        if (!fs.existsSync(action.path)) throw new Error('Folder creation could not be confirmed.');
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Confirmed folder: ${action.path}`, result: { path: action.path }, stdout: `Created and verified folder: ${action.path}`, finishedAt: Date.now() });
        return task;
      }
      case 'write_file': {
        await fsp.mkdir(path.dirname(action.path), { recursive: true });
        await fsp.writeFile(action.path, action.content, 'utf8');
        const st = await fsp.stat(action.path);
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Confirmed write (${st.size} bytes).`, result: { path: action.path, bytesWritten: st.size }, stdout: `Wrote and verified ${st.size} bytes to ${action.path}`, finishedAt: Date.now() });
        return task;
      }
      case 'scaffold_project': {
        await fsp.mkdir(action.projectDir, { recursive: true });
        const written = [];
        for (const f of action.files) {
          await fsp.mkdir(path.dirname(f.path), { recursive: true });
          await fsp.writeFile(f.path, f.content, 'utf8');
          const st = await fsp.stat(f.path);
          written.push(`${f.relPath} (${st.size} B)`);
        }
        let launchNote = '';
        if (action.openIn) {
          const appKey = String(action.openIn).toLowerCase().trim();
          const appDef = WINDOWS_ALLOWED_APPS[appKey];
          if (appDef) {
            try {
              const child = spawn(appDef.cmd, [...appDef.args, action.projectDir], { shell: false, detached: true, stdio: 'ignore', windowsHide: false });
              child.unref();
              launchNote = `\nOpened ${appDef.label} on "${action.projectDir}".`;
            } catch (e) {
              launchNote = `\nNote: Could not auto-launch ${appDef.label} (${e.message}).`;
            }
          }
        }
        Object.assign(task, {
          status: 'completed', ok: true, confirmed: true,
          progress: `Confirmed ${written.length} project file(s) created in ${action.projectDir}.`,
          result: { projectDir: action.projectDir, filesWritten: written },
          stdout: `Project created at: ${action.projectDir}\nFiles:\n${written.join('\n')}${launchNote}`,
          finishedAt: Date.now()
        });
        return task;
      }
      case 'move_file': {
        await fsp.mkdir(path.dirname(action.destination), { recursive: true });
        await fsp.rename(action.source, action.destination);
        if (!fs.existsSync(action.destination)) throw new Error('Move could not be confirmed.');
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Confirmed move.`, result: { source: action.source, destination: action.destination }, stdout: `Moved ${action.source} -> ${action.destination}`, finishedAt: Date.now() });
        return task;
      }
      case 'organize_files': {
        const categoryMap = {
          Images: new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg']),
          Videos: new Set(['mp4', 'webm', 'mov', 'mkv', 'avi']),
          Documents: new Set(['pdf', 'doc', 'docx', 'txt', 'md', 'xlsx', 'csv', 'pptx']),
          Code: new Set(['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'py', 'java', 'kt', 'json', 'sql']),
          Archives: new Set(['zip', 'rar', '7z', 'tar', 'gz'])
        };
        const entries = await fsp.readdir(action.path, { withFileTypes: true });
        const moves = [];
        for (const ent of entries) {
          if (!ent.isFile()) continue;
          const ext = (ent.name.split('.').pop() || '').toLowerCase();
          let bucket = 'Other';
          for (const [cat, exts] of Object.entries(categoryMap)) { if (exts.has(ext)) { bucket = cat; break; } }
          const src = path.join(action.path, ent.name);
          const dstDir = path.join(action.path, bucket);
          const dst = path.join(dstDir, ent.name);
          if (!action.dryRun) {
            await fsp.mkdir(dstDir, { recursive: true });
            if (!fs.existsSync(dst)) { await fsp.rename(src, dst); moves.push(`${ent.name} -> ${bucket}/${ent.name}`); }
          } else {
            moves.push(`[PLAN] ${ent.name} -> ${bucket}/${ent.name}`);
          }
        }
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Processed ${moves.length} files.`, result: { moves }, stdout: moves.join('\n') || 'No top-level files to organize.', finishedAt: Date.now() });
        return task;
      }
      case 'delete_file': {
        await fsp.rm(action.path, { recursive: true, force: false });
        if (fs.existsSync(action.path)) throw new Error('Deletion could not be confirmed.');
        Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: `Confirmed deletion.`, result: { path: action.path }, stdout: `Deleted and confirmed removal: ${action.path}`, finishedAt: Date.now() });
        return task;
      }
      case 'run_dev_cmd': {
        const outcome = await new Promise((resolve) => {
          const isWin = os.platform() === 'win32';
          const binName = isWin && ['npm', 'npx', 'tsc', 'vite', 'eslint', 'prettier', 'jest', 'gradle', 'gradlew'].includes(action.binary) ? `${action.binary}.cmd` : action.binary;
          const child = spawn(binName, action.args, { cwd: action.cwd, shell: false, windowsHide: true });
          task.childPid = child.pid;
          let stdout = '', stderr = '', cancelled = false, timedOut = false;
          const timer = setTimeout(() => { timedOut = true; try { child.kill('SIGTERM'); } catch (_) {} }, 60000);
          task.cancelFn = () => {
            cancelled = true;
            task.status = 'cancelled';
            task.progress = 'Cancellation requested...';
            try { child.kill('SIGTERM'); } catch (_) {}
          };
          child.stdout.on('data', chunk => { if (stdout.length < 2000000) stdout += chunk.toString('utf8'); });
          child.stderr.on('data', chunk => { if (stderr.length < 2000000) stderr += chunk.toString('utf8'); });
          child.on('error', err => { clearTimeout(timer); resolve({ code: -1, stdout, stderr: stderr || err.message, cancelled, timedOut }); });
          child.on('close', code => { clearTimeout(timer); resolve({ code, stdout, stderr, cancelled, timedOut }); });
        });
        task.cancelFn = null;
        task.finishedAt = Date.now();
        task.stdout = outcome.stdout.trim();
        task.stderr = outcome.stderr.trim();
        if (outcome.cancelled) Object.assign(task, { status: 'cancelled', ok: false, confirmed: false, error: 'Task cancelled by user.' });
        else if (outcome.timedOut) Object.assign(task, { status: 'failed', ok: false, confirmed: false, error: 'Timed out after 60s.' });
        else if (outcome.code === 0) Object.assign(task, { status: 'completed', ok: true, confirmed: true, progress: 'Confirmed exit code 0.' });
        else Object.assign(task, { status: 'failed', ok: false, confirmed: false, error: outcome.stderr || `Exited with code ${outcome.code}` });
        return task;
      }
      case 'search_freelancer_jobs': {
        const params = new URLSearchParams({ limit: '50', compact: 'false' });
        if (action.query) params.set('query', action.query);
        const apiUrl = `https://www.freelancer.com/api/projects/0.1/projects/active/?${params.toString()}`;
        const resp = await axios.get(apiUrl, { timeout: 20000, headers: { 'User-Agent': 'AI-UNIVERSE-PC-Bridge/6.9.6' } });
        const rawProjects = resp.data?.result?.projects || [];
        const qLower = action.query.toLowerCase();

        const filtered = rawProjects
          .map(p => {
            const title = String(p.title || '').trim();
            const desc = String(p.preview_description || p.description || '').replace(/\s+/g, ' ').trim();
            const budgetMin = p.budget?.minimum ?? null;
            const budgetMax = p.budget?.maximum ?? null;
            const currency = p.currency?.sign || p.currency?.code || '';
            const jobs = Array.isArray(p.jobs) ? p.jobs.map(j => String(j.name || '')).filter(Boolean) : [];
            const seoUrl = p.seo_url ? `https://www.freelancer.com/projects/${p.seo_url}` : (p.id ? `https://www.freelancer.com/projects/${p.id}` : '');
            const haystack = `${title} ${desc} ${jobs.join(' ')}`.toLowerCase();

            let score = 0;
            if (qLower && haystack.includes(qLower)) score += 3;
            if (action.skills.length) {
              const matchedSkills = action.skills.filter(sk => haystack.includes(sk));
              score += matchedSkills.length * 2;
            }
            const budgetVal = budgetMax ?? budgetMin ?? 0;
            const budgetOk = (!action.minBudget || budgetVal >= action.minBudget) && (!action.maxBudget || !budgetVal || budgetVal <= action.maxBudget);
            return { id: p.id, title, budgetMin, budgetMax, currency, skills: jobs.slice(0, 6), url: seoUrl, summary: desc.slice(0, 220), score, budgetOk };
          })
          .filter(item => item.budgetOk && (!action.query && !action.skills.length ? true : item.score > 0 || !qLower))
          .sort((a, b) => b.score - a.score)
          .slice(0, action.limit);

        const formatted = filtered.length
          ? filtered.map((j, idx) => `${idx + 1}. ${j.title} | Budget: ${j.currency}${j.budgetMin ?? '?'}-${j.currency}${j.budgetMax ?? '?'} | Skills: ${j.skills.join(', ') || 'General'} | ${j.url}\n   ${j.summary}`).join('\n\n')
          : 'No matching active projects found for those filters.';

        Object.assign(task, {
          status: 'completed', ok: true, confirmed: true,
          progress: `Found ${filtered.length} matching Freelancer project(s).`,
          result: { count: filtered.length, projects: filtered },
          stdout: formatted,
          finishedAt: Date.now()
        });
        return task;
      }
      default:
        throw new Error(`Unhandled action: ${action.type}`);
    }
  } catch (err) {
    Object.assign(task, { status: 'failed', ok: false, confirmed: false, error: err.message, stderr: err.message, progress: `Failed: ${err.message}`, finishedAt: Date.now() });
    return task;
  }
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-bridge-token, x-session-grant, x-goog-api-key');
  res.header('Access-Control-Allow-Private-Network', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(cors({ origin: true }));
app.use(express.json({ limit: '50mb' }));

function requireBridgeToken(req, res, next) {
  const token = req.headers['x-bridge-token'] || req.query.token;
  if (!safeCompareToken(String(token || ''), BRIDGE_TOKEN)) {
    writeAuditLog({ event: 'auth_failed', status: 'denied', detail: `Unauthorized ${req.method} ${req.path}` });
    return res.status(401).json({ ok: false, error: 'Invalid or missing PC Bridge Token.' });
  }
  next();
}

app.get('/bridge/ping', (req, res) => res.json({ ok: true, service: 'AI UNIVERSE Bridge v6.8', version: '6.8.0' }));

app.get('/bridge/status', requireBridgeToken, (req, res) => {
  const activeSess = getValidSessionGrant(req.headers['x-session-grant'] || req.query.sessionGrant);
  res.json({
    ok: true, connected: true, version: '6.8.0',
    hostname: os.hostname(), platform: os.platform(), release: os.release(), arch: os.arch(),
    user: os.userInfo().username,
    totalRamGB: Math.round(os.totalmem() / (1024 ** 3)),
    freeRamGB: Math.round(os.freemem() / (1024 ** 3)),
    approvedRoots: bridgeConfig.approvedRoots,
    sessionGrantActive: Boolean(activeSess),
    sessionExpiresAt: activeSess ? activeSess.expiresAt : null,
    serverKeysConfigured: {
      gemini: Boolean(serverKeys.geminiKey),
      openai: Boolean(serverKeys.openaiKey),
      claude: Boolean(serverKeys.claudeKey),
      grok: Boolean(serverKeys.grokKey),
      deepseek: Boolean(serverKeys.deepseekKey)
    }
  });
});

app.post('/bridge/config/roots', requireBridgeToken, (req, res) => {
  const { roots } = req.body || {};
  if (!Array.isArray(roots) || !roots.length) return res.status(400).json({ ok: false, error: 'Provide directory paths.' });
  const clean = [];
  for (const r of roots) {
    const resolved = path.resolve(String(r || '').trim());
    if (isForbiddenSystemPath(resolved)) return res.status(403).json({ ok: false, error: `Refused protected path: ${resolved}` });
    if (!clean.includes(resolved)) clean.push(resolved);
  }
  bridgeConfig.approvedRoots = clean;
  saveBridgeConfig();
  writeAuditLog({ event: 'config_roots_updated', status: 'ok', detail: clean.join(', ') });
  res.json({ ok: true, approvedRoots: bridgeConfig.approvedRoots });
});

app.post('/bridge/session/grant', requireBridgeToken, (req, res) => {
  const ttlMin = Math.min(Math.max(Number(req.body?.ttlMinutes || bridgeConfig.sessionTtlMinutes || 180), 5), 360);
  const id = 'SESS-' + crypto.randomBytes(12).toString('hex').toUpperCase();
  const now = Date.now();
  const expiresAt = now + ttlMin * 60 * 1000;
  activeSessions.set(id, { id, createdAt: now, expiresAt, mode: 'allow_session' });
  writeAuditLog({ event: 'session_granted', status: 'granted', detail: `Allow at Once session ${id} (${ttlMin}m)` });
  res.json({ ok: true, sessionGrantId: id, expiresAt, ttlMinutes: ttlMin });
});

app.post('/bridge/session/revoke', requireBridgeToken, (req, res) => {
  const grantId = req.body?.sessionGrantId || req.headers['x-session-grant'];
  if (grantId && activeSessions.has(grantId)) activeSessions.delete(grantId);
  else if (!grantId) activeSessions.clear();
  writeAuditLog({ event: 'session_revoked', status: 'revoked', detail: grantId || 'all' });
  res.json({ ok: true });
});

app.post('/bridge/actions/prepare', requireBridgeToken, (req, res) => {
  try {
    let rawAction = req.body?.action;
    if (!rawAction && typeof req.body?.command === 'string') rawAction = parseLegacyCommandToAction(req.body.command, req.body.cwd);
    const validated = validateAndClassifyAction(rawAction);
    const validSession = getValidSessionGrant(req.headers['x-session-grant'] || req.body?.sessionGrantId);
    const requiresApproval = validated.sensitive || !validSession;
    const approvalId = 'APPR-' + crypto.randomBytes(10).toString('hex').toUpperCase();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    pendingApprovals.set(approvalId, { id: approvalId, validated, createdAt: Date.now(), expiresAt, used: false });
    writeAuditLog({ event: 'action_prepared', actionType: validated.action.type, status: requiresApproval ? 'pending_approval' : 'session_authorized', detail: validated.preview });
    res.json({ ok: true, approvalId, action: validated.action, preview: validated.preview, sensitive: validated.sensitive, reason: validated.reason, requiresApproval, expiresAt });
  } catch (err) {
    writeAuditLog({ event: 'action_rejected', status: 'blocked', detail: err.message });
    res.status(403).json({ ok: false, error: err.message });
  }
});

app.post('/bridge/actions/execute', requireBridgeToken, async (req, res) => {
  const { approvalId, approved = false, action: inlineAction, command: inlineCommand, cwd } = req.body || {};
  const validSession = getValidSessionGrant(req.headers['x-session-grant'] || req.body?.sessionGrantId);
  let validated = null;

  try {
    if (approvalId) {
      const record = pendingApprovals.get(approvalId);
      if (!record || record.used || record.expiresAt <= Date.now()) {
        return res.status(403).json({ ok: false, error: 'Approval token missing, already used, or expired.' });
      }
      if (!approved) {
        record.used = true;
        pendingApprovals.delete(approvalId);
        writeAuditLog({ event: 'action_denied', actionType: record.validated.action.type, status: 'denied', detail: record.validated.preview });
        return res.json({ ok: false, denied: true, error: 'Action rejected by user.' });
      }
      record.used = true;
      pendingApprovals.delete(approvalId);
      validated = record.validated;
    } else {
      let rawAct = inlineAction;
      if (!rawAct && typeof inlineCommand === 'string') rawAct = parseLegacyCommandToAction(inlineCommand, cwd);
      validated = validateAndClassifyAction(rawAct);
      if (!validSession || validated.sensitive) {
        return res.status(403).json({
          ok: false, requiresApproval: true, sensitive: validated.sensitive, preview: validated.preview,
          error: validated.sensitive ? 'Sensitive operation requires explicit approval.' : 'Permission mode is Ask Each Time.'
        });
      }
    }

    const taskId = 'TASK-' + Date.now() + '-' + crypto.randomBytes(3).toString('hex');
    const task = { id: taskId, actionType: validated.action.type, summary: validated.preview, status: 'starting', progress: 'Starting...', startedAt: Date.now(), finishedAt: null, ok: false, confirmed: false, stdout: '', stderr: '', error: '', result: null, childPid: null, cancelFn: null };
    taskStore.set(taskId, task);
    writeAuditLog({ event: 'action_started', taskId, actionType: validated.action.type, status: 'running', detail: validated.preview });
    const finishedTask = await executeValidatedAction(taskId, validated);
    writeAuditLog({ event: 'action_finished', taskId, actionType: validated.action.type, status: finishedTask.status, confirmed: finishedTask.confirmed, detail: finishedTask.ok ? finishedTask.progress : finishedTask.error });

    res.json({
      ok: finishedTask.ok, confirmed: finishedTask.confirmed, taskId: finishedTask.id, status: finishedTask.status,
      actionType: finishedTask.actionType, summary: finishedTask.summary, progress: finishedTask.progress,
      stdout: finishedTask.stdout, stderr: finishedTask.stderr, error: finishedTask.error || undefined,
      result: finishedTask.result, platform: os.platform()
    });
  } catch (err) {
    writeAuditLog({ event: 'action_blocked', status: 'error', detail: err.message });
    res.status(403).json({ ok: false, confirmed: false, error: err.message });
  }
});

app.post('/bridge/exec', requireBridgeToken, (req, res, next) => { req.url = '/bridge/actions/execute'; next(); });

app.get('/bridge/tasks', requireBridgeToken, (req, res) => {
  const list = Array.from(taskStore.values()).sort((a, b) => b.startedAt - a.startedAt).slice(0, 30).map(({ cancelFn, ...safe }) => safe);
  res.json({ ok: true, tasks: list });
});

app.post('/bridge/tasks/:id/cancel', requireBridgeToken, (req, res) => {
  const t = taskStore.get(req.params.id);
  if (!t) return res.status(404).json({ ok: false, error: 'Task not found.' });
  if (typeof t.cancelFn === 'function') {
    t.cancelFn();
    writeAuditLog({ event: 'task_cancelled', taskId: t.id, actionType: t.actionType, status: 'cancelled', detail: t.summary });
    return res.json({ ok: true, status: 'cancelling', taskId: t.id });
  }
  return res.json({ ok: false, error: 'Task is not cancellable.' });
});

app.get('/bridge/logs', requireBridgeToken, (req, res) => res.json({ ok: true, logs: recentAuditLogs.slice(0, 100), logFile: LOG_FILE }));

app.get('/bridge/keys/status', requireBridgeToken, (req, res) => res.json({
  ok: true,
  hasGeminiKey: Boolean(serverKeys.geminiKey),
  hasOpenaiKey: Boolean(serverKeys.openaiKey),
  hasClaudeKey: Boolean(serverKeys.claudeKey),
  hasGrokKey: Boolean(serverKeys.grokKey),
  hasDeepseekKey: Boolean(serverKeys.deepseekKey)
}));

app.post('/bridge/keys/save', requireBridgeToken, (req, res) => {
  saveServerKeys(req.body || {});
  writeAuditLog({ event: 'server_keys_updated', status: 'ok', detail: 'Updated server-side API keys.' });
  res.json({
    ok: true,
    hasGeminiKey: Boolean(serverKeys.geminiKey),
    hasOpenaiKey: Boolean(serverKeys.openaiKey),
    hasClaudeKey: Boolean(serverKeys.claudeKey),
    hasGrokKey: Boolean(serverKeys.grokKey),
    hasDeepseekKey: Boolean(serverKeys.deepseekKey)
  });
});

function resolveGeminiKey(req) { return serverKeys.geminiKey || req.headers['x-goog-api-key'] || ''; }

app.get('/bridge/proxy/gemini/models', requireBridgeToken, async (req, res) => {
  const apiKey = resolveGeminiKey(req);
  if (!apiKey) return res.status(400).json({ error: { message: 'No Gemini API key configured.' } });
  try {
    const r = await axios.get('https://generativelanguage.googleapis.com/v1beta/models', { headers: { 'x-goog-api-key': apiKey }, timeout: 20000 });
    res.status(r.status).json(r.data);
  } catch (err) { res.status(err.response?.status || 502).json(err.response?.data || { error: { message: err.message } }); }
});

app.post('/bridge/proxy/gemini/generate', requireBridgeToken, async (req, res) => {
  const apiKey = resolveGeminiKey(req);
  if (!apiKey) return res.status(400).json({ error: { message: 'No Gemini API key configured.' } });
  const { model, body } = req.body || {};
  try {
    const r = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, body, { headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, timeout: 180000 });
    res.status(r.status).json(r.data);
  } catch (err) { res.status(err.response?.status || 502).json(err.response?.data || { error: { message: err.message } }); }
});

app.post('/bridge/proxy/gemini/interactions', requireBridgeToken, async (req, res) => {
  const apiKey = resolveGeminiKey(req);
  if (!apiKey) return res.status(400).json({ error: { message: 'No Gemini API key configured.' } });
  try {
    const r = await axios.post('https://generativelanguage.googleapis.com/v1beta/interactions', req.body, { headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, timeout: 90000 });
    res.status(r.status).json(r.data);
  } catch (err) { res.status(err.response?.status || 502).json(err.response?.data || { error: { message: err.message } }); }
});

app.get('/bridge/proxy/gemini/interactions/:id', requireBridgeToken, async (req, res) => {
  const apiKey = resolveGeminiKey(req);
  if (!apiKey) return res.status(400).json({ error: { message: 'No Gemini API key configured.' } });
  try {
    const r = await axios.get(`https://generativelanguage.googleapis.com/v1beta/interactions/${encodeURIComponent(req.params.id)}`, { headers: { 'x-goog-api-key': apiKey }, timeout: 90000, maxContentLength: Infinity, maxBodyLength: Infinity });
    res.status(r.status).json(r.data);
  } catch (err) { res.status(err.response?.status || 502).json(err.response?.data || { error: { message: err.message } }); }
});

app.post('/bridge/proxy/gemini/interactions/:id/cancel', requireBridgeToken, async (req, res) => {
  const apiKey = resolveGeminiKey(req);
  if (!apiKey) return res.status(400).json({ error: { message: 'No Gemini API key configured.' } });
  try {
    const r = await axios.post(`https://generativelanguage.googleapis.com/v1beta/interactions/${encodeURIComponent(req.params.id)}/cancel`, {}, { headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, timeout: 30000 });
    res.status(r.status).json(r.data);
  } catch (err) { res.status(err.response?.status || 502).json(err.response?.data || { error: { message: err.message } }); }
});

app.post('/bridge/proxy/gemini/media', requireBridgeToken, async (req, res) => {
  const apiKey = resolveGeminiKey(req);
  const { uri } = req.body || {};
  if (!apiKey || !uri || !/^https:\/\/generativelanguage\.googleapis\.com\//.test(uri)) {
    return res.status(400).json({ error: { message: 'Valid Google Gemini media URI and API key required.' } });
  }
  try {
    const r = await axios.get(uri, { headers: { 'x-goog-api-key': apiKey }, responseType: 'arraybuffer', timeout: 120000 });
    res.set('Content-Type', r.headers['content-type'] || 'video/mp4');
    res.send(Buffer.from(r.data));
  } catch (err) { res.status(err.response?.status || 502).json({ error: { message: err.message } }); }
});

app.listen(PORT, BIND_HOST, () => {
  writeAuditLog({ event: 'bridge_started', status: 'ok', detail: `Listening on http://${BIND_HOST}:${PORT}` });
  console.log('==================================================================');
  console.log('  ✦ AI UNIVERSE v6.8 — AUTONOMOUS PC BRIDGE & MULTI-AI PROXY');
  console.log('  Created by Ayman Chowdhury (TLTOM)');
  console.log('==================================================================');
  console.log(`  Local Bridge URL : http://localhost:${PORT}`);
  console.log(`  PC Bridge Token  : ${BRIDGE_TOKEN}`);
  console.log(`  Audit Log File   : ${LOG_FILE}`);
  console.log('==================================================================\n');
});
