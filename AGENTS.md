#  LocalGist - AI Agent Context & Guidelines

## 1. Project Philosophy
LocalGist is a minimalist, privacy-first terminal snippet and command manager designed for Linux power users and system administrators. 
- **Core principles:** Extreme speed, local-first (zero latency), keyboard-driven navigation ("hacker/dark mode" aesthetic), and AI-augmented terminal assistance.

## 2. Tech Stack & Architecture
- **Frontend:** Vue 3 (Composition API, `<script setup lang="ts">`), Vite, TypeScript.
- **Styling:** Tailwind CSS (Dark mode default).
- **Frontend Libraries:** `vue-router`, `pinia` (state), `fuse.js` (fuzzy search), `highlight.js` (syntax highlighting), `@vueuse/core` (keyboard shortcuts, clipboard).
- **Backend / API Proxy:** Node.js + Express (serves as a local API to hide the Gemini API key and handle DB operations).
- **Database:** SQLite (via `better-sqlite3` in Node.js) for zero-latency local storage.
- **AI Integration:** `@google/genai` SDK (Model: `gemini-2.5-flash`).
- **Infrastructure:** Docker (`Dockerfile`, `docker-compose.yml`), DevContainer, Vitest (testing).

## 3. Strict Development Rules & Git Workflow
When acting as an AI pair programmer on this project, you MUST adhere to the following rules:

### Git Flow
1. **Branches:** `main` is for production only. `develop` is the integration branch. NEVER commit directly to `main` or `develop`.
2. **Feature Cycle:** All user stories must be developed in isolated branches (e.g., `feature/us-01-snippets`) branching off from `develop`.
3. **Conventional Commits:** Use standard prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
4. **Validation:** Before merging a `feature/*` branch into `develop` (using `--no-ff`), tests (Vitest), linter, and build must pass.

### AI Collaboration Protocol ("Plan before code")
1. **Understand the User Story:** Read the acceptance criteria carefully.
2. **Propose Architecture:** Before generating any application code, outline the files to create/modify, the data flow, and the logic.
3. **Wait for Approval:** Do NOT write the actual source code until the human developer explicitly replies with "OK" or approves the plan.
4. **Iterate:** Address one User Story at a time.