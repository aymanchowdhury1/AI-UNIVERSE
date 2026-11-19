// Firebase Google Auth + Realtime Database Cloud Sync (SDK v13.3.0 — Configured via js/firebase-config.js)
window.AIUFirebase = (() => {
  const FB_CDN = 'https://www.gstatic.com/firebasejs/13.3.0';
  let fbApp = null;
  let fbAuth = null;
  let fbDb = null;
  let fbMods = null;
  let currentUser = null;
  let unsubscribeRtdb = null;
  let onUserChangeCb = null;
  let onCloudDataCb = null;
  let onSyncStatusCb = null;
  let lastPushTimestamp = 0;
  // Serialize writes so rapid message updates cannot finish out of order and replace newer chat data.
  let pushQueue = Promise.resolve();
  let latestPayloadGetter = null;
  let initialized = false;
  let configValid = false;

  function isPlaceholder(val) {
    return !val || typeof val !== 'string' || val.includes('YOUR_') || val.trim() === '';
  }

  function validateCodeConfig() {
    const cfg = window.FIREBASE_CONFIG;
    if (!cfg || isPlaceholder(cfg.apiKey) || isPlaceholder(cfg.projectId)) {
      return { valid: false, reason: 'Paste your real Firebase config inside js/firebase-config.js' };
    }
    const finalCfg = { ...cfg };
    if (isPlaceholder(finalCfg.databaseURL)) {
      finalCfg.databaseURL = `https://${finalCfg.projectId}-default-rtdb.firebaseio.com`;
    }
    return { valid: true, config: finalCfg };
  }

  function setStatus(status, detail = '') {
    if (onSyncStatusCb) onSyncStatusCb(status, detail);
  }

  async function loadSdk() {
    if (fbMods) return fbMods;
    const [appMod, authMod, dbMod] = await Promise.all([
      import(`${FB_CDN}/firebase-app.js`),
      import(`${FB_CDN}/firebase-auth.js`),
      import(`${FB_CDN}/firebase-database.js`)
    ]);
    fbMods = { appMod, authMod, dbMod };
    return fbMods;
  }

  function sanitizeChatsForRtdb(chats) {
    return (chats || []).slice(0, 50).map(chat => ({
      id: chat.id || ('chat_' + Date.now()),
      title: chat.title || 'New chat',
      messages: (chat.messages || []).slice(-80).map(m => {
        const cleanMsg = {
          role: m.role || 'user',
          content: String(m.content || '').slice(0, 45000),
          meta: m.meta || ''
        };
        if (Array.isArray(m.thoughtSteps) && m.thoughtSteps.length) {
          cleanMsg.thoughtSteps = m.thoughtSteps;
        }
        if (m.thoughtDuration) cleanMsg.thoughtDuration = m.thoughtDuration;
        if (m.artifacts) {
          cleanMsg.artifacts = {
            hasApp: Boolean(m.artifacts.hasApp),
            hasImage: Boolean(m.artifacts.hasImage),
            hasVideo: Boolean(m.artifacts.hasVideo),
            imagePrompt: m.artifacts.imagePrompt || '',
            videoPrompt: m.artifacts.videoPrompt || ''
          };
          // Store external URLs or reasonably sized base64 images cleanly
          if (m.artifacts.imageUrl && m.artifacts.imageUrl.length < 350000) {
            cleanMsg.artifacts.imageUrl = m.artifacts.imageUrl;
          }
        }
        if (Array.isArray(m.attachments) && m.attachments.length) {
          cleanMsg.attachments = m.attachments.map(a => ({
            name: a.name || 'file',
            kind: a.kind || 'text',
            size: a.size || 0,
            fileCount: a.fileCount || 0
          }));
        }
        return cleanMsg;
      })
    }));
  }

  function sanitizeImagesForRtdb(images) {
    return (images || [])
      .filter(img => img && img.src && img.src.length < 350000)
      .slice(0, 15)
      .map(img => ({
        src: img.src,
        prompt: String(img.prompt || '').slice(0, 300),
        date: img.date || ''
      }));
  }

  function buildCloudPayload(raw) {
    return {
      updatedAt: Date.now(),
      email: currentUser?.email || '',
      displayName: currentUser?.displayName || '',
      settings: raw.settings || {},
      customProviders: raw.customProviders || [],
      preferences: raw.preferences || {},
      chats: sanitizeChatsForRtdb(raw.chats || []),
      generatedImages: sanitizeImagesForRtdb(raw.generatedImages || [])
    };
  }

  function detachRealtimeListener() {
    if (typeof unsubscribeRtdb === 'function') {
      unsubscribeRtdb();
      unsubscribeRtdb = null;
    }
  }

  async function attachRealtimeListener(uid) {
    detachRealtimeListener();
    const { dbMod } = await loadSdk();
    const userRef = dbMod.ref(fbDb, `users/${uid}/aiUniverse`);

    // 1. First read existing cloud data so we NEVER overwrite saved cloud data on login
    setStatus('syncing', 'Loading your Firebase cloud workspace...');
    const initialSnap = await dbMod.get(userRef);
    if (initialSnap.exists()) {
      const cloudData = initialSnap.val();
      if (onCloudDataCb) onCloudDataCb(cloudData);
      setStatus('synced', 'Loaded from Firebase');
    } else if (latestPayloadGetter) {
      // Cloud is brand-new for this user -> seed with local data once
      await pushNow(latestPayloadGetter());
    }

    // 2. Subscribe to live updates across PC & Phone
    unsubscribeRtdb = dbMod.onValue(userRef, (snap) => {
      if (!snap.exists()) return;
      const cloudData = snap.val();
      // Ignore our own echo from just-written local update
      if (cloudData.updatedAt && Math.abs(cloudData.updatedAt - lastPushTimestamp) < 1200) {
        return;
      }
      if (onCloudDataCb) onCloudDataCb(cloudData);
      setStatus('synced', 'Synced live across devices');
    }, (err) => {
      setStatus('error', err.message);
    });
  }

  async function init() {
    if (initialized) return { ok: configValid };
    const check = validateCodeConfig();
    if (!check.valid) {
      configValid = false;
      setStatus('unconfigured', check.reason);
      return { ok: false, reason: check.reason };
    }

    configValid = true;
    const { appMod, authMod, dbMod } = await loadSdk();
    const existing = appMod.getApps();
    fbApp = existing.length ? existing[0] : appMod.initializeApp(check.config);
    fbAuth = authMod.getAuth(fbApp);
    fbDb = dbMod.getDatabase(fbApp);

    // Optional Firebase Analytics (non-blocking so ad-blockers never break Auth/DB)
    if (check.config.measurementId) {
      import(`${FB_CDN}/firebase-analytics.js`)
        .then(anMod => anMod.getAnalytics(fbApp))
        .catch(() => {});
    }

    // Persist Google sign-in across browser restarts
    await authMod.setPersistence(fbAuth, authMod.browserLocalPersistence).catch(() => {});

    authMod.onAuthStateChanged(fbAuth, async (user) => {
      currentUser = user || null;
      if (onUserChangeCb) onUserChangeCb(currentUser);
      if (currentUser) {
        try {
          await attachRealtimeListener(currentUser.uid);
        } catch (err) {
          setStatus('error', err.message);
        }
      } else {
        detachRealtimeListener();
        setStatus('signed_out', 'Sign in with Google to save in Firebase');
      }
    });

    // Zero-loss flush if user closes tab/browser
    const flushOnExit = () => {
      if (currentUser && latestPayloadGetter) {
        pushNow(latestPayloadGetter()).catch(() => {});
      }
    };
    window.addEventListener('pagehide', flushOnExit);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushOnExit();
    });

    initialized = true;
    return { ok: true };
  }

  async function signInWithGoogle() {
    if (!initialized) {
      const res = await init();
      if (!res.ok) throw new Error(res.reason || 'Firebase config missing in js/firebase-config.js');
    }
    if (!configValid || !fbAuth) {
      throw new Error('Open js/firebase-config.js and replace YOUR_API_KEY / YOUR_PROJECT_ID with your real Firebase config.');
    }
    const { authMod } = await loadSdk();
    const provider = new authMod.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await authMod.signInWithPopup(fbAuth, provider);
    currentUser = result.user;
    if (onUserChangeCb) onUserChangeCb(currentUser);
    return currentUser;
  }

  async function signOut() {
    detachRealtimeListener();
    if (!fbAuth) return;
    const { authMod } = await loadSdk();
    await authMod.signOut(fbAuth);
    currentUser = null;
    if (onUserChangeCb) onUserChangeCb(null);
  }

  function pushNow(rawPayload) {
    if (!fbDb || !currentUser) return Promise.resolve(false);
    const write = async () => {
      if (!fbDb || !currentUser) return false;
      try {
        setStatus('saving', 'Saving to Firebase...');
        const { dbMod } = await loadSdk();
        const payload = buildCloudPayload(rawPayload);
        lastPushTimestamp = payload.updatedAt;
        const userRef = dbMod.ref(fbDb, `users/${currentUser.uid}/aiUniverse`);
        await dbMod.set(userRef, payload);
        setStatus('synced', 'Saved in Firebase');
        return true;
      } catch (err) {
        setStatus('error', 'Save failed: ' + err.message);
        throw err;
      }
    };
    pushQueue = pushQueue.then(write, write);
    return pushQueue;
  }

  return {
    init,
    signInWithGoogle,
    signOut,
    pushNow,
    validateCodeConfig,
    isConfigured: () => validateCodeConfig().valid,
    getUser: () => currentUser,
    registerPayloadGetter: (fn) => { latestPayloadGetter = fn; },
    onUserChange: (cb) => { onUserChangeCb = cb; },
    onCloudData: (cb) => { onCloudDataCb = cb; },
    onSyncStatus: (cb) => { onSyncStatusCb = cb; }
  };
})();
