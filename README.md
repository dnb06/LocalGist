# LocalGist 

## 1. What it is
LocalGist is a hyper-fast, minimalist, and privacy-focused snippet and terminal command manager built for Linux developers and system administrators. Designed to be operated entirely via keyboard shortcuts, it acts as a zero-latency local repository for your most used scripts, while integrating a Gemini-powered "Terminal Oracle" to decipher complex commands or generate new ones on the fly. All data remains stored locally in an SQLite database.

## 2. Features

### MVP (v0.1.0)
* **US-01: Snippet & Syntax Manager:** Full CRUD interface for terminal commands and code blocks with syntax highlighting (`highlight.js`), categorized by language and tags.
* **US-02: Fuzzy Search & Clipboard (Core Loop):** Real-time, typo-tolerant search using `fuse.js`. One-click or one-keystroke copy to clipboard with visual feedback.
* **US-03: Power-User Keyboard Navigation:** Zero-mouse workflow. Global shortcut (`Ctrl+K` / `Cmd+K`) to focus search, arrow keys to navigate results, and `Enter` to copy directly to the clipboard.
* **US-04: The Terminal Oracle (Gemini AI):** A dual-mode AI assistant. 
  * *Generate Mode:* Translate natural language (e.g., "delete all stopped docker containers") into raw, ready-to-save commands.
  * *Explain Mode:* Break down cryptic, dangerous, or complex commands line-by-line, explaining every flag and parameter before execution.

### Backlog (v0.2.0+)
* **US-05:** Dynamic exporter to `.bash_aliases` or `.zshrc` files.
* **US-06:** Cloud synchronization with the GitHub Gists API.

## 3. How to run it
LocalGist is designed to be run locally using Docker and Docker Compose to ensure a reproducible environment across any Linux machine.

### Prerequisites
- Docker & Docker Compose
- A Gemini API Key (Get it from Google AI Studio)

### Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/dnb06/localgist.git](https://github.com/dnb06/localgist.git)
   cd localgist