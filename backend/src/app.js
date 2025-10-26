const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const users = require('./users');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', users)

// Health check
app.get('/', (req, res) => {
  res.send('Chat backend is running!');
});

module.exports = app;