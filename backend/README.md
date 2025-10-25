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