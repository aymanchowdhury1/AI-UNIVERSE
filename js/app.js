/* ============================================================================
   AI UNIVERSE v6.8 — Gemini, Claude, ChatGPT, Flow AI, Antigravity, Grok & DeepSeek
   + Strict API Key Enforcement + /pc Mode Across All Providers
   Created & Developed by Ayman Chowdhury (TLTOM)
   ============================================================================ */

const CREATOR_PROFILE = {
  name: 'Ayman Chowdhury (TLTOM)',
  instagram: 'https://www.instagram.com/ayman.chowdhury.148/',
  whatsapp: '01735051000',
  facebook: 'https://www.facebook.com/profile.php?id=61587149130343',
  github: 'https://github.com/aymanchowdhury1/'
};

// Every AI model in v6.8 requires its own configured API key — zero keyless fallbacks.
const BASE_AI_CATALOG = [
  {
    id: 'gemini',
    name: '✦ Gemini',
    desc: 'Google AI Studio API key required (Free & Paid tier models)',
    requiresKey: 'gemini',
    models: [
      { id: 'gemini-4-hydrogen', name: 'Gemini 4 Hydrogen', desc: 'Fast reasoning, coding & multimodal (Gemini API)', tier: 'PAID_API', apiModel: 'gemini-4-hydrogen' },
      { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', desc: 'Fast multimodal & coding via Gemini API', tier: 'FREE_API', apiModel: 'gemini-3.8-flash' },
      { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite', desc: 'Ultra-fast low-latency Gemini API model', tier: 'FREE_API', apiModel: 'gemini-3.5-flash-lite' },
      { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', desc: 'High-efficiency low-cost Gemini API model', tier: 'FREE_API', apiModel: 'gemini-3.1-flash-lite' },
      { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash Preview', desc: 'Fast reasoning via Gemini API', tier: 'FREE_API', apiModel: 'gemini-3-flash-preview' },
      { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro Preview', desc: 'Deep coding & reasoning via Gemini API', tier: 'PAID_API', apiModel: 'gemini-3.1-pro-preview' },
      { id: 'gemini-4-argon', name: 'Gemini 4 Argon', desc: 'Flagship reasoning & long context (Gemini API)', tier: 'PAID_API', apiModel: 'gemini-4-argon' },
      { id: 'gemini-4-carbon', name: 'Gemini 4 Carbon', desc: 'Top engineering & multimodal (Gemini API)', tier: 'PAID_API', apiModel: 'gemini-4-carbon' }
    ]
  },
  {
    id: 'claude',
    name: '✳️ Claude',
    desc: 'Anthropic API key required',
    requiresKey: 'claude',
    models: [
      { id: 'claude-3-7-sonnet-latest', name: 'Claude 3.7 Sonnet', desc: 'Deep coding, writing & analysis (Claude API)', tier: 'PAID_API', apiModel: 'claude-3-7-sonnet-latest' },
      { id: 'claude-3-5-haiku-latest', name: 'Claude 3.5 Haiku', desc: 'Fast Anthropic API model (Claude API)', tier: 'PAID_API', apiModel: 'claude-3-5-haiku-latest' }
    ]
  },
  {
    id: 'chatgpt',
    name: '💬 ChatGPT',
    desc: 'OpenAI API key required',
    requiresKey: 'openai',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', desc: 'Flagship OpenAI API model (OpenAI API)', tier: 'PAID_API', apiModel: 'gpt-4o' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'Fast OpenAI API model (OpenAI API)', tier: 'PAID_API', apiModel: 'gpt-4o-mini' },
      { id: 'o3-mini', name: 'o3-mini', desc: 'Reasoning OpenAI API model (OpenAI API)', tier: 'PAID_API', apiModel: 'o3-mini' }
    ]
  },
  {
    id: 'flow_ai',
    name: '🎬 Flow AI',
    desc: 'Video & image generation/editing (Gemini API + billing)',
    requiresKey: 'gemini',
    models: [
      { id: 'gemini-omni-1.2-flash', name: 'Flow / Omni 1.2 Flash', desc: 'Video generation & editing via Interactions API', tier: 'PAID_API', apiModel: 'gemini-omni-1.2-flash' },
      { id: 'gemini-nano-banana-2.1', name: 'Flow Nano Banana 2.1', desc: 'Visual asset creation & editing via Gemini API', tier: 'FREE_API', apiModel: 'gemini-nano-banana-2.1' }
    ]
  },
  {
    id: 'antigravity',
    name: '⚡ Antigravity',
    desc: 'Agentic app & /pc builder (Gemini API key required)',
    requiresKey: 'gemini',
    models: [
      { id: 'gemini-4-hydrogen', name: 'Antigravity 4 Hydrogen', desc: 'Fast agentic coding & /pc execution (Gemini API)', tier: 'PAID_API', apiModel: 'gemini-4-hydrogen' },
      { id: 'gemini-3.8-flash', name: 'Antigravity 3.8 Flash', desc: 'Fast low-latency agentic mode (Gemini API)', tier: 'FREE_API', apiModel: 'gemini-3.8-flash' },
      { id: 'gemini-3.1-pro-preview', name: 'Antigravity 3.1 Pro', desc: 'Deep architecture & multi-file projects (Gemini API)', tier: 'PAID_API', apiModel: 'gemini-3.1-pro-preview' }
    ]
  },
  {
    id: 'grok',
    name: '𝕏 Grok',
    desc: 'xAI API key required (api.x.ai)',
    requiresKey: 'grok',
    models: [
      { id: 'grok-4-mini', name: 'Grok 4 Mini', desc: 'Fast xAI reasoning & chat (xAI API)', tier: 'PAID_API', apiModel: 'grok-4-mini' },
      { id: 'grok-3', name: 'Grok 3', desc: 'xAI flagship chat & coding (xAI API)', tier: 'PAID_API', apiModel: 'grok-3' },
      { id: 'grok-3-mini', name: 'Grok 3 Mini', desc: 'Low-latency xAI model (xAI API)', tier: 'PAID_API', apiModel: 'grok-3-mini' }
    ]
  },
  {
    id: 'deepseek',
    name: '🐋 DeepSeek',
    desc: 'DeepSeek API key required (api.deepseek.com)',
    requiresKey: 'deepseek',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat (V3)', desc: 'Fast general & coding (DeepSeek API)', tier: 'PAID_API', apiModel: 'deepseek-chat' },
      { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner (R1)', desc: 'Step-by-step reasoning (DeepSeek API)', tier: 'PAID_API', apiModel: 'deepseek-reasoner' }
    ]
  },
  {
    id: 'nanobanana',
    name: '🖼️ Nano Banana Photo',
    desc: 'Gemini image generation & editing (Gemini API key)',
    requiresKey: 'gemini',
    models: [
      { id: 'gemini-nano-banana-2.1', name: 'Nano Banana 2.1', desc: 'Photo creation & editing via Gemini API', tier: 'FREE_API', apiModel: 'gemini-nano-banana-2.1' },
      { id: 'gemini-3.1-flash-image', name: 'Nano Banana 2', desc: 'Fast native Gemini image model (Gemini API)', tier: 'FREE_API', apiModel: 'gemini-3.1-flash-image' },
      { id: 'gemini-3.1-flash-lite-image', name: 'Nano Banana 2 Lite', desc: 'Rapid Gemini image model (Gemini API)', tier: 'FREE_API', apiModel: 'gemini-3.1-flash-lite-image' },
      { id: 'gemini-3-pro-image', name: 'Nano Banana Pro', desc: 'High-precision Gemini photo edit (Gemini API)', tier: 'PAID_API', apiModel: 'gemini-3-pro-image' }
    ]
  }
];

let AI_CATALOG = JSON.parse(JSON.stringify(BASE_AI_CATALOG));

let activeRequestController = null;
let activeRequestChatId = null;
let activeRequestContext = null;
let slowWatchTimer = null;
let selectedAltSwitchCandidate = null;
let activeVideoCancelFlag = false;

function aiFetch(input, init = {}) {
  const signal = init.signal || activeRequestController?.signal;
  return fetch(input, { ...init, ...(signal ? { signal } : {}) });
}

const state = {
  activeView: 'chatView',
  chatTaskMode: 'chat',
  selectedAiId: 'gemini',
  selectedModelId: 'gemini-4-hydrogen',
  effort: 'HIGH',
  tierFilter: 'ALL',
  pcPermission: 'ask',
  sessionGrantId: null,
  sessionGrantExpiresAt: null,
  bridgeConnected: false,
  bridgeServerKeys: { hasGeminiKey: false, hasOpenaiKey: false, hasClaudeKey: false, hasGrokKey: false, hasDeepseekKey: false },
  approvedRoots: [],
  pcPlatform: 'win32',
  renamingChatId: null,
  skippedAuthGate: false,
  pendingAttachments: [],
  discoveredGeminiModels: JSON.parse(localStorage.getItem('aiu_v3_gemini_models') || '[]'),
  settings: JSON.parse(localStorage.getItem('aiu_v2_settings') || JSON.stringify({
    geminiKey: '',
    openaiKey: '',
    claudeKey: '',
    grokKey: '',
    deepseekKey: '',
    bridgeUrl: 'http://localhost:5050',
    bridgeToken: '',
    useBridgeProxy: true
  })),
  customProviders: JSON.parse(localStorage.getItem('aiu_v2_custom_providers') || '[]'),
  chats: JSON.parse(localStorage.getItem('aiu_v2_chats') || '[]'),
  generatedImages: JSON.parse(localStorage.getItem('aiu_v4_images') || '[]'),
  generatedVideos: JSON.parse(localStorage.getItem('aiu_v64_videos') || '[]'),
  activeChatId: null,
  generatedFiles: {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI UNIVERSE Preview</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="hero">
    <h1>AI UNIVERSE Preview</h1>
    <p>Ask in your prompt for a preview, Gemini/Flow media edit, or /pc action on your PC.</p>
    <button id="demoBtn">Test Interactive JS</button>
  </div>
  <script src="js/app.js"></script>
</body>
</html>`,
    'css/style.css': `body { font-family: system-ui, sans-serif; background: #14052e; color: #faf5ff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
.hero { text-align: center; padding: 34px; background: #200c45; border-radius: 20px; border: 1px solid rgba(216,180,254,0.35); max-width: 480px; }
button { background: linear-gradient(135deg, #9333ea, #c026d3); color: white; border: none; padding: 10px 22px; border-radius: 999px; cursor: pointer; font-weight: 600; margin-top: 14px; }`,
    'js/app.js': `document.getElementById('demoBtn')?.addEventListener('click', () => {
  alert('Preview sandbox running!');
});`
  },
  pendingCommandResolve: null
};

/* ==================== STRICT API KEY CHECKS ==================== */
function hasGeminiConfigured() {
  return Boolean(state.settings.geminiKey || (state.bridgeConnected && state.bridgeServerKeys.hasGeminiKey));
}
function hasOpenaiConfigured() {
  return Boolean(state.settings.openaiKey || (state.bridgeConnected && state.bridgeServerKeys.hasOpenaiKey));
}
function hasClaudeConfigured() {
  return Boolean(state.settings.claudeKey || (state.bridgeConnected && state.bridgeServerKeys.hasClaudeKey));
}
function hasGrokConfigured() {
  return Boolean(state.settings.grokKey || (state.bridgeConnected && state.bridgeServerKeys.hasGrokKey));
}
function hasDeepseekConfigured() {
  return Boolean(state.settings.deepseekKey || (state.bridgeConnected && state.bridgeServerKeys.hasDeepseekKey));
}

function providerHasApiKey(aiObj) {
  if (!aiObj) return false;
  if (aiObj.isCustom) return Boolean(aiObj.customConfig?.apiKey);
  if (aiObj.requiresKey === 'gemini') return hasGeminiConfigured();
  if (aiObj.requiresKey === 'openai') return hasOpenaiConfigured();
  if (aiObj.requiresKey === 'claude') return hasClaudeConfigured();
  if (aiObj.requiresKey === 'grok') return hasGrokConfigured();
  if (aiObj.requiresKey === 'deepseek') return hasDeepseekConfigured();
  return false;
}

function getApiKeyPromptMessage(aiObj) {
  if (aiObj?.isCustom) return `API key required for custom provider "${aiObj.name}". Add its key in ⚙️ Settings -> 3. + Custom API.`;
  if (aiObj?.requiresKey === 'openai') return 'OpenAI API key required for ChatGPT. Add your key in ⚙️ Settings -> 1. AI API Keys.';
  if (aiObj?.requiresKey === 'claude') return 'Anthropic Claude API key required. Add your key in ⚙️ Settings -> 1. AI API Keys.';
  if (aiObj?.requiresKey === 'grok') return 'xAI Grok API key required. Add your key in ⚙️ Settings -> 1. AI API Keys.';
  if (aiObj?.requiresKey === 'deepseek') return 'DeepSeek API key required. Add your key in ⚙️ Settings -> 1. AI API Keys.';
  return 'Google AI Studio API key required (even for free-tier-eligible Gemini models). Add your key in ⚙️ Settings -> 1. AI API Keys.';
}

function getFirebasePayload() {
  return {
    settings: state.settings,
    customProviders: state.customProviders,
    preferences: {
      selectedAiId: state.selectedAiId,
      selectedModelId: state.selectedModelId,
      effort: state.effort,
      activeChatId: state.activeChatId
    },
    chats: state.chats,
    generatedImages: state.generatedImages,
    generatedVideos: state.generatedVideos
  };
}

function rebuildCatalog() {
  AI_CATALOG = JSON.parse(JSON.stringify(BASE_AI_CATALOG));

  if (state.discoveredGeminiModels.length) {
    const geminiEntry = AI_CATALOG.find(a => a.id === 'gemini');
    const existingIds = new Set(geminiEntry.models.map(m => m.apiModel || m.id));
    state.discoveredGeminiModels.forEach(dm => {
      if (!existingIds.has(dm.id) && !dm.id.includes('image') && !dm.id.includes('omni')) {
        geminiEntry.models.push({
          id: dm.id,
          name: dm.displayName || dm.id,
          desc: 'Synced via Google AI Studio API key',
          tier: /pro|carbon|argon|hydrogen/i.test(dm.id) ? 'PAID_API' : 'FREE_API',
          apiModel: dm.id
        });
      }
    });
  }

  state.customProviders.forEach(cp => {
    AI_CATALOG.push({
      id: cp.id,
      name: `🔌 ${cp.name}`,
      desc: cp.apiKey ? cp.baseUrl : 'API key required',
      isCustom: true,
      customConfig: cp,
      models: [{
        id: cp.model,
        name: cp.model,
        desc: cp.apiKey ? 'Custom API model' : 'Add API key in Settings',
        tier: 'PAID_API',
        apiModel: cp.model
      }]
    });
  });
}

function saveState(skipCloud = false) {
  localStorage.setItem('aiu_v2_settings', JSON.stringify(state.settings));
  localStorage.setItem('aiu_v2_custom_providers', JSON.stringify(state.customProviders));
  localStorage.setItem('aiu_v2_chats', JSON.stringify(state.chats));
  localStorage.setItem('aiu_v3_gemini_models', JSON.stringify(state.discoveredGeminiModels));
  try { localStorage.setItem('aiu_v4_images', JSON.stringify(state.generatedImages.slice(0, 20))); } catch (_) {}
  try {
    const metaVideos = state.generatedVideos.slice(0, 25).map(({ blobUrl, ...rest }) => rest);
    localStorage.setItem('aiu_v64_videos', JSON.stringify(metaVideos));
  } catch (_) {}

  updateApiStatusIndicator();

  if (!skipCloud && window.AIUFirebase && window.AIUFirebase.getUser()) {
    window.AIUFirebase.pushNow(getFirebasePayload()).catch(() => {});
  }
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function shouldUseBridgeGeminiProxy() {
  return Boolean(state.bridgeConnected && state.settings.bridgeToken && state.settings.useBridgeProxy !== false);
}

function bridgeHeaders(extra = {}) {
  const h = { 'Content-Type': 'application/json', 'x-bridge-token': state.settings.bridgeToken || '', ...extra };
  if (state.sessionGrantId) h['x-session-grant'] = state.sessionGrantId;
  return h;
}

function updateApiStatusIndicator() {
  const pill = document.getElementById('apiStatusPill');
  const active = [];
  if (hasGeminiConfigured()) active.push('Gemini');
  if (hasClaudeConfigured()) active.push('Claude');
  if (hasOpenaiConfigured()) active.push('ChatGPT');
  if (hasGrokConfigured()) active.push('Grok');
  if (hasDeepseekConfigured()) active.push('DeepSeek');
  state.customProviders.forEach(cp => { if (cp.apiKey) active.push(cp.name); });

  if (active.length) {
    pill.textContent = `${active.join(' • ')} API`;
    pill.className = 'badge badge-cloud';
  } else {
    pill.textContent = 'API Key Required';
    pill.className = 'badge badge-warn';
  }
}

/* ==================== FIREBASE USER & SYNC UI ==================== */
function updateFirebaseSyncStatusUI(status, detail) {
  const cloudPill = document.getElementById('cloudSyncPill');
  const subEl = document.getElementById('userSyncStatus');

  if (status === 'saving' || status === 'syncing') {
    cloudPill.textContent = '⏳ Syncing...';
    cloudPill.className = 'badge badge-warn';
    cloudPill.classList.remove('hidden');
    if (window.AIUFirebase?.getUser()) subEl.textContent = '⏳ Syncing...';
  } else if (status === 'synced') {
    cloudPill.textContent = '🔥 Synced';
    cloudPill.className = 'badge badge-cloud';
    cloudPill.classList.remove('hidden');
    if (window.AIUFirebase?.getUser()) subEl.textContent = '🔥 Saved in Firebase';
  } else if (status === 'error') {
    cloudPill.textContent = '⚠️ Sync Error';
    cloudPill.title = detail || '';
    cloudPill.className = 'badge badge-warn';
    cloudPill.classList.remove('hidden');
    if (window.AIUFirebase?.getUser()) subEl.textContent = '⚠️ Check DB Rules';
  } else if (status === 'unconfigured') {
    cloudPill.classList.add('hidden');
    subEl.textContent = 'Set js/firebase-config.js';
  } else {
    cloudPill.classList.add('hidden');
  }
}

function updateFirebaseUserUI(user) {
  const avatarWrap = document.getElementById('userAvatarWrap');
  const nameEl = document.getElementById('userDisplayName');
  const subEl = document.getElementById('userSyncStatus');
  const signOutTopBtn = document.getElementById('signOutTopBtn');
  const forceSaveTopBtn = document.getElementById('forceSaveTopBtn');
  const welcomeHeading = document.getElementById('welcomeHeading');
  const authGate = document.getElementById('authGateOverlay');

  if (user) {
    authGate.classList.add('hidden');
    if (user.photoURL) {
      avatarWrap.innerHTML = `<img src="${escapeHtml(user.photoURL)}" alt="avatar" referrerpolicy="no-referrer" />`;
    } else {
      avatarWrap.textContent = (user.displayName || user.email || 'U')[0].toUpperCase();
    }
    nameEl.textContent = user.displayName || user.email || 'Google User';
    subEl.textContent = '🔥 Saved in Firebase';
    signOutTopBtn.classList.remove('hidden');
    forceSaveTopBtn.classList.remove('hidden');
    const firstName = (user.displayName || '').split(' ')[0];
    welcomeHeading.textContent = firstName ? `What's the vibe, ${firstName}?` : "What's the vibe, Ayman?";
  } else {
    avatarWrap.textContent = 'G';
    nameEl.textContent = 'Sign in with Google';
    subEl.textContent = window.AIUFirebase?.isConfigured() ? 'Click to sync with Firebase' : 'Set js/firebase-config.js';
    signOutTopBtn.classList.add('hidden');
    forceSaveTopBtn.classList.add('hidden');
    welcomeHeading.textContent = "What's the vibe, Ayman?";

    if (window.AIUFirebase?.isConfigured() && !state.skippedAuthGate) {
      authGate.classList.remove('hidden');
    }
  }
}

/* ==================== FILE / PHOTO / VIDEO / ZIP UPLOAD ==================== */
const TEXT_EXTENSIONS = new Set([
  'txt', 'md', 'html', 'htm', 'css', 'js', 'mjs', 'cjs', 'ts', 'tsx', 'jsx',
  'json', 'csv', 'py', 'java', 'kt', 'c', 'cpp', 'h', 'hpp', 'xml', 'svg', 'sql',
  'yml', 'yaml', 'bat', 'sh', 'ps1', 'php', 'rb', 'go', 'rs', 'env', 'ini', 'gradle', 'kts'
]);

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsText(file);
  });
}

async function handleIncomingFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;

  for (const file of files) {
    const id = 'att_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    const ext = (file.name.split('.').pop() || '').toLowerCase();

    if (file.type.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext)) {
      const dataUrl = await readFileAsDataURL(file);
      const base64 = dataUrl.split(',')[1] || '';
      state.pendingAttachments.push({
        id, kind: 'image', name: file.name,
        mimeType: file.type || `image/${ext === 'jpg' ? 'jpeg' : ext}`,
        size: file.size, dataUrl, base64
      });
      continue;
    }

    if (file.type.startsWith('video/') || ['mp4', 'mov', 'webm', 'mkv'].includes(ext)) {
      const dataUrl = await readFileAsDataURL(file);
      const base64 = dataUrl.split(',')[1] || '';
      state.pendingAttachments.push({
        id, kind: 'video', name: file.name,
        mimeType: file.type || `video/${ext === 'mov' ? 'quicktime' : ext}`,
        size: file.size, dataUrl, base64
      });
      continue;
    }

    if (ext === 'zip' || file.type.includes('zip')) {
      try {
        const zip = await JSZip.loadAsync(file);
        const allPaths = [];
        const extractedBlocks = [];
        let totalChars = 0;
        const maxChars = 48000;

        for (const [entryPath, entry] of Object.entries(zip.files)) {
          if (entry.dir) continue;
          if (entryPath.includes('node_modules/') || entryPath.includes('.git/')) continue;
          allPaths.push(entryPath);

          const eExt = (entryPath.split('.').pop() || '').toLowerCase();
          if (TEXT_EXTENSIONS.has(eExt)) {
            const content = await entry.async('string');
            const norm = entryPath.replace(/^[^/]+\//, '');
            if (norm === 'index.html' || entryPath === 'index.html') state.generatedFiles['index.html'] = content;
            else if (norm.endsWith('.css') && norm.includes('style')) state.generatedFiles['css/style.css'] = content;
            else if (norm.endsWith('.js') && (norm.includes('app.js') || norm.includes('script.js'))) state.generatedFiles['js/app.js'] = content;
            else if (allPaths.length <= 25) state.generatedFiles[entryPath] = content;

            if (totalChars < maxChars) {
              const snippet = content.slice(0, 8000);
              extractedBlocks.push(`--- FILE: ${entryPath} ---\n${snippet}`);
              totalChars += snippet.length;
            }
          }
        }

        const summaryText = `[UPLOADED ZIP ARCHIVE: ${file.name} (${allPaths.length} files)]\nFile Tree:\n${allPaths.slice(0, 60).join('\n')}\n\nExtracted Source Contents:\n${extractedBlocks.join('\n\n')}`;
        state.pendingAttachments.push({
          id, kind: 'zip', name: file.name, mimeType: 'application/zip',
          size: file.size, fileCount: allPaths.length, textContent: summaryText
        });
      } catch (err) {
        alert(`Could not read ZIP file ${file.name}: ${err.message}`);
      }
      continue;
    }

    if (ext === 'pdf' || file.type === 'application/pdf') {
      const dataUrl = await readFileAsDataURL(file);
      const base64 = dataUrl.split(',')[1] || '';
      state.pendingAttachments.push({ id, kind: 'pdf', name: file.name, mimeType: 'application/pdf', size: file.size, base64 });
      continue;
    }

    try {
      const textContent = (await readFileAsText(file)).slice(0, 35000);
      state.pendingAttachments.push({
        id, kind: 'text', name: file.name, mimeType: file.type || 'text/plain', size: file.size,
        textContent: `[UPLOADED FILE: ${file.name}]\n\`\`\`${ext || 'text'}\n${textContent}\n\`\`\``
      });
    } catch (err) {
      alert(`Could not read file ${file.name}: ${err.message}`);
    }
  }

  renderAttachmentChips();
}

function renderAttachmentChips() {
  const bar = document.getElementById('attachmentChipsBar');
  if (!state.pendingAttachments.length) {
    bar.classList.add('hidden');
    bar.innerHTML = '';
    return;
  }
  bar.classList.remove('hidden');
  bar.innerHTML = state.pendingAttachments.map(att => {
    const icon = att.kind === 'image'
      ? `<img src="${att.dataUrl}" alt="img" />`
      : att.kind === 'video' ? '🎬' : att.kind === 'zip' ? '📦' : att.kind === 'pdf' ? '📄' : '📝';
    const extra = att.kind === 'zip' ? ` (${att.fileCount} files)` : '';
    return `
      <div class="attach-chip">
        <span>${icon}</span>
        <span class="attach-chip-name" title="${escapeHtml(att.name)}">${escapeHtml(att.name + extra)}</span>
        <button type="button" class="attach-chip-rm" data-rm-att="${att.id}" title="Remove">✕</button>
      </div>
    `;
  }).join('');

  bar.querySelectorAll('[data-rm-att]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.pendingAttachments = state.pendingAttachments.filter(a => a.id !== btn.dataset.rmAtt);
      renderAttachmentChips();
    });
  });
}

/* ==================== VIEW NAVIGATION (CHAT & PLUGINS IN SIDEBAR) ==================== */
function switchView(viewId) {
  state.activeView = viewId;
  document.querySelectorAll('.stage-view').forEach(v => v.classList.toggle('active', v.id === viewId));
  document.querySelectorAll('.view-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));
  document.getElementById('backToChatTopBtn').classList.toggle('hidden', viewId === 'chatView');
  closeMobileSidebar();
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('mobileOverlay').classList.add('hidden');
}

/* ==================== DROPDOWNS ==================== */
function getSelectedAi() {
  return AI_CATALOG.find(a => a.id === state.selectedAiId) || AI_CATALOG[0];
}

function filterModels(models) {
  if (state.tierFilter === 'ALL') return models;
  const f = models.filter(m => m.tier === state.tierFilter);
  return f.length ? f : models;
}

function renderDropdowns() {
  const aiMenu = document.getElementById('aiDropdownMenu');
  const modelMenu = document.getElementById('modelDropdownMenu');
  const topbarMenu = document.getElementById('topbarModelMenu');
  const currentAi = getSelectedAi();

  document.getElementById('selectedAiLabel').textContent = currentAi.name;

  aiMenu.innerHTML = `<div class="menu-section-title">Select AI Provider (API Key Required)</div>` + AI_CATALOG.map(ai => {
    const keyOk = providerHasApiKey(ai);
    return `
      <div class="menu-item ${ai.id === state.selectedAiId ? 'selected' : ''}" data-ai="${ai.id}">
        <div>
          <div class="menu-item-title">${escapeHtml(ai.name)}</div>
          <div class="menu-item-sub">${escapeHtml(keyOk ? ai.desc : 'API key required')}</div>
        </div>
        <span class="badge ${keyOk ? 'badge-cloud' : 'badge-warn'}">${keyOk ? 'API Ready' : 'Key Needed'}</span>
      </div>
    `;
  }).join('');

  aiMenu.querySelectorAll('.menu-item').forEach(el => {
    el.addEventListener('click', () => {
      state.selectedAiId = el.dataset.ai;
      const aiObj = getSelectedAi();
      const filtered = filterModels(aiObj.models);
      state.selectedModelId = (filtered[0] || aiObj.models[0]).id;
      aiMenu.classList.add('hidden');
      renderDropdowns();
      saveState();
    });
  });

  const availableModels = filterModels(currentAi.models);
  const currentModel = availableModels.find(m => m.id === state.selectedModelId) || availableModels[0] || currentAi.models[0];
  state.selectedModelId = currentModel.id;

  document.getElementById('selectedModelLabel').textContent = currentModel.name;
  const topLabel = document.getElementById('topbarModelLabel');
  if (topLabel) topLabel.textContent = currentModel.name;

  const tierBarHtml = `
    <div class="menu-section-title">Select API Model</div>
    <div class="menu-tier-bar">
      <button type="button" class="menu-tier-btn ${state.tierFilter === 'ALL' ? 'active' : ''}" data-tier="ALL">All</button>
      <button type="button" class="menu-tier-btn ${state.tierFilter === 'FREE_API' ? 'active' : ''}" data-tier="FREE_API">Free Tier API</button>
      <button type="button" class="menu-tier-btn ${state.tierFilter === 'PAID_API' ? 'active' : ''}" data-tier="PAID_API">Paid API</button>
    </div>
  `;

  modelMenu.innerHTML = tierBarHtml + availableModels.map(m => `
    <div class="menu-item ${m.id === state.selectedModelId ? 'selected' : ''}" data-model="${m.id}">
      <div>
        <div class="menu-item-title">${escapeHtml(m.name)}</div>
        <div class="menu-item-sub">${escapeHtml(m.desc || m.apiModel || '')}</div>
      </div>
      <span class="badge ${m.tier === 'FREE_API' ? 'badge-cloud' : 'badge-pro'}">${m.tier === 'FREE_API' ? 'FREE API' : 'PAID API'}</span>
    </div>
  `).join('');

  modelMenu.querySelectorAll('.menu-tier-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.tierFilter = btn.dataset.tier;
      renderDropdowns();
    });
  });

  modelMenu.querySelectorAll('.menu-item').forEach(el => {
    el.addEventListener('click', () => {
      state.selectedModelId = el.dataset.model;
      modelMenu.classList.add('hidden');
      renderDropdowns();
      saveState();
    });
  });

  if (topbarMenu) {
    topbarMenu.innerHTML = `<div class="menu-section-title">${escapeHtml(currentAi.name)} — Models</div>` + currentAi.models.map(m => `
      <div class="menu-item ${m.id === state.selectedModelId ? 'selected' : ''}" data-top-model="${m.id}">
        <div>
          <div class="menu-item-title">${escapeHtml(m.name)}</div>
          <div class="menu-item-sub">${escapeHtml(m.desc || '')}</div>
        </div>
        <span class="check-mark">${m.id === state.selectedModelId ? '✓' : ''}</span>
      </div>
    `).join('');

    topbarMenu.querySelectorAll('[data-top-model]').forEach(el => {
      el.addEventListener('click', () => {
        state.selectedModelId = el.dataset.topModel;
        topbarMenu.classList.add('hidden');
        renderDropdowns();
        saveState();
      });
    });
  }

  const niceEffort = state.effort.charAt(0) + state.effort.slice(1).toLowerCase();
  document.getElementById('selectedThinkingLabel').textContent = `Thinking: ${niceEffort}`;
  document.querySelectorAll('#thinkingDropdownMenu .menu-item').forEach(item => {
    const isSel = item.dataset.effort === state.effort;
    item.classList.toggle('selected', isSel);
    item.querySelector('.check-mark').textContent = isSel ? '✓' : '';
  });
}

