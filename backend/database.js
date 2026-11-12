const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'localgist.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS snippets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    code TEXT,
    language TEXT,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
