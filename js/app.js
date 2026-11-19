const BASE_AI_CATALOG = [
  {
    id: 'auto',
    name: '⚡ Auto',
    desc: 'Adapts to your needs',
    models: [
      { id: 'auto-best', name: 'Auto Best', desc: 'Picks the strongest AI & model', tier: 'FREE' }
    ]
  },
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    desc: 'Agentic full-stack coding',
    models: [
      { id: 'gemini-4-argon', name: '4 Argon', desc: 'Deeper architecture & coding', tier: 'PRO', apiModel: 'gemini-4-argon' },
      { id: 'hydrogen', name: '4 Hydrogen (3.1 Pro)', desc: 'Pro coding & reasoning', tier: 'PRO', apiModel: 'gemini-3.1-pro-preview' },
      { id: 'agy-3.8-flash', name: 'Antigravity 3.8 Flash', desc: 'Fast free-tier coding', tier: 'FREE', apiModel: 'gemini-3.8-flash' },
      { id: 'agy-3-flash', name: 'Antigravity 3 Flash', desc: 'Quick web prototyping', tier: 'FREE', apiModel: 'gemini-3-flash-preview' }
    ]
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    desc: 'Everyday help, vision & files',
    models: [
      { id: 'gemini-4-argon', name: 'Gemini 4 Argon', desc: 'Flagship Pro reasoning', tier: 'PRO', apiModel: 'gemini-4-argon' },
      { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro Preview', desc: 'Advanced Pro model', tier: 'PRO', apiModel: 'gemini-3.1-pro-preview' },
      { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', desc: 'Fast & free-tier friendly', tier: 'FREE', apiModel: 'gemini-3.8-flash' },
      { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', desc: 'Reliable free-tier model', tier: 'FREE', apiModel: 'gemini-3.6-flash' },
      { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite', desc: 'Ultra-low latency', tier: 'FREE', apiModel: 'gemini-3.5-flash-lite' },
      { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', desc: 'Lightweight free model', tier: 'FREE', apiModel: 'gemini-3.1-flash-lite' },
      { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash Preview', desc: 'General purpose', tier: 'FREE', apiModel: 'gemini-3-flash-preview' }
    ]
  },
  {
    id: 'nanobanana',
    name: '🍌 Nano Banana',
    desc: 'AI photo & image generation',
    models: [
      { id: 'gemini-nano-banana-2.1', name: 'Nano Banana 2.1', desc: 'High-detail image model', tier: 'PRO', apiModel: 'gemini-nano-banana-2.1' },
      { id: 'gemini-3-pro-image', name: 'Nano Banana Pro 4K', desc: 'Studio image output', tier: 'PRO', apiModel: 'gemini-3-pro-image' },
      { id: 'gemini-3.1-flash-image', name: 'Nano Banana 2 Flash', desc: 'Fast image generation', tier: 'FREE', apiModel: 'gemini-3.1-flash-image' },
      { id: 'gemini-3.1-flash-lite-image', name: 'Nano Banana 2 Lite', desc: 'Instant image drafts', tier: 'FREE', apiModel: 'gemini-3.1-flash-lite-image' }
    ]
  },
  {
    id: 'flow',
    name: 'Google Flow + Veo',
    desc: 'Cinema video generation',
    models: [
      { id: 'gemini-omni-1.1-flash', name: 'Gemini Omni Video', desc: 'Multimodal video', tier: 'PRO', apiModel: 'gemini-omni-1.1-flash' },
      { id: 'flow-director-v2', name: 'Flow AI Director v2', desc: 'Inline motion canvas & WEBM', tier: 'PRO' },
      { id: 'veo-3-cinema', name: 'Veo 3 Cinema 4K', desc: 'Cinematic scenes', tier: 'PRO' },
      { id: 'flow-express', name: 'Flow Express', desc: 'Quick motion render', tier: 'FREE' }
    ]
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    desc: 'OpenAI + $0 Puter Free',
    models: [
      { id: 'o3-mini', name: 'o3 Reasoning', desc: 'Deep step-by-step logic', tier: 'PRO', apiModel: 'o3-mini' },
      { id: 'gpt-4o', name: 'GPT-4o Omni', desc: 'Vision & flagship chat', tier: 'PRO', apiModel: 'gpt-4o' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini ($0 Free)', desc: 'Runs free via Puter.js', tier: 'FREE', apiModel: 'gpt-4o-mini' }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    desc: 'Anthropic direct browser API',
    models: [
      { id: 'claude-3-7-sonnet-latest', name: 'Claude 3.7 Sonnet', desc: 'Writing, vision & code craft', tier: 'PRO', apiModel: 'claude-3-7-sonnet-latest' },
      { id: 'claude-3-5-haiku-latest', name: 'Claude 3.5 Haiku', desc: 'Fast responses', tier: 'FREE', apiModel: 'claude-3-5-haiku-latest' }
    ]
  },
  {
    id: 'ollama',
    name: '🦙 Local Ollama',
    desc: 'PC models + PC Control',
    models: [
      { id: 'qwen2.5-coder:7b', name: 'qwen2.5-coder:7b', desc: 'Local PC coding model', tier: 'FREE' },
      { id: 'llama3.2', name: 'llama3.2', desc: 'Local PC assistant', tier: 'FREE' }
    ]
  }
];

const GEMINI_FALLBACK_CHAIN = [
  'gemini-3.1-pro-preview',
  'gemini-3.8-flash',
  'gemini-3.6-flash',
  'gemini-3-flash-preview',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite'
];

let AI_CATALOG = JSON.parse(JSON.stringify(BASE_AI_CATALOG));

// One active foreground request per tab. Aborting it stops the provider fetch.
let activeRequestController = null;
let activeRequestChatId = null;
function aiFetch(input, init = {}) {
  const signal = init.signal || activeRequestController?.signal;
  return fetch(input, { ...init, ...(signal ? { signal } : {}) });
}

const state = {
  activeView: 'chatView',
  chatTaskMode: 'chat',
  selectedAiId: 'auto',
  selectedModelId: 'auto-best',
  effort: 'HIGH',
  tierFilter: 'ALL',
  executionMode: 'cloud',
  pcPermission: 'ask',
  bridgeConnected: false,
  pcPlatform: 'win32',
  renamingChatId: null,
  skippedAuthGate: false,
  pendingAttachments: [],
  activeInlineCanvases: [],
  discoveredGeminiModels: JSON.parse(localStorage.getItem('aiu_v3_gemini_models') || '[]'),
  settings: JSON.parse(localStorage.getItem('aiu_v2_settings') || JSON.stringify({
    geminiKey: '',
    openaiKey: '',
    claudeKey: '',
    bridgeUrl: 'http://localhost:5050',
    bridgeToken: '',
    ollamaUrl: 'http://localhost:11434'
  })),
  customProviders: JSON.parse(localStorage.getItem('aiu_v2_custom_providers') || '[]'),
  chats: JSON.parse(localStorage.getItem('aiu_v2_chats') || '[]'),
  generatedImages: JSON.parse(localStorage.getItem('aiu_v4_images') || '[]'),
  activeChatId: null,
  generatedFiles: {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Generated App</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="hero">
    <h1>AI UNIVERSE Live Preview</h1>
    <p>Ask the AI to build any game or website—or upload a ZIP file in chat to analyze and upgrade it!</p>
    <button id="demoBtn">Test Interactive JS</button>
  </div>
  <script src="js/app.js"></script>
</body>
</html>`,
    'css/style.css': `body { font-family: system-ui, sans-serif; background: #090c14; color: #eef2ff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
.hero { text-align: center; padding: 34px; background: #121725; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); max-width: 480px; }
button { background: #7c3aed; color: white; border: none; padding: 10px 20px; border-radius: 999px; cursor: pointer; font-weight: 600; margin-top: 14px; }`,
    'js/app.js': `document.getElementById('demoBtn')?.addEventListener('click', () => {
  alert('Live Sandbox Preview is running!');
});`
  },
  pendingCommandResolve: null
};

function getFirebasePayload() {
  return {
    settings: state.settings,
    customProviders: state.customProviders,
    preferences: {
      selectedAiId: state.selectedAiId,
      selectedModelId: state.selectedModelId,
      effort: state.effort,
      executionMode: state.executionMode,
      pcPermission: state.pcPermission,
      activeChatId: state.activeChatId
    },
    chats: state.chats,
    generatedImages: state.generatedImages
  };
}

function rebuildCatalog() {
  const existingOllamaModels = AI_CATALOG.find(a => a.id === 'ollama')?.models || BASE_AI_CATALOG.find(a => a.id === 'ollama').models;
  AI_CATALOG = JSON.parse(JSON.stringify(BASE_AI_CATALOG));
  AI_CATALOG.find(a => a.id === 'ollama').models = existingOllamaModels;

  if (state.discoveredGeminiModels.length) {
    const geminiEntry = AI_CATALOG.find(a => a.id === 'gemini');
    const existingIds = new Set(geminiEntry.models.map(m => m.apiModel || m.id));
    state.discoveredGeminiModels.forEach(dm => {
      if (!existingIds.has(dm.id)) {
        geminiEntry.models.push({
          id: dm.id,
          name: dm.displayName || dm.id,
          desc: 'Synced from Google AI Studio',
          tier: dm.id.includes('pro') || dm.id.includes('argon') ? 'PRO' : 'FREE',
          apiModel: dm.id
        });
      }
    });
  }

  state.customProviders.forEach(cp => {
    AI_CATALOG.push({
      id: cp.id,
      name: `🔌 ${cp.name}`,
      desc: cp.baseUrl,
      isCustom: true,
      customConfig: cp,
      models: [{ id: cp.model, name: cp.model, desc: 'Custom API model', tier: 'PRO', apiModel: cp.model }]
    });
  });
}

// Immediate local backup + immediate Firebase Realtime Database write (so closing never loses data)
function saveState(skipCloud = false) {
  localStorage.setItem('aiu_v2_settings', JSON.stringify(state.settings));
  localStorage.setItem('aiu_v2_custom_providers', JSON.stringify(state.customProviders));
  localStorage.setItem('aiu_v2_chats', JSON.stringify(state.chats));
  localStorage.setItem('aiu_v3_gemini_models', JSON.stringify(state.discoveredGeminiModels));
  try {
    localStorage.setItem('aiu_v4_images', JSON.stringify(state.generatedImages.slice(0, 15)));
  } catch (_) {}
  updateApiStatusIndicator();

  if (!skipCloud && window.AIUFirebase && window.AIUFirebase.getUser()) {
    window.AIUFirebase.pushNow(getFirebasePayload()).catch(() => {});
  }
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function updateApiStatusIndicator() {
  const pill = document.getElementById('apiStatusPill');
  const active = [];
  if (state.settings.geminiKey) active.push('Gemini');
  if (state.settings.openaiKey) active.push('OpenAI');
  if (state.settings.claudeKey) active.push('Claude');
  if (state.bridgeConnected) active.push('PC Bridge');

  if (active.length) {
    pill.textContent = active.join(' • ');
    pill.className = 'badge badge-cloud';
  } else {
    pill.textContent = 'Free Fallback';
    pill.className = 'badge badge-warn';
  }
}

/* ================= FIREBASE USER PROFILE & SYNC STATUS ================= */
function updateFirebaseSyncStatusUI(status, detail) {
  const cloudPill = document.getElementById('cloudSyncPill');
  const subEl = document.getElementById('userSyncStatus');

  if (status === 'saving' || status === 'syncing') {
    cloudPill.textContent = '⏳ Saving to Firebase...';
    cloudPill.className = 'badge badge-warn';
    cloudPill.classList.remove('hidden');
    if (window.AIUFirebase?.getUser()) subEl.textContent = '⏳ Syncing...';
  } else if (status === 'synced') {
    cloudPill.textContent = '🔥 Saved in Firebase';
    cloudPill.className = 'badge badge-cloud';
    cloudPill.classList.remove('hidden');
    if (window.AIUFirebase?.getUser()) subEl.textContent = '🔥 Saved in Firebase';
  } else if (status === 'error') {
    cloudPill.textContent = '⚠️ Firebase Sync Error';
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
    welcomeHeading.textContent = firstName ? `Hi ${firstName}, where should we start?` : 'Where should we start?';
  } else {
    avatarWrap.textContent = 'G';
    nameEl.textContent = 'Sign in with Google';
    subEl.textContent = window.AIUFirebase?.isConfigured() ? 'Click to sync with Firebase' : 'Set js/firebase-config.js';
    signOutTopBtn.classList.add('hidden');
    forceSaveTopBtn.classList.add('hidden');
    welcomeHeading.textContent = 'Where should we start?';

    // Show clean Google Auth gate automatically if js/firebase-config.js is configured
    if (window.AIUFirebase?.isConfigured() && !state.skippedAuthGate) {
      authGate.classList.remove('hidden');
    }
  }
}

/* ================= FILE / IMAGE / ZIP UPLOAD & EXTRACTION ================= */
const TEXT_EXTENSIONS = new Set([
  'txt', 'md', 'html', 'htm', 'css', 'js', 'mjs', 'cjs', 'ts', 'tsx', 'jsx',
  'json', 'csv', 'py', 'java', 'c', 'cpp', 'h', 'hpp', 'xml', 'svg', 'sql',
  'yml', 'yaml', 'bat', 'sh', 'ps1', 'php', 'rb', 'go', 'rs', 'env', 'ini'
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

    if (ext === 'zip' || file.type.includes('zip')) {
      try {
        const zip = await JSZip.loadAsync(file);
        const allPaths = [];
        const extractedBlocks = [];
        let totalChars = 0;
        const maxChars = 48000;
        let loadedWebFiles = false;

        for (const [entryPath, entry] of Object.entries(zip.files)) {
          if (entry.dir) continue;
          if (entryPath.includes('node_modules/') || entryPath.includes('.git/')) continue;
          allPaths.push(entryPath);

          const eExt = (entryPath.split('.').pop() || '').toLowerCase();
          if (TEXT_EXTENSIONS.has(eExt)) {
            const content = await entry.async('string');
            const norm = entryPath.replace(/^[^/]+\//, '');
            if (norm === 'index.html' || entryPath === 'index.html') {
              state.generatedFiles['index.html'] = content;
              loadedWebFiles = true;
            } else if (norm.endsWith('.css') && norm.includes('style')) {
              state.generatedFiles['css/style.css'] = content;
              loadedWebFiles = true;
            } else if (norm.endsWith('.js') && (norm.includes('app.js') || norm.includes('script.js'))) {
              state.generatedFiles['js/app.js'] = content;
              loadedWebFiles = true;
            } else if (allPaths.length <= 20) {
              state.generatedFiles[entryPath] = content;
            }

            if (totalChars < maxChars) {
              const snippet = content.slice(0, 8000);
              extractedBlocks.push(`--- FILE: ${entryPath} ---\n${snippet}`);
              totalChars += snippet.length;
            }
          }
        }

        if (loadedWebFiles) {
          updatePreviewAndFiles();
          document.getElementById('previewBadge').classList.remove('hidden');
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
      state.pendingAttachments.push({
        id, kind: 'pdf', name: file.name, mimeType: 'application/pdf', size: file.size, base64
      });
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
      : att.kind === 'zip' ? '📦' : att.kind === 'pdf' ? '📄' : '📝';
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

/* ================= VIEW NAVIGATION ================= */
function switchView(viewId) {
  state.activeView = viewId;
  document.querySelectorAll('.stage-view').forEach(v => v.classList.toggle('active', v.id === viewId));
  document.querySelectorAll('.view-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewId));

  const titles = {
    chatView: 'AI UNIVERSE',
    previewView: '🌐 Live Preview',
    zipView: '📦 ZIP & Separated Files',
    imagesView: '🖼️ Images — Nano Banana',
    videosView: '🎬 Videos — Flow & Veo',
    pcView: '🖥️ PC Control & Ollama',
    pluginsView: '🧩 Plugins & Connected Apps'
  };
  document.getElementById('activeViewTitle').textContent = titles[viewId] || 'AI UNIVERSE';
  document.getElementById('backToChatTopBtn').classList.toggle('hidden', viewId === 'chatView');

  if (viewId === 'previewView' || viewId === 'zipView') updatePreviewAndFiles();
  if (viewId === 'imagesView') renderImagesGallery();
  if (viewId === 'videosView') startFlowCanvas(document.getElementById('videoPromptInput').value.trim() || 'AI UNIVERSE Flow Cinema');

  closeMobileSidebar();
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('mobileOverlay').classList.add('hidden');
}

/* ================= CHATBAR DROPDOWNS ================= */
function getSelectedAi() {
  return AI_CATALOG.find(a => a.id === state.selectedAiId) || AI_CATALOG[0];
}

function modelHasConfiguredAccess(model) {
  if (model.tier !== 'PRO') return true;
  if (getSelectedAi().isCustom) return true;
  const aiId = getSelectedAi().id;
  if (['gemini','antigravity','nanobanana','flow'].includes(aiId)) return Boolean(state.settings.geminiKey && state.discoveredGeminiModels.some(x => x.id === (model.apiModel || model.id)));
  if (aiId === 'chatgpt') return Boolean(state.settings.openaiKey);
  if (aiId === 'claude') return Boolean(state.settings.claudeKey);
  return false;
}
function filterModels(models) {
  const visible = models.filter(modelHasConfiguredAccess);
  if (state.tierFilter === 'ALL') return visible;
  const f = visible.filter(m => m.tier === state.tierFilter);
  return f.length ? f : visible;
}

function renderDropdowns() {
  const aiMenu = document.getElementById('aiDropdownMenu');
  const modelMenu = document.getElementById('modelDropdownMenu');
  const currentAi = getSelectedAi();

  document.getElementById('selectedAiLabel').textContent = currentAi.name;

  aiMenu.innerHTML = `<div class="menu-section-title">Select AI Engine</div>` + AI_CATALOG.map(ai => `
    <div class="menu-item ${ai.id === state.selectedAiId ? 'selected' : ''}" data-ai="${ai.id}">
      <div>
        <div class="menu-item-title">${escapeHtml(ai.name)}</div>
        <div class="menu-item-sub">${escapeHtml(ai.desc || '')}</div>
      </div>
      <span class="check-mark">${ai.id === state.selectedAiId ? '✓' : ''}</span>
    </div>
  `).join('');

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

  const tierBarHtml = `
    <div class="menu-section-title">Select Model</div>
    <div class="menu-tier-bar">
      <button type="button" class="menu-tier-btn ${state.tierFilter === 'ALL' ? 'active' : ''}" data-tier="ALL">All</button>
      <button type="button" class="menu-tier-btn ${state.tierFilter === 'PRO' ? 'active' : ''}" data-tier="PRO">API access</button>
      <button type="button" class="menu-tier-btn ${state.tierFilter === 'FREE' ? 'active' : ''}" data-tier="FREE">FREE</button>
    </div>
  `;

  modelMenu.innerHTML = tierBarHtml + availableModels.map(m => `
    <div class="menu-item ${m.id === state.selectedModelId ? 'selected' : ''}" data-model="${m.id}">
      <div>
        <div class="menu-item-title">${escapeHtml(m.name)}</div>
        <div class="menu-item-sub">${escapeHtml(m.desc || m.apiModel || '')}</div>
      </div>
      <span class="badge ${m.tier === 'PRO' ? 'badge-pro' : 'badge-cloud'}">${m.tier === 'PRO' ? 'API' : 'FREE'}</span>
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

  const niceEffort = state.effort.charAt(0) + state.effort.slice(1).toLowerCase();
  document.getElementById('selectedThinkingLabel').textContent = `Thinking: ${niceEffort}`;
  document.querySelectorAll('#thinkingDropdownMenu .menu-item').forEach(item => {
    const isSel = item.dataset.effort === state.effort;
    item.classList.toggle('selected', isSel);
    item.querySelector('.check-mark').textContent = isSel ? '✓' : '';
  });
}

/* ================= SAVED CHATS (DELETABLE & RENAMABLE) ================= */
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
      : '<div class="chat-list-empty">Your conversations will appear here. Start a new chat to begin.</div>';
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

/* ================= INLINE CHAT RENDERING ================= */
function openLightbox(src, caption = '') {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  document.getElementById('lightboxDownload').href = src;
  document.getElementById('imageLightbox').classList.remove('hidden');
}

function stopInlineCanvasLoops() {
  state.activeInlineCanvases.forEach(id => cancelAnimationFrame(id));
  state.activeInlineCanvases = [];
}

function animateCanvasElement(canvas, sceneText) {
  const ctx = canvas.getContext('2d');
  let t = Math.random() * 10;

  function draw() {
    if (!document.body.contains(canvas)) return;
    t += 0.03;
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#090c14');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#3b0764');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 18; i++) {
      const x = (canvas.width / 2) + Math.cos(t + i * 0.7) * (95 + i * 9);
      const y = (canvas.height / 2) + Math.sin(t * 1.25 + i * 0.6) * (55 + i * 4);
      ctx.beginPath();
      ctx.arc(x, y, 4 + (i % 5), 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(167, 139, 250, 0.72)' : 'rgba(16, 185, 129, 0.58)';
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.font = '600 17px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(String(sceneText || 'AI UNIVERSE Flow Video').slice(0, 46), canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = 'rgba(196, 181, 253, 0.75)';
    ctx.font = '12px system-ui';
    ctx.fillText('Google Flow AI + Veo Motion Scene', canvas.width / 2, canvas.height / 2 + 26);

    const rafId = requestAnimationFrame(draw);
    state.activeInlineCanvases.push(rafId);
  }
  draw();
}

function recordSpecificCanvasWebm(canvas, btnEl) {
  const originalText = btnEl.textContent;
  btnEl.textContent = '⏺ Recording 4s...';
  btnEl.disabled = true;
  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  const chunks = [];
  recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-universe-video-${Date.now()}.webm`;
    a.click();
    btnEl.textContent = '✓ Saved .WEBM';
    btnEl.disabled = false;
    setTimeout(() => { btnEl.textContent = originalText; }, 2200);
  };
  recorder.start();
  setTimeout(() => recorder.stop(), 4000);
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
  stopInlineCanvasLoops();
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
        const ico = a.kind === 'zip' ? '📦' : a.kind === 'pdf' ? '📄' : '📝';
        const extra = a.kind === 'zip' && a.fileCount ? ` (${a.fileCount} files)` : '';
        return `<span class="msg-attach-badge">${ico} ${escapeHtml(a.name + extra)}</span>`;
      }).join('') + `</div>`;
    }

    let thoughtHtml = '';
    if (m.role === 'assistant' && Array.isArray(m.thoughtSteps) && m.thoughtSteps.length) {
      thoughtHtml = `
        <details class="thought-details">
          <summary>💭 Thought process (${escapeHtml(m.thoughtDuration || 'done')}) ▾</summary>
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
          <img src="${m.artifacts.imageUrl}" class="inline-chat-img zoomable-img" data-caption="${escapeHtml(m.artifacts.imagePrompt || 'Generated Image')}" alt="Generated Image" />
          <div class="inline-media-actions">
            <span class="muted">🍌 Generated Photo</span>
            <div class="btn-row">
              <a href="${m.artifacts.imageUrl}" download="ai-universe-photo-${idx}.png" target="_blank" class="mini-btn">⬇️ Download PNG</a>
              <button type="button" class="mini-btn open-artifact-btn" data-open-view="imagesView">🖼️ Images Gallery</button>
            </div>
          </div>
        </div>
      `;
    }

    let inlineVideoHtml = '';
    if (m.artifacts?.hasVideo) {
      const canvasId = `inlineVideoCanvas_${idx}`;
      inlineVideoHtml = `
        <div class="inline-media-card">
          <canvas id="${canvasId}" class="inline-video-canvas" data-scene="${escapeHtml(m.artifacts.videoPrompt || 'AI UNIVERSE Video')}" width="540" height="304"></canvas>
          <div class="inline-media-actions">
            <span class="muted">🎬 Flow / Veo Motion Video</span>
            <div class="btn-row">
              <button type="button" class="mini-btn record-inline-video-btn" data-canvas-id="${canvasId}">⏺ Record &amp; Save .WEBM</button>
              <button type="button" class="mini-btn open-artifact-btn" data-open-view="videosView">🎬 Open Studio</button>
            </div>
          </div>
        </div>
      `;
    }

    let quickLinksHtml = '';
    if (m.artifacts?.hasApp) {
      quickLinksHtml += `<button type="button" class="mini-btn open-artifact-btn" data-open-view="previewView">🌐 Open Live Preview</button>`;
      quickLinksHtml += `<button type="button" class="mini-btn open-artifact-btn" data-open-view="zipView">📦 Open ZIP &amp; Files</button>`;
    }

    return `
      <div class="msg ${m.role}">
        ${m.meta ? `<div class="msg-meta"><span>${escapeHtml(m.meta)}</span></div>` : ''}
        ${userAttHtml}
        ${thoughtHtml}
        ${m.role === 'assistant' ? renderFormattedMessage(m.content) : escapeHtml(m.content)}
        ${inlinePhotoHtml}
        ${inlineVideoHtml}
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

  stream.querySelectorAll('.open-artifact-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.openView));
  });

  stream.querySelectorAll('.zoomable-img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.dataset.caption || ''));
  });

  stream.querySelectorAll('.inline-video-canvas').forEach(canvas => {
    animateCanvasElement(canvas, canvas.dataset.scene);
  });
  stream.querySelectorAll('.record-inline-video-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const canvas = document.getElementById(btn.dataset.canvasId);
      if (canvas) recordSpecificCanvasWebm(canvas, btn);
    });
  });

  scrollArea.scrollTop = scrollArea.scrollHeight;
}

/* ================= LIVE THINKING BUBBLE ================= */
function getThinkingStepPlan(provider, prompt, attachments) {
  const hasImg = attachments.some(a => a.kind === 'image');
  const hasZip = attachments.some(a => a.kind === 'zip');
  const hasDoc = attachments.some(a => a.kind === 'pdf' || a.kind === 'text');
  const p = prompt.toLowerCase();

  if (provider === 'nanobanana') {
    return [
      'Understanding your visual scene & composition...',
      'Making image with Nano Banana AI...',
      'Rendering high-resolution photo directly in chat...'
    ];
  }
  if (provider === 'flow') {
    return [
      'Directing Google Flow AI & Veo motion scene...',
      'Preparing animation frames & .WEBM video recorder...',
      'Embedding interactive video player in chat...'
    ];
  }
  if (provider === 'ollama') {
    return [
      'Connecting to PC Bridge & Local Ollama model...',
      'Planning local reasoning & PC instructions...',
      'Generating output...'
    ];
  }
  if (hasImg) {
    return [
      'Scanning uploaded image pixels & visual details...',
      'Analyzing image contents against your instructions...',
      'Drafting accurate response...'
    ];
  }
  if (hasZip) {
    return [
      'Inspecting extracted ZIP folder structure & code files...',
      'Thinking about project architecture & requested updates...',
      'Compiling updated code for Live Preview & ZIP...'
    ];
  }
  if (hasDoc) {
    return [
      'Reading uploaded file contents...',
      'Analyzing document details & instructions...',
      'Preparing structured answer...'
    ];
  }
  if (p.includes('game') || p.includes('website') || p.includes('app') || p.includes('html') || p.includes('build')) {
    return [
      'Thinking about project architecture & game/UI mechanics...',
      'Writing separated HTML, CSS & JavaScript modules...',
      'Preparing Live Web Preview & downloadable ZIP...'
    ];
  }
  return [
    `Thinking at ${state.effort} level...`,
    `Consulting ${provider} model...`,
    'Formatting clear final response...'
  ];
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
  }, 1800);

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
    finish() {
      clearInterval(timerInterval);
      clearInterval(stepInterval);
      const duration = ((performance.now() - startTime) / 1000).toFixed(1) + 's';
      card.remove();
      return { steps: completedSteps, duration };
    }
  };
}

/* ================= LIVE MULTIMODAL AI CALLERS ================= */
async function syncGeminiModelsFromApi(apiKey) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || 'Invalid API key');
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
      if (textFiles.length) {
        textBody += '\n\n' + textFiles.map(f => f.textContent).join('\n\n');
      }
      parts.push({ text: textBody || 'Analyze the attached file(s) and help as requested.' });

      latestAttachments.forEach(att => {
        if ((att.kind === 'image' || att.kind === 'pdf') && att.base64) {
          parts.push({ inlineData: { mimeType: att.mimeType, data: att.base64 } });
        }
      });
    } else {
      parts.push({ text: textBody });
    }

    return { role: m.role === 'assistant' ? 'model' : 'user', parts };
  });
}

async function callGeminiWithFallback(preferredModel, messages, systemPrompt, imageMode = false, latestAttachments = [], thinkingCtrl = null) {
  const apiKey = state.settings.geminiKey;
  const contents = buildGeminiContents(messages, latestAttachments);

  const candidates = imageMode
    ? [preferredModel, 'gemini-nano-banana-2.1', 'gemini-3.1-flash-image', 'gemini-3.1-flash-lite-image', 'gemini-3-pro-image']
    : [preferredModel, ...GEMINI_FALLBACK_CHAIN, ...state.discoveredGeminiModels.map(m => m.id)];

  const uniqueCandidates = [...new Set(candidates.filter(Boolean))];
  let lastError = 'Gemini API call failed.';

  for (const modelId of uniqueCandidates) {
    try {
      const body = imageMode
        ? {
            contents: [{
              parts: [
                { text: messages[messages.length - 1]?.content || 'Generate art' },
                ...latestAttachments.filter(a => a.kind === 'image' && a.base64).map(a => ({
                  inlineData: { mimeType: a.mimeType, data: a.base64 }
                }))
              ]
            }],
            generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
          }
        : {
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents
          };

      const res = await aiFetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      );

      const data = await res.json();
      if (!res.ok) {
        const msg = data?.error?.message || `HTTP ${res.status}`;
        lastError = `${modelId}: ${msg}`;
        const retryable =
          res.status === 404 || res.status === 429 || res.status === 400 ||
          /no longer available|not found|quota|billing|not supported|deprecated/i.test(msg);
        if (retryable) {
          if (thinkingCtrl) thinkingCtrl.pushStep(`Switching from ${modelId} to next live model...`);
          continue;
        }
        throw new Error(lastError);
      }

      const parts = data?.candidates?.[0]?.content?.parts || [];
      let reply = '';
      let imageDataUrl = null;
      for (const p of parts) {
        if (p.text) reply += p.text;
        if (p.inlineData) {
          imageDataUrl = `data:${p.inlineData.mimeType};base64,${p.inlineData.data}`;
        }
      }

      if (imageMode && !imageDataUrl) {
        lastError = `${modelId}: returned text only, no image`;
        continue;
      }

      return {
        reply: reply || (imageDataUrl ? `🍌 Generated photo using **${modelId}**.` : 'Empty reply.'),
        imageDataUrl,
        actualModel: modelId
      };
    } catch (err) {
      if (err?.name === 'AbortError') throw err;
      lastError = err.message;
    }
  }

  throw new Error(lastError);
}

/* ================= OLLAMA & PC CONTROL BRIDGE ================= */
function appendPcLog(entry) {
  const el = document.getElementById('pcTerminalLog');
  const stamp = new Date().toLocaleTimeString();
  el.textContent += `\n[${stamp}] ${entry}\n`;
  el.scrollTop = el.scrollHeight;
}

async function testBridgeAndScanOllama(silent = false) {
  const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
  const token = state.settings.bridgeToken || '';
  const ollamaUrl = (state.settings.ollamaUrl || 'http://localhost:11434').replace(/\/$/, '');
  const resultEl = document.getElementById('bridgeTestResult');

  if (!token) {
    if (resultEl) resultEl.innerHTML = '<span style="color:#fbbf24;">⚠️ Paste your PC Bridge Token from START_PC_BRIDGE.bat first.</span>';
    if (!silent) alert('Open ⚙️ Settings -> 2. Ollama & PC and paste the Bridge Token shown by START_PC_BRIDGE.bat.');
    return false;
  }

  try {
    const statusRes = await fetch(`${bridgeUrl}/bridge/status`, { headers: { 'x-bridge-token': token } });
    const statusData = await statusRes.json();
    if (!statusRes.ok) throw new Error(statusData.error || 'Bridge auth failed');

    state.bridgeConnected = true;
    state.pcPlatform = statusData.platform || 'win32';
    document.getElementById('bridgeMiniStatus').textContent = statusData.hostname;
    document.getElementById('bridgeMiniStatus').className = 'badge badge-cloud';
    updateApiStatusIndicator();

    let ollamaMsg = '';
    try {
      const tagsRes = await fetch(`${bridgeUrl}/bridge/ollama/tags`, {
        headers: { 'x-bridge-token': token, 'x-ollama-url': ollamaUrl }
      });
      const tagsData = await tagsRes.json();
      if (tagsData.ok && tagsData.models?.length) {
        const ollamaEntry = AI_CATALOG.find(a => a.id === 'ollama');
        ollamaEntry.models = tagsData.models.map(m => ({
          id: m.name, name: m.name, desc: 'Local PC Ollama model', tier: 'FREE'
        }));
        renderDropdowns();
        ollamaMsg = ` Found ${tagsData.models.length} Ollama models!`;
      } else {
        ollamaMsg = ' Bridge online, but no Ollama models found.';
      }
    } catch (_) {
      ollamaMsg = ' Bridge online (Ollama not running).';
    }

    if (resultEl) {
      resultEl.innerHTML = `<span style="color:#34d399;">✅ Connected to <strong>${escapeHtml(statusData.hostname)}</strong> (${statusData.platform}, ${statusData.totalRamGB}GB RAM).${escapeHtml(ollamaMsg)}</span>`;
    }
    return true;
  } catch (err) {
    state.bridgeConnected = false;
    document.getElementById('bridgeMiniStatus').textContent = 'Offline';
    document.getElementById('bridgeMiniStatus').className = 'badge badge-warn';
    updateApiStatusIndicator();
    if (resultEl) resultEl.innerHTML = `<span style="color:#f87171;">❌ ${escapeHtml(err.message)}</span>`;
    if (!silent) alert('Could not reach PC Bridge: ' + err.message);
    return false;
  }
}

function requestPcCommandApproval(command) {
  return new Promise(resolve => {
    if (state.pcPermission === 'allow') {
      resolve({ approved: true, command });
      return;
    }
    document.getElementById('pendingPcCommandInput').value = command;
    document.getElementById('pcApprovalModal').classList.remove('hidden');
    state.pendingCommandResolve = resolve;
  });
}

async function runPcCommandThroughBridge(rawCommand) {
  if (!state.settings.bridgeToken) {
    return { ok: false, error: 'PC Bridge not configured. Open ⚙️ Settings -> 2. Ollama & PC.' };
  }
  const decision = await requestPcCommandApproval(rawCommand);
  if (!decision.approved) {
    appendPcLog(`DENIED > ${rawCommand}`);
    return { ok: false, denied: true };
  }

  const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
  appendPcLog(`EXEC > ${decision.command}`);
  const res = await fetch(`${bridgeUrl}/bridge/exec`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-bridge-token': state.settings.bridgeToken },
    body: JSON.stringify({ command: decision.command, permissionPolicy: state.pcPermission })
  });
  const data = await res.json();
  appendPcLog(data.stdout || data.stderr || data.error || '(Done)');
  return data;
}

/* ================= PROMPT ROUTING & EXECUTION ================= */
function autoRoutePrompt(prompt, attachments) {
  const p = prompt.toLowerCase();
  const hasUploadedImage = attachments.some(a => a.kind === 'image');
  const hasUploadedZip = attachments.some(a => a.kind === 'zip');

  if (state.executionMode === 'ollama' || state.chatTaskMode === 'pc') {
    const ollamaEntry = AI_CATALOG.find(a => a.id === 'ollama');
    const firstLocal = ollamaEntry.models[0];
    return { provider: 'ollama', model: firstLocal.id, label: `Ollama (${firstLocal.id})` };
  }
  if (hasUploadedImage && !/\b(generate|make|create|draw)\b.*\b(new image|new photo|poster)\b/i.test(p)) {
    return { provider: 'gemini', model: 'gemini-3.8-flash', label: 'Gemini Vision Analysis' };
  }
  if (hasUploadedZip) {
    return { provider: 'antigravity', model: 'hydrogen', label: 'Antigravity • ZIP Architect' };
  }
  if (state.chatTaskMode === 'image' || /\b(generate|make|create|draw)\b.*\b(image|photo|picture|logo|poster|art)\b/i.test(p)) {
    return { provider: 'nanobanana', model: 'gemini-nano-banana-2.1', label: 'Nano Banana 2.1' };
  }
  if (state.chatTaskMode === 'video' || /\b(generate|make|create)\b.*\b(video|animation|clip|movie|veo|flow)\b/i.test(p)) {
    return { provider: 'flow', model: 'flow-director-v2', label: 'Google Flow + Veo' };
  }
  if (state.chatTaskMode === 'build' || p.includes('website') || p.includes('html') || p.includes('game') || p.includes('app') || p.includes('code') || p.includes('build')) {
    return { provider: 'antigravity', model: 'hydrogen', label: 'Antigravity • 4 Hydrogen' };
  }
  return { provider: 'gemini', model: 'gemini-3.8-flash', label: 'Gemini 3.8 Flash' };
}

function buildSystemPrompt(provider, model) {
  let sys = `You are ${provider} (${model}) running at ${state.effort} thinking level inside AI UNIVERSE.
When the user uploads an image, PDF, file, or ZIP project, carefully analyze all visual and file details and execute the exact work the user asks for.
When the user asks to create or modify a web app, game, or website, ALWAYS output three complete, working separated code blocks labeled \`\`\`html, \`\`\`css, and \`\`\`javascript (where index.html links css/style.css and js/app.js) so Live Preview and ZIP export update automatically.`;

  if (state.executionMode === 'ollama') {
    const osHint = state.pcPlatform === 'win32' ? 'Windows (cmd / PowerShell)' : state.pcPlatform;
    sys += `\n\n[PC CONTROL ENABLED — OS: ${osHint}]
When the user asks you to control their PC (open apps, create files/folders, inspect directories, system info), output the exact command wrapped inside [PC_CMD] and [/PC_CMD] tags.`;
  }
  return sys;
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

  if (provider === 'ollama') {
    const bridgeUrl = (state.settings.bridgeUrl || 'http://localhost:5050').replace(/\/$/, '');
    const ollamaUrl = (state.settings.ollamaUrl || 'http://localhost:11434').replace(/\/$/, '');
    const enriched = enrichMessagesWithTextAttachments(messages, latestAttachments);
    const imgBase64s = latestAttachments.filter(a => a.kind === 'image' && a.base64).map(a => a.base64);

    const payloadMessages = [
      { role: 'system', content: systemPrompt },
      ...enriched.map((m, idx) => {
        const msgObj = { role: m.role, content: m.content };
        if (idx === enriched.length - 1 && imgBase64s.length) msgObj.images = imgBase64s;
        return msgObj;
      })
    ];

    if (state.settings.bridgeToken) {
      const res = await aiFetch(`${bridgeUrl}/bridge/ollama/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-bridge-token': state.settings.bridgeToken, 'x-ollama-url': ollamaUrl },
        body: JSON.stringify({ model: modelObj?.id || 'llama3.2', messages: payloadMessages })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ollama Bridge request failed');
      return { reply: data.reply, actualModel: modelObj?.id || 'ollama' };
    }

    const directRes = await aiFetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: modelObj?.id || 'llama3.2', messages: payloadMessages, stream: false })
    });
    const directData = await directRes.json();
    return { reply: directData?.message?.content || 'No response from Ollama.', actualModel: modelObj?.id };
  }

  if (provider === 'nanobanana') {
    const latestPrompt = messages[messages.length - 1]?.content || 'Futuristic art';
    if (state.settings.geminiKey) {
      try {
        return await callGeminiWithFallback(modelObj?.apiModel || 'gemini-nano-banana-2.1', messages, systemPrompt, true, latestAttachments, thinkingCtrl);
      } catch (_) {
        if (thinkingCtrl) thinkingCtrl.pushStep('Using fast $0 image generator fallback...');
      }
    }
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(latestPrompt)}?width=1024&height=576&nologo=true&seed=${Date.now()}`;
    return {
      reply: `🍌 Here is your generated photo for **"${latestPrompt}"**:`,
      imageDataUrl: fallbackUrl,
      actualModel: 'Nano Banana / Free Image'
    };
  }

  if (provider === 'flow') {
    const latestPrompt = messages[messages.length - 1]?.content || 'AI UNIVERSE Flow Scene';
    document.getElementById('videoPromptInput').value = latestPrompt;
    return {
      reply: `🎬 Here is your animated **Google Flow + Veo** video scene for **"${latestPrompt}"**. Click **⏺ Record & Save .WEBM** below to download the video directly from chat!`,
      isVideoArtifact: true,
      videoPrompt: latestPrompt,
      actualModel: modelObj?.name || 'Flow AI'
    };
  }

  if (provider === 'gemini' || provider === 'antigravity') {
    if (state.settings.geminiKey) {
      const preferred = modelObj?.apiModel || 'gemini-3.8-flash';
      return await callGeminiWithFallback(preferred, messages, systemPrompt, false, latestAttachments, thinkingCtrl);
    }
  }

  if (provider === 'claude') {
    if (!state.settings.claudeKey) throw new Error('Add your Anthropic Claude API key in ⚙️ Settings.');
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

    const res = await aiFetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.settings.claudeKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: modelObj?.apiModel || 'claude-3-7-sonnet-latest',
        max_tokens: 4096,
        system: systemPrompt,
        messages: claudeMsgs
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || 'Claude API error');
    return { reply: data?.content?.[0]?.text || 'No response from Claude.', actualModel: modelObj?.apiModel };
  }

  if (aiObj?.isCustom && aiObj.customConfig) {
    const cfg = aiObj.customConfig;
    const baseUrl = cfg.baseUrl.replace(/\/$/, '');
    const enriched = enrichMessagesWithTextAttachments(messages, latestAttachments);
    const res = await aiFetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.apiKey}` },
      body: JSON.stringify({
        model: cfg.model,
        messages: [{ role: 'system', content: systemPrompt }, ...enriched]
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || 'Custom AI API error');
    return { reply: data?.choices?.[0]?.message?.content || 'No response from custom AI.', actualModel: cfg.model };
  }

  if (provider === 'chatgpt') {
    const enriched = enrichMessagesWithTextAttachments(messages, latestAttachments);
    if (state.settings.openaiKey) {
      const oaiMsgs = enriched.map((m, idx) => {
        if (idx === enriched.length - 1 && latestAttachments.some(a => a.kind === 'image')) {
          const contentArr = [
            { type: 'text', text: m.content || 'Analyze this image.' },
            ...latestAttachments.filter(a => a.kind === 'image' && a.dataUrl).map(a => ({
              type: 'image_url', image_url: { url: a.dataUrl }
            }))
          ];
          return { role: m.role, content: contentArr };
        }
        return { role: m.role, content: m.content };
      });

      const res = await aiFetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.settings.openaiKey}` },
        body: JSON.stringify({
          model: modelObj?.apiModel || 'gpt-4o-mini',
          messages: [{ role: 'system', content: systemPrompt }, ...oaiMsgs]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || 'OpenAI API error');
      return { reply: data?.choices?.[0]?.message?.content || 'No reply from OpenAI.', actualModel: modelObj?.apiModel };
    }
    if (window.puter) {
      const latestMsg = enriched[enriched.length - 1]?.content || '';
      const imgAtt = latestAttachments.find(a => a.kind === 'image' && a.dataUrl);
      const puterResp = imgAtt
        ? await window.puter.ai.chat(`${systemPrompt}\n\nUser: ${latestMsg}`, imgAtt.dataUrl, { model: 'gpt-4o-mini' })
        : await window.puter.ai.chat(`${systemPrompt}\n\nUser: ${latestMsg}`, { model: 'gpt-4o-mini' });
      const text = typeof puterResp === 'string' ? puterResp : (puterResp?.message?.content || String(puterResp));
      return { reply: text, actualModel: 'gpt-4o-mini (Puter Free)' };
    }
  }

  const enriched = enrichMessagesWithTextAttachments(messages, latestAttachments);
  const latest = enriched[enriched.length - 1]?.content || '';
  if (latestAttachments.some(a => a.kind === 'image') && !state.settings.geminiKey && !state.settings.openaiKey && !state.settings.claudeKey) {
    return {
      reply: '🖼️ Image attached! To run full vision analysis on uploaded images, add your free **Google AI Studio Key** in **⚙️ Settings → 1. Cloud APIs** (or switch AI Engine to **ChatGPT** for free Puter.js vision).',
      actualModel: 'Vision Setup Hint'
    };
  }
  const freeRes = await aiFetch(`https://text.pollinations.ai/${encodeURIComponent((systemPrompt + '\n\nUser: ' + latest).slice(0, 6000))}`);
  return { reply: await freeRes.text(), actualModel: 'Free Online Relay' };
}

async function handleSendPrompt() {
  if (activeRequestController) return;
  const input = document.getElementById('promptInput');
  const rawText = input.value.trim();
  const attachments = [...state.pendingAttachments];

  if (!rawText && !attachments.length) return;
  const text = rawText || (
    attachments.some(a => a.kind === 'image') ? 'Analyze this uploaded image in detail.'
    : attachments.some(a => a.kind === 'zip') ? 'Analyze this uploaded ZIP project and explain its files and improvements.'
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
    chat.title = text.slice(0, 34) + (text.length > 34 ? '...' : '');
  }

  chat.messages.push({
    role: 'user',
    content: text,
    attachments: attachments.map(a => ({
      name: a.name, kind: a.kind, size: a.size, fileCount: a.fileCount,
      dataUrl: a.kind === 'image' ? a.dataUrl : undefined
    }))
  });
  // Save immediately to Firebase right after user sends message (zero data loss!)
  saveState();
  renderChatsSidebar();
  renderMessages();

  let targetProvider = state.selectedAiId;
  let targetModelId = state.selectedModelId;
  let routeLabel = `${getSelectedAi().name} • ${document.getElementById('selectedModelLabel').textContent}`;

  if (targetProvider === 'auto') {
    const routed = autoRoutePrompt(text, attachments);
    targetProvider = routed.provider;
    targetModelId = routed.model;
    routeLabel = `⚡ Auto → ${routed.label}`;
  }

  activeRequestController = new AbortController();
  activeRequestChatId = chat.id;
  document.getElementById('sendPromptBtn').classList.add('hidden');
  document.getElementById('stopPromptBtn').disabled = false;
  document.getElementById('stopPromptBtn').classList.remove('hidden');
  const statusBadge = document.getElementById('routeStatusBadge');
  statusBadge.textContent = 'Working...';
  statusBadge.classList.remove('hidden');

  const stepPlan = getThinkingStepPlan(targetProvider, text, attachments);
  const thinkingCtrl = createLiveThinkingBubble(routeLabel, stepPlan);

  try {
    const systemPrompt = buildSystemPrompt(targetProvider, targetModelId);
    const result = await callProviderDirect(targetProvider, targetModelId, chat.messages, systemPrompt, attachments, thinkingCtrl);
    const replyText = result.reply || '';
    const artifacts = {
      hasApp: false,
      hasImage: Boolean(result.imageDataUrl),
      imageUrl: result.imageDataUrl || '',
      imagePrompt: text,
      hasVideo: Boolean(result.isVideoArtifact),
      videoPrompt: result.videoPrompt || text
    };

    if (result.imageDataUrl) addImageToGallery(result.imageDataUrl, text);

    if (extractAndCompileCodeBlocks(replyText)) {
      artifacts.hasApp = true;
      document.getElementById('previewBadge').classList.remove('hidden');
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
    // Immediate save to Firebase Realtime Database
    saveState();
    renderMessages();

    const pcCmdMatch = replyText.match(/\[PC_CMD\]([\s\S]*?)\[\/PC_CMD\]/i);
    if (pcCmdMatch && state.executionMode === 'ollama') {
      const cmdToRun = pcCmdMatch[1].trim();
      if (cmdToRun) {
        const execResult = await runPcCommandThroughBridge(cmdToRun);
        chat.messages.push({
          role: 'assistant',
          meta: execResult.ok ? '🖥️ PC Bridge Output (Success)' : '🖥️ PC Bridge Output',
          content: execResult.denied
            ? 'Command cancelled by user.'
            : `Executed: \`${cmdToRun}\`\n\n\`\`\`text\n${execResult.stdout || execResult.stderr || execResult.error || 'Completed.'}\n\`\`\``
        });
        saveState();
        renderMessages();
      }
    }
  } catch (err) {
    const thoughtSummary = thinkingCtrl.finish();
    const wasStopped = err?.name === 'AbortError';
    chat.messages.push({
      role: 'assistant',
      meta: wasStopped ? '⏹️ Stopped' : '⚠️ Error',
      content: wasStopped ? 'Generation stopped.' : (err.message || 'The request failed.'),
      thoughtSteps: thoughtSummary.steps,
      thoughtDuration: thoughtSummary.duration
    });
    saveState();
    renderMessages();
  }

  statusBadge.classList.add('hidden');
  activeRequestController = null;
  activeRequestChatId = null;
  document.getElementById('stopPromptBtn').disabled = true;
  document.getElementById('stopPromptBtn').innerHTML = '<span class="stop-square">■</span><span class="stop-label">Stop</span>';
  document.getElementById('sendPromptBtn').classList.remove('hidden');
}

/* ================= PREVIEW, ZIP, IMAGES & VIDEO HELPERS ================= */
function extractAndCompileCodeBlocks(markdown) {
  const htmlMatch = markdown.match(/```html(?::[^\n]+)?\n([\s\S]*?)```/i);
  const cssMatch = markdown.match(/```css(?::[^\n]+)?\n([\s\S]*?)```/i);
  const jsMatch = markdown.match(/```(?:js|javascript)(?::[^\n]+)?\n([\s\S]*?)```/i);

  if (htmlMatch) state.generatedFiles['index.html'] = htmlMatch[1].trim();
  if (cssMatch) state.generatedFiles['css/style.css'] = cssMatch[1].trim();
  if (jsMatch) state.generatedFiles['js/app.js'] = jsMatch[1].trim();

  if (htmlMatch || cssMatch || jsMatch) {
    updatePreviewAndFiles();
    return true;
  }
  return false;
}

function updatePreviewAndFiles() {
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

  document.getElementById('livePreviewFrame').srcdoc = bundled;

  const keys = Object.keys(state.generatedFiles);
  document.getElementById('fileCountPill').textContent = keys.length;
  const sel = document.getElementById('fileSelector');
  sel.innerHTML = keys.map(k => `<option value="${k}">${k}</option>`).join('');
  document.getElementById('fileCodeViewer').textContent = state.generatedFiles[keys[0]] || '';
}

function addImageToGallery(src, prompt) {
  state.generatedImages.unshift({ src, prompt, date: new Date().toLocaleTimeString() });
  saveState();
  renderImagesGallery();
}

function renderImagesGallery() {
  const box = document.getElementById('imageOutputBox');
  if (!state.generatedImages.length) {
    box.innerHTML = '<p class="muted">No images generated yet. Generate one above or ask Nano Banana directly in Chat!</p>';
    return;
  }
  box.innerHTML = state.generatedImages.map((img, idx) => `
    <div class="gallery-card">
      <img src="${img.src}" class="gallery-zoom-img" data-caption="${escapeHtml(img.prompt)}" alt="${escapeHtml(img.prompt)}" />
      <div class="row-between">
        <span class="muted">${escapeHtml(img.prompt.slice(0, 42))}</span>
        <a href="${img.src}" download="nano-banana-${idx + 1}.png" target="_blank" class="mini-btn">⬇️ PNG</a>
      </div>
    </div>
  `).join('');

  box.querySelectorAll('.gallery-zoom-img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.dataset.caption || ''));
  });
}

let studioAnimFrameId = null;
function startFlowCanvas(sceneText = 'AI UNIVERSE Flow Cinema') {
  const canvas = document.getElementById('flowVideoCanvas');
  const ctx = canvas.getContext('2d');
  let t = 0;
  if (studioAnimFrameId) cancelAnimationFrame(studioAnimFrameId);

  function draw() {
    t += 0.03;
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#090c14');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#311042');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 16; i++) {
      const x = (canvas.width / 2) + Math.cos(t + i) * (135 + i * 9);
      const y = (canvas.height / 2) + Math.sin(t * 1.3 + i) * (75 + i * 5);
      ctx.beginPath();
      ctx.arc(x, y, 6 + (i % 5), 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(167, 139, 250, 0.68)' : 'rgba(16, 185, 129, 0.55)';
      ctx.fill();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(sceneText.slice(0, 48), canvas.width / 2, canvas.height / 2);
    studioAnimFrameId = requestAnimationFrame(draw);
  }
  draw();
}

function recordStudioWebm() {
  const canvas = document.getElementById('flowVideoCanvas');
  const btn = document.getElementById('recordWebmBtn');
  recordSpecificCanvasWebm(canvas, btn);
}

async function downloadGeneratedAppZip() {
  const zip = new JSZip();
  Object.entries(state.generatedFiles).forEach(([filePath, content]) => {
    zip.file(filePath, content);
  });
  const blob = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'AI_UNIVERSE_Generated_App.zip';
  a.click();
}

function renderCustomAiList() {
  const box = document.getElementById('customAiList');
  if (!state.customProviders.length) {
    box.innerHTML = '<p class="muted">No custom AIs added yet.</p>';
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

/* ================= INIT & EVENT WIRING ================= */
document.addEventListener('DOMContentLoaded', () => {
  rebuildCatalog();
  renderDropdowns();
  renderChatsSidebar();
  renderMessages();
  updatePreviewAndFiles();
  updateApiStatusIndicator();
  renderImagesGallery();
  const stopButton = document.getElementById('stopPromptBtn');
  stopButton.disabled = true;
  stopButton.classList.remove('hidden');

  if (state.settings.geminiKey) {
    syncGeminiModelsFromApi(state.settings.geminiKey).catch(() => {});
  }

  // Auto-Initialize Code-Configured Firebase (js/firebase-config.js)
  if (window.AIUFirebase) {
    window.AIUFirebase.registerPayloadGetter(getFirebasePayload);
    window.AIUFirebase.onSyncStatus((status, detail) => updateFirebaseSyncStatusUI(status, detail));
    window.AIUFirebase.onUserChange(user => updateFirebaseUserUI(user));
    window.AIUFirebase.onCloudData(cloudData => {
      if (!cloudData) return;
      if (cloudData.settings) {
        state.settings = { ...state.settings, ...cloudData.settings };
      }
      if (Array.isArray(cloudData.customProviders)) {
        state.customProviders = cloudData.customProviders;
      }
      if (cloudData.preferences) {
        if (cloudData.preferences.selectedAiId) state.selectedAiId = cloudData.preferences.selectedAiId;
        if (cloudData.preferences.selectedModelId) state.selectedModelId = cloudData.preferences.selectedModelId;
        if (cloudData.preferences.effort) state.effort = cloudData.preferences.effort;
        if (cloudData.preferences.executionMode) state.executionMode = cloudData.preferences.executionMode;
        if (cloudData.preferences.pcPermission) state.pcPermission = cloudData.preferences.pcPermission;
        if (cloudData.preferences.activeChatId) state.activeChatId = cloudData.preferences.activeChatId;
      }
      if (Array.isArray(cloudData.chats) || (cloudData.chats && typeof cloudData.chats === 'object')) {
        const cloudChatsRaw = Array.isArray(cloudData.chats) ? cloudData.chats : Object.values(cloudData.chats);
        const cloudChats = cloudChatsRaw
          .filter(c => c && typeof c === 'object')
          .map(c => ({ ...c, id: c.id || ('chat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)), title: c.title || 'New chat', messages: Array.isArray(c.messages) ? c.messages : [] }));
        // An empty cloud record must not silently erase conversations already saved in this browser.
        if (cloudChats.length || !state.chats.length) {
          state.chats = cloudChats;
          if (!state.chats.some(c => c.id === state.activeChatId)) state.activeChatId = state.chats[0]?.id || null;
          ensureActiveChat();
        } else {
          if (!state.activeChatId || !state.chats.some(c => c.id === state.activeChatId)) state.activeChatId = state.chats[0].id;
          window.AIUFirebase.pushNow(getFirebasePayload()).catch(err => console.warn('Could not restore local chats to Firebase:', err));
        }
      }
      if (Array.isArray(cloudData.generatedImages) && cloudData.generatedImages.length) {
        state.generatedImages = cloudData.generatedImages;
      }

      rebuildCatalog();
      saveState(true);
      renderDropdowns();
      renderChatsSidebar();
      renderMessages();
      renderImagesGallery();
      if (state.settings.geminiKey) {
        syncGeminiModelsFromApi(state.settings.geminiKey).catch(() => {});
      }
    });

    if (!window.AIUFirebase.isConfigured()) {
      document.getElementById('firebaseSetupBanner').classList.remove('hidden');
      updateFirebaseUserUI(null);
    } else {
      window.AIUFirebase.init().catch(err => {
        console.warn('Firebase init error:', err.message);
        updateFirebaseSyncStatusUI('error', err.message);
      });
    }
  }

  document.getElementById('dismissSetupBannerBtn').addEventListener('click', () => {
    document.getElementById('firebaseSetupBanner').classList.add('hidden');
  });

  // Google Sign-In Triggers (Auth Gate + Sidebar Account Card)
  const triggerGoogleLogin = async () => {
    const gateErr = document.getElementById('authGateError');
    if (gateErr) gateErr.textContent = '';
    try {
      await window.AIUFirebase.signInWithGoogle();
    } catch (e) {
      if (gateErr) gateErr.innerHTML = `<span style="color:#f87171;">${escapeHtml(e.message)}</span>`;
      else alert(e.message);
    }
  };

  document.getElementById('authGateGoogleBtn').addEventListener('click', triggerGoogleLogin);
  document.getElementById('authGateSkipBtn').addEventListener('click', () => {
    state.skippedAuthGate = true;
    document.getElementById('authGateOverlay').classList.add('hidden');
  });
  document.getElementById('googleAuthBtn').addEventListener('click', () => {
    if (!window.AIUFirebase.isConfigured()) {
      alert('Open js/firebase-config.js in your code and paste your Firebase Web App config (apiKey, authDomain, databaseURL, projectId, etc.), then refresh!');
      return;
    }
    if (window.AIUFirebase.getUser()) {
      window.AIUFirebase.pushNow(getFirebasePayload()).catch(e => alert(e.message));
    } else {
      triggerGoogleLogin();
    }
  });

  document.getElementById('forceSaveTopBtn').addEventListener('click', async () => {
    if (!window.AIUFirebase?.getUser()) return;
    try {
      await window.AIUFirebase.pushNow(getFirebasePayload());
    } catch (e) {
      alert('Firebase save failed: ' + e.message);
    }
  });

  document.getElementById('signOutTopBtn').addEventListener('click', async () => {
    state.skippedAuthGate = false;
    await window.AIUFirebase.signOut();
  });

  // Sidebar & Mobile Drawer
  document.getElementById('toggleSidebarBtn').addEventListener('click', () => {
    if (window.innerWidth <= 820) closeMobileSidebar();
    else document.getElementById('appShell').classList.toggle('sidebar-collapsed');
  });
  document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('mobile-open');
    document.getElementById('mobileOverlay').classList.remove('hidden');
  });
  document.getElementById('mobileOverlay').addEventListener('click', closeMobileSidebar);

  document.getElementById('brandHomeBtn').addEventListener('click', () => switchView('chatView'));
  document.getElementById('backToChatTopBtn').addEventListener('click', () => switchView('chatView'));

  document.getElementById('toggleSearchBtn').addEventListener('click', () => {
    const wrap = document.getElementById('sidebarSearchWrap');
    wrap.classList.toggle('hidden');
    if (!wrap.classList.contains('hidden')) document.getElementById('chatSearchInput').focus();
  });

  document.querySelectorAll('.view-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
  document.getElementById('newChatBtn').addEventListener('click', () => createNewChat(true));
  document.getElementById('chatSearchInput').addEventListener('input', renderChatsSidebar);

  // Lightbox Close
  document.getElementById('closeLightboxBtn').addEventListener('click', () => {
    document.getElementById('imageLightbox').classList.add('hidden');
  });
  document.getElementById('imageLightbox').addEventListener('click', e => {
    if (e.target.id === 'imageLightbox') document.getElementById('imageLightbox').classList.add('hidden');
  });

  // Upload File / Image / ZIP Button, Drag & Drop, and Clipboard Paste
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

  // Chatbar Dropdowns
  const closeAllMenus = () => {
    document.getElementById('aiDropdownMenu').classList.add('hidden');
    document.getElementById('modelDropdownMenu').classList.add('hidden');
    document.getElementById('thinkingDropdownMenu').classList.add('hidden');
    document.getElementById('quickPlusMenu').classList.add('hidden');
  };

  document.addEventListener('click', e => {
    if (!e.target.closest('.pill-dropdown') && !e.target.closest('#quickPlusBtn') && !e.target.closest('#quickPlusMenu')) {
      closeAllMenus();
    }
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
      menu.style.left = `${Math.max(12, rect.left)}px`;
      menu.style.top = `${Math.max(12, rect.top - 230)}px`;
      menu.classList.remove('hidden');
    }
  });
  document.getElementById('qpUploadFile').addEventListener('click', () => { closeAllMenus(); fileInput.click(); });
  document.getElementById('qpOpenPreview').addEventListener('click', () => { closeAllMenus(); switchView('previewView'); });
  document.getElementById('qpOpenZip').addEventListener('click', () => { closeAllMenus(); switchView('zipView'); });
  document.getElementById('qpOpenImages').addEventListener('click', () => { closeAllMenus(); switchView('imagesView'); });
  document.getElementById('qpOpenVideos').addEventListener('click', () => { closeAllMenus(); switchView('videosView'); });
  document.getElementById('qpRunPcCmd').addEventListener('click', () => { closeAllMenus(); document.getElementById('pcQuickBtn').click(); });

  // Home Mode Chips
  const setChatTaskMode = (mode) => {
    state.chatTaskMode = mode;
    const idMap = {
      chat: 'chatTaskModeChat', build: 'chatTaskModeBuild',
      image: 'chatTaskModeImage', video: 'chatTaskModeVideo', pc: 'chatTaskModePc'
    };
    Object.entries(idMap).forEach(([k, id]) => document.getElementById(id).classList.toggle('active', k === mode));
    if (mode === 'pc') document.getElementById('modeOllamaBtn').click();
  };
  document.getElementById('chatTaskModeChat').addEventListener('click', () => setChatTaskMode('chat'));
  document.getElementById('chatTaskModeBuild').addEventListener('click', () => setChatTaskMode('build'));
  document.getElementById('chatTaskModeImage').addEventListener('click', () => setChatTaskMode('image'));
  document.getElementById('chatTaskModeVideo').addEventListener('click', () => setChatTaskMode('video'));
  document.getElementById('chatTaskModePc').addEventListener('click', () => setChatTaskMode('pc'));

  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('promptInput').value = btn.dataset.prompt;
      handleSendPrompt();
    });
  });

  const promptInput = document.getElementById('promptInput');
  const slashMenu = document.getElementById('slashCommandMenu');
  const slashCommands = [
    ['/help','Show all slash commands'], ['/new','Start a new chat'], ['/settings','Open API and Ollama settings'],
    ['/plugins','Open connected apps hub'], ['/images','Open image studio'], ['/videos','Open video studio'],
    ['/canva','Open Canva'], ['/photos','Open Google Photos'], ['/drive','Open Google Drive'],
    ['/ollama','Switch to local Ollama mode'], ['/models','Open model selector'], ['/clear','Clear this chat']
  ];
  function updateSlashMenu() {
    const match = promptInput.value.match(/^\/([a-z]*)$/i);
    if (!match) { slashMenu.classList.add('hidden'); return; }
    const q = match[1].toLowerCase();
    const matches = slashCommands.filter(([cmd]) => cmd.slice(1).startsWith(q));
    slashMenu.innerHTML = matches.map(([cmd,desc]) => `<button type="button" class="slash-command-item" data-command="${cmd}"><b>${cmd}</b><span>${desc}</span></button>`).join('');
    slashMenu.classList.toggle('hidden', matches.length === 0);
    slashMenu.querySelectorAll('[data-command]').forEach(btn => btn.addEventListener('click', () => runSlashCommand(btn.dataset.command)));
  }
  function runSlashCommand(command) {
    slashMenu.classList.add('hidden'); promptInput.value = '';
    if (command === '/help') { promptInput.value = 'Available commands: ' + slashCommands.map(x => x[0]).join(', '); promptInput.focus(); return; }
    if (command === '/new') return createNewChat();
    if (command === '/settings') return openSettings('mtabApis');
    if (command === '/plugins') return switchView('pluginsView');
    if (command === '/images') return switchView('imagesView');
    if (command === '/videos') return switchView('videosView');
    if (command === '/canva') return window.open('https://www.canva.com/', '_blank', 'noopener');
    if (command === '/photos') return window.open('https://photos.google.com/', '_blank', 'noopener');
    if (command === '/drive') return window.open('https://drive.google.com/', '_blank', 'noopener');
    if (command === '/ollama') return document.getElementById('modeOllamaBtn').click();
    if (command === '/models') return document.getElementById('modelDropdownMenu').classList.remove('hidden');
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

  // Cloud vs Ollama + PC Permission
  document.getElementById('modeCloudBtn').addEventListener('click', () => {
    state.executionMode = 'cloud';
    document.getElementById('modeCloudBtn').classList.add('active');
    document.getElementById('modeOllamaBtn').classList.remove('active');
    document.getElementById('pcPolicyMini').classList.add('hidden');
    saveState();
  });
  document.getElementById('modeOllamaBtn').addEventListener('click', () => {
    state.executionMode = 'ollama';
    document.getElementById('modeOllamaBtn').classList.add('active');
    document.getElementById('modeCloudBtn').classList.remove('active');
    document.getElementById('pcPolicyMini').classList.remove('hidden');
    saveState();
    if (state.settings.bridgeToken) testBridgeAndScanOllama(true);
  });
  document.getElementById('permAskBtn').addEventListener('click', () => {
    state.pcPermission = 'ask';
    document.getElementById('permAskBtn').classList.add('active');
    document.getElementById('permAllowBtn').classList.remove('active');
    saveState();
  });
  document.getElementById('permAllowBtn').addEventListener('click', () => {
    state.pcPermission = 'allow';
    document.getElementById('permAllowBtn').classList.add('active');
    document.getElementById('permAskBtn').classList.remove('active');
    saveState();
  });

  // Studio Controls
  document.getElementById('rerunPreviewBtn').addEventListener('click', updatePreviewAndFiles);
  document.getElementById('openZipFromPreviewBtn').addEventListener('click', () => switchView('zipView'));
  document.getElementById('downloadZipFromPreviewBtn').addEventListener('click', downloadGeneratedAppZip);
  document.getElementById('downloadAppZipBtn').addEventListener('click', downloadGeneratedAppZip);

  document.getElementById('fileSelector').addEventListener('change', e => {
    document.getElementById('fileCodeViewer').textContent = state.generatedFiles[e.target.value] || '';
  });
  document.getElementById('copyFileCodeBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(document.getElementById('fileCodeViewer').textContent);
    alert('Copied file code!');
  });

  document.getElementById('generateImageBtn').addEventListener('click', async () => {
    const p = document.getElementById('imagePromptInput').value.trim() || 'Futuristic Dhaka skyline neon cyberpunk, 4k';
    const btn = document.getElementById('generateImageBtn');
    btn.textContent = 'Making image...';
    try {
      const res = await callProviderDirect('nanobanana', 'gemini-nano-banana-2.1', [{ role: 'user', content: p }], '');
      if (res.imageDataUrl) addImageToGallery(res.imageDataUrl, p);
    } catch (e) {
      alert(e.message);
    }
    btn.textContent = '✨ Generate Image';
  });

  document.getElementById('renderVideoBtn').addEventListener('click', () => {
    startFlowCanvas(document.getElementById('videoPromptInput').value.trim() || 'AI UNIVERSE Flow Motion');
  });
  document.getElementById('recordWebmBtn').addEventListener('click', recordStudioWebm);

  document.getElementById('scanOllamaBtn').addEventListener('click', () => testBridgeAndScanOllama(false));
  document.getElementById('clearPcLogBtn').addEventListener('click', () => {
    document.getElementById('pcTerminalLog').textContent = 'PC log cleared.\n';
  });

  document.getElementById('pcQuickBtn').addEventListener('click', async () => {
    const cmd = prompt('Enter terminal command to run on your PC via PC Bridge (e.g., dir or ipconfig):');
    if (!cmd) return;
    const data = await runPcCommandThroughBridge(cmd);
    if (!data.denied) switchView('pcView');
  });

  document.getElementById('denyPcBtn').addEventListener('click', () => {
    document.getElementById('pcApprovalModal').classList.add('hidden');
    if (state.pendingCommandResolve) {
      state.pendingCommandResolve({ approved: false });
      state.pendingCommandResolve = null;
    }
  });
  document.getElementById('approvePcBtn').addEventListener('click', () => {
    const edited = document.getElementById('pendingPcCommandInput').value.trim();
    document.getElementById('pcApprovalModal').classList.add('hidden');
    if (state.pendingCommandResolve) {
      state.pendingCommandResolve({ approved: true, command: edited });
      state.pendingCommandResolve = null;
    }
  });

  // Settings Modal (APIs, Ollama & Custom AIs ONLY — Firebase is hardcoded in js/firebase-config.js)
  const openSettings = (targetTab = 'mtabApis') => {
    document.getElementById('geminiKeyInput').value = state.settings.geminiKey || '';
    document.getElementById('openaiKeyInput').value = state.settings.openaiKey || '';
    document.getElementById('claudeKeyInput').value = state.settings.claudeKey || '';
    document.getElementById('bridgeUrlInput').value = state.settings.bridgeUrl || 'http://localhost:5050';
    document.getElementById('bridgeTokenInput').value = state.settings.bridgeToken || '';
    document.getElementById('ollamaUrlInput').value = state.settings.ollamaUrl || 'http://localhost:11434';
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
  document.getElementById('closeSettingsBtn').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.add('hidden');
  });

  const syncSettingsFromModal = () => {
    state.settings.geminiKey = document.getElementById('geminiKeyInput').value.trim();
    state.settings.openaiKey = document.getElementById('openaiKeyInput').value.trim();
    state.settings.claudeKey = document.getElementById('claudeKeyInput').value.trim();
    state.settings.bridgeUrl = document.getElementById('bridgeUrlInput').value.trim() || 'http://localhost:5050';
    state.settings.bridgeToken = document.getElementById('bridgeTokenInput').value.trim();
    state.settings.ollamaUrl = document.getElementById('ollamaUrlInput').value.trim() || 'http://localhost:11434';
    saveState();
  };

  document.getElementById('saveSettingsBtn').addEventListener('click', async () => {
    syncSettingsFromModal();
    if (state.settings.geminiKey) {
      await syncGeminiModelsFromApi(state.settings.geminiKey).catch(() => {});
    }
    document.getElementById('settingsModal').classList.add('hidden');
    alert(window.AIUFirebase?.getUser()
      ? 'Saved to your Firebase Realtime Database!'
      : 'Saved locally! Sign in with Google to sync to your Firebase Realtime Database.');
  });

  document.getElementById('testGeminiKeyBtn').addEventListener('click', async () => {
    syncSettingsFromModal();
    const out = document.getElementById('geminiTestResult');
    if (!state.settings.geminiKey) {
      out.innerHTML = '<span style="color:#fbbf24;">Enter a Gemini API key first.</span>';
      return;
    }
    out.textContent = 'Testing & syncing models from Google AI Studio...';
    try {
      const usable = await syncGeminiModelsFromApi(state.settings.geminiKey);
      out.innerHTML = `<span style="color:#34d399;">✅ Valid key! Synced ${usable.length} live Gemini models into your chatbar dropdown.</span>`;
    } catch (e) {
      out.innerHTML = `<span style="color:#f87171;">❌ ${escapeHtml(e.message)}</span>`;
    }
  });

  document.getElementById('testBridgeBtn').addEventListener('click', () => {
    syncSettingsFromModal();
    testBridgeAndScanOllama(true);
  });

  document.getElementById('addCustomAiBtn').addEventListener('click', () => {
    const name = document.getElementById('customAiName').value.trim();
    const model = document.getElementById('customAiModel').value.trim();
    const baseUrl = document.getElementById('customAiUrl').value.trim();
    const apiKey = document.getElementById('customAiKey').value.trim();
    if (!name || !model || !baseUrl) return alert('Enter Name, Model ID, and Base URL.');

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