/* ==================== SAVED CHATS SIDEBAR ==================== */
function createNewChat(switchToChat = true) {
  const id = 'chat_' + Date.now();
  state.chats.unshift({ id, title: 'New chat', messages: [] });
  state.activeChatId = id;
  saveState();
  renderChatsSidebar();
  renderMessages();
  if (switchToChat) switchView('chatView');
  document.getElementById('promptInput').focus();
}

function ensureActiveChat() {
  if (!state.chats.length) {
    const id = 'chat_' + Date.now();
    state.chats.push({ id, title: 'New chat', messages: [] });
    state.activeChatId = id;
    saveState(true);
  } else if (!state.activeChatId || !state.chats.some(c => c.id === state.activeChatId)) {
    state.activeChatId = state.chats[0].id;
  }
}

function renderChatsSidebar() {
  ensureActiveChat();
  const query = (document.getElementById('chatSearchInput')?.value || '').toLowerCase();
  const list = document.getElementById('savedChatsList');
  const filtered = state.chats.filter(c => String(c.title || 'New chat').toLowerCase().includes(query));
  document.getElementById('totalChatsCount').textContent = state.chats.length;

  if (!filtered.length) {
    list.innerHTML = state.chats.length
      ? '<div class="chat-list-empty">No chats match your search.</div>'
      : '<div class="chat-list-empty">Your conversations will appear here.</div>';
    return;
  }

  list.innerHTML = filtered.map(c => {
    const isActive = c.id === state.activeChatId;
    if (state.renamingChatId === c.id) {
      return `
        <div class="chat-item active" data-id="${c.id}">
          <input type="text" class="chat-rename-input" id="renameInput_${c.id}" value="${escapeHtml(c.title)}" />
          <button type="button" class="chat-action-btn" data-save-rename="${c.id}" title="Save name">✓</button>
        </div>
      `;
    }
    return `
      <div class="chat-item ${isActive ? 'active' : ''}" data-id="${c.id}">
        <span class="chat-item-title">${escapeHtml(c.title)}</span>
        <div class="chat-item-actions">
          <button type="button" class="chat-action-btn" data-rename="${c.id}" title="Rename chat">✏️</button>
          <button type="button" class="chat-action-btn del" data-del="${c.id}" title="Delete chat">🗑️</button>
        </div>
      </div>
    `;
  }).join('');

  if (state.renamingChatId) {
    const inp = document.getElementById(`renameInput_${state.renamingChatId}`);
    if (inp) {
      inp.focus();
      inp.select();
      const commitRename = () => {
        const target = state.chats.find(c => c.id === state.renamingChatId);
        if (target && inp.value.trim()) target.title = inp.value.trim();
        state.renamingChatId = null;
        saveState();
        renderChatsSidebar();
      };
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') commitRename();
        if (e.key === 'Escape') { state.renamingChatId = null; renderChatsSidebar(); }
      });
      inp.addEventListener('blur', commitRename);
    }
  }

  list.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const delId = e.target.closest('[data-del]')?.dataset.del;
      if (delId) {
        e.stopPropagation();
        state.chats = state.chats.filter(c => c.id !== delId);
        if (state.activeChatId === delId) state.activeChatId = null;
        saveState();
        renderChatsSidebar();
        renderMessages();
        return;
      }

      const renameId = e.target.closest('[data-rename]')?.dataset.rename;
      if (renameId) {
        e.stopPropagation();
        state.renamingChatId = renameId;
        renderChatsSidebar();
        return;
      }

      const saveRenameId = e.target.closest('[data-save-rename]')?.dataset.saveRename;
      if (saveRenameId) {
        e.stopPropagation();
        const inp = document.getElementById(`renameInput_${saveRenameId}`);
        const target = state.chats.find(c => c.id === saveRenameId);
        if (target && inp?.value.trim()) target.title = inp.value.trim();
        state.renamingChatId = null;
        saveState();
        renderChatsSidebar();
        return;
      }

      if (e.target.classList.contains('chat-rename-input')) return;

      state.activeChatId = item.dataset.id;
      switchView('chatView');
      renderChatsSidebar();
      renderMessages();
    });
  });
}

/* ==================== PROMPT-DRIVEN PREVIEW & MESSAGE RENDERING ==================== */
function buildBundledPreviewHtml() {
  const html = state.generatedFiles['index.html'] || '';
  const css = state.generatedFiles['css/style.css'] || '';
  const js = state.generatedFiles['js/app.js'] || '';

  let bundled = html;
  const linkRegex = /<link[^>]*href=["'](?:\.\/)?(?:css\/)?style\.css["'][^>]*>/i;
  const scriptRegex = /<script[^>]*src=["'](?:\.\/)?(?:js\/)?(?:app|script)\.js["'][^>]*><\/script>/i;

  if (linkRegex.test(bundled)) {
    bundled = bundled.replace(linkRegex, () => `<style>${css}</style>`);
  } else if (css && !bundled.includes('<style')) {
    bundled = bundled.replace(/<\/head>/i, () => `<style>${css}</style>\n</head>`);
  }

  if (scriptRegex.test(bundled)) {
    bundled = bundled.replace(scriptRegex, () => `<script>${js}<\/script>`);
  } else if (js && !bundled.includes('<script')) {
    bundled = bundled.replace(/<\/body>/i, () => `<script>${js}<\/script>\n</body>`);
  }
  return bundled;
}

function extractAndCompileCodeBlocks(markdown) {
  const htmlMatch = markdown.match(/```html(?::[^\n]+)?\n([\s\S]*?)```/i);
  const cssMatch = markdown.match(/```css(?::[^\n]+)?\n([\s\S]*?)```/i);
  const jsMatch = markdown.match(/```(?:js|javascript)(?::[^\n]+)?\n([\s\S]*?)```/i);

  if (htmlMatch) state.generatedFiles['index.html'] = htmlMatch[1].trim();
  if (cssMatch) state.generatedFiles['css/style.css'] = cssMatch[1].trim();
  if (jsMatch) state.generatedFiles['js/app.js'] = jsMatch[1].trim();

  return Boolean(htmlMatch || cssMatch || jsMatch);
}

function openLightbox(src, caption = '') {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  document.getElementById('lightboxDownload').href = src;
  document.getElementById('imageLightbox').classList.remove('hidden');
}

function renderFormattedMessage(text) {
  const parts = String(text).split(/(```[\s\S]*?```)/g);
  return parts.map(part => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const inner = part.slice(3, -3);
      const firstNewline = inner.indexOf('\n');
      const lang = firstNewline !== -1 ? inner.slice(0, firstNewline).trim() || 'code' : 'code';
      const code = firstNewline !== -1 ? inner.slice(firstNewline + 1) : inner;
      const encoded = encodeURIComponent(code);
      return `<div class="code-block-wrap">
        <div class="code-block-head">
          <span>${escapeHtml(lang)}</span>
          <button type="button" class="mini-btn copy-code-btn" data-code="${encoded}">📋 Copy</button>
        </div>
        <pre class="code-block-pre">${escapeHtml(code)}</pre>
      </div>`;
    }
    return `<div>${escapeHtml(part).replace(/\n/g, '<br>')}</div>`;
  }).join('');
}

