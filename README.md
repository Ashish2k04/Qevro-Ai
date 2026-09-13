# Qevro-Ai

An AI-powered search engine built with the MERN stack.

> 🚧 This project is still under development.

## 🚀 Current Progress

Qevro-Ai is currently being developed with a MERN-based architecture along with AI, real-time communication, authentication, and search capabilities.

### 🔐 Backend APIs Implemented

So far, I have implemented **5 backend APIs**:

- Register
- Login
- Get Me
- Verify Email
- Chat With AI

### 🎨 Frontend

The frontend currently includes:

- Login page
- Register page

### 📦 Frontend Packages & Tools

The frontend is built using:

- `@reduxjs/toolkit` — State management
- `react-redux` — Connecting Redux with React
- `react-router` — Client-side routing
- `axios` — API requests
- `socket.io-client` — Real-time communication
- Feature-based folder structure for organizing application features

### ⚙️ Backend Packages & Tools

The backend currently uses:

- `express` — Backend framework
- `mongoose` — MongoDB object modeling
- `dotenv` — Environment variable management
- `nodemailer` — Email sending
- `socket.io` — Real-time communication
- `langchain` — AI application framework
- `@langchain/google-genai` — Google Gemini integration
- `@langchain/groq` — Groq LLM integration
- `cookie-parser` — Cookie handling
- `morgan` — HTTP request logging
- `cors` — Cross-Origin Resource Sharing
- `bcryptjs` — Password hashing
- `express-validator` — Request validation
- `@langchain/tavily` — Web search integration for AI
- `jsonwebtoken` — Authentication using JWT

### 🧪 API Testing

I use **Bruno** for testing and managing the backend APIs.

The repository contains a dedicated `bruno` folder with the API testing collection.

### 🗂️ Project Structure

```text
Qevro-Ai/
├── frontend/
├── backend/
├── bruno/
└── README.md