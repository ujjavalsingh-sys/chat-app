const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

const validateAuthToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader?.split(' ')[1]; // 'Bearer token'

    if (!authToken)
        return res.status(401).send({ error: 'Missing auth token' });

    jwt.verify(authToken, SECRET, (err, user) => {
        if (err)
            return res.status(403).send({ error: 'Invalid auth token' });
        req.user = user;
        next();
    });
}

module.exports = validateAuthToken;
