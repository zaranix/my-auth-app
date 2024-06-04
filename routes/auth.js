const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

const router = express.Router();
const users = []; // In-memory storage for users

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Cannot find user' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(403).json({ message: 'Invalid credentials' });
  }
});

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
