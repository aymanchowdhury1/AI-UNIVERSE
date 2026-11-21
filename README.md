# AI UNIVERSE v6.4 — Multi-AI Workspace & Secure Windows PC Assistant

Created and developed by **Ayman Chowdhury (TLTOM)**
- **Instagram:** https://www.instagram.com/ayman.chowdhury.148/
- **WhatsApp:** `01735051000`
- **Facebook:** https://www.facebook.com/profile.php?id=61587149130343
- **GitHub:** https://github.com/aymanchowdhury1/

---

## What Was Upgraded in v6.4

1. **Redesigned Desktop & Android-First Interface (`index.html`, `css/style.css`)**
   - Full **Dark & Light** theme switcher with accessible contrast and smooth transitions.
   - Mobile-first Android layout with bottom navigation bar, `44px+` touch targets, full-width bottom-sheet dropdowns, safe-area inset support, and responsive media cards.
   - Dedicated **About & Creator** modal crediting **Ayman Chowdhury (TLTOM)** and social links.

2. **Real Google Video Generation (`gemini-omni-1.2-flash`)**
   - Replaced the simulated canvas/WebM animation with Google's official **Gemini Interactions API** (`POST /v1beta/interactions` with `background: true` and `GET /v1beta/interactions/{id}`).
   - Supports **Text-to-Video** (up to 15s) and **Image-to-Video** (up to 10s with optional starting frame), aspect ratio (`16:9`, `9:16`), resolution (`360p`, `720p`, `1080p`), asynchronous status/progress bar, cancellation, native `<video>` MP4 playback, MP4 download, and video generation history.
   - **Billing Note:** A consumer **Google AI Pro** subscription is separate from **Gemini API billing**. Real video generation requires a Gemini API key with Paid Tier 1+ billing enabled in Google AI Studio.

3. **Nano Banana Image Generation (Gemini Only — No legacy third-party Fallback)**
   - Uses verified Gemini image models (`gemini-nano-banana-2.1`, `gemini-3.1-flash-image`, `gemini-3.1-flash-lite-image`, `gemini-3-pro-image`) with text-to-image and reference-image editing.
   - Completely removed third-party placeholder image fallbacks. If Gemini fails or lacks permissions, the exact API error is shown.

4. **Hardened Ollama Windows PC Assistant & Local Bridge (`pc-bridge/pc-bridge.js`)**
   - Eliminated raw `child_process.exec()` shell execution. Uses structured actions (`open_app`, `list_dir`, `inspect_project`, `read_file`, `write_file`, `create_folder`, `move_file`, `organize_files`, `delete_file`, `run_dev_cmd`, `system_info`) with `shell: false`.
   - Enforces **Ask Each Time** (per-action one-time approval token) and session-only **Allow at Once** (server-side expiring session grant that clears when the session ends) directly on the bridge server.
   - Strictly sandboxes file operations to approved workspace directories and requires separate explicit confirmation for sensitive or irreversible operations (file overwrites, deletions, folder reorganization, mutating dev commands) in both modes.
   - Records persistent JSONL audit logs (`pc-bridge/logs/bridge-actions.log`), supports task progress and cancellation, and includes an optional server-side API key proxy (`pc-bridge/.bridge-keys.json`).

5. **Slow-Response Handling & User-Approved Model Switching**
   - Detects slow/stalled responses, displays a non-intrusive status banner, lets the user **Keep Waiting**, or opens a confirmation dialog listing available alternative models (preferring same-provider models first). Never switches models silently.

6. **Understand-First AI Behavior & Shared Creator Identity**
   - Replaced the forced 3-code-block prompt with understand-first instructions across all providers (clarify requirements and summarize a plan first unless code/implementation is requested).
   - Shared creator identity instruction identifies **Ayman Chowdhury (TLTOM)** as creator/developer of AI UNIVERSE across Gemini, Antigravity, Claude, ChatGPT, Ollama, and custom providers.

---

## Quick Start & Windows PC Bridge Setup

1. **Web App (Desktop or Android Browser):**
   - Serve the root folder with any static HTTP server (e.g. `npx serve .` or VS Code Live Server) or host on GitHub Pages.
   - Your Firebase configuration (`ai-onmiverse`) in `js/firebase-config.js` is preserved intact.
2. **Windows PC Bridge & Ollama:**
   - Install **Node.js 18+** and **Ollama** on Windows.
   - Double-click `pc-bridge/START_PC_BRIDGE.bat`.
   - Copy the printed `PC Bridge Token` (`AIU-...`) into **⚙️ Settings → 2. Ollama & PC Bridge** and click **Test PC Bridge & Scan Ollama**.
   - *(Optional for Android remote access)* Run `pc-bridge/START_ONLINE_TUNNEL.bat` and paste the `https://...trycloudflare.com` URL into **PC Bridge URL**.
3. **Server-Side API Key Storage (Recommended):**
   - Enter your Google AI Studio API key in **⚙️ Settings → 1. Cloud APIs** and click **Save Keys to Local PC Bridge Server** to store keys in `pc-bridge/.bridge-keys.json`.

---

## Verification & Testing Summary

- **Verified in Sandbox:**
  - Archive structure, file completeness, and preservation of `js/firebase-config.js`.
  - HTML DOM ID integrity across all `document.getElementById(...)` and `querySelector(...)` references in `js/app.js`.
  - CSS brace/syntax balance and responsive breakpoints (`<= 860px` Android/mobile layout).
  - JavaScript syntax validation (`js/app.js`, `js/firebase-sync.js`, `pc-bridge/pc-bridge.js`) and removal of all third-party placeholder image references and fake canvas video generators.
- **Requires Live User Environment / Keys:**
  - Live `node pc-bridge.js` execution on Windows 10/11 (Node.js runtime is not installed in this packaging container).
  - Live Google Gemini API text, Nano Banana image, and `gemini-omni-1.2-flash` video generation (requires your personal Gemini API key with Tier 1+ billing enabled).
