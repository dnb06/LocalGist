# LocalGist 

## 1. What it is
LocalGist is a hyper-fast, minimalist, and privacy-focused snippet and terminal command manager built for Linux developers and system administrators. Designed to be operated entirely via keyboard shortcuts, it acts as a zero-latency local repository for your most used scripts, while integrating a Gemini-powered "Terminal Oracle" to decipher complex commands or generate new ones on the fly. All data remains stored locally in an SQLite database.

## 2. Features

- **Full CRUD Operations:** Create, view, edit, and delete terminal commands and code snippets.
- **Instant Fuzzy Search:** Powered by `Fuse.js` to search across titles, tags, languages, and code blocks in real time.
- **1-Click Tag Filtering:** Filter your snippets immediately by clicking on any tag pill.
- **One-Click Copy:** Copy commands directly to your system clipboard.
- **Privacy First:** Your SQLite database (`localgist.db`) is ignored by Git and stays strictly on your local machine.

## 3. Tech Stack

- **Frontend:** Vue 3 (Composition API), TypeScript, Pinia, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** SQLite3
- **Infrastructure:** Docker & Docker Compose

## 4. How to run it
LocalGist is designed to be run locally using Docker and Docker Compose to ensure a reproducible environment across any Linux machine.

### Prerequisites
- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/get-docker/) & Docker Compose

### Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/dnb06/localgist.git](https://github.com/dnb06/localgist.git)
   cd localgist
   chmod +x start.sh
   ./start.sh
