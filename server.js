const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// جلب جميع الأحداث
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// إضافة حدث جديد
app.post('/api/events', (req, res) => {
  const { name, location, date } = req.body;
  db.run('INSERT INTO events (name, location, date) VALUES (?, ?, ?)', [name, location, date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, location, date });
  });
});

// بدء الخادم
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
