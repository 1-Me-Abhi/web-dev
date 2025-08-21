# Secure Chat Application

A secure, end-to-end encrypted chat application built with React Native (frontend) and Node.js (backend).

## Features

- 🔒 End-to-end encryption using Signal Protocol
- 📱 Cross-platform mobile app (iOS & Android)
- ⚡ Real-time messaging with WebSocket
- 🔐 Secure key management and exchange
- 🔔 Push notifications
- 💾 Offline message caching
- 🛡️ TLS/SSL transport security

## Architecture

### Frontend (React Native)
- **Platform**: iOS and Android
- **Encryption**: Signal Protocol implementation
- **Storage**: Secure local storage for keys and messages
- **Communication**: WebSocket for real-time messaging
- **Notifications**: Push notification service

### Backend (Node.js)
- **Authentication**: JWT-based user authentication
- **Message Routing**: Encrypted message forwarding
- **Key Exchange**: Public key management
- **Database**: User metadata and encrypted message metadata
- **Real-time**: WebSocket server for live communication

## Project Structure

```
Chat_App/
├── backend/                 # Node.js backend server
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # Database models
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Authentication & validation
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   ├── config/              # Configuration files
│   └── package.json
├── frontend/                # React Native mobile app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # App screens
│   │   ├── services/        # API & encryption services
│   │   ├── utils/           # Utility functions
│   │   ├── navigation/      # Navigation configuration
│   │   └── store/           # State management
│   ├── android/             # Android-specific files
│   ├── ios/                 # iOS-specific files
│   └── package.json
├── shared/                  # Shared utilities and types
└── docs/                    # Documentation
```

## Security Features

1. **End-to-End Encryption**: Messages are encrypted on sender's device and only decrypted by recipient
2. **Key Management**: Secure key generation, exchange, and storage
3. **Forward Secrecy**: Session keys are rotated regularly
4. **Transport Security**: All communications use TLS/SSL
5. **Secure Storage**: Keys stored in device keychain/keystore
6. **Minimal Metadata**: Server never sees decrypted message content

## Installation

1. **Install dependencies for all components:**
   ```bash
   npm run install-all
   ```

2. **Set up the database:**
   
   For development, you have two options:
   
   **Option A: PostgreSQL (Recommended)**
   - Install PostgreSQL on your system
   - Create a database named `secure_chat`
   - Copy `backend/.env.example` to `backend/.env`
   - Update the database credentials in `.env`
   
   **Option B: SQLite (Simpler setup)**
   - The backend is configured to use SQLite by default
   - No additional setup required
   - Note: SQLite3 may require Python and build tools to compile

3. **Start the backend server:**
   ```bash
   npm run start-backend
   ```

4. **Start the React Native frontend:**
   ```bash
   npm run start-frontend
   ```

## Development

- **Backend development server:**
  ```bash
  npm run dev-backend
  ```

- **Frontend development:**
  ```bash
  npm run start-frontend
  ```

## Environment Setup

Ensure you have the following installed:
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- PostgreSQL (recommended) or SQLite with Python/build tools

**For Windows users:** You may need to install:
- Python 3.x
- Visual Studio Build Tools
- Windows SDK

## Database Setup

The application is configured to use SQLite for development by default. For production or if you prefer PostgreSQL:

1. Install PostgreSQL
2. Create a database: `createdb secure_chat`
3. Update `backend/.env` with your database credentials
4. Change `DB_DIALECT=postgres` in the `.env` file

## License

MIT License - see LICENSE file for details.