function renderMessages() {
  ensureActiveChat();
  const chat = state.chats.find(c => c.id === state.activeChatId);
  const scrollArea = document.getElementById('chatScrollArea');
  const hero = document.getElementById('welcomeHero');
  const stream = document.getElementById('chatMessages');
  const dock = document.getElementById('composerDock');
  const homeExtras = document.getElementById('homeExtras');

  const msgs = Array.isArray(chat.messages) ? chat.messages : [];
  const isEmpty = !msgs.length;
  scrollArea.classList.toggle('empty-mode', isEmpty);
  hero.classList.toggle('hidden', !isEmpty);
  stream.classList.toggle('hidden', isEmpty);
  dock.classList.toggle('centered', isEmpty);
  homeExtras.classList.toggle('hidden', !isEmpty);

  if (isEmpty) return;

  stream.innerHTML = msgs.map((m, idx) => {
    let userAttHtml = '';
    if (m.role === 'user' && Array.isArray(m.attachments) && m.attachments.length) {
      userAttHtml = `<div class="msg-attachments">` + m.attachments.map(a => {
        if (a.kind === 'image' && a.dataUrl) {
          return `<img src="${a.dataUrl}" class="msg-attach-img zoomable-img" data-caption="${escapeHtml(a.name)}" alt="${escapeHtml(a.name)}" />`;
        }
        const ico = a.kind === 'video' ? '🎬' : a.kind === 'zip' ? '📦' : a.kind === 'pdf' ? '📄' : '📝';
        const extra = a.kind === 'zip' && a.fileCount ? ` (${a.fileCount} files)` : '';
        return `<span class="msg-attach-badge">${ico} ${escapeHtml(a.name + extra)}</span>`;
      }).join('') + `</div>`;
    }

    let thoughtHtml = '';
    if (m.role === 'assistant' && Array.isArray(m.thoughtSteps) && m.thoughtSteps.length) {
      thoughtHtml = `
        <details class="thought-details">
          <summary>💭 Execution &amp; reasoning steps (${escapeHtml(m.thoughtDuration || 'done')}) ▾</summary>
          <div class="thought-details-body">
            ${m.thoughtSteps.map(s => `<div>✓ ${escapeHtml(s)}</div>`).join('')}
          </div>
        </details>
      `;
    }

    let inlinePhotoHtml = '';
    if (m.artifacts?.imageUrl) {
      inlinePhotoHtml = `
        <div class="inline-media-card">
          <img src="${m.artifacts.imageUrl}" class="inline-chat-img zoomable-img" data-caption="${escapeHtml(m.artifacts.imagePrompt || 'Edited Image')}" alt="Generated Image" />
          <div class="inline-media-actions">
            <span class="muted">🖼️ Gemini Photo Output</span>
            <a href="${m.artifacts.imageUrl}" download="gemini-photo-${idx}.png" class="mini-btn">⬇️ Download PNG</a>
          </div>
        </div>
      `;
    }

    let inlineVideoHtml = '';
    if (m.artifacts?.hasVideo) {
      if (m.artifacts.videoUrl) {
        inlineVideoHtml = `
          <div class="inline-media-card">
            <video src="${m.artifacts.videoUrl}" class="inline-chat-video" controls playsinline preload="metadata"></video>
            <div class="inline-media-actions">
              <span class="muted">🎬 ${escapeHtml(m.artifacts.videoModel || 'Flow & Gemini Video')}</span>
              <a href="${m.artifacts.videoUrl}" download="flow-gemini-video-${idx}.mp4" class="mini-btn">⬇️ Download MP4</a>
            </div>
          </div>
        `;
      } else {
        inlineVideoHtml = `
          <div class="inline-media-card">
            <div class="inline-media-actions">
              <span class="muted">🎬 Video job ID: ${escapeHtml(m.artifacts.videoInteractionId || 'saved')}</span>
            </div>
          </div>
        `;
      }
    }

    let inlinePreviewHtml = '';
    if (m.artifacts?.showPreview && m.artifacts?.previewHtml) {
      inlinePreviewHtml = `
        <div class="inline-preview-card">
          <div class="row-between">
            <span class="muted">🌐 Live Preview (Requested in Prompt)</span>
            <button type="button" class="mini-btn download-zip-btn">⬇️ Download .ZIP</button>
          </div>
          <iframe class="inline-preview-frame" sandbox="allow-scripts allow-modals allow-forms" srcdoc="${escapeHtml(m.artifacts.previewHtml)}"></iframe>
        </div>
      `;
    }

    let quickLinksHtml = '';
    if (m.role === 'assistant' && /```[a-zA-Z0-9_+-]+/.test(String(m.content || ''))) {
      quickLinksHtml += `<button type="button" class="mini-btn deploy-pc-code-btn" data-msg-idx="${idx}" title="Execute/write code to your PC via /pc bridge">⚡ /pc Write to PC</button>`;
      quickLinksHtml += `<button type="button" class="mini-btn download-zip-btn" title="Download project as .ZIP">📦 .ZIP</button>`;
    }

    return `
      <div class="msg ${m.role}">
        ${m.meta ? `<div class="msg-meta"><span>${escapeHtml(m.meta)}</span></div>` : ''}
        ${userAttHtml}
        ${thoughtHtml}
        ${m.role === 'assistant' ? renderFormattedMessage(m.content) : escapeHtml(m.content)}
        ${inlinePhotoHtml}
        ${inlineVideoHtml}
        ${inlinePreviewHtml}
        ${quickLinksHtml ? `<div class="msg-quick-links">${quickLinksHtml}</div>` : ''}
      </div>
    `;
  }).join('');

  stream.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(decodeURIComponent(btn.dataset.code));
      btn.textContent = '✓ Copied';
      setTimeout(() => { btn.textContent = '📋 Copy'; }, 1400);
    });
  });

  stream.querySelectorAll('.deploy-pc-code-btn').forEach(btn => {
    btn.addEventListener('click', () => deployMessageCodeViaPcBridge(Number(btn.dataset.msgIdx)));
  });

  stream.querySelectorAll('.download-zip-btn').forEach(btn => {
    btn.addEventListener('click', () => downloadGeneratedAppZip());
  });

  stream.querySelectorAll('.zoomable-img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.dataset.caption || ''));
  });

  scrollArea.scrollTop = scrollArea.scrollHeight;
}

/* ==================== THINKING BUBBLE ==================== */
function getThinkingStepPlan(provider, prompt, attachments) {
  if (provider === 'nanobanana') return ['Verifying Gemini API key...', 'Running Gemini Nano Banana image/photo edit...', 'Rendering image...'];
  if (provider === 'flow_video') return ['Submitting to Flow AI & Gemini Interactions API...', 'Waiting for async video operation...', 'Preparing video playback...'];
  if (attachments.some(a => a.kind === 'image' || a.kind === 'video')) return ['Inspecting uploaded media...', 'Calling API model...', 'Preparing response...'];
  return ['Understanding request...', `Calling ${provider} API...`, 'Formatting response...'];
}

function createLiveThinkingBubble(routeLabel, stepPlan) {
  const stream = document.getElementById('chatMessages');
  const scrollArea = document.getElementById('chatScrollArea');
  const startTime = performance.now();
  const completedSteps = [stepPlan[0]];
  let stepIdx = 0;

  const card = document.createElement('div');
  card.className = 'thinking-card';
  card.id = 'liveThinkingCard';
  card.innerHTML = `
    <div class="thinking-top">
      <div class="thinking-left">
        <div class="sparkle-spinner"></div>
        <span class="thinking-headline">${escapeHtml(stepPlan[0])}</span>
      </div>
      <span class="badge badge-pro thinking-timer">0.0s</span>
    </div>
    <div class="thinking-steps-live">
      <div class="thinking-step-row current">▸ ${escapeHtml(routeLabel)} • ${escapeHtml(stepPlan[0])}</div>
    </div>
  `;

  stream.appendChild(card);
  scrollArea.scrollTop = scrollArea.scrollHeight;

  const headlineEl = card.querySelector('.thinking-headline');
  const timerEl = card.querySelector('.thinking-timer');
  const stepsEl = card.querySelector('.thinking-steps-live');

  const timerInterval = setInterval(() => {
    const secs = ((performance.now() - startTime) / 1000).toFixed(1);
    timerEl.textContent = `${secs}s`;
  }, 150);

  const stepInterval = setInterval(() => {
    if (stepIdx < stepPlan.length - 1) {
      stepIdx++;
      const nextStep = stepPlan[stepIdx];
      completedSteps.push(nextStep);
      headlineEl.textContent = nextStep;
      stepsEl.innerHTML = completedSteps.map((st, i) => `
        <div class="thinking-step-row ${i === completedSteps.length - 1 ? 'current' : ''}">
          ${i === completedSteps.length - 1 ? '▸' : '✓'} ${escapeHtml(st)}
        </div>
      `).join('');
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, state.effort === 'LOW' ? 450 : (state.effort === 'MEDIUM' ? 750 : 1000));

  return {
    pushStep(customText) {
      completedSteps.push(customText);
      headlineEl.textContent = customText;
      stepsEl.innerHTML = completedSteps.map((st, i) => `
        <div class="thinking-step-row ${i === completedSteps.length - 1 ? 'current' : ''}">
          ${i === completedSteps.length - 1 ? '▸' : '✓'} ${escapeHtml(st)}
        </div>
      `).join('');
      scrollArea.scrollTop = scrollArea.scrollHeight;
    },
    updateLiveDraft(partialText) {
      let draftEl = card.querySelector('.stream-draft-preview');
      if (!draftEl) {
        draftEl = document.createElement('div');
        draftEl.className = 'stream-draft-preview';
        draftEl.style.cssText = 'margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-size:14px;line-height:1.6;white-space:pre-wrap;color:var(--text);';
        card.appendChild(draftEl);
      }
      draftEl.textContent = partialText;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    },
    finish() {
      clearInterval(timerInterval);
      clearInterval(stepInterval);
      const duration = ((performance.now() - startTime) / 1000).toFixed(1) + 's';
      card.remove();
      return { steps: completedSteps, duration };
    }
  };
}

/* ==================== SLOW / OVERLOADED MODEL GUARD ==================== */
function getAvailableAlternativeModels(currentProvider, currentModelId) {
  const alternatives = [];
  const currentAi = AI_CATALOG.find(a => a.id === currentProvider);

  if (currentAi && providerHasApiKey(currentAi)) {
    currentAi.models.forEach(m => {
      if (m.id !== currentModelId) {
        alternatives.push({
          providerId: currentAi.id, providerName: currentAi.name,
          modelId: m.id, modelName: m.name, desc: m.desc || '', sameProvider: true
        });
      }
    });
  }

  AI_CATALOG.forEach(ai => {
    if (ai.id === currentProvider || ai.id === 'nanobanana' || ai.id === 'flow_video') return;
    if (!providerHasApiKey(ai)) return;
    ai.models.forEach(m => {
      alternatives.push({
        providerId: ai.id, providerName: ai.name,
        modelId: m.id, modelName: m.name, desc: m.desc || '', sameProvider: false
      });
    });
  });

  return alternatives;
}

function startSlowResponseMonitor(provider, modelId, label) {
  clearSlowResponseMonitor();
  const thresholdMs = provider === 'flow_video' ? 45000 : provider === 'nanobanana' ? 20000 : (state.effort === 'LOW' ? 4500 : (state.effort === 'MEDIUM' ? 7500 : 10000));
  slowWatchTimer = setTimeout(() => {
    if (!activeRequestController) return;
    const banner = document.getElementById('slowResponseBanner');
    document.getElementById('slowBannerMessage').textContent = `${label} is taking longer than expected. Wait or switch model?`;
    banner.classList.remove('hidden');
  }, thresholdMs);
}

function clearSlowResponseMonitor() {
  if (slowWatchTimer) { clearTimeout(slowWatchTimer); slowWatchTimer = null; }
  document.getElementById('slowResponseBanner')?.classList.add('hidden');
}

function openSlowModelSwitchModal(reasonTitle = '⏳ Model Slow or Overloaded', reasonDesc = null) {
  if (!activeRequestContext) return;
  const { provider, modelId } = activeRequestContext;
  const alts = getAvailableAlternativeModels(provider, modelId);
  selectedAltSwitchCandidate = null;

  document.getElementById('slowModalTitle').textContent = reasonTitle;
  document.getElementById('slowModalDesc').textContent = reasonDesc ||
    `Current model (${provider} / ${modelId}) has not responded yet. Select another configured API model below and confirm to switch, or click Keep Waiting.`;

  const confirmBtn = document.getElementById('slowModalConfirmSwitchBtn');
  confirmBtn.disabled = true;

  const listEl = document.getElementById('slowAltModelList');
  if (!alts.length) {
    listEl.innerHTML = `<div class="info-banner">No other API-key-configured models are available. Add an API key in ⚙️ Settings or click <strong>Keep Waiting</strong>.</div>`;
  } else {
    listEl.innerHTML = alts.map((alt, idx) => `
      <button type="button" class="alt-model-option" data-alt-idx="${idx}">
        <div>
          <div class="menu-item-title">${escapeHtml(alt.providerName)} — ${escapeHtml(alt.modelName)}</div>
          <div class="menu-item-sub">${alt.sameProvider ? 'Same provider' : 'Other API provider'} • ${escapeHtml(alt.desc)}</div>
        </div>
        <span class="badge ${alt.sameProvider ? 'badge-cloud' : 'badge-pro'}">${alt.sameProvider ? 'Same Provider' : 'Switch'}</span>
      </button>
    `).join('');

    listEl.querySelectorAll('.alt-model-option').forEach(btn => {
      btn.addEventListener('click', () => {
        listEl.querySelectorAll('.alt-model-option').forEach(x => x.classList.remove('selected'));
        btn.classList.add('selected');
        selectedAltSwitchCandidate = alts[Number(btn.dataset.altIdx)];
        confirmBtn.disabled = false;
      });
    });
  }

  document.getElementById('slowModelModal').classList.remove('hidden');
}

/* ==================== GEMINI + FLOW + NANO BANANA API CALLERS ==================== */
async function fetchGeminiEndpoint(pathSuffix, options = {}) {
  if (!hasGeminiConfigured()) {
    throw new Error('Google AI Studio API key required. Add your key in ⚙️ Settings -> 1. AI API Keys.');
  }

  if (shouldUseBridgeGeminiProxy()) {
    const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
    const extraHeaders = {};
    if (state.settings.geminiKey) extraHeaders['x-goog-api-key'] = state.settings.geminiKey;
    if (pathSuffix === '/models') {
      return aiFetch(`${bridgeUrl}/bridge/proxy/gemini/models`, { method: 'GET', headers: bridgeHeaders(extraHeaders) });
    }
    if (pathSuffix.endsWith(':generateContent')) {
      const model = pathSuffix.replace(/^\/models\//, '').replace(/:generateContent$/, '');
      return aiFetch(`${bridgeUrl}/bridge/proxy/gemini/generate`, {
        method: 'POST',
        headers: bridgeHeaders(extraHeaders),
        body: JSON.stringify({ model, body: options.bodyObj })
      });
    }
    if (pathSuffix === '/interactions') {
      return aiFetch(`${bridgeUrl}/bridge/proxy/gemini/interactions`, {
        method: 'POST',
        headers: bridgeHeaders(extraHeaders),
        body: JSON.stringify(options.bodyObj)
      });
    }
    if (pathSuffix.startsWith('/interactions/') && pathSuffix.endsWith('/cancel')) {
      const id = pathSuffix.replace('/interactions/', '').replace('/cancel', '');
      return aiFetch(`${bridgeUrl}/bridge/proxy/gemini/interactions/${encodeURIComponent(id)}/cancel`, {
        method: 'POST',
        headers: bridgeHeaders(extraHeaders)
      });
    }
    if (pathSuffix.startsWith('/interactions/')) {
      const id = pathSuffix.replace('/interactions/', '');
      return aiFetch(`${bridgeUrl}/bridge/proxy/gemini/interactions/${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: bridgeHeaders(extraHeaders)
      });
    }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta${pathSuffix}`;
  const headers = { 'x-goog-api-key': state.settings.geminiKey };
  if (options.method === 'POST') headers['Content-Type'] = 'application/json';

  return aiFetch(url, {
    method: options.method || 'GET',
    headers,
    ...(options.bodyObj ? { body: JSON.stringify(options.bodyObj) } : {})
  });
}

async function syncGeminiModelsFromApi() {
  const res = await fetchGeminiEndpoint('/models', { method: 'GET' });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || `Failed to verify Gemini API key (HTTP ${res.status}).`);

  const usable = (data.models || [])
    .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
    .map(m => ({
      id: (m.name || '').replace(/^models\//, ''),
      displayName: m.displayName || (m.name || '').replace(/^models\//, '')
    }))
    .filter(m => m.id.startsWith('gemini-') && !m.id.includes('tts') && !m.id.includes('transcribe') && !m.id.includes('live'));

  state.discoveredGeminiModels = usable;
  rebuildCatalog();
  saveState(true);
  renderDropdowns();
  return usable;
}

function buildGeminiContents(messages, latestAttachments) {
  return messages.map((m, idx) => {
    const isLatestUser = idx === messages.length - 1 && m.role === 'user';
    const parts = [];
    let textBody = m.content || '';

    if (isLatestUser && latestAttachments.length) {
      const textFiles = latestAttachments.filter(a => (a.kind === 'zip' || a.kind === 'text') && a.textContent);
      if (textFiles.length) textBody += '\n\n' + textFiles.map(f => f.textContent).join('\n\n');
      parts.push({ text: textBody || 'Analyze the attached file(s) and help as requested.' });
      latestAttachments.forEach(att => {
        if ((att.kind === 'image' || att.kind === 'pdf' || att.kind === 'video') && att.base64) {
          parts.push({ inlineData: { mimeType: att.mimeType, data: att.base64 } });
        }
      });
    } else {
      parts.push({ text: textBody });
    }
    return { role: m.role === 'assistant' ? 'model' : 'user', parts };
  });
}

function getEffortGenerationConfig(imageMode = false, modelId = '') {
  if (imageMode) return { responseModalities: ['TEXT', 'IMAGE'] };
  const mLow = String(modelId || '').toLowerCase();
  const isGemini3Or4 = /^gemini-(3|4)/.test(mLow) && !mLow.includes('image') && !mLow.includes('omni');
  const isGemini25 = /^gemini-2\.5/.test(mLow);

  if (state.effort === 'LOW') {
    const cfg = { maxOutputTokens: 1024, temperature: 0.35 };
    if (isGemini3Or4) {
      cfg.thinkingConfig = { thinkingLevel: 'minimal' };
    } else if (isGemini25) {
      cfg.thinkingConfig = { thinkingBudget: 0 };
    }
    return cfg;
  }
  if (state.effort === 'MEDIUM') {
    const cfg = { maxOutputTokens: 2048, temperature: 0.55 };
    if (isGemini3Or4) {
      cfg.thinkingConfig = { thinkingLevel: 'medium' };
    } else if (isGemini25) {
      cfg.thinkingConfig = { thinkingBudget: 1024 };
    }
    return cfg;
  }
  const cfg = { maxOutputTokens: 4096, temperature: 0.7 };
  if (isGemini3Or4) {
    cfg.thinkingConfig = { thinkingLevel: 'high' };
  } else if (isGemini25) {
    cfg.thinkingConfig = { thinkingBudget: 4096 };
  }
  return cfg;
}

function makeProviderError(modelId, msg, status = 500) {
  const err = new Error(`${modelId} API error: ${msg}`);
  if (status === 503 || status === 429 || /high demand|unavailable|overloaded|rate limit|quota/i.test(msg)) {
    err.isHighDemand503 = true;
  }
  return err;
}

async function readGeminiSseStream(res, modelId, thinkingCtrl) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buf = '';
  let reply = '';
  let imageDataUrl = null;
  let firstChunk = false;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const events = buf.split('\n\n');
    buf = events.pop() || '';
    for (const ev of events) {
      for (const line of ev.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const jsonStr = trimmed.slice(5).trim();
        if (!jsonStr || jsonStr === '[DONE]') continue;
        try {
          const pkt = JSON.parse(jsonStr);
          if (pkt?.error?.message) throw makeProviderError(modelId, pkt.error.message, pkt.error.code || 500);
          const parts = pkt?.candidates?.[0]?.content?.parts || [];
          for (const p of parts) {
            if (p.text) {
              if (!firstChunk) {
                firstChunk = true;
                clearSlowResponseMonitor();
              }
              reply += p.text;
              if (thinkingCtrl && typeof thinkingCtrl.updateLiveDraft === 'function') {
                thinkingCtrl.updateLiveDraft(reply);
              }
            }
            if (p.inlineData) {
              imageDataUrl = `data:${p.inlineData.mimeType || 'image/png'};base64,${p.inlineData.data}`;
            }
          }
        } catch (parseErr) {
          if (parseErr.isHighDemand503 || (parseErr.message && parseErr.message.includes('API error:'))) throw parseErr;
        }
      }
    }
  }
  if (buf.trim()) {
    for (const line of buf.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const jsonStr = trimmed.slice(5).trim();
      if (!jsonStr || jsonStr === '[DONE]') continue;
      try {
        const pkt = JSON.parse(jsonStr);
        const parts = pkt?.candidates?.[0]?.content?.parts || [];
        for (const p of parts) {
          if (p.text) reply += p.text;
          if (p.inlineData) imageDataUrl = `data:${p.inlineData.mimeType || 'image/png'};base64,${p.inlineData.data}`;
        }
      } catch (_) {}
    }
  }
  return { reply, imageDataUrl, actualModel: modelId };
}

async function callGeminiSingleModel(modelId, messages, systemPrompt, imageMode = false, latestAttachments = [], thinkingCtrl = null) {
  if (!hasGeminiConfigured()) {
    throw new Error('Google AI Studio API key required. Add your key in ⚙️ Settings -> 1. AI API Keys.');
  }

  const msgWindow = state.effort === 'LOW' ? messages.slice(-4) : (state.effort === 'MEDIUM' ? messages.slice(-8) : messages.slice(-16));
  const contents = buildGeminiContents(msgWindow, latestAttachments);
  const genCfg = getEffortGenerationConfig(imageMode, modelId);

  const body = imageMode
    ? {
        contents: [{
          parts: [
            { text: messages[messages.length - 1]?.content || 'Edit or generate image' },
            ...latestAttachments.filter(a => a.kind === 'image' && a.base64).map(a => ({
              inlineData: { mimeType: a.mimeType, data: a.base64 }
            }))
          ]
        }],
        generationConfig: genCfg
      }
    : {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: genCfg
      };

  if (!imageMode && state.settings.geminiKey) {
    const streamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:streamGenerateContent?alt=sse`;
    const res = await aiFetch(streamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': state.settings.geminiKey
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      try { const errJson = await res.json(); errMsg = errJson?.error?.message || errMsg; } catch (_) {}
      if (res.status === 400 && /thinking|budget|level|invalid argument/i.test(errMsg) && body.generationConfig?.thinkingConfig) {
        const retryBody = { ...body, generationConfig: { ...body.generationConfig } };
        delete retryBody.generationConfig.thinkingConfig;
        const retryRes = await aiFetch(streamUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': state.settings.geminiKey },
          body: JSON.stringify(retryBody)
        });
        if (retryRes.ok && retryRes.body) {
          return await readGeminiSseStream(retryRes, modelId, thinkingCtrl);
        }
      }
      throw makeProviderError(modelId, errMsg, res.status);
    }

    if (res.body && typeof res.body.getReader === 'function') {
      const streamed = await readGeminiSseStream(res, modelId, thinkingCtrl);
      if (streamed.reply && streamed.reply.trim()) {
        return streamed;
      }
      // Fallback to standard :generateContent if SSE stream yielded no text chunks
    }
  }

  const res = await fetchGeminiEndpoint(`/models/${encodeURIComponent(modelId)}:generateContent`, {
    method: 'POST',
    bodyObj: body
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || `HTTP ${res.status}`;
    throw makeProviderError(modelId, msg, res.status);
  }

  const parts = data?.candidates?.[0]?.content?.parts || [];
  let reply = '';
  let imageDataUrl = null;
  for (const p of parts) {
    if (p.text) reply += p.text;
    if (p.inlineData) imageDataUrl = `data:${p.inlineData.mimeType || 'image/png'};base64,${p.inlineData.data}`;
  }

  if (imageMode && !imageDataUrl) {
    throw new Error(`${modelId} returned text without an image${reply ? `: "${reply.slice(0, 180)}"` : '.'}`);
  }

  return {
    reply: reply || (imageDataUrl ? `🖼️ Gemini image output using **${modelId}**.` : 'Empty reply returned.'),
    imageDataUrl,
    actualModel: modelId
  };
}

