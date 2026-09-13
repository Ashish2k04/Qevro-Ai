# Qevro-Ai

An AI-powered search engine built with the MERN stack.

> 🚧 This project is still under development.

## 🚀 Current Progress

Qevro-Ai is currently under active development.

So far, I have implemented the basic authentication flow, AI chat functionality, API testing setup, and the initial frontend pages.

### 🔐 Backend APIs Implemented

Currently, **5 backend APIs** have been implemented:

- Register
- Login
- Get Me
- Verify Email
- Chat With AI

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
    │   └── folder.yml
    │
    ├── .gitignore
    └── opencollection.yml