# Qevro-Ai

An AI-powered search engine built with the MERN stack.

> 🚧 **This project is still under development.**

## Current Progress

Qevro-Ai is currently under active development.

So far, I have implemented the authentication system, email verification, AI-powered conversations, web search capabilities, chat history management, message retrieval, chat deletion, logout functionality, API testing with Bruno, the main dashboard UI, and a Privacy Policy page.

---

## Backend APIs Implemented

Currently, **9 backend APIs** have been implemented.

### 1. Register

The Register API is used to create a new user account.

The user provides:

- `username`
- `email`
- `password`

After submitting the registration request:

1. The registration information is processed.
2. A verification email is sent to the provided email address.
3. The user clicks the verification link received in the email.
4. The email address is verified.
5. The user can then log in using their email and password.

---

### 2. Login

The Login API is used to authenticate an existing user.

The user provides:

- `email`
- `password`

If the credentials are correct and the email has been verified, the user is successfully logged in.

If the email has not been verified, the API prevents the user from logging in and asks them to verify their email first.

Authentication is handled using JWT stored in an HTTP-only cookie.

---

### 3. Get Me

The Get Me API is a **protected API**.

After logging in, the user can access this API to retrieve their own account information.

The API returns:

- `username`
- `email`

The user's identity is obtained from the JWT authentication token.

---

### 4. Verify Email

The Verify Email API is used to verify the user's email address.

After registration, the user receives a verification email containing a verification link.

The flow is:

```text
Register
↓
Verification Email Sent
↓
User Clicks Verification Link
↓
Email Verified
↓
User Can Login
```

---

### 5. Logout

The Logout API is used to securely log the user out of the application.

Example:

```text
POST /api/logout
```

When the user logs out:

1. The authentication request is verified.
2. The authentication cookie is cleared.
3. The user is logged out from the backend.
4. The frontend clears the logged-in user from Redux state.

This keeps the frontend and backend authentication state synchronized.

---

### 6. Chat With AI

The Chat With AI API is used to communicate with the AI.

Example:

```text
POST /api/message
```

The API supports **two request flows**.

#### Create a New Chat

The user can send only a `message`:

```json
{
  "message": "What is the latest technology news?"
}
```

When no `chatId` is provided:

1. A new chat is created.
2. The user's message is stored.
3. The AI processes the request.
4. The AI generates a response.
5. The AI generates a title for the chat.
6. The conversation is associated with the newly created chat.

#### Continue an Existing Chat

The user can send a `message` along with an existing `chatId`:

```json
{
  "message": "Tell me more about it.",
  "chatId": "CHAT_ID"
}
```

When a `chatId` is provided:

1. A new chat is not created.
2. The new user message is stored using the provided `chatId`.
3. The AI generates a response.
4. The AI response is stored using the same `chatId`.
5. The existing conversation continues.

This allows the AI to maintain the context of the conversation and use previous messages from the same chat.

---

### 7. Get Chats

The Get Chats API is a **protected API**.

The user's ID is obtained from the authentication token.

The API then fetches the chats belonging to that user.

The response contains information such as:

- Chat ID
- Chat title
- Chat creation date
- Chat update information

Example flow:

```text
User Login
↓
Authentication Token
↓
Get Chats API
↓
Decode User ID
↓
Find User's Chats
↓
Return Chat History
```

---

### 8. Get Messages

The Get Messages API is a **protected API**.

The user must provide a `chatId` as a route parameter.

Example:

```text
GET /api/get-messages/:chatId
```

The API uses the provided `chatId` to fetch all messages related to that conversation.

The response contains:

- User messages
- AI messages
- Messages belonging to the requested chat

This allows the frontend to load the complete conversation when a user opens an existing chat.

---

### 9. Delete Chat

The Delete Chat API is a **protected API**.

The user provides the `chatId` as a route parameter.

Example:

```text
DELETE /api/delete-chat/:chatId
```

The API then:

1. Finds the chat using the provided `chatId`.
2. Deletes the chat from the Chats collection.
3. Finds all messages associated with that chat.
4. Deletes those messages from the Messages collection.

This allows a user to delete a chat and all of its related messages together.

Example flow:

```text
Delete Chat
↓
Receive chatId
↓
Delete Chat
↓
Find Related Messages
↓
Delete Related Messages
```

