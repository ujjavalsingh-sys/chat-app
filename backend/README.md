# Backend

Chat app requires a bunch of services and databases. 

**server.js**
- an Express app, main entry point.
- creates a new websocket on `connection` - when client connects to `ws://localhost:3000`.


**app.js**
- the Express app hosting `http://localhost:3000`
- just 1 Endpoint - GET / - returns welcome message.

## Jest Testing
- added jest test for both app.js as well as websocket.

## Auth
We implement JWT based auth token validation for authenticating user.

JWT stands for JsonWebToken. It has following features -
- `jwt.sign(payload, secret, expiry)` - it converts payload (string/object) into a JWT token - another encrypted string which looks like `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJVamphdmFsIiwiaWF0IjoxNzYxNDA5Njk0LCJleHAiOjE3NjE0MTMyOTR9.uCrI87zOsjn-stExJLXr9F7xBezOaXD6PQ2lQ9j4rf4`
- the `expiry` is a time after which `jwt.verify` would fail on that token.
- `jwt.verify(token, secret, (err, user) => void)` - checks token and decodes it back into payload if valid.

In our case, we create payload of `User {id, username}` in `auth.js` and validate token in `authMiddleware.js` where decoded `user` is set on `request` and middleware calls `next` to resume original request.

`router.get('/profile', validateAuthToken, ...)` - uses middleware to protect a route against unauthenticated access.

