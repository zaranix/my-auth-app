const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'client')));

// Serve home page
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'home.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