---

## AI Features

Qevro-Ai currently includes:

- AI-powered conversations
- AI-generated chat titles
- Conversation context
- Continued conversations using `chatId`
- Web search using Tavily
- Google Gemini integration
- Groq integration
- Chat history
- Message history
- Real-time communication using Socket.IO

### Web Search

Qevro-Ai uses **Tavily** to provide web search capabilities to the AI.

This allows the AI to search the web when external or current information is required.

The AI can use the search results as part of its response generation.

### AI Model Integrations

The backend currently integrates:

- **Google Gemini** through `@langchain/google-genai`
- **Groq** through `@langchain/groq`
- **LangChain** for AI application development
- **Tavily** for web search

---

## Frontend

The frontend is built using React and currently includes:

- Login page
- Register page
- Protected dashboard
- Chat interface
- Chat history
- Chat selection
- New chat functionality
- Chat deletion
- Logout confirmation
- AI messages
- User messages
- Markdown rendering
- Privacy Policy page

The main dashboard is implemented in:

```text
frontend/src/features/chat/pages/Dashboard.jsx
```

The frontend follows a **feature-based folder structure** to keep authentication and chat functionality separated and scalable.

### Application Routes

The frontend currently contains:

```text
/login
/register
/
/privacy-policy
```

The `/` route is protected and requires authentication.

The `/privacy-policy` route is publicly accessible.

---

## Authentication Flow

Qevro-Ai uses JWT-based authentication with HTTP-only cookies.

The authentication flow is:

```text
Register
↓
Verification Email
↓
Verify Email
↓
Login
↓
JWT Cookie
↓
Protected API Access
↓
Logout
↓
Cookie Cleared
```

The frontend also maintains the current user through Redux state.

On application load, the frontend checks the current authenticated user using the Get Me API.

---

## Privacy Policy

A dedicated Privacy Policy page has been added to the frontend.

Route:

```text
/privacy-policy
```

The page explains topics including:

- Information collected by Qevro-Ai
- Google user data and third-party authorization
- How information is used
- Email services
- Data storage and security
- Data sharing
- AI conversations
- Cookies and authentication
- User choices
- Privacy Policy updates
- Contact information

The Privacy Policy page was added as part of the production setup and application requirements related to Google Console configuration and third-party service disclosures.

The page is publicly accessible so it can be opened without logging into Qevro-Ai.

---

## Frontend Packages & Tools

The frontend currently uses:

- `@reduxjs/toolkit` — State management
- `react-redux` — Connecting Redux with React
- `react-router` — Client-side routing
- `axios` — Making API requests
- `socket.io-client` — Real-time communication
- `tailwindcss` — Utility-first CSS framework for styling
- `lucide-react` — Icons
- `react-markdown` — Rendering Markdown content in React
- `remark-gfm` — GitHub Flavored Markdown support

Additional frontend tooling includes:

- `vite` — Development server and build tooling
- `eslint` — Code linting
- `@vitejs/plugin-react` — React support for Vite

---

## Backend Packages & Tools

The backend currently uses:

- `express` — Backend framework
- `mongoose` — MongoDB object modeling
- `dotenv` — Environment variable management
- `nodemailer` — Sending emails
- `socket.io` — Real-time communication
- `langchain` — Building AI applications
- `@langchain/google-genai` — Google Gemini integration
- `@langchain/groq` — Groq LLM integration
- `@tavily/core` — Web search integration for AI
- `cookie-parser` — Handling cookies
- `morgan` — HTTP request logging
- `cors` — Cross-Origin Resource Sharing
- `bcryptjs` — Password hashing
- `express-validator` — Request validation
- `jsonwebtoken` — JWT-based authentication
- `zod` — Schema validation and structured data handling

---

## State Management

Redux Toolkit is used on the frontend to manage application state.

### Authentication State

The authentication slice manages:

- Current user
- Loading state
- Authentication errors

### Chat State

The chat slice manages:

- Available chats
- Current chat ID
- Chat messages
- Loading state
- Errors
- Creating new chats
- Adding messages
- Removing deleted chats

This keeps application state predictable and makes it easier for different dashboard components to communicate.

---

## API Communication

Axios is used as the HTTP client on the frontend.

The frontend uses Axios instances configured with:

- Backend API base URL
- `withCredentials: true`

