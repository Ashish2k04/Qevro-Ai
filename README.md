# Qevro-Ai

An AI-powered search engine built with the MERN stack.

> 🚧 This project is still under development.

## 🚀 Current Progress

Qevro-Ai is currently under active development.

So far, I have implemented the authentication flow, AI chat functionality, chat history and message retrieval, API testing setup, and the initial frontend pages.

### 🔐 Backend APIs Implemented

Currently, **7 backend APIs** have been implemented:

#### Authentication

- Register
- Login
- Get Me
- Verify Email

#### AI Chat

- Chat With AI
- Get Chats
- Get Messages

### 💬 Chat & AI Features

The AI chat system currently includes:

- Users can create and continue AI conversations.
- The AI automatically generates a title for the chat.
- The AI generates the response to the user's message.
- The complete chat context is maintained so the AI can remember previous messages within a conversation.
- Chat history is stored in MongoDB.
- Users can fetch all of their chats.
- Users can fetch all messages from a specific chat.
- Chat-related APIs are protected using user authentication.

#### Get Chats

The `Get Chats` API:

- Decodes the user's ID from the authentication token.
- Fetches all chats belonging to that user from the `Chats` model.
- Returns the user's chat history.

#### Get Messages

The `Get Messages` API:

- Requires a `chatId` as a route parameter.
- Fetches all messages belonging to the specified chat.
- Returns both AI and user messages.
- The API is protected and requires authentication.

### 🎨 Frontend

The frontend currently includes:

- Login page
- Register page

The frontend follows a **feature-based folder structure** to keep the application organized and scalable.

### 📦 Frontend Packages & Tools

The frontend currently uses:

- `@reduxjs/toolkit` — State management
- `react-redux` — Connecting Redux with React
- `react-router` — Client-side routing
- `axios` — Making API requests
- `socket.io-client` — Real-time communication

### ⚙️ Backend Packages & Tools

The backend currently uses:

- `express` — Backend framework
- `mongoose` — MongoDB object modeling
- `dotenv` — Environment variable management
- `nodemailer` — Sending emails
- `socket.io` — Real-time communication
- `langchain` — Building AI applications
- `@langchain/google-genai` — Google Gemini integration
- `@langchain/groq` — Groq LLM integration
- `@langchain/tavily` — Web search integration for AI
- `cookie-parser` — Handling cookies
- `morgan` — HTTP request logging
- `cors` — Cross-Origin Resource Sharing
- `bcryptjs` — Password hashing
- `express-validator` — Request validation
- `jsonwebtoken` — JWT-based authentication

### 🧪 API Testing

I use **Bruno** for testing and managing the backend APIs.

The Bruno collection is organized feature-wise:

```text
bruno/
└── Qevro-AI-APIs/
    ├── auth/
    │   ├── Register.yml
    │   ├── Login.yml
    │   ├── Get-me.yml
    │   └── folder.yml
    │
    ├── chat/
    │   ├── Message-ai.yml
    │   ├── Get-chats.yml
    │   ├── Get-messages.yml
    │   └── folder.yml
    │
    ├── environments/
    │
    ├── .gitignore
    └── opencollection.yml