function formatGoogleVideoError(rawMsg) {
  const msg = String(rawMsg || 'Unknown video error.');
  if (/billing|quota|tier|429|resource_exhausted|permission|403/i.test(msg)) {
    return `${msg}\n\nNote: Video generation/editing via Gemini Interactions API requires a Gemini API key with Cloud Billing enabled in Google AI Studio.`;
  }
  return msg;
}

function base64ToBlobUrl(base64, mimeType = 'video/mp4') {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], { type: mimeType }));
}

async function resolveVideoPlaybackUrl(videoOutput) {
  if (videoOutput.data) return base64ToBlobUrl(videoOutput.data, videoOutput.mime_type || 'video/mp4');
  if (videoOutput.uri) {
    if (shouldUseBridgeGeminiProxy()) {
      const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
      const extra = state.settings.geminiKey ? { 'x-goog-api-key': state.settings.geminiKey } : {};
      const r = await aiFetch(`${bridgeUrl}/bridge/proxy/gemini/media`, {
        method: 'POST',
        headers: bridgeHeaders(extra),
        body: JSON.stringify({ uri: videoOutput.uri })
      });
      if (!r.ok) throw new Error(`Failed to download video from bridge proxy (HTTP ${r.status}).`);
      return URL.createObjectURL(await r.blob());
    }
    const r = await aiFetch(videoOutput.uri, { headers: { 'x-goog-api-key': state.settings.geminiKey } });
    if (!r.ok) throw new Error(`Failed to download generated MP4 video (HTTP ${r.status}).`);
    return URL.createObjectURL(await r.blob());
  }
  throw new Error('Google Interactions API completed without video data or URI.');
}

async function generateFlowOrGeminiVideo({ prompt, startImage = null, onProgress = null }) {
  if (!hasGeminiConfigured()) {
    throw new Error('Google AI Studio API key required for Flow / Gemini video editing & generation. Add your key in ⚙️ Settings -> 1. AI API Keys.');
  }
  if (!prompt || !prompt.trim()) throw new Error('Please describe the video or edit in your prompt.');

  const aspectRatio = /\b(9:16|vertical|portrait|reel|shorts)\b/i.test(prompt) ? '9:16' : '16:9';
  const duration = startImage ? '8s' : '6s';
  const inputPayload = startImage && startImage.base64
    ? [
        { type: 'text', text: `[Flow Video Direction & Edit] ${prompt.trim()}` },
        { type: 'image', data: startImage.base64, mime_type: startImage.mimeType || 'image/png' }
      ]
    : `[Flow Video Direction & Edit] ${prompt.trim()}`;

  activeVideoCancelFlag = false;
  if (onProgress) onProgress('Submitting video job to Flow & Gemini Interactions API...');

  const createRes = await fetchGeminiEndpoint('/interactions', {
    method: 'POST',
    bodyObj: {
      model: 'gemini-omni-1.2-flash',
      input: inputPayload,
      background: true,
      response_format: { type: 'video', aspect_ratio: aspectRatio, resolution: '720p', duration }
    }
  });
  const createData = await createRes.json();
  if (!createRes.ok) throw new Error(formatGoogleVideoError(createData?.error?.message || `HTTP ${createRes.status}`));

  const interactionId = createData.id || createData.name;
  if (!interactionId) throw new Error('Google Interactions API did not return an interaction ID.');

  let interaction = createData;
  for (let attempt = 1; attempt <= 90; attempt++) {
    if (activeVideoCancelFlag || activeRequestController?.signal?.aborted) {
      await fetchGeminiEndpoint(`/interactions/${encodeURIComponent(interactionId)}/cancel`, { method: 'POST' }).catch(() => {});
      throw new Error('Video generation cancelled by user.');
    }
    const status = String(interaction.status || '').toLowerCase();
    if (status === 'completed') break;
    if (status === 'failed' || status === 'cancelled') {
      throw new Error(formatGoogleVideoError(interaction.error?.message || `Status: ${interaction.status}`));
    }
    if (onProgress) onProgress(`Rendering video (${interaction.status || 'in_progress'} • ${attempt})...`);
    await new Promise(r => setTimeout(r, 5000));
    const pollRes = await fetchGeminiEndpoint(`/interactions/${encodeURIComponent(interactionId)}`, { method: 'GET' });
    const pollData = await pollRes.json();
    if (!pollRes.ok) throw new Error(formatGoogleVideoError(pollData?.error?.message || `HTTP ${pollRes.status}`));
    interaction = pollData;
  }

  if (String(interaction.status || '').toLowerCase() !== 'completed') {
    throw new Error('Video generation timed out while waiting for Google operation.');
  }

  const videoOutput = (Array.isArray(interaction.outputs) ? interaction.outputs : [])
    .find(o => o.type === 'video' || (o.mime_type && o.mime_type.startsWith('video/')));
  if (!videoOutput) throw new Error('Google interaction completed without a video output.');

  const videoUrl = await resolveVideoPlaybackUrl(videoOutput);
  const record = {
    id: 'vid_' + Date.now(),
    interactionId,
    prompt: prompt.trim(),
    model: 'Flow / gemini-omni-1.2-flash',
    aspectRatio,
    resolution: '720p',
    duration,
    date: new Date().toLocaleString()
  };
  state.generatedVideos.unshift(record);
  saveState();

  return {
    reply: `🎬 Edited/generated video using **Flow AI & Gemini Omni** (${aspectRatio}, ${duration}).`,
    isVideoArtifact: true,
    videoUrl,
    videoInteractionId: interactionId,
    videoModel: 'Flow / Gemini Omni 1.2 Flash',
    actualModel: 'gemini-omni-1.2-flash'
  };
}

/* ==================== OPENAI-COMPATIBLE STREAMING (CHATGPT, GROK, DEEPSEEK, CUSTOM) ==================== */
async function callOpenAiCompatibleStream({ baseUrl, apiKey, model, messages, systemPrompt, thinkingCtrl }) {
  const cleanBase = String(baseUrl || '').replace(/\/$/, '');
  const maxTokens = state.effort === 'LOW' ? 512 : (state.effort === 'MEDIUM' ? 1536 : 3072);
  const msgWindow = state.effort === 'LOW' ? messages.slice(-4) : (state.effort === 'MEDIUM' ? messages.slice(-8) : messages.slice(-16));

  const res = await aiFetch(`${cleanBase}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemPrompt }, ...msgWindow],
      max_tokens: maxTokens,
      ...( /^(o1|o3|gpt-5|grok-3-mini|grok-4)/i.test(model) ? { reasoning_effort: state.effort.toLowerCase() } : {} ),
      stream: true
    })
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}`;
    try { const d = await res.json(); errMsg = d?.error?.message || errMsg; } catch (_) {}
    throw makeProviderError(model, errMsg, res.status);
  }

  if (res.body && typeof res.body.getReader === 'function') {
    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buf = '';
    let fullText = '';
    let firstToken = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop() || '';
      for (const raw of lines) {
        const line = raw.trim();
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const parsed = JSON.parse(payload);
          const delta = parsed?.choices?.[0]?.delta?.content || '';
          if (delta) {
            if (!firstToken) { firstToken = true; clearSlowResponseMonitor(); }
            fullText += delta;
            if (thinkingCtrl && typeof thinkingCtrl.updateLiveDraft === 'function') {
              thinkingCtrl.updateLiveDraft(fullText);
            }
          }
        } catch (_) {}
      }
    }
    return { reply: fullText || 'Empty response.', actualModel: model };
  }

  const data = await res.json();
  return { reply: data?.choices?.[0]?.message?.content || 'Empty response.', actualModel: model };
}

/* ==================== /pc BRIDGE EXECUTOR (WORKS WITH ANY AI MODEL) ==================== */
function appendPcLog(entry) {
  const el = document.getElementById('pcTerminalLog');
  if (!el) return;
  const stamp = new Date().toLocaleTimeString();
  el.textContent += `\n[${stamp}] ${entry}\n`;
  el.scrollTop = el.scrollHeight;
}

function updatePcPermissionUI() {
  const isAllow = state.pcPermission === 'allow' && Boolean(state.sessionGrantId);
  if (state.pcPermission === 'allow' && !state.sessionGrantId) state.pcPermission = 'ask';

  document.getElementById('permAskBtn')?.classList.toggle('active', !isAllow);
  document.getElementById('permAllowBtn')?.classList.toggle('active', isAllow);

  const miniNote = document.getElementById('sessionGrantMiniInfo');
  if (miniNote) {
    if (isAllow) {
      const expStr = state.sessionGrantExpiresAt ? new Date(state.sessionGrantExpiresAt).toLocaleTimeString() : 'session';
      miniNote.textContent = `PC session until ${expStr}`;
      miniNote.classList.remove('hidden');
    } else {
      miniNote.classList.add('hidden');
    }
  }
}

