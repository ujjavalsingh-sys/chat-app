# chat-app

This is a simple chat app covering full stack of frontend and backend layers.

## Features
- User Registration & Login
    - Secure signup and login using JWT-based authentication
- Real-Time Messaging
    - Send and receive messages instantly via WebSocket
- Chat Rooms
    - One-on-one and group chat support
    - Dynamic room creation and joining
- Message History
    - Persist messages in PostgreSQL
    - Load chat history on room entry
- Online/Offline Status
    - Track user presence using Redis
    - Show status indicators in UI
- Message Delivery Status
    - Sent, delivered, and read receipts (optional)


## Architecture
+------------------------------------------------------+
|                    Frontend (Client)                 |
|------------------------------------------------------|
| - Login Page                                         |
| - Register Page                                      |
| - Chat Room Page                                     |
| - Chat Box Component                                 |
| - Message List Component                             |
| - Message Input Component                            |
| - User List Component                                |
| - Status Indicator                                   |
| - API Client (REST)                                  |
| - WebSocket Client                                   |
+------------------------------------------------------+
                          |
                          | HTTP / WebSocket
                          v
+------------------------------------------------------+
|                    Backend (Server)                  |
|------------------------------------------------------|
| - REST API Layer                                     |
|     - /auth/login                                    |
|     - /auth/register                                 |
|     - /messages                                      |
|     - /users                                         |
|     - /chatrooms                                     |
|                                                      |
| - WebSocket Server                                   |
|     - onConnect                                      |
|     - onMessageSend                                  |
|     - onMessageReceive                               |
|     - onUserStatusChange                             |
|                                                      |
| - Controllers                                        |
|     - AuthController                                 |
|     - UserController                                 |
|     - MessageController                              |
|                                                      |
| - Services                                           |
|     - AuthService                                    |
|     - ChatService                                    |
|     - UserService                                    |
|                                                      |
| - Middleware                                         |
|     - AuthMiddleware                                 |
|     - RateLimiter                                    |
|     - ErrorHandler                                   |
+------------------------------------------------------+
                          |
          +---------------+----------------+
          |                                |
          v                                v
+--------------------------+   +--------------------------+
|     PostgreSQL Database  |   |        Redis Cache       |
|--------------------------|   |--------------------------|
| - users table            |   | - session store          |
| - messages table         |   | - pub/sub channels       |
| - chatrooms table        |   | - online user tracking   |
| - chatroom_users table   |   | - rate limit counters    |
+--------------------------+   +--------------------------+

                          |
                          v
+------------------------------------------------------+
|               Docker Compose Orchestration           |
|------------------------------------------------------|
| - frontend service                                   |
| - backend service                                    |
| - postgres service                                   |
| - redis service                                      |
+------------------------------------------------------+