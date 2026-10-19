## APUSH Learning Platform

Modern AP U.S. History study hub built with React 19 + Vite on the front end and a lightweight Express API (email login, WeChat auth, AI grading,错题本 tracking) on the back. This document replaces the default Vite README and explains how to run and deploy both sides.

---

### Tech Stack

- **Frontend**: Vite + React 19 + Tailwind, lives in `src/`
- **Backend**: Express (ESM) in `server/`, SQLite via `better-sqlite3`
- **AI / External**: OpenAI API for FRQ grading, optional WeChat OAuth

---

### Local Development

```bash
# install deps once
npm install

# start the web client
npm run dev

# start the API (needs .env config, see below)
npm run server
```

Environment variables live in `.env`. Duplicate `.env.example` and fill in anything you need (email transport, WeChat keys, OpenAI key, etc.). When running locally you can skip most of them; only `CLIENT_BASE_URL` (defaults to `http://localhost:5173`) is important for CORS.

---

### Backend Configuration & Deployment

The API now exposes a `/healthz` endpoint and waits to start listening until the file is executed directly, which makes it friendlier for managed platforms (Render, Fly.io, Railway, etc.).

| Variable | Description |
| --- | --- |
| `PORT` | Port for Express to listen on (default `4000`) |
| `CLIENT_BASE_URL` | Comma‑separated list of allowed origins for CORS (e.g. `https://app.example.com,https://beta.example.com`) |
| `WECHAT_REDIRECT_URI` | Optional override for the WeChat OAuth callback. Defaults to `${CLIENT_BASE_URL}/auth/wechat` |
| `OPENAI_API_KEY` / `OPENAI_FRQ_MODEL` | Enables the AI grading endpoint (`gpt-4o-mini` by default) |
| `EMAIL_CODE_TTL` | Verification code TTL in seconds (default `600`) |
| `HEALTHCHECK_PATH` | Custom health path (default `/healthz`) |
| `SQLITE_DB_PATH` | Optional path override for the SQLite file; defaults to `data/app.db` |

**Deploy steps (Render / Fly / Railway are similar):**

1. Push the repo to GitHub.
2. Create a new web service on your platform of choice pointing to `server/index.js`.
3. Set the environment variables above, including `CLIENT_BASE_URL=https://your-frontend-domain`.
4. For SQLite persistence, mount a volume (Render’s “Disk”, Fly’s `vol`, etc.) at `data/`.
5. Enable a health check hitting `/healthz` (the default path) so the platform can confirm readiness.
6. Optionally serve the React build from the same service by pointing a static host (Nginx) at `dist/`, or deploy the frontend separately (Vercel / Cloudflare Pages) and set `VITE_API_BASE_URL` to your API domain before running `npm run build`.

The server exports the Express instance by default, so tests or serverless adapters can `import app from "./server/index.js"` without the HTTP listener auto-starting.

---

### Wrong-Question Notebook & AI Grading

- The `/wrong-questions` endpoints persist anything a logged-in student misses and expose per-topic stats for the “错题本” view.
- `/frq/grade` streams the LEQ prompt + rubric to OpenAI using the model & key defined in the environment variables. For production, make sure to set rate limits and protect your API key server-side.

---

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + build frontend |
| `npm run preview` | Preview built frontend |
| `npm run server` | Start Express API (`node server/index.js`) |

---

Feel free to extend this README with deployment-specific notes (Render disks, Fly `fly.toml`, Dockerfile, etc.) as you move to production.
"# -apush-super" 

## AP Vault embedded practice

The home page and lesson steps now include an on-demand AP Vault iframe below the course content. The default target is the homepage registered on the AP Vault repository: `https://ap-us-30-days-counting-down.vercel.app`. Override it at build time with `VITE_AP_VAULT_URL` (HTTPS only). The frame has a descriptive title, expand/reload controls, and a permanent external link for browsers that restrict embedded sign-in. Loading is user-initiated to avoid slowing the course landing page.

AP Vault authentication, subscription entitlements and progress remain independent. No tokens are passed between the sites, and the parent does not claim automatic unit filtering or completion synchronization. Students choose APUSH and their unit inside the frame. If the target later sets restrictive `frame-ancestors` or `X-Frame-Options`, adjust the target's embedding policy for the classroom origin or use the external link.

## Unit 1 required video banners

Topics 1.1–1.6 use a ReactPlayer 3 player with two required English checkpoints and an original SAQ exit ticket per lesson. Questions, four answer choices, and explanations are original AP-style practice, not official College Board items. Checkpoints appear as a banner inside the video container, pause supported videos, and have no dismiss, skip, or replay bypass. Continue stays disabled until the learner selects and submits an answer; correctness is not required to continue. Retrying requires another submission. First attempts are preserved within the mounted lesson.

Seeking forward opens the earliest overdue unanswered checkpoint; any remaining overdue checkpoints appear before playback resumes. Escape cannot dismiss the banner. The banner traps keyboard focus and scrolls on narrow screens. Bilibili remains explicitly labeled manual mode: its third-party iframe cannot enforce timed pauses, so required playback gating is only guaranteed by the controlled player integration. External video access and refresh are outside this classroom-session gate.

SAQ drafts and self-assessment are session-only and do not represent automated AP scores. Authentication, subscriptions, and progress in AP Vault remain independent. Existing timestamps still require editorial calibration against each source video.

Validation: production build, targeted ESLint, and `node --test tests/unit1-checkpoints.test.mjs`. A simulated-media DOM check verifies the submit gate, Escape handling, wrong-first retries, seek-ahead backlog, and resume behavior. Live video source availability and timestamp alignment require separate checks.

### Playback continuity fix

The Unit 1 player now keeps `controls` stable while showing questions. The installed YouTube media element reloads its iframe when `controls` changes, which previously reset playback on both opening and dismissing a checkpoint. The banner now blocks interaction without changing provider attributes, captures the exact paused time, and restores that position before resuming if the provider drifted. The media container also keeps a constant layout across question states. Shared surfaces, navigation, progress indicators and buttons use compact slate/navy styling.