async function enableSessionAllowAtOnce() {
  if (!state.settings.bridgeToken) {
    alert('Connect PC Bridge first (⚙️ Settings -> 2. /pc Bridge).');
    updatePcPermissionUI();
    return;
  }
  const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
  try {
    const res = await fetch(`${bridgeUrl}/bridge/session/grant`, {
      method: 'POST',
      headers: bridgeHeaders(),
      body: JSON.stringify({ ttlMinutes: 180 })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to grant PC session.');
    state.pcPermission = 'allow';
    state.sessionGrantId = data.sessionGrantId;
    state.sessionGrantExpiresAt = data.expiresAt;
    appendPcLog(`PC SESSION GRANTED > Allow at Once active until ${new Date(data.expiresAt).toLocaleTimeString()} (sensitive actions still require confirmation).`);
    updatePcPermissionUI();
  } catch (err) {
    state.pcPermission = 'ask';
    state.sessionGrantId = null;
    updatePcPermissionUI();
    alert('Could not activate Allow at Once: ' + err.message);
  }
}

async function revokeSessionAllowAtOnce(silent = false) {
  const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
  const oldGrant = state.sessionGrantId;
  state.pcPermission = 'ask';
  state.sessionGrantId = null;
  state.sessionGrantExpiresAt = null;
  updatePcPermissionUI();

  if (oldGrant && state.settings.bridgeToken) {
    try {
      await fetch(`${bridgeUrl}/bridge/session/revoke`, {
        method: 'POST',
        headers: bridgeHeaders(),
        body: JSON.stringify({ sessionGrantId: oldGrant })
      });
      if (!silent) appendPcLog('PC SESSION REVOKED > Returned to Ask Each Time.');
    } catch (_) {}
  }
}

async function testBridgeConnection(silent = false) {
  const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
  const token = state.settings.bridgeToken || '';
  const resultEl = document.getElementById('bridgeTestResult');

  if (!token) {
    if (resultEl) resultEl.innerHTML = '<span style="color:var(--warn-text);">⚠️ Paste your PC Bridge Token from START_PC_BRIDGE.bat first.</span>';
    if (!silent) alert('Open ⚙️ Settings -> 2. /pc Bridge and paste your Bridge Token.');
    return false;
  }

  try {
    const statusRes = await fetch(`${bridgeUrl}/bridge/status`, { headers: bridgeHeaders() });
    const statusData = await statusRes.json();
    if (!statusRes.ok) throw new Error(statusData.error || 'Bridge authentication failed.');

    state.bridgeConnected = true;
    state.pcPlatform = statusData.platform || 'win32';
    state.approvedRoots = Array.isArray(statusData.approvedRoots) ? statusData.approvedRoots : [];
    state.bridgeServerKeys = {
      hasGeminiKey: Boolean(statusData.serverKeysConfigured?.gemini),
      hasOpenaiKey: Boolean(statusData.serverKeysConfigured?.openai),
      hasClaudeKey: Boolean(statusData.serverKeysConfigured?.claude),
      hasGrokKey: Boolean(statusData.serverKeysConfigured?.grok),
      hasDeepseekKey: Boolean(statusData.serverKeysConfigured?.deepseek)
    };

    if (!statusData.sessionGrantActive && state.pcPermission === 'allow') {
      state.pcPermission = 'ask';
      state.sessionGrantId = null;
      state.sessionGrantExpiresAt = null;
    }
    updatePcPermissionUI();

    const rootsEl = document.getElementById('approvedRootsInput');
    if (rootsEl && state.approvedRoots.length) rootsEl.value = state.approvedRoots.join('\n');

    const keyBadge = document.getElementById('bridgeServerKeyStatus');
    if (keyBadge) {
      keyBadge.textContent = state.bridgeServerKeys.hasGeminiKey ? 'Keys on Server' : 'Bridge Linked';
      keyBadge.className = 'badge badge-cloud';
    }

    document.getElementById('bridgeMiniStatus').textContent = statusData.hostname;
    document.getElementById('bridgeMiniStatus').className = 'badge badge-cloud';
    updateApiStatusIndicator();
    renderDropdowns();

    if (resultEl) {
      resultEl.innerHTML = `<span style="color:var(--success-text);">✅ /pc Bridge online on <strong>${escapeHtml(statusData.hostname)}</strong> (${statusData.platform}, ${statusData.totalRamGB}GB RAM).</span>`;
    }
    return true;
  } catch (err) {
    state.bridgeConnected = false;
    document.getElementById('bridgeMiniStatus').textContent = 'Offline';
    document.getElementById('bridgeMiniStatus').className = 'badge badge-warn';
    updateApiStatusIndicator();
    if (resultEl) resultEl.innerHTML = `<span style="color:var(--danger-text);">❌ ${escapeHtml(err.message)}</span>`;
    if (!silent) alert('Could not reach PC Bridge: ' + err.message);
    return false;
  }
}

function requestStructuredPcApproval(prepared) {
  return new Promise(resolve => {
    document.getElementById('pcApprovalTitle').textContent = prepared.sensitive
      ? '⚠️ Sensitive /pc Action — Explicit Approval Required'
      : '🛡️ Approve /pc Action?';
    const badge = document.getElementById('pcApprovalRiskBadge');
    badge.textContent = prepared.sensitive ? 'Sensitive / Irreversible' : 'Ask Each Time';
    badge.className = prepared.sensitive ? 'badge badge-danger' : 'badge badge-warn';

    document.getElementById('pcApprovalReason').textContent = prepared.reason || 'Review the action validated by your local PC Bridge:';
    document.getElementById('pcApprovalPreviewBox').textContent = prepared.preview;
    document.getElementById('pendingPcCommandInput').value = JSON.stringify(prepared.action, null, 2);
    document.getElementById('pcApprovalModal').classList.remove('hidden');
    state.pendingCommandResolve = resolve;
  });
}

function resolveFriendlyPcTargetFromPrompt(promptText) {
  const raw = String(promptText || '');
  let baseFolder = '';
  if (/\b(downloads?|downloadfs)\b/i.test(raw)) baseFolder = 'Downloads';
  else if (/\bdesktop\b/i.test(raw)) baseFolder = 'Desktop';
  else if (/\bdocuments?\b/i.test(raw)) baseFolder = 'Documents';
  else if (/\bprojects?\b/i.test(raw)) baseFolder = 'Projects';
  else if (/\bworkspace\b/i.test(raw)) baseFolder = 'Workspace';

  const fileMatch = raw.match(/\b([a-zA-Z0-9_.-]+\.(?:html|htm|css|js|ts|jsx|tsx|py|java|kt|xml|json|md|txt|sql|bat|sh))\b/i);
  const fileName = fileMatch ? fileMatch[1] : '';
  return { baseFolder, fileName };
}

function extractNamedCodeFilesFromMarkdown(markdown) {
  const files = [];
  const regex = /```([a-zA-Z0-9_+-]+)(?::([^\n`]+))?\n([\s\S]*?)```/g;
  let m;
  let hasHtml = false, hasCss = false, hasJs = false;
  while ((m = regex.exec(String(markdown || ''))) !== null) {
    const lang = (m[1] || '').toLowerCase();
    const explicitPath = (m[2] || '').trim();
    const content = m[3] || '';
    if (!content.trim()) continue;
    if (explicitPath) files.push({ path: explicitPath, content });
    else if (lang === 'html' && !hasHtml) { hasHtml = true; files.push({ path: 'index.html', content }); }
    else if (lang === 'css' && !hasCss) { hasCss = true; files.push({ path: 'css/style.css', content }); }
    else if ((lang === 'js' || lang === 'javascript') && !hasJs) { hasJs = true; files.push({ path: 'js/app.js', content }); }
    else if (lang === 'python' || lang === 'py') files.push({ path: 'main.py', content });
  }
  return files;
}

function levenshteinDist(a, b) {
  const s = String(a || '');
  const t = String(b || '');
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const dp = Array.from({ length: s.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= t.length; j++) dp[0][j] = j;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[s.length][t.length];
}

const KNOWN_SITE_URLS = [
  { keys: ['freelancer', 'freelancedr', 'freelncr', 'freelancr', 'freelancer.com'], url: 'https://www.freelancer.com/jobs/' },
  { keys: ['fiverr', 'fiver', 'fivr'], url: 'https://www.fiverr.com/' },
  { keys: ['upwork', 'upwrk'], url: 'https://www.upwork.com/nx/find-work/' },
  { keys: ['gmail', 'gmial', 'gamil', 'gmaill', 'mail.google.com'], url: 'https://mail.google.com/' },
  { keys: ['youtube', 'youtbe', 'ytube', 'yutube', 'yt'], url: 'https://www.youtube.com/' },
  { keys: ['github', 'githb', 'gihub', 'gitub'], url: 'https://github.com/' },
  { keys: ['chatgpt', 'chagpt', 'chatgtp', 'openai'], url: 'https://chatgpt.com/' },
  { keys: ['claude', 'claud', 'anthropic'], url: 'https://claude.ai/' },
  { keys: ['gemini', 'gemni', 'gemin'], url: 'https://gemini.google.com/' },
  { keys: ['aistudio', 'ai studio', 'google ai studio'], url: 'https://aistudio.google.com/' },
  { keys: ['canva', 'cnva'], url: 'https://www.canva.com/' },
  { keys: ['figma', 'fgma'], url: 'https://www.figma.com/' },
  { keys: ['notion', 'noton'], url: 'https://www.notion.so/' },
  { keys: ['google drive', 'drive', 'gdrive'], url: 'https://drive.google.com/' },
  { keys: ['google docs', 'docs'], url: 'https://docs.google.com/' },
  { keys: ['google sheets', 'sheets'], url: 'https://sheets.google.com/' },
  { keys: ['vercel', 'vercl'], url: 'https://vercel.com/' },
  { keys: ['netlify', 'netlfiy'], url: 'https://app.netlify.com/' },
  { keys: ['firebase', 'firebse'], url: 'https://console.firebase.google.com/' },
  { keys: ['linkedin', 'linkdin'], url: 'https://www.linkedin.com/' },
  { keys: ['reddit', 'redit'], url: 'https://www.reddit.com/' },
  { keys: ['discord', 'discrd'], url: 'https://discord.com/app' },
  { keys: ['stackoverflow', 'stack overflow'], url: 'https://stackoverflow.com/' },
  { keys: ['google', 'googel', 'gogle'], url: 'https://www.google.com/' }
];

function resolveBrowserUrlFromPrompt(rawText) {
  const raw = String(rawText || '').trim();
  if (!raw) return '';

  // 1. Explicit full URL
  const explicitUrlMatch = raw.match(/https?:\/\/[^\s"'<>]+/i);
  if (explicitUrlMatch) return explicitUrlMatch[0];

  // 2. Domain-like token such as `freelancer.com` or `mail.google.com/inbox`
  const domainMatch = raw.match(/\b([a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[^\s"'<>]*)?)\b/i);
  if (domainMatch && !/\.(js|html|css|json|py|kt|java|xml|bat|sh|zip|exe|png|jpg|jpeg|mp4)$/i.test(domainMatch[1])) {
    return `https://${domainMatch[1]}`;
  }

  const low = raw.toLowerCase();

  // 3. Exact or substring alias match
  for (const entry of KNOWN_SITE_URLS) {
    for (const k of entry.keys) {
      if (k.includes('.') || k.includes(' ')) {
        if (low.includes(k)) return entry.url;
      } else {
        const reWord = new RegExp(`\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\b`, 'i');
        if (reWord.test(low)) return entry.url;
      }
    }
  }

  // 4. Typo-tolerant match on non-command words in prompt
  const stopWords = new Set([
    'pc', 'open', 'launch', 'start', 'go', 'to', 'in', 'on', 'a', 'an', 'the',
    'new', 'tab', 'browser', 'chrome', 'edge', 'firefox', 'brave', 'please', 'pls',
    'search', 'find', 'for', 'and', 'with', 'page', 'site', 'website', 'web'
  ]);
  const tokens = low
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map(t => t.trim())
    .filter(t => t.length >= 4 && !stopWords.has(t));

  let bestUrl = '';
  let bestScore = Infinity;

  for (const tok of tokens) {
    for (const entry of KNOWN_SITE_URLS) {
      for (const k of entry.keys) {
        if (k.includes('.') || k.includes(' ')) continue;
        const dist = levenshteinDist(tok, k);
        const maxLen = Math.max(tok.length, k.length);
        const threshold = maxLen <= 5 ? 1 : (maxLen <= 8 ? 2 : 3);
        if (dist <= threshold && dist < bestScore) {
          bestScore = dist;
          bestUrl = entry.url;
        }
      }
    }
  }
  if (bestUrl) return bestUrl;

  // 5. Explicit search phrase in browser
  const searchMatch = raw.match(/\b(?:search|look up|google)\s+(?:for\s+)?(.+?)(?:\s+(?:in|on)\s+(?:chrome|edge|firefox|brave|browser))?$/i);
  if (searchMatch && searchMatch[1]) {
    const q = searchMatch[1].replace(/^(?:a\s+new\s+tab\s+(?:to|for)\s+|new\s+tab\s+)/i, '').trim();
    if (q) return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
  }

  return '';
}

function extractDirectInstantPcActions(promptText) {
  const actions = [];
  const raw = String(promptText || '').trim();
  const low = raw.toLowerCase();
  const browserUrl = resolveBrowserUrlFromPrompt(raw);

  let browserKey = '';
  if (/\bbrave\b/i.test(low)) browserKey = 'brave';
  else if (/\b(edge|msedge)\b/i.test(low)) browserKey = 'edge';
  else if (/\bfirefox\b/i.test(low)) browserKey = 'firefox';
  else if (/\bchrome\b/i.test(low) || (browserUrl && /\b(new\s*tab|tab|search|google)\b/i.test(low))) browserKey = 'chrome';

  if (browserKey && (browserUrl || /\b(open|launch|start|go)\b/i.test(low))) {
    actions.push(browserUrl ? { type: 'open_app', app: browserKey, url: browserUrl } : { type: 'open_app', app: browserKey });
  } else if (browserUrl && /\b(open|launch|start|go)\b/i.test(low)) {
    actions.push({ type: 'open_app', app: 'chrome', url: browserUrl });
  }

  if (/\b(open|launch|start)\s+(this\s*pc|my\s*computer)\b/i.test(low)) actions.push({ type: 'open_app', app: 'thispc' });
  else if (/\b(open|launch|start)\s+(file\s*explorer|explorer)\b/i.test(low)) actions.push({ type: 'open_app', app: 'explorer' });
  if (/\b(open|launch|start)\s+android\s*studio\b/i.test(low)) actions.push({ type: 'open_app', app: 'androidstudio' });
  if (/\b(open|launch|start)\s+(vs\s*code|vscode|code)\b/i.test(low)) actions.push({ type: 'open_app', app: 'vscode' });
  if (/\b(open|launch|start)\s+notepad\b/i.test(low)) actions.push({ type: 'open_app', app: 'notepad' });
  if (/\b(open|launch|start)\s+(calculator|calc)\b/i.test(low)) actions.push({ type: 'open_app', app: 'calculator' });
  return actions;
}

function buildFileWriteActionsFromPromptAndReply(userPrompt, replyText) {
  const actions = [];
  const uLower = String(userPrompt || '').toLowerCase();
  const hasPcDirective = /(?:^|\s)\/pc\b/i.test(userPrompt) || state.chatTaskMode === 'pc';
  const wantsFileWrite = /\b(make|create|save|write|paste|put|build|generate|app|project|file)\b/i.test(uLower);
  const { baseFolder, fileName } = resolveFriendlyPcTargetFromPrompt(userPrompt);
  const extractedFiles = extractNamedCodeFilesFromMarkdown(replyText);

  if ((hasPcDirective || wantsFileWrite) && extractedFiles.length && (baseFolder || fileName || /\b(on my pc|in my pc|to my pc|on pc|to pc|workspace|folder)\b/i.test(uLower))) {
    const folderSlug = (userPrompt.match(/\b(?:app|software|project|tool|game)\s+(?:named|called|for)?\s*([a-zA-Z0-9_-]+)/i)?.[1]) || 'PC_Project';
    const targetDir = baseFolder ? `${baseFolder}/${folderSlug}` : `Workspace/${folderSlug}`;
    if (extractedFiles.length === 1 && fileName) {
      actions.push({ type: 'write_file', path: `${baseFolder || 'Workspace'}/${fileName}`, content: extractedFiles[0].content });
    } else {
      const openIn = /android\s*studio/i.test(uLower) ? 'androidstudio' : (/vs\s*code|vscode/i.test(uLower) ? 'vscode' : '');
      actions.push({ type: 'scaffold_project', projectDir: targetDir, openIn, files: extractedFiles });
    }
  }
  return actions;
}

async function runPcActionThroughBridge(actionOrCommand) {
  if (!state.settings.bridgeToken) {
    return { ok: false, error: 'PC Bridge not configured. Open ⚙️ Settings -> 2. /pc Bridge.' };
  }
  const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
  const prepareBody = typeof actionOrCommand === 'string' ? { command: actionOrCommand } : { action: actionOrCommand };

  const prepRes = await fetch(`${bridgeUrl}/bridge/actions/prepare`, {
    method: 'POST',
    headers: bridgeHeaders(),
    body: JSON.stringify(prepareBody)
  });
  const prepared = await prepRes.json();
  if (!prepRes.ok || !prepared.ok) {
    appendPcLog(`BLOCKED > ${prepared.error || 'Action rejected by PC Bridge.'}`);
    return { ok: false, error: prepared.error || 'Blocked by PC Bridge.' };
  }

  if (prepared.requiresApproval) {
    const decision = await requestStructuredPcApproval(prepared);
    if (!decision.approved) {
      await fetch(`${bridgeUrl}/bridge/actions/execute`, {
        method: 'POST',
        headers: bridgeHeaders(),
        body: JSON.stringify({ approvalId: prepared.approvalId, approved: false })
      }).catch(() => {});
      appendPcLog(`REJECTED > ${prepared.preview}`);
      return { ok: false, denied: true };
    }
  }

  appendPcLog(`RUNNING > ${prepared.preview}`);
  const execRes = await fetch(`${bridgeUrl}/bridge/actions/execute`, {
    method: 'POST',
    headers: bridgeHeaders(),
    body: JSON.stringify({ approvalId: prepared.approvalId, approved: true })
  });
  const data = await execRes.json();
  if (data.ok && data.confirmed) {
    appendPcLog(`CONFIRMED (${data.taskId}) > ${data.progress || 'Completed'}\n${data.stdout || ''}`);
  } else {
    appendPcLog(`FAILED > ${data.error || data.stderr || 'Action could not be confirmed.'}`);
  }
  return data;
}

async function deployMessageCodeViaPcBridge(msgIdx) {
  if (!state.bridgeConnected || !state.settings.bridgeToken) {
    alert('Connect PC Bridge first (⚙️ Settings -> 2. /pc Bridge).');
    return;
  }
  const chat = state.chats.find(c => c.id === state.activeChatId);
  const msg = chat?.messages?.[msgIdx];
  if (!msg) return;

  const files = extractNamedCodeFilesFromMarkdown(msg.content);
  if (!files.length) return alert('No code blocks found in this message.');

  const defaultTarget = files.length === 1 ? `Downloads/${files[0].path}` : 'Workspace/PC_Project';
  const targetInput = prompt('Enter target path inside approved PC folders:', defaultTarget);
  if (!targetInput) return;

  const actionPayload = files.length === 1
    ? { type: 'write_file', path: targetInput.trim(), content: files[0].content }
    : { type: 'scaffold_project', projectDir: targetInput.trim(), files };

  const res = await runPcActionThroughBridge(actionPayload);
  chat.messages.push({
    role: 'assistant',
    meta: res.denied ? '🛡️ /pc Action Rejected' : (res.ok && res.confirmed ? '🖥️ /pc — Written to PC' : '⚠️ /pc — Failed'),
    content: res.denied ? 'Action rejected by user.' : `${res.progress || ''}\n\n\`\`\`text\n${res.stdout || res.stderr || res.error || 'Done.'}\n\`\`\``
  });
  saveState();
  renderMessages();
}

/* ==================== ROUTING & SYSTEM PROMPT (/pc WORKS WITH ANY AI MODEL) ==================== */
function wantsPreviewInPrompt(promptText) {
  return /\b(show\s+preview|live\s+preview|with\s+preview|preview\s+it|see\s+preview|preview)\b/i.test(String(promptText || ''));
}

function wantsPhotoEditInPrompt(promptText, attachments) {
  const hasImg = attachments.some(a => a.kind === 'image');
  return state.chatTaskMode === 'photo_edit' || (hasImg && /\b(edit|change|remove|add|style|color|background|retouch|photo|image|picture)\b/i.test(promptText));
}

function wantsVideoEditInPrompt(promptText, attachments) {
  const hasVid = attachments.some(a => a.kind === 'video');
  return state.chatTaskMode === 'video_edit' || hasVid || /\b(video|flow|edit\s+video|animate|motion|clip|mp4)\b/i.test(promptText);
}

function autoRoutePrompt(prompt, attachments) {
  const p = prompt.toLowerCase();
  if (wantsPhotoEditInPrompt(p, attachments)) {
    return { provider: 'nanobanana', model: 'gemini-nano-banana-2.1', label: 'Nano Banana 2.1' };
  }
  if (wantsVideoEditInPrompt(p, attachments)) {
    return { provider: 'flow_video', model: 'gemini-omni-1.2-flash', label: 'Flow / Omni 1.2 Flash' };
  }
  const currentAi = getSelectedAi();
  const currentModel = currentAi.models.find(m => m.id === state.selectedModelId) || currentAi.models[0];
  return { provider: currentAi.id, model: currentModel.id, label: `${currentAi.name} • ${currentModel.name}` };
}

function buildSystemPrompt(provider, model, hasPcCommand = false) {
  const pcBridgeReady = Boolean(state.bridgeConnected && state.settings.bridgeToken);
  const osHint = state.pcPlatform === 'win32' ? 'Windows' : state.pcPlatform;
  const workspaceHint = state.approvedRoots?.[0] || 'AI_UNIVERSE_Workspace';

  const creatorLine = 'Creator of AI UNIVERSE: Ayman Chowdhury (TLTOM; IG: https://www.instagram.com/ayman.chowdhury.148/, WA: 01735051000, FB: https://www.facebook.com/profile.php?id=61587149130343, GH: https://github.com/aymanchowdhury1/). Do not claim Ayman built underlying foundation models.';

  const pcInstructions = pcBridgeReady
    ? ` /pc (${osHint}, ${workspaceHint}): emit [PC_ACTION]{"type":"open_app|write_file|scaffold_project|create_folder|list_dir|inspect_project|run_dev_cmd",...}[/PC_ACTION] for PC actions.`
    : (hasPcCommand ? ' Note: /pc Bridge is unlinked; tell user to run pc-bridge/START_PC_BRIDGE.bat.' : '');

  if (state.effort === 'LOW') {
    return `Be direct, concise, and fast. ${creatorLine}${pcInstructions}`;
  }
  return `You are ${provider} (${model}) in AI UNIVERSE v6.9. ${creatorLine} Understand requirements first; ask brief clarifying questions or outline a plan before dumping large code unless code/files are requested.${pcInstructions}`;
}

function enrichMessagesWithTextAttachments(messages, attachments) {
  const textAtts = attachments.filter(a => (a.kind === 'zip' || a.kind === 'text') && a.textContent);
  if (!textAtts.length) return messages.map(m => ({ role: m.role, content: m.content }));
  const extra = '\n\n' + textAtts.map(a => a.textContent).join('\n\n');
  return messages.map((m, i) => ({
    role: m.role,
    content: i === messages.length - 1 ? (m.content + extra) : m.content
  }));
}

