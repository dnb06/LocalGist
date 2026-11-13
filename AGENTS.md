# AGENTS.md — Project Context and Development Guidelines

## 1. Project Overview

**LocalGist** is a local-first web application for storing, searching, filtering, and copying terminal commands and code snippets. It is designed for low-latency operation, keyboard-first ergonomics, and complete data privacy using a containerized SQLite backend. External cloud dependencies and AI integrations are intentionally excluded from the project scope.

---

## 2. Architecture and Technical Specifications

### Frontend (`/frontend`)
- **Framework:** Vue 3 using `<script setup lang="ts">` (Composition API).
- **State Management:** Pinia (`src/store/snippetStore.ts`) acts as the single source of truth for snippets, search queries, active tag filters, editing state, and keyboard selection index.
- **Search Engine:** Fuse.js configured with a `0.3` threshold indexing `title`, `tags`, `code`, and `language`.
- **Styling:** Tailwind CSS with a dark-first color palette (`bg-gray-900`, `bg-gray-800`, and `emerald` accents).
- **Port:** Exposes port `3000` on the host.

### Backend (`/backend`)
- **Runtime & Framework:** Node.js with Express.
- **Database:** SQLite3 persisted in `backend/localgist.db`.
- **CORS:** Enabled to allow communication from `http://localhost:3000`.
- **Port:** Exposes port `3001` on the host.

### Infrastructure (`docker-compose.yml`)
- Multi-container setup (`frontend` and `backend`) with bind mounts for live reload during development and anonymous volumes for `/app/node_modules`.
- Maintains backward compatibility between Docker Compose v1 and v2.

---

## 3. Implemented Scope (User Stories)

- **US-01 (Core CRUD & Infrastructure):** Dockerized frontend/backend architecture, SQLite persistence, snippet creation, listing, and deletion.
- **US-02 (Fuzzy Search & Clipboard):** Real-time fuzzy filtering via Fuse.js and one-click copy to clipboard with visual state feedback.
- **US-03 (Snippet Edition & Tag Filtering):** Reactive form mode switching between Create and Edit (`PUT /api/snippets/:id`), and interactive tag pills for instant category filtering.
- **US-04 (Keyboard Navigation):** Global keyboard listener supporting `Ctrl+K`/`Cmd+K` search focus, `ArrowUp`/`ArrowDown` card selection highlighting, and `Enter` to copy the focused snippet.

---

## 4. Coding Standards and Conventions

1. **Language:** All UI labels, code identifiers, comments, commit messages, and documentation must be written in **English**.
2. **Database Exclusion:** Never commit `*.db` files to the repository. The `.gitignore` file must always enforce `*.db` and `**/*.db`.
3. **YAML Formatting:** Always use 2 spaces for indentation in `docker-compose.yml`. Never use tab characters.
4. **Git Workflow:**
   - `main`: Production-ready, stable releases.
   - `develop`: Integration branch for completed features.
   - `feature/us-XX-*`: Feature branches for specific user stories.
   - Conventional Commits format (`feat:`, `fix:`, `chore:`, `docs:`).