The authentication and chat services are separated into feature-specific service files.

Example:

```text
frontend/src/features/
├── auth/
│   └── services/
│       └── auth.api.js
│
└── chat/
    └── services/
        └── chat.api.js
```

---

## Real-Time Communication

Qevro-Ai uses Socket.IO for real-time communication.

The backend initializes a Socket.IO server on the HTTP server, while the frontend initializes the socket connection through the chat feature.

This provides the foundation for real-time communication between the frontend and backend.

---

## API Testing

I use **Bruno** for testing and managing the backend APIs.

The Bruno collection is organized feature-wise:

```text
bruno/
└── Qevro-Ai-APIs/
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
    │   ├── Delete-chat.yml
    │   └── folder.yml
    │
    ├── environments/
    ├── .gitignore
    └── opencollection.yml
```

The APIs are organized into feature-based collections.

### Auth

- Register
- Login
- Get Me
- Logout
- Verify Email

### Chat

- Message AI
- Get Chats
- Get Messages
- Delete Chat

All currently implemented APIs are tested and managed using Bruno.

---

## Backend Architecture

The backend follows a modular structure separating routes, controllers, middleware, models, services, validations, configuration, and sockets.

A simplified structure is:

```text
backend/
├── server.js
├── src/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── chats.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── chat.model.js
│   │   └── message.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── chats.route.js
│   ├── services/
│   │   └── mail.service.js
│   ├── sockets/
│   │   └── server.socket.js
│   └── validations/
│       └── auth.validation.js
└── package.json
```

The backend entry point is:

```text
backend/server.js
```

It creates the HTTP server, initializes Socket.IO, connects to MongoDB, and starts the Express application.

---

## Frontend Architecture

The frontend uses a feature-based structure.

A simplified structure is:

```text
frontend/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── app.routes.jsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hook/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── auth.slice.js
│   │   │
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── chat.slice.js
│   │   │
│   │   └── pages/
│   │       └── PrivacyPolicy.jsx
│   │
│   └── main.jsx
│
└── package.json
```

This structure keeps each major feature's UI, API services, hooks, and state management close to each other.

---

## Project Structure

```text
Qevro-Ai/
├── frontend/
├── backend/
├── bruno/
│   └── Qevro-Ai-APIs/
├── .gitignore
└── README.md
```

- `frontend/` — React frontend application
- `backend/` — Express backend, authentication, AI functionality, and Socket.IO
- `bruno/` — Bruno API testing collection
- `README.md` — Project documentation

---

## Architecture Overview

The current application can be understood as:

```text
                         Qevro-Ai
                            │
             ┌──────────────┴──────────────┐
             │                             │
         Frontend                       Backend
         React                         Express.js
             │                             │
      ┌──────┼──────┐             ┌────────┼────────┐
      │      │      │             │        │        │
   Redux  Axios  Router        MongoDB   AI Stack  Socket.IO
      │      │                    │        │
      │      └──────────────┐     │   ┌────┴────┐
      │                     │     │   │         │
   Chat UI              REST APIs  │ Gemini   Groq
      │                     │      │
      └──────────────┬──────┘      │
                     │              │
                 Auth + Chat +     │
                 User Data         │
                                    │
                                Tavily Search
```

---

## What This Project Demonstrates

Qevro-Ai is being built to practice and demonstrate full-stack development together with modern AI application development.

The project currently combines:

- MERN stack
- React
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- HTTP-only cookies
- Email verification
- Password hashing
- Request validation
- Axios
- Redux Toolkit
- Feature-based architecture
- REST APIs
- AI-powered conversations
- AI-generated chat titles
- Conversation context management
- Google Gemini integration
- Groq integration
- Tavily web search
- Socket.IO
- Markdown rendering
- Chat history
- Message history
- Chat deletion
- Logout functionality
- Privacy Policy and production-facing application requirements
- API testing with Bruno

---

## Development Status

Qevro-Ai is still under development.

The authentication system, email verification, protected routes, AI conversations, web search, chat history, message retrieval, chat deletion, logout functionality, Socket.IO foundation, dashboard UI, API testing setup, and Privacy Policy page are currently implemented.

More APIs, frontend features, AI capabilities, real-time functionality, search improvements, and detailed documentation will be added as development continues.

> 🚧 **More README details coming soon...**