async function callProviderDirect(provider, modelId, messages, systemPrompt, latestAttachments = [], thinkingCtrl = null) {
  const aiObj = AI_CATALOG.find(a => a.id === provider);
  const modelObj = aiObj?.models.find(m => m.id === modelId) || aiObj?.models[0];

  if (!providerHasApiKey(aiObj)) {
    throw new Error(getApiKeyPromptMessage(aiObj));
  }

  if (provider === 'nanobanana') {
    const chosenModel = modelObj?.apiModel || 'gemini-nano-banana-2.1';
    return await callGeminiSingleModel(chosenModel, messages, systemPrompt, true, latestAttachments, thinkingCtrl);
  }

  if (provider === 'flow_video') {
    const latestPrompt = messages[messages.length - 1]?.content || '';
    const imgAtt = latestAttachments.find(a => a.kind === 'image' && a.base64);
    return await generateFlowOrGeminiVideo({
      prompt: latestPrompt,
      startImage: imgAtt ? { base64: imgAtt.base64, mimeType: imgAtt.mimeType } : null,
      onProgress: (statusText) => { if (thinkingCtrl) thinkingCtrl.pushStep(statusText); }
    });
  }

  if (provider === 'gemini' || provider === 'antigravity') {
    const preferred = modelObj?.apiModel || 'gemini-4-hydrogen';
    return await callGeminiSingleModel(preferred, messages, systemPrompt, false, latestAttachments, thinkingCtrl);
  }

  if (provider === 'claude') {
    const apiKey = state.settings.claudeKey;
    const enriched = enrichMessagesWithTextAttachments(messages, latestAttachments);
    const claudeMsgs = enriched.map((m, idx) => {
      if (idx === enriched.length - 1 && latestAttachments.some(a => a.kind === 'image')) {
        const blocks = latestAttachments
          .filter(a => a.kind === 'image' && a.base64)
          .map(a => ({ type: 'image', source: { type: 'base64', media_type: a.mimeType, data: a.base64 } }));
        blocks.push({ type: 'text', text: m.content || 'Analyze this image.' });
        return { role: m.role, content: blocks };
      }
      return { role: m.role, content: m.content };
    });

    const maxTokens = state.effort === 'LOW' ? 640 : (state.effort === 'MEDIUM' ? 1800 : 4096);
    const claudeModel = modelObj?.apiModel || 'claude-3-7-sonnet-latest';
    const res = await aiFetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: claudeModel,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: claudeMsgs,
        stream: true
      })
    });
    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      try { const d = await res.json(); errMsg = d?.error?.message || errMsg; } catch (_) {}
      throw makeProviderError(claudeModel, errMsg, res.status);
    }
    if (res.body && typeof res.body.getReader === 'function') {
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buf = '';
      let fullText = '';
      let firstToken = false;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || '';
        for (const raw of lines) {
          const line = raw.trim();
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.type === 'content_block_delta' && evt.delta?.text) {
              if (!firstToken) { firstToken = true; clearSlowResponseMonitor(); }
              fullText += evt.delta.text;
              if (thinkingCtrl && typeof thinkingCtrl.updateLiveDraft === 'function') {
                thinkingCtrl.updateLiveDraft(fullText);
              }
            }
          } catch (_) {}
        }
      }
      return { reply: fullText || 'No response from Claude.', actualModel: claudeModel };
    }
    const data = await res.json();
    return { reply: data?.content?.[0]?.text || 'No response from Claude.', actualModel: claudeModel };
  }

  if (provider === 'chatgpt') {
    return await callOpenAiCompatibleStream({
      baseUrl: 'https://api.openai.com/v1',
      apiKey: state.settings.openaiKey,
      model: modelObj?.apiModel || 'gpt-4o-mini',
      messages: enrichMessagesWithTextAttachments(messages, latestAttachments),
      systemPrompt,
      thinkingCtrl
    });
  }

  if (provider === 'grok') {
    return await callOpenAiCompatibleStream({
      baseUrl: 'https://api.x.ai/v1',
      apiKey: state.settings.grokKey,
      model: modelObj?.apiModel || 'grok-4-mini',
      messages: enrichMessagesWithTextAttachments(messages, latestAttachments),
      systemPrompt,
      thinkingCtrl
    });
  }

  if (provider === 'deepseek') {
    return await callOpenAiCompatibleStream({
      baseUrl: 'https://api.deepseek.com/v1',
      apiKey: state.settings.deepseekKey,
      model: modelObj?.apiModel || 'deepseek-chat',
      messages: enrichMessagesWithTextAttachments(messages, latestAttachments),
      systemPrompt,
      thinkingCtrl
    });
  }

  if (aiObj?.isCustom && aiObj.customConfig) {
    return await callOpenAiCompatibleStream({
      baseUrl: aiObj.customConfig.baseUrl,
      apiKey: aiObj.customConfig.apiKey,
      model: aiObj.customConfig.model,
      messages: enrichMessagesWithTextAttachments(messages, latestAttachments),
      systemPrompt,
      thinkingCtrl
    });
  }

  throw new Error(`Provider "${provider}" requires an API key.`);
}

async function executeChatAttempt(chat, targetProvider, targetModelId, routeLabel, attachments, thinkingCtrl, hasPcCommand = false) {
  activeRequestController = new AbortController();
  activeRequestChatId = chat.id;
  activeRequestContext = {
    chat, provider: targetProvider, modelId: targetModelId,
    routeLabel, attachments, thinkingCtrl, hasPcCommand
  };

  startSlowResponseMonitor(targetProvider, targetModelId, routeLabel);

  try {
    const systemPrompt = buildSystemPrompt(targetProvider, targetModelId, hasPcCommand);
    const result = await callProviderDirect(targetProvider, targetModelId, chat.messages, systemPrompt, attachments, thinkingCtrl);
    clearSlowResponseMonitor();
    document.getElementById('slowModelModal').classList.add('hidden');

    const replyText = result.reply || '';
    const userPromptText = chat.messages[chat.messages.length - 1]?.content || '';
    const hasCompiledWeb = extractAndCompileCodeBlocks(replyText);
    const showPreview = wantsPreviewInPrompt(userPromptText) || state.chatTaskMode === 'preview';

    const artifacts = {
      hasApp: hasCompiledWeb,
      showPreview: Boolean(showPreview && (hasCompiledWeb || state.generatedFiles['index.html'])),
      previewHtml: showPreview ? buildBundledPreviewHtml() : '',
      hasImage: Boolean(result.imageDataUrl),
      imageUrl: result.imageDataUrl || '',
      imagePrompt: userPromptText,
      hasVideo: Boolean(result.isVideoArtifact),
      videoUrl: result.videoUrl || '',
      videoInteractionId: result.videoInteractionId || '',
      videoModel: result.videoModel || '',
      videoPrompt: userPromptText
    };

    if (result.imageDataUrl) {
      state.generatedImages.unshift({ src: result.imageDataUrl, prompt: userPromptText, model: result.actualModel, date: new Date().toLocaleTimeString() });
    }

    const thoughtSummary = thinkingCtrl.finish();
    const usedTag = result.actualModel ? `${routeLabel} [${result.actualModel}]` : routeLabel;

    chat.messages.push({
      role: 'assistant',
      meta: `${usedTag} • Thinking: ${state.effort}`,
      content: replyText,
      thoughtSteps: thoughtSummary.steps,
      thoughtDuration: thoughtSummary.duration,
      artifacts
    });
    saveState();
    renderMessages();

    // Execute /pc actions across any AI provider when PC Bridge is connected
    if (state.settings.bridgeToken && (hasPcCommand || state.chatTaskMode === 'pc')) {
      const actionMatches = [...replyText.matchAll(/\[PC_ACTION\]([\s\S]*?)\[\/PC_ACTION\]/gi)];
      const actionsQueue = [];

      for (const m of actionMatches) {
        try {
          const parsed = JSON.parse(m[1].trim());
          const items = Array.isArray(parsed) ? parsed : (parsed && typeof parsed === 'object' ? [parsed] : []);
          for (const item of items) {
            if (!item || typeof item !== 'object') continue;
            if (item.type === 'open_app') {
              if (!item.app) item.app = item.app_name || item.name || item.target || '';
              if (!item.url && item.target_url) item.url = item.target_url;
            }
            actionsQueue.push(item);
          }
        } catch (_) {}
      }

      const inferredFileActions = buildFileWriteActionsFromPromptAndReply(userPromptText, replyText);
      for (const fa of inferredFileActions) {
        const exists = actionsQueue.some(a => a.type === fa.type && a.path === fa.path);
        if (!exists) actionsQueue.push(fa);
      }

      for (const payloadToRun of actionsQueue) {
        const execResult = await runPcActionThroughBridge(payloadToRun);
        chat.messages.push({
          role: 'assistant',
          meta: execResult.denied ? '🛡️ /pc Action Rejected' : (execResult.ok && execResult.confirmed ? '🖥️ /pc — Confirmed' : '⚠️ /pc — Failed'),
          content: execResult.denied ? 'Action rejected by user.' : `${execResult.progress || ''}\n\n\`\`\`text\n${execResult.stdout || execResult.stderr || execResult.error || 'No output.'}\n\`\`\``
        });
        saveState();
        renderMessages();
      }
    }
  } catch (err) {
    clearSlowResponseMonitor();
    if (err?.isUserApprovedSwitch && err.nextCandidate) {
      const next = err.nextCandidate;
      thinkingCtrl.pushStep(`User approved switch -> ${next.providerName} (${next.modelName})...`);
      await executeChatAttempt(chat, next.providerId, next.modelId, `${next.providerName} • ${next.modelName}`, attachments, thinkingCtrl, hasPcCommand);
      return;
    }

    if (!err?.isUserApprovedSwitch && err?.isHighDemand503) {
      openSlowModelSwitchModal(
        '⚡ Model Temporarily at Capacity',
        `${err.message}\n\nSelect another configured API model below and click Confirm Switch, or click Keep Waiting.`
      );
    }

    const thoughtSummary = thinkingCtrl.finish();
    const wasStopped = err?.name === 'AbortError';
    const alts = !wasStopped ? getAvailableAlternativeModels(targetProvider, targetModelId) : [];
    const altHint = alts.length
      ? `\n\nOther configured API models you can switch to: ${alts.slice(0, 4).map(a => `**${a.providerName} (${a.modelName})**`).join(', ')}.`
      : '';

    chat.messages.push({
      role: 'assistant',
      meta: wasStopped ? '⏹️ Stopped' : '⚠️ API / Request Notice',
      content: wasStopped ? 'Generation stopped by user.' : `${err.message || 'The request failed.'}${altHint}`,
      thoughtSteps: thoughtSummary.steps,
      thoughtDuration: thoughtSummary.duration
    });
    saveState();
    renderMessages();
  }
}

async function handleSendPrompt() {
  if (activeRequestController) return;
  const input = document.getElementById('promptInput');
  const rawText = input.value.trim();
  const attachments = [...state.pendingAttachments];

  if (!rawText && !attachments.length) return;

  const hasPcPrefix = /(?:^|\s)\/pc\b/i.test(rawText);
  const cleanedText = rawText.replace(/^\s*\/pc\s*/i, '').trim() || rawText;

  const text = cleanedText || (
    attachments.some(a => a.kind === 'image') ? 'Edit or analyze this uploaded photo with Gemini.'
    : attachments.some(a => a.kind === 'video') ? 'Edit or analyze this uploaded video with Flow & Gemini.'
    : attachments.some(a => a.kind === 'zip') ? 'Inspect this uploaded ZIP project and summarize its structure before making changes.'
    : 'Analyze the uploaded file(s).'
  );

  input.value = '';
  input.style.height = 'auto';
  state.pendingAttachments = [];
  renderAttachmentChips();

  ensureActiveChat();
  const chat = state.chats.find(c => c.id === state.activeChatId);
  if (!Array.isArray(chat.messages)) chat.messages = [];
  if (!chat.messages.length) {
    chat.title = (hasPcPrefix ? '/pc ' : '') + text.slice(0, 34) + (text.length > 34 ? '...' : '');
  }

  chat.messages.push({
    role: 'user',
    content: (hasPcPrefix ? '/pc ' : '') + text,
    attachments: attachments.map(a => ({
      name: a.name, kind: a.kind, size: a.size, fileCount: a.fileCount,
      dataUrl: a.kind === 'image' ? a.dataUrl : undefined
    }))
  });
  saveState();
  renderChatsSidebar();
  renderMessages();

  // Direct instant PC open-app execution when /pc or PC mode is used
  const instantPcActions = (hasPcPrefix || state.chatTaskMode === 'pc') ? extractDirectInstantPcActions(text) : [];
  const isPureInstantPcOpen = instantPcActions.length > 0
    && !/\b(make|create|save|write|code|game|website|app|software|project|freelancer|edit|preview)\b/i.test(text);

  if (isPureInstantPcOpen) {
    if (!state.settings.bridgeToken) {
      chat.messages.push({
        role: 'assistant',
        meta: '⚠️ /pc Bridge Not Linked',
        content: 'Start `pc-bridge/START_PC_BRIDGE.bat` and paste your Bridge Token in **⚙️ Settings -> 2. /pc Bridge** to run `/pc` commands.'
      });
      saveState();
      renderMessages();
      return;
    }
    for (const act of instantPcActions) {
      const execResult = await runPcActionThroughBridge(act);
      chat.messages.push({
        role: 'assistant',
        meta: execResult.denied ? '🛡️ /pc Action Rejected' : (execResult.ok && execResult.confirmed ? '🖥️ /pc — Confirmed' : '⚠️ /pc — Failed'),
        content: execResult.denied ? 'Action rejected by user.' : `${execResult.progress || ''}\n\n\`\`\`text\n${execResult.stdout || execResult.stderr || execResult.error || 'Done.'}\n\`\`\``
      });
    }
    saveState();
    renderMessages();
    return;
  }

  if (instantPcActions.length && state.bridgeConnected && state.settings.bridgeToken) {
    for (const act of instantPcActions) {
      const execResult = await runPcActionThroughBridge(act);
      chat.messages.push({
        role: 'assistant',
        meta: execResult.denied ? '🛡️ /pc Action Rejected' : (execResult.ok && execResult.confirmed ? '🖥️ /pc — Confirmed' : '⚠️ /pc — Failed'),
        content: execResult.denied ? 'Action rejected by user.' : `${execResult.progress || ''}\n\n\`\`\`text\n${execResult.stdout || execResult.stderr || execResult.error || 'Done.'}\n\`\`\``
      });
    }
    saveState();
    renderMessages();
  }

  const routed = autoRoutePrompt(text, attachments);
  const targetProvider = routed.provider;
  const targetModelId = routed.model;
  const routeLabel = routed.label;

  const aiObj = AI_CATALOG.find(a => a.id === targetProvider);
  if (!providerHasApiKey(aiObj)) {
    chat.messages.push({
      role: 'assistant',
      meta: '🔑 API Key Required',
      content: `${getApiKeyPromptMessage(aiObj)}`
    });
    saveState();
    renderMessages();
    return;
  }

  document.getElementById('sendPromptBtn').classList.add('hidden');
  document.getElementById('stopPromptBtn').disabled = false;
  document.getElementById('stopPromptBtn').classList.remove('hidden');
  const statusBadge = document.getElementById('routeStatusBadge');
  statusBadge.textContent = 'Working...';
  statusBadge.classList.remove('hidden');

  const stepPlan = getThinkingStepPlan(targetProvider, text, attachments);
  const thinkingCtrl = createLiveThinkingBubble(routeLabel, stepPlan);

  await executeChatAttempt(chat, targetProvider, targetModelId, routeLabel, attachments, thinkingCtrl, hasPcPrefix);

  clearSlowResponseMonitor();
  document.getElementById('slowModelModal').classList.add('hidden');
  statusBadge.classList.add('hidden');
  activeRequestController = null;
  activeRequestChatId = null;
  activeRequestContext = null;
  document.getElementById('stopPromptBtn').disabled = true;
  document.getElementById('stopPromptBtn').innerHTML = '<span class="stop-square">■</span><span class="stop-label">Stop</span>';
  document.getElementById('sendPromptBtn').classList.remove('hidden');
}

async function downloadGeneratedAppZip() {
  const zip = new JSZip();
  Object.entries(state.generatedFiles).forEach(([filePath, content]) => zip.file(filePath, content));
  const blob = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'AI_UNIVERSE_Project.zip';
  a.click();
}

function renderCustomAiList() {
  const box = document.getElementById('customAiList');
  if (!state.customProviders.length) {
    box.innerHTML = '<p class="muted">No custom APIs added yet.</p>';
    return;
  }
  box.innerHTML = state.customProviders.map(cp => `
    <div class="custom-list-item">
      <span><strong>${escapeHtml(cp.name)}</strong> — <code>${escapeHtml(cp.model)}</code></span>
      <button type="button" class="mini-btn" data-del-cp="${cp.id}">Remove</button>
    </div>
  `).join('');

  box.querySelectorAll('[data-del-cp]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.customProviders = state.customProviders.filter(c => c.id !== btn.dataset.delCp);
      rebuildCatalog();
      saveState();
      renderDropdowns();
      renderCustomAiList();
    });
  });
}

