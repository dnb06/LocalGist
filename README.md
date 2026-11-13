# LocalGist

LocalGist is a self-hosted, local-first command and code snippet manager designed for developers and system administrators. It provides a keyboard-centric interface backed by a REST API and a local SQLite database, orchestrated entirely via Docker containers.

---

## Features

- **Full CRUD Management:** Create, read, update, and delete code snippets and terminal commands.
- **Client-Side Fuzzy Search:** Real-time search across titles, tags, languages, and code blocks powered by Fuse.js.
- **Tag-Based Filtering:** Interactive tag selection to filter snippets by category or environment.
- **Keyboard-Centric Navigation:** Complete application control without mouse interaction (`Ctrl+K` / `Cmd+K` for search focus, `Up`/`Down` arrow keys for card navigation, `Enter` for clipboard copy, and `Esc` to clear focus).
- **Local Data Privacy:** All snippets are stored locally in an SQLite database (`localgist.db`) excluded from version control.

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vue 3 (Composition API), TypeScript, Pinia, Tailwind CSS, Vite, Fuse.js |
| **Backend** | Node.js, Express |
| **Database** | SQLite3 |
| **Infrastructure** | Docker, Docker Compose |

---

## Prerequisites

- Git
- Docker Engine (v20.10+)
- Docker Compose (v1.29+ or Compose Plugin v2.0+)

---

## Installation and Usage

### 1. Clone the Repository

```bash
git clone [https://github.com/dnb06/LocalGist.git](https://github.com/dnb06/LocalGist.git)
cd LocalGist
```

### 2. Build and Start the Containers

For modern environments using **Docker Compose v2**:

```bash
docker compose up -d --build
```

For legacy environments using **Docker Compose v1**:

```bash
docker-compose up -d --build
```

### 3. Access the Application

- **Web Interface:** `http://localhost:3000`
- **REST API Base URL:** `http://localhost:3001/api/snippets`

### 4. Stop the Application

```bash
docker compose down
# or
docker-compose down
```

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Focus the search bar from anywhere in the application |
| `Arrow Down` | Move focus to the next snippet card |
| `Arrow Up` | Move focus to the previous snippet card |
| `Enter` | Copy the code of the currently focused snippet to the clipboard |
| `Escape` | Remove focus from the search input |

---

## API Reference

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/snippets` | Retrieve all stored snippets | None |
| `POST` | `/api/snippets` | Create a new snippet | `{ "title": string, "language": string, "tags": string, "code": string }` |
| `PUT` | `/api/snippets/:id` | Update an existing snippet | `{ "title": string, "language": string, "tags": string, "code": string }` |
| `DELETE` | `/api/snippets/:id` | Delete a snippet by ID | None |

---

## Project Structure

```text
LocalGist/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js            # Express REST API and SQLite initialization
│   └── localgist.db         # Local SQLite database (ignored by Git)
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   └── src/
│       ├── App.vue
│       ├── main.ts
│       ├── components/
│       │   ├── SearchBar.vue
│       │   ├── SnippetCard.vue
│       │   └── SnippetForm.vue
│       ├── store/
│       │   └── snippetStore.ts
│       └── views/
│           └── HomeView.vue
├── docker-compose.yml
├── AGENTS.md
└── README.md
```

---

## Troubleshooting

### 1. Permission Denied / Cannot Connect to the Docker Daemon
**Error:** `ERROR: Couldn't connect to Docker daemon at http+docker://localunixsocket - is it running?`

**Cause:** The Docker service is inactive, or the current Linux user lacks permissions to access the Docker socket.

**Solution:**
1. Ensure the Docker daemon is running:
   ```bash
   sudo systemctl start docker
   ```
2. Run the compose command with root privileges:
   ```bash
   sudo docker compose up -d --build
   # or
   sudo docker-compose up -d --build
   ```
3. To grant permanent permissions to your user without `sudo`:
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

### 2. Invalid Compose File / Unsupported Config Option
**Error:** `Unsupported config option for services: 'frontend'` or `Version in "./docker-compose.yml" is unsupported.`

**Cause:** Legacy `docker-compose` (v1) binaries require a top-level `version` field and strict 2-space YAML indentation (no `Tab` characters).

**Solution:**
Verify that `docker-compose.yml` uses spaces exclusively for indentation and follows this structure:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - PORT=3001
      - NODE_ENV=development

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

### 3. Obsolete Version Attribute Warning
**Warning:** `WARN[0000] /.../docker-compose.yml: the attribute 'version' is obsolete, it will be ignored`

**Cause:** Docker Compose v2 no longer requires the `version` declaration, which is kept for backward compatibility with Docker Compose v1 environments.

**Solution:** No action is required. The warning does not affect container building or runtime behavior.

### 4. Connection Reset on Port 3000
**Error:** `ERR_CONNECTION_RESET` when accessing `http://localhost:3000`.

**Cause:** The Vite development server inside the frontend container stopped or lost synchronization after switching branches or modifying dependencies.

**Solution:** Perform a clean restart of the containers:
```bash
docker compose down
docker compose up -d --build
```