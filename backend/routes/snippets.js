const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  try {
    const snippets = db.prepare('SELECT * FROM snippets ORDER BY id DESC').all();
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  const { title, code, language, tags } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO snippets (title, code, language, tags) VALUES (?, ?, ?, ?)');
    const info = stmt.run(title, code, language, tags);
    const newSnippet = db.prepare('SELECT * FROM snippets WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  const { title, code, language, tags } = req.body;
  try {
    const stmt = db.prepare('UPDATE snippets SET title = ?, code = ?, language = ?, tags = ? WHERE id = ?');
    stmt.run(title, code, language, tags, req.params.id);
    const updated = db.prepare('SELECT * FROM snippets WHERE id = ?').get(req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM snippets WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
