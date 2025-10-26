const express = require('express')
const router = express.Router();
const { generateToken, hashPassword, validatePassword } = require('./auth');

const users = [];

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await hashPassword(password);
    users.push({
        id: users.length + 1,
        username,
        password: hashed
    });
    res.status(201).send({ message: 'Registered!' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if(!user || !validatePassword(password, user.password)) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.send({ token });
});

module.exports = router;
