# AI UNIVERSE v6 — Connected to Firebase (`ai-onmiverse`)

Your Firebase configuration (`ai-onmiverse`) is pre-wired inside `js/firebase-config.js` using the verified **Firebase JS SDK v13.3.0**.

## Final 3-Step Checklist in Firebase Console (`ai-onmiverse`)
1. **Enable Google Sign-In:**
   - Go to **Build → Authentication → Sign-in method → Google** → **Enable** → select your Gmail → **Save**.
   - Go to **Authentication → Settings → Authorized domains** → click **Add domain** and add your GitHub Pages domain (e.g., `YOUR-USERNAME.github.io`).
2. **Create Realtime Database & Set Rules:**
   - Go to **Build → Realtime Database → Create Database** → choose a region → **Start in locked mode** → **Enable**.
   - Check the URL at the top of the **Data** tab:
     - If you chose **US (`us-central1`)**, `js/firebase-config.js` already matches (`https://ai-onmiverse-default-rtdb.firebaseio.com`).
     - If you chose **Singapore (`asia-southeast1`)**, update the `databaseURL` line in `js/firebase-config.js` to `https://ai-onmiverse-default-rtdb.asia-southeast1.firebasedatabase.app`.
   - Open the **Rules** tab and publish:
     ```json
     {
       "rules": {
         "users": {
           "$uid": {
             ".read": "auth != null && auth.uid == $uid",
             ".write": "auth != null && auth.uid == $uid"
           }
         }
       }
     }
     ```
3. **Upload & Run:**
   - Upload `index.html`, `css/style.css`, `js/firebase-config.js`, `js/firebase-sync.js`, and `js/app.js` to your GitHub Pages repo.
   - Open your live website, click **Continue with Google**, and add your API keys in **⚙️ Settings** — everything saves automatically to Firebase Realtime Database (`users/{uid}/aiUniverse`).


## v6.1 UI improvements
- Sidebar now has independent vertical scrolling.
- Mobile composer uses reduced padding, button sizing, and textarea height.
- Type `/` in the chat composer to open searchable commands: `/help`, `/new`, `/settings`, `/plugins`, `/images`, `/videos`, `/canva`, `/photos`, `/drive`, `/ollama`, `/models`, `/clear`.
- Plugins view includes launchers for Canva, Google Photos, and Google Drive, plus Ollama and custom API configuration notes.

## Important integration and subscription notes
The Canva, Google Photos, and Google Drive cards currently open their official services. They are not authenticated in-app OAuth connectors yet. True in-app access requires registering each provider's OAuth application, configuring redirect URLs/scopes, and implementing a secure backend token exchange. Do not represent a launcher as a connected plugin.

A Google AI Pro subscription is for eligible Google consumer-app features and does not automatically grant Gemini API access, API credits, or an API key. Gemini API access is configured separately. The model picker therefore only exposes API-tier Gemini models when the configured Gemini API key lists that exact model. A Google account sign-in alone is not a reliable entitlement check for Google AI Pro, so this browser app does not claim to detect or unlock Pro subscription features. API keys saved in browser storage are not suitable for a public multi-user deployment; use a private server-side secret store/proxy for production.


## v6.2 chat reliability and Stop control
- Chat messages are written to local storage immediately and synced to Firebase; Firebase chat restoration now also handles an empty cloud chat list and restores the active chat selection.
- Firebase writes are serialized to prevent rapid consecutive sends from racing and an older write replacing a newer chat snapshot.
- A **Stop** button appears beside Run while a provider request is active. It aborts the active browser request (including Gemini fallback attempts) and records a stopped status in the chat.

## Important: what happens after closing the tab?
Firebase Realtime Database is storage and synchronization; it does not run the AI model or keep a browser `fetch()` request alive. In this version, closing the tab/browser or shutting down the PC stops an in-progress browser-based AI request. The user message is saved and can be reopened, but the response is not guaranteed to finish.

To genuinely continue after the tab is closed, deploy a trusted server-side job worker (for example Firebase Cloud Functions/Cloud Run) that receives a queued job, reads provider secrets from server-side Secret Manager, calls the selected AI provider, and writes progress/results back to that user's Firebase job/chat record. Never put provider API keys or Firebase Admin credentials in public client code or expose unrestricted database write rules. This ZIP does not claim that such a worker is deployed.


## v6.3.1 visible chats and Stop button fix
- The Stop control is now always visible next to Run; it is disabled while idle and enabled only while a response is running.
- On narrow mobile screens the Stop control becomes a compact square icon to preserve composer space.
- The sidebar chat list has a minimum visible area and displays a helpful empty/search state instead of appearing blank.
- Chat selection highlighting follows the active chat consistently.
- Firebase chat restoration accepts both array and keyed-object chat formats.
- An empty Firebase chat list no longer silently overwrites chats already present in this browser; local chats are kept and uploaded to the signed-in user's workspace.
- CSS and JavaScript assets use a versioned URL so browsers are less likely to keep using cached v6.2 files. After extracting, restart the local server and hard-refresh the page once (Ctrl+F5).

The Stop button cancels the current browser request. Firebase still stores chats; it does not execute AI jobs after a browser tab is closed. A deployed server-side worker is required for that behavior.
