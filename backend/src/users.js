const express = require('express')
const router = express.Router();
const { generateToken, hashPassword, validatePassword } = require('./auth');
const validateAuthToken = require('./authMiddleware');

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

// protected route
router.get('/profile', validateAuthToken, (req, res) => {
    res.send({ user: req.user });
});

module.exports = router;
