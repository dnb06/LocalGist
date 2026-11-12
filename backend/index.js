const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const snippetsRoutes = require('./routes/snippets');
app.use('/api/snippets', snippetsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LocalGist API is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
