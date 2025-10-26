const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET = process.env.JWT_SECRET || 'supersecretkey';

const generateToken = (user) => 
    jwt.sign({
        id: user.id,
        username: user.username
    },
    SECRET,
    { expiresIn: '1h' });

const hashPassword = async (password) => await bcrypt.hash(password, 10);

const validatePassword = async (password, hash) => await bcrypt.compare(password, hash);

module.exports = { generateToken, hashPassword, validatePassword };