/* ==================== INIT & EVENT WIRING ==================== */
document.addEventListener('DOMContentLoaded', () => {
  try { initPluginsManager(); } catch (e) { console.warn(e); }
  rebuildCatalog();
  renderDropdowns();
  renderChatsSidebar();
  renderMessages();
  updateApiStatusIndicator();
  updatePcPermissionUI();

  const stopButton = document.getElementById('stopPromptBtn');
  stopButton.disabled = true;
  stopButton.classList.remove('hidden');

  if (hasGeminiConfigured()) syncGeminiModelsFromApi().catch(() => {});
  if (state.settings.bridgeToken) testBridgeConnection(true).catch(() => {});

  window.addEventListener('beforeunload', () => {
    if (state.sessionGrantId) revokeSessionAllowAtOnce(true);
  });

  // Creator Modal
  document.getElementById('openCreatorBtn').addEventListener('click', () => {
    document.getElementById('creatorModal').classList.remove('hidden');
    closeMobileSidebar();
  });
  document.getElementById('closeCreatorBtn').addEventListener('click', () => {
    document.getElementById('creatorModal').classList.add('hidden');
  });

  // Slow / Overloaded Model Modal
  document.getElementById('slowKeepWaitingBtn').addEventListener('click', () => {
    clearSlowResponseMonitor();
    if (activeRequestContext) startSlowResponseMonitor(activeRequestContext.provider, activeRequestContext.modelId, activeRequestContext.routeLabel);
  });
  document.getElementById('slowChooseAltBtn').addEventListener('click', () => openSlowModelSwitchModal());
  document.getElementById('closeSlowModalBtn').addEventListener('click', () => document.getElementById('slowModelModal').classList.add('hidden'));
  document.getElementById('slowModalWaitBtn').addEventListener('click', () => {
    document.getElementById('slowModelModal').classList.add('hidden');
    clearSlowResponseMonitor();
    if (activeRequestContext) startSlowResponseMonitor(activeRequestContext.provider, activeRequestContext.modelId, activeRequestContext.routeLabel);
  });
  document.getElementById('slowModalAbortBtn').addEventListener('click', () => {
    document.getElementById('slowModelModal').classList.add('hidden');
    if (activeRequestController) activeRequestController.abort();
  });
  document.getElementById('slowModalConfirmSwitchBtn').addEventListener('click', () => {
    if (!selectedAltSwitchCandidate || !activeRequestController) return;
    document.getElementById('slowModelModal').classList.add('hidden');
    clearSlowResponseMonitor();
    const abortErr = new DOMException('Switched by user', 'AbortError');
    abortErr.isUserApprovedSwitch = true;
    abortErr.nextCandidate = selectedAltSwitchCandidate;
    activeRequestController.abort(abortErr);
  });

  // Firebase Sync
  if (window.AIUFirebase) {
    window.AIUFirebase.registerPayloadGetter(getFirebasePayload);
    window.AIUFirebase.onSyncStatus((status, detail) => updateFirebaseSyncStatusUI(status, detail));
    window.AIUFirebase.onUserChange(user => updateFirebaseUserUI(user));
    window.AIUFirebase.onCloudData(cloudData => {
      if (!cloudData) return;
      if (cloudData.settings) state.settings = { ...state.settings, ...cloudData.settings };
      if (Array.isArray(cloudData.customProviders)) state.customProviders = cloudData.customProviders;
      if (cloudData.preferences) {
        if (cloudData.preferences.selectedAiId) state.selectedAiId = cloudData.preferences.selectedAiId;
        if (cloudData.preferences.selectedModelId) state.selectedModelId = cloudData.preferences.selectedModelId;
        if (cloudData.preferences.effort) state.effort = cloudData.preferences.effort;
        if (cloudData.preferences.activeChatId) state.activeChatId = cloudData.preferences.activeChatId;
      }
      if (Array.isArray(cloudData.chats) || (cloudData.chats && typeof cloudData.chats === 'object')) {
        const cloudChatsRaw = Array.isArray(cloudData.chats) ? cloudData.chats : Object.values(cloudData.chats);
        const cloudChats = cloudChatsRaw
          .filter(c => c && typeof c === 'object')
          .map(c => ({ ...c, id: c.id || ('chat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)), title: c.title || 'New chat', messages: Array.isArray(c.messages) ? c.messages : [] }));
        if (cloudChats.length || !state.chats.length) {
          state.chats = cloudChats;
          if (!state.chats.some(c => c.id === state.activeChatId)) state.activeChatId = state.chats[0]?.id || null;
          ensureActiveChat();
        } else {
          if (!state.activeChatId || !state.chats.some(c => c.id === state.activeChatId)) state.activeChatId = state.chats[0].id;
          window.AIUFirebase.pushNow(getFirebasePayload()).catch(() => {});
        }
      }
      if (Array.isArray(cloudData.generatedImages) && cloudData.generatedImages.length) state.generatedImages = cloudData.generatedImages;
      if (Array.isArray(cloudData.generatedVideos) && cloudData.generatedVideos.length && !state.generatedVideos.length) state.generatedVideos = cloudData.generatedVideos;

      rebuildCatalog();
      saveState(true);
      renderDropdowns();
      renderChatsSidebar();
      renderMessages();
    });

    if (!window.AIUFirebase.isConfigured()) {
      document.getElementById('firebaseSetupBanner').classList.remove('hidden');
      updateFirebaseUserUI(null);
    } else {
      window.AIUFirebase.init().catch(err => updateFirebaseSyncStatusUI('error', err.message));
    }
  }

  document.getElementById('dismissSetupBannerBtn').addEventListener('click', () => document.getElementById('firebaseSetupBanner').classList.add('hidden'));

  const triggerGoogleLogin = async () => {
    const gateErr = document.getElementById('authGateError');
    if (gateErr) gateErr.textContent = '';
    try { await window.AIUFirebase.signInWithGoogle(); }
    catch (e) {
      if (gateErr) gateErr.innerHTML = `<span style="color:var(--danger-text);">${escapeHtml(e.message)}</span>`;
      else alert(e.message);
    }
  };

  document.getElementById('authGateGoogleBtn').addEventListener('click', triggerGoogleLogin);
  document.getElementById('authGateSkipBtn').addEventListener('click', () => {
    state.skippedAuthGate = true;
    document.getElementById('authGateOverlay').classList.add('hidden');
  });
  document.getElementById('googleAuthBtn').addEventListener('click', () => {
    if (!window.AIUFirebase.isConfigured()) return alert('Open js/firebase-config.js and paste your Firebase Web App config.');
    if (window.AIUFirebase.getUser()) window.AIUFirebase.pushNow(getFirebasePayload()).catch(e => alert(e.message));
    else triggerGoogleLogin();
  });

  document.getElementById('forceSaveTopBtn').addEventListener('click', async () => {
    if (!window.AIUFirebase?.getUser()) return;
    try { await window.AIUFirebase.pushNow(getFirebasePayload()); } catch (e) { alert('Firebase save failed: ' + e.message); }
  });

  document.getElementById('signOutTopBtn').addEventListener('click', async () => {
    state.skippedAuthGate = false;
    await window.AIUFirebase.signOut();
  });

  // Sidebar & Navigation
  document.getElementById('toggleSidebarBtn').addEventListener('click', () => {
    if (window.innerWidth <= 860) closeMobileSidebar();
    else document.getElementById('appShell').classList.toggle('sidebar-collapsed');
  });
  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('mobile-open');
    document.getElementById('mobileOverlay').classList.remove('hidden');
  });
  document.getElementById('mobileOverlay').addEventListener('click', closeMobileSidebar);
  document.getElementById('brandHomeBtn').addEventListener('click', () => switchView('chatView'));
  document.getElementById('backToChatTopBtn').addEventListener('click', () => switchView('chatView'));
  document.getElementById('pluginsBackToChatBtn')?.addEventListener('click', () => switchView('chatView'));

  document.getElementById('toggleSearchBtn').addEventListener('click', () => {
    const wrap = document.getElementById('sidebarSearchWrap');
    wrap.classList.toggle('hidden');
    if (!wrap.classList.contains('hidden')) document.getElementById('chatSearchInput').focus();
  });

  document.querySelectorAll('.view-nav-btn').forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
  document.getElementById('newChatBtn').addEventListener('click', () => createNewChat(true));
  document.getElementById('chatSearchInput').addEventListener('input', renderChatsSidebar);

  // Lightbox
  document.getElementById('closeLightboxBtn').addEventListener('click', () => document.getElementById('imageLightbox').classList.add('hidden'));
  document.getElementById('imageLightbox').addEventListener('click', e => {
    if (e.target.id === 'imageLightbox') document.getElementById('imageLightbox').classList.add('hidden');
  });

  // File / Photo / Video / ZIP Upload
  const fileInput = document.getElementById('chatFileInput');
  document.getElementById('attachFileBtn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async (e) => {
    await handleIncomingFiles(e.target.files);
    fileInput.value = '';
  });

  const dropZone = document.getElementById('chatbarDropZone');
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer?.files?.length) await handleIncomingFiles(e.dataTransfer.files);
  });

  document.getElementById('promptInput').addEventListener('paste', async (e) => {
    const items = e.clipboardData?.files;
    if (items && items.length) await handleIncomingFiles(items);
  });

  // Dropdown Menus
  const closeAllMenus = () => {
    document.getElementById('aiDropdownMenu').classList.add('hidden');
    document.getElementById('modelDropdownMenu').classList.add('hidden');
    document.getElementById('topbarModelMenu')?.classList.add('hidden');
    document.getElementById('thinkingDropdownMenu').classList.add('hidden');
    document.getElementById('quickPlusMenu').classList.add('hidden');
  };

  document.addEventListener('click', e => {
    if (!e.target.closest('.pill-dropdown') && !e.target.closest('.topbar-model-picker') && !e.target.closest('#quickPlusBtn') && !e.target.closest('#quickPlusMenu')) {
      closeAllMenus();
    }
  });

  document.getElementById('topbarModelTrigger')?.addEventListener('click', e => {
    e.stopPropagation();
    const menu = document.getElementById('topbarModelMenu');
    const isHidden = menu.classList.contains('hidden');
    closeAllMenus();
    if (isHidden) menu.classList.remove('hidden');
  });

  document.getElementById('aiDropdownTrigger').addEventListener('click', e => {
    e.stopPropagation();
    const isHidden = document.getElementById('aiDropdownMenu').classList.contains('hidden');
    closeAllMenus();
    if (isHidden) document.getElementById('aiDropdownMenu').classList.remove('hidden');
  });

  document.getElementById('modelDropdownTrigger').addEventListener('click', e => {
    e.stopPropagation();
    const isHidden = document.getElementById('modelDropdownMenu').classList.contains('hidden');
    closeAllMenus();
    if (isHidden) document.getElementById('modelDropdownMenu').classList.remove('hidden');
  });

  document.getElementById('thinkingDropdownTrigger').addEventListener('click', e => {
    e.stopPropagation();
    const isHidden = document.getElementById('thinkingDropdownMenu').classList.contains('hidden');
    closeAllMenus();
    if (isHidden) document.getElementById('thinkingDropdownMenu').classList.remove('hidden');
  });

  document.querySelectorAll('#thinkingDropdownMenu .menu-item').forEach(item => {
    item.addEventListener('click', () => {
      state.effort = item.dataset.effort;
      renderDropdowns();
      saveState();
      closeAllMenus();
    });
  });

  // Quick Plus Menu
  document.getElementById('quickPlusBtn').addEventListener('click', e => {
    e.stopPropagation();
    const menu = document.getElementById('quickPlusMenu');
    const isHidden = menu.classList.contains('hidden');
    closeAllMenus();
    if (isHidden) {
      const rect = e.currentTarget.getBoundingClientRect();
      menu.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - 245))}px`;
      menu.style.top = `${Math.max(12, rect.top - 250)}px`;
      menu.classList.remove('hidden');
    }
  });
  document.getElementById('qpUploadFile').addEventListener('click', () => { closeAllMenus(); fileInput.click(); });
  document.getElementById('qpInsertPcPrefix')?.addEventListener('click', () => {
    closeAllMenus();
    switchView('chatView');
    const pi = document.getElementById('promptInput');
    if (!pi.value.trim().startsWith('/pc')) pi.value = '/pc ' + pi.value;
    pi.focus();
  });
  document.getElementById('qpRequestPreview').addEventListener('click', () => {
    closeAllMenus();
    switchView('chatView');
    const pi = document.getElementById('promptInput');
    pi.value = 'Build an interactive web app and show me a live preview';
    pi.focus();
  });
  document.getElementById('qpExportZip').addEventListener('click', () => { closeAllMenus(); downloadGeneratedAppZip(); });
  document.getElementById('qpOpenPlugins').addEventListener('click', () => { closeAllMenus(); switchView('pluginsView'); });
  document.getElementById('qpOpenSettings').addEventListener('click', () => { closeAllMenus(); openSettings('mtabApis'); });

  // Mode Chips
  const setChatTaskMode = (mode) => {
    state.chatTaskMode = mode;
    const idMap = {
      chat: 'chatTaskModeChat', pc: 'chatTaskModePc', preview: 'chatTaskModePreview',
      photo_edit: 'chatTaskModePhotoEdit', video_edit: 'chatTaskModeVideoEdit'
    };
    Object.entries(idMap).forEach(([k, id]) => document.getElementById(id)?.classList.toggle('active', k === mode));
  };
  document.getElementById('chatTaskModeChat').addEventListener('click', () => setChatTaskMode('chat'));
  document.getElementById('chatTaskModePc').addEventListener('click', () => setChatTaskMode('pc'));
  document.getElementById('chatTaskModePreview').addEventListener('click', () => setChatTaskMode('preview'));
  document.getElementById('chatTaskModePhotoEdit').addEventListener('click', () => setChatTaskMode('photo_edit'));
  document.getElementById('chatTaskModeVideoEdit').addEventListener('click', () => setChatTaskMode('video_edit'));

  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('promptInput').value = btn.dataset.prompt;
      handleSendPrompt();
    });
  });

  // Slash Commands
  const promptInput = document.getElementById('promptInput');
  const slashMenu = document.getElementById('slashCommandMenu');
  const slashCommands = [
    ['/pc', 'Run PC action with any AI model (e.g. /pc open this pc)'],
    ['/help', 'Show all slash commands'],
    ['/new', 'Start a new chat'],
    ['/plugins', 'Open Plugins (Canva, Google Drive, Photos, /pc Bridge)'],
    ['/settings', 'Open API keys & /pc Bridge settings'],
    ['/creator', 'About Ayman Chowdhury (TLTOM)'],
    ['/clear', 'Clear current chat messages']
  ];
  function updateSlashMenu() {
    const match = promptInput.value.match(/^\/([a-z]*)$/i);
    if (!match) { slashMenu.classList.add('hidden'); return; }
    const q = match[1].toLowerCase();
    const matches = slashCommands.filter(([cmd]) => cmd.slice(1).startsWith(q));
    slashMenu.innerHTML = matches.map(([cmd, desc]) => `<button type="button" class="slash-command-item" data-command="${cmd}"><b>${cmd}</b><span>${desc}</span></button>`).join('');
    slashMenu.classList.toggle('hidden', matches.length === 0);
    slashMenu.querySelectorAll('[data-command]').forEach(btn => btn.addEventListener('click', () => runSlashCommand(btn.dataset.command)));
  }
  function runSlashCommand(command) {
    slashMenu.classList.add('hidden');
    if (command === '/pc') {
      promptInput.value = '/pc ';
      promptInput.focus();
      return;
    }
    promptInput.value = '';
    if (command === '/help') { promptInput.value = 'Available commands: ' + slashCommands.map(x => x[0]).join(', '); promptInput.focus(); return; }
    if (command === '/new') return createNewChat();
    if (command === '/plugins') return switchView('pluginsView');
    if (command === '/settings') return openSettings('mtabApis');
    if (command === '/creator') { document.getElementById('creatorModal').classList.remove('hidden'); return; }
    if (command === '/clear') {
      const chat = state.chats.find(c => c.id === state.activeChatId);
      if (chat && confirm('Clear all messages in this chat?')) { chat.messages = []; saveState(); renderMessages(); }
    }
  }
  promptInput.addEventListener('input', () => {
    updateSlashMenu();
    promptInput.style.height = 'auto';
    promptInput.style.height = Math.min(promptInput.scrollHeight, 180) + 'px';
  });
  promptInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') { slashMenu.classList.add('hidden'); return; }
    if (e.key === 'Enter' && !e.shiftKey) {
      if (!slashMenu.classList.contains('hidden')) {
        const first = slashMenu.querySelector('[data-command]');
        if (first) { e.preventDefault(); runSlashCommand(first.dataset.command); return; }
      }
      e.preventDefault();
      handleSendPrompt();
    }
  });
  document.getElementById('sendPromptBtn').addEventListener('click', handleSendPrompt);
  document.getElementById('stopPromptBtn').addEventListener('click', () => {
    if (activeRequestController) {
      document.getElementById('stopPromptBtn').disabled = true;
      document.getElementById('stopPromptBtn').textContent = '…';
      activeRequestController.abort();
    }
  });

  // Session-only PC Permission buttons
  document.getElementById('permAskBtn')?.addEventListener('click', () => revokeSessionAllowAtOnce(false));
  document.getElementById('permAllowBtn')?.addEventListener('click', () => enableSessionAllowAtOnce());

  // Approval Modal buttons
  document.getElementById('denyPcBtn').addEventListener('click', () => {
    document.getElementById('pcApprovalModal').classList.add('hidden');
    if (state.pendingCommandResolve) { state.pendingCommandResolve({ approved: false }); state.pendingCommandResolve = null; }
  });
  document.getElementById('approvePcBtn').addEventListener('click', () => {
    document.getElementById('pcApprovalModal').classList.add('hidden');
    if (state.pendingCommandResolve) { state.pendingCommandResolve({ approved: true }); state.pendingCommandResolve = null; }
  });

  // Settings Modal
  const openSettings = (targetTab = 'mtabApis') => {
    document.getElementById('geminiKeyInput').value = state.settings.geminiKey || '';
    document.getElementById('claudeKeyInput').value = state.settings.claudeKey || '';
    document.getElementById('openaiKeyInput').value = state.settings.openaiKey || '';
    document.getElementById('grokKeyInput').value = state.settings.grokKey || '';
    document.getElementById('deepseekKeyInput').value = state.settings.deepseekKey || '';
    document.getElementById('bridgeUrlInput').value = state.settings.bridgeUrl || 'http://localhost:5050';
    document.getElementById('bridgeTokenInput').value = state.settings.bridgeToken || '';
    document.getElementById('useBridgeProxyCheck').checked = state.settings.useBridgeProxy !== false;
    if (state.approvedRoots.length) document.getElementById('approvedRootsInput').value = state.approvedRoots.join('\n');
    renderCustomAiList();

    document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.mtab === targetTab));
    document.querySelectorAll('.modal-panel').forEach(p => p.classList.toggle('active', p.id === targetTab));
    document.getElementById('settingsModal').classList.remove('hidden');
    closeMobileSidebar();
  };

  document.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.mtab).classList.add('active');
    });
  });

  document.getElementById('openSettingsSidebarBtn').addEventListener('click', () => openSettings('mtabApis'));
  document.getElementById('openSettingsTopBtn').addEventListener('click', () => openSettings('mtabApis'));
  document.querySelector('.open-settings-bridge-btn')?.addEventListener('click', () => openSettings('mtabBridge'));
  document.querySelector('.open-settings-custom-btn')?.addEventListener('click', () => openSettings('mtabCustom'));
  document.getElementById('closeSettingsBtn').addEventListener('click', () => document.getElementById('settingsModal').classList.add('hidden'));

  const syncSettingsFromModal = () => {
    state.settings.geminiKey = document.getElementById('geminiKeyInput').value.trim();
    state.settings.claudeKey = document.getElementById('claudeKeyInput').value.trim();
    state.settings.openaiKey = document.getElementById('openaiKeyInput').value.trim();
    state.settings.grokKey = document.getElementById('grokKeyInput').value.trim();
    state.settings.deepseekKey = document.getElementById('deepseekKeyInput').value.trim();
    state.settings.bridgeUrl = document.getElementById('bridgeUrlInput').value.trim() || 'http://localhost:5050';
    state.settings.bridgeToken = document.getElementById('bridgeTokenInput').value.trim();
    state.settings.useBridgeProxy = document.getElementById('useBridgeProxyCheck').checked;
    saveState();
  };

  document.getElementById('pushKeysToBridgeBtn').addEventListener('click', async () => {
    syncSettingsFromModal();
    if (!state.settings.bridgeToken) return alert('Connect PC Bridge first (Tab 2: /pc Bridge).');
    const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
    try {
      const r = await fetch(`${bridgeUrl}/bridge/keys/save`, {
        method: 'POST',
        headers: bridgeHeaders(),
        body: JSON.stringify({
          geminiKey: state.settings.geminiKey,
          claudeKey: state.settings.claudeKey,
          openaiKey: state.settings.openaiKey,
          grokKey: state.settings.grokKey,
          deepseekKey: state.settings.deepseekKey
        })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed to save keys on bridge');
      state.bridgeServerKeys = {
        hasGeminiKey: Boolean(d.hasGeminiKey),
        hasOpenaiKey: Boolean(d.hasOpenaiKey),
        hasClaudeKey: Boolean(d.hasClaudeKey),
        hasGrokKey: Boolean(d.hasGrokKey),
        hasDeepseekKey: Boolean(d.hasDeepseekKey)
      };
      updateApiStatusIndicator();
      renderDropdowns();
      alert('Saved API keys securely on your local PC Bridge server!');
    } catch (e) {
      alert(e.message);
    }
  });

  document.getElementById('saveApprovedRootsBtn')?.addEventListener('click', async () => {
    if (!state.settings.bridgeToken) return alert('Connect PC Bridge first.');
    const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
    const roots = document.getElementById('approvedRootsInput').value.split('\n').map(s => s.trim()).filter(Boolean);
    try {
      const r = await fetch(`${bridgeUrl}/bridge/config/roots`, {
        method: 'POST',
        headers: bridgeHeaders(),
        body: JSON.stringify({ roots })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed to update approved folders');
      state.approvedRoots = d.approvedRoots;
      alert('Updated approved PC workspace folders!');
    } catch (e) {
      alert(e.message);
    }
  });

  document.getElementById('saveSettingsBtn').addEventListener('click', async () => {
    syncSettingsFromModal();
    if (hasGeminiConfigured()) await syncGeminiModelsFromApi().catch(() => {});
    rebuildCatalog();
    renderDropdowns();
    document.getElementById('settingsModal').classList.add('hidden');
    alert(window.AIUFirebase?.getUser() ? 'Settings saved & synced to Firebase!' : 'Settings saved locally!');
  });

  document.getElementById('testGeminiKeyBtn').addEventListener('click', async () => {
    syncSettingsFromModal();
    const out = document.getElementById('geminiTestResult');
    if (!hasGeminiConfigured()) {
      out.innerHTML = '<span style="color:var(--warn-text);">Enter a Google AI Studio API key first.</span>';
      return;
    }
    out.textContent = 'Verifying API key & syncing models...';
    try {
      const usable = await syncGeminiModelsFromApi();
      out.innerHTML = `<span style="color:var(--success-text);">✅ Valid API key! Synced ${usable.length} Gemini API models.</span>`;
    } catch (e) {
      out.innerHTML = `<span style="color:var(--danger-text);">❌ ${escapeHtml(e.message)}</span>`;
    }
  });

  document.getElementById('testBridgeBtn').addEventListener('click', () => {
    syncSettingsFromModal();
    testBridgeConnection(true);
  });

  document.getElementById('addCustomAiBtn').addEventListener('click', () => {
    const name = document.getElementById('customAiName').value.trim();
    const model = document.getElementById('customAiModel').value.trim();
    const baseUrl = document.getElementById('customAiUrl').value.trim();
    const apiKey = document.getElementById('customAiKey').value.trim();
    if (!name || !model || !baseUrl) return alert('Enter Name, Model ID, and Base URL.');
    if (!apiKey) return alert('API Key is required because all AI models work strictly via API key.');

    state.customProviders.push({ id: 'custom_' + Date.now(), name, model, baseUrl, apiKey });
    rebuildCatalog();
    saveState();
    renderDropdowns();
    renderCustomAiList();
    document.getElementById('customAiName').value = '';
    document.getElementById('customAiModel').value = '';
    document.getElementById('customAiUrl').value = '';
    document.getElementById('customAiKey').value = '';
  });
});


/* ==================== INTERACTIVE PLUGINS MANAGER ==================== */
const PLUGINS_STORAGE_KEY = 'ai_universe_connected_plugins_v1';
const PLUGIN_META_INFO = {
  canva: {
    title: 'Connect Canva to AI UNIVERSE',
    desc: 'Link your Canva workspace or design URL inside AI UNIVERSE so Chat and /pc can work with your Canva link directly.',
    defaultUrl: 'https://www.canva.com/'
  },
  drive: {
    title: 'Connect Google Drive to AI UNIVERSE',
    desc: 'Link your Google Drive folder or drive URL inside AI UNIVERSE for quick Chat reference and /pc Chrome opening.',
    defaultUrl: 'https://drive.google.com/'
  },
  photos: {
    title: 'Connect Google Photos to AI UNIVERSE',
    desc: 'Link your Google Photos album or library URL inside AI UNIVERSE for visual workflows in Chat and /pc.',
    defaultUrl: 'https://photos.google.com/'
  }
};

function loadConnectedPlugins() {
  try {
    const raw = localStorage.getItem(PLUGINS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (_) {
    return {};
  }
}

function saveConnectedPlugins(data) {
  try {
    localStorage.setItem(PLUGINS_STORAGE_KEY, JSON.stringify(data || {}));
  } catch (_) {}
  if (typeof state === 'object' && state) {
    state.connectedPlugins = data || {};
  }
  if (typeof scheduleFirebaseSync === 'function') {
    try { scheduleFirebaseSync(); } catch (_) {}
  }
}

function getActiveConnectedPluginsSummary() {
  const connected = loadConnectedPlugins();
  const items = [];
  for (const [id, info] of Object.entries(connected)) {
    if (info && info.connected) {
      items.push(`${id.toUpperCase()}: ${info.label || info.url || 'Connected'}`);
    }
  }
  return items.join(' | ');
}

function refreshPluginsViewState() {
  const connected = loadConnectedPlugins();
  if (typeof state === 'object' && state) {
    state.connectedPlugins = connected;
  }

  for (const id of ['canva', 'drive', 'photos']) {
    const badge = document.getElementById(`pluginStatus-${id}`);
    const infoBox = document.getElementById(`pluginLinkedInfo-${id}`);
    const card = document.querySelector(`.plugin-card[data-plugin-id="${id}"]`);
    const connectBtn = card?.querySelector('.plugin-connect-btn');
    const webLink = card?.querySelector('.plugin-web-link');
    const entry = connected[id];
    const isConn = Boolean(entry && entry.connected);

    if (badge) {
      badge.textContent = isConn ? 'Connected' : 'Not Connected';
      badge.className = isConn ? 'badge badge-ok' : 'badge badge-warn';
    }
    if (infoBox) {
      if (isConn) {
        infoBox.textContent = `Linked: ${entry.label ? entry.label + ' — ' : ''}${entry.url || ''}`;
        infoBox.classList.remove('hidden');
      } else {
        infoBox.textContent = '';
        infoBox.classList.add('hidden');
      }
    }
    if (connectBtn) {
      const cap = id === 'drive' ? 'Drive' : id.charAt(0).toUpperCase() + id.slice(1);
      connectBtn.textContent = isConn ? `Connected (${cap})` : `Connect ${cap}`;
    }
    if (webLink && entry && entry.url) {
      webLink.setAttribute('href', entry.url);
    }
  }

  const pcBadge = document.getElementById('pluginStatus-pcbridge');
  if (pcBadge) {
    const ok = Boolean(typeof state === 'object' && state && state.bridgeConnected);
    pcBadge.textContent = ok ? 'Connected (:5050)' : 'Unlinked';
    pcBadge.className = ok ? 'badge badge-ok' : 'badge badge-warn';
  }

  const customBadge = document.getElementById('pluginStatus-customapi');
  if (customBadge) {
    const hasCustom = Boolean(typeof state === 'object' && state && state.settings?.customBaseUrl && state.settings?.customApiKey);
    customBadge.textContent = hasCustom ? 'Connected' : 'Not Connected';
    customBadge.className = hasCustom ? 'badge badge-ok' : 'badge badge-warn';
  }
}

function openPluginConnectorDrawer(pid, defaultUrl = '') {
  const info = PLUGIN_META_INFO[pid];
  if (!info) return;
  const drawer = document.getElementById('pluginConnectModal');
  const titleEl = document.getElementById('pluginDrawerTitle');
  const descEl = document.getElementById('pluginDrawerDesc');
  const urlInput = document.getElementById('pluginWorkspaceUrlInput');
  const tokenInput = document.getElementById('pluginTokenInput');
  const saved = loadConnectedPlugins()[pid] || {};

  window.__activePluginConnectorId = pid;
  if (titleEl) titleEl.textContent = info.title;
  if (descEl) descEl.textContent = info.desc;
  if (urlInput) urlInput.value = saved.url || defaultUrl || info.defaultUrl;
  if (tokenInput) tokenInput.value = saved.label || '';

  if (drawer) {
    drawer.classList.remove('hidden');
    drawer.style.display = 'block';
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  if (urlInput) urlInput.focus();
}

function commitPluginConnection(pid, urlVal, labelVal) {
  const meta = PLUGIN_META_INFO[pid];
  if (!meta) return;
  const trimmedUrl = String(urlVal || '').trim();
  const safeUrl = /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : meta.defaultUrl;
  const all = loadConnectedPlugins();
  all[pid] = {
    connected: true,
    url: safeUrl,
    label: String(labelVal || '').trim(),
    connectedAt: Date.now()
  };
  saveConnectedPlugins(all);
  refreshPluginsViewState();
  const drawer = document.getElementById('pluginConnectModal');
  if (drawer) {
    drawer.classList.add('hidden');
    drawer.style.display = '';
  }
  if (typeof showToast === 'function') {
    showToast(`${meta.title.replace('Connect ', '').replace(' to AI UNIVERSE', '')} connected in AI UNIVERSE!`);
  }
}

function initPluginsManager() {
  if (window.__aiUniversePluginsBound) {
    refreshPluginsViewState();
    return;
  }
  window.__aiUniversePluginsBound = true;

  document.addEventListener('click', (e) => {
    const connectBtn = e.target.closest('.plugin-connect-btn');
    if (connectBtn) {
      e.preventDefault();
      const pid = connectBtn.dataset.pluginId;
      openPluginConnectorDrawer(pid, connectBtn.dataset.defaultUrl || '');
      return;
    }

    if (e.target.closest('#closePluginDrawerBtn')) {
      e.preventDefault();
      const drawer = document.getElementById('pluginConnectModal');
      if (drawer) {
        drawer.classList.add('hidden');
        drawer.style.display = '';
      }
      window.__activePluginConnectorId = null;
      return;
    }

    if (e.target.closest('#savePluginLinkBtn')) {
      e.preventDefault();
      const pid = window.__activePluginConnectorId;
      if (!pid) return;
      const urlVal = document.getElementById('pluginWorkspaceUrlInput')?.value || '';
      const labelVal = document.getElementById('pluginTokenInput')?.value || '';
      commitPluginConnection(pid, urlVal, labelVal);
      return;
    }

    if (e.target.closest('#disconnectPluginBtn')) {
      e.preventDefault();
      const pid = window.__activePluginConnectorId;
      if (!pid) return;
      const all = loadConnectedPlugins();
      delete all[pid];
      saveConnectedPlugins(all);
      refreshPluginsViewState();
      const drawer = document.getElementById('pluginConnectModal');
      if (drawer) {
        drawer.classList.add('hidden');
        drawer.style.display = '';
      }
      if (typeof showToast === 'function') {
        showToast(`${pid.toUpperCase()} disconnected.`);
      }
      return;
    }

    const chatBtn = e.target.closest('.plugin-chat-btn');
    if (chatBtn) {
      e.preventDefault();
      const pid = chatBtn.dataset.pluginId;
      const saved = loadConnectedPlugins()[pid];
      const basePrompt = chatBtn.dataset.prompt || '';
      if (typeof switchView === 'function') switchView('chatView');
      const promptInput = document.getElementById('promptInput');
      if (promptInput) {
        promptInput.value = saved?.url ? `${basePrompt}(${saved.url}) ` : basePrompt;
        promptInput.focus();
      }
      return;
    }

    const pcBtn = e.target.closest('.plugin-pc-btn');
    if (pcBtn) {
      e.preventDefault();
      const pid = pcBtn.dataset.pluginId;
      const saved = loadConnectedPlugins()[pid];
      if (typeof switchView === 'function') switchView('chatView');
      const promptInput = document.getElementById('promptInput');
      if (promptInput) {
        promptInput.value = saved?.url ? `/pc open chrome to ${saved.url}` : (pcBtn.dataset.pcCmd || '/pc open chrome');
        promptInput.focus();
      }
      if (typeof showToast === 'function') {
        showToast('Prepared /pc command in Chat — press Enter to run.');
      }
      return;
    }

    if (e.target.closest('#pluginRefreshBridgeBtn')) {
      e.preventDefault();
      (async () => {
        if (typeof checkBridgeHealth === 'function') await checkBridgeHealth();
        refreshPluginsViewState();
        if (typeof showToast === 'function') {
          showToast(state?.bridgeConnected ? 'PC Bridge (:5050) connected!' : 'PC Bridge offline — run pc-bridge/START_PC_BRIDGE.bat.');
        }
      })();
      return;
    }

    if (e.target.closest('.open-settings-bridge-btn')) {
      e.preventDefault();
      if (typeof openSettings === 'function') openSettings('mtabBridge');
      return;
    }

    if (e.target.closest('.open-settings-custom-btn')) {
      e.preventDefault();
      if (typeof openSettings === 'function') openSettings('mtabApis');
      return;
    }
  });

  refreshPluginsViewState();
}

function loadConnectedPlugins() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PLUGINS_STORAGE_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (_) {
    return {};
  }
}

function saveConnectedPlugins(data) {
  try {
    localStorage.setItem(PLUGINS_STORAGE_KEY, JSON.stringify(data || {}));
  } catch (_) {}
}

function refreshPluginsViewState() {
  const connected = loadConnectedPlugins();
  for (const id of ['canva', 'drive', 'photos']) {
    const badge = document.getElementById(`pluginStatus-${id}`);
    const card = document.querySelector(`.plugin-card[data-plugin-id="${id}"]`);
    const connectBtn = card?.querySelector('.plugin-connect-btn');
    const webLink = card?.querySelector('a.plugin-actions, a[href]');
    const entry = connected[id];
    if (badge) {
      if (entry && entry.connected) {
        badge.textContent = 'Connected';
        badge.className = 'badge badge-ok';
      } else {
        badge.textContent = 'Not Linked';
        badge.className = 'badge badge-warn';
      }
    }
    if (connectBtn) {
      connectBtn.textContent = entry && entry.connected ? 'Edit Connection' : `Connect ${id === 'drive' ? 'Drive' : id.charAt(0).toUpperCase() + id.slice(1)}`;
    }
    if (webLink && entry && entry.url) {
      webLink.setAttribute('href', entry.url);
    }
  }

  const pcBadge = document.getElementById('pluginStatus-pcbridge');
  if (pcBadge) {
    if (state.bridgeConnected) {
      pcBadge.textContent = 'Connected (:5050)';
      pcBadge.className = 'badge badge-ok';
    } else {
      pcBadge.textContent = 'Unlinked';
      pcBadge.className = 'badge badge-warn';
    }
  }

  const customBadge = document.getElementById('pluginStatus-customapi');
  if (customBadge) {
    const hasCustom = Boolean(state.settings?.customBaseUrl && state.settings?.customApiKey);
    customBadge.textContent = hasCustom ? 'Configured' : 'Not Set';
    customBadge.className = hasCustom ? 'badge badge-ok' : 'badge badge-warn';
  }
}

function initPluginsManager() {
  let activePluginId = null;
  const drawer = document.getElementById('pluginConnectModal');
  const titleEl = document.getElementById('pluginDrawerTitle');
  const descEl = document.getElementById('pluginDrawerDesc');
  const urlInput = document.getElementById('pluginWorkspaceUrlInput');
  const tokenInput = document.getElementById('pluginTokenInput');

  document.querySelectorAll('.plugin-connect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.pluginId;
      const info = PLUGIN_META_INFO[pid];
      if (!info || !drawer) return;
      activePluginId = pid;
      const saved = loadConnectedPlugins()[pid] || {};
      titleEl.textContent = info.title;
      descEl.textContent = info.desc;
      urlInput.value = saved.url || btn.dataset.defaultUrl || info.defaultUrl;
      tokenInput.value = saved.token || '';
      drawer.classList.remove('hidden');
      urlInput.focus();
    });
  });

  document.getElementById('closePluginDrawerBtn')?.addEventListener('click', () => {
    drawer?.classList.add('hidden');
    activePluginId = null;
  });

  document.getElementById('savePluginLinkBtn')?.addEventListener('click', () => {
    if (!activePluginId) return;
    const rawUrl = (urlInput.value || '').trim();
    const safeUrl = /^https?:\/\//i.test(rawUrl) ? rawUrl : (PLUGIN_META_INFO[activePluginId]?.defaultUrl || 'https://www.google.com/');
    const all = loadConnectedPlugins();
    all[activePluginId] = {
      connected: true,
      url: safeUrl,
      token: (tokenInput.value || '').trim(),
      updatedAt: Date.now()
    };
    saveConnectedPlugins(all);
    refreshPluginsViewState();
    drawer?.classList.add('hidden');
    showToast(`${activePluginId.toUpperCase()} plugin connection saved in AI UNIVERSE.`);
  });

  document.getElementById('disconnectPluginBtn')?.addEventListener('click', () => {
    if (!activePluginId) return;
    const all = loadConnectedPlugins();
    delete all[activePluginId];
    saveConnectedPlugins(all);
    refreshPluginsViewState();
    drawer?.classList.add('hidden');
    showToast(`${activePluginId.toUpperCase()} plugin disconnected.`);
  });

  document.querySelectorAll('.plugin-chat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.pluginId;
      const savedUrl = loadConnectedPlugins()[pid]?.url;
      const basePrompt = btn.dataset.prompt || '';
      switchView('chatView');
      const promptInput = document.getElementById('promptInput');
      if (promptInput) {
        promptInput.value = savedUrl ? `${basePrompt}(Workspace: ${savedUrl}) ` : basePrompt;
        promptInput.focus();
      }
    });
  });

  document.querySelectorAll('.plugin-pc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.pluginId;
      const savedUrl = loadConnectedPlugins()[pid]?.url;
      switchView('chatView');
      const promptInput = document.getElementById('promptInput');
      if (promptInput) {
        promptInput.value = savedUrl ? `/pc open chrome to ${savedUrl}` : (btn.dataset.pcCmd || '/pc open chrome');
        promptInput.focus();
      }
      showToast('Prepared /pc browser command in composer — press Enter to run.');
    });
  });

  document.getElementById('pluginRefreshBridgeBtn')?.addEventListener('click', async () => {
    if (typeof checkBridgeHealth === 'function') await checkBridgeHealth();
    refreshPluginsViewState();
    showToast(state.bridgeConnected ? 'PC Bridge (:5050) is connected!' : 'PC Bridge not detected — run pc-bridge/START_PC_BRIDGE.bat.');
  });

  document.querySelectorAll('.open-settings-bridge-btn').forEach(b => {
    b.addEventListener('click', () => openSettings('mtabBridge'));
  });
  document.querySelectorAll('.open-settings-custom-btn').forEach(b => {
    b.addEventListener('click', () => openSettings('mtabApis'));
  });

  refreshPluginsViewState();
}
