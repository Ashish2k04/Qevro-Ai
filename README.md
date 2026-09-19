# Qevro-Ai

An AI-powered search engine built with the MERN stack.

>  **This project is still under development.**

##  Current Progress
Qevro-Ai is currently under active development.

So far, I have implemented the authentication system, email verification, AI-powered conversations, web
search capabilities, chat history management, message retrieval, chat deletion, API testing with Bruno,
and the main dashboard UI.

---
##  Backend APIs Implemented
Currently, **8 backend APIs** have been implemented.

### 1. Register
The Register API is used to create a new user account.

The user provides:
- `username`
- `email`
- `password`
- 
The user is **not registered immediately**.

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
If the email has not been verified, the API returns a response asking the user to verify their email

first:
> Verify your email first. Check your email to verify yourself.
Authentication is handled using JWT.

---

### 3. Get Me
The Get Me API is a **protected API**.

After logging in, the user can access this API to retrieve their own account information.

The API returns:
- `_id`
- `username`
- `email`

The user's identity is obtained from the authentication token.

---

### 4. Verify Email
The Verify Email API is used to verify the user's email address.

After registration, the user receives a verification email.
The user clicks the verification link from the email to verify their account.

The flow is:

```text
Register
↓
Verification email sent
↓
User clicks verification link
↓
Email verified
↓
User can Login
```
---

### 5. Chat With AI
The Chat With AI API is used to communicate with the AI.

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
1. A new chat is **not** created.
2. The new user message is stored using the provided `chatId`.
3. The AI generates a response.
4. The AI response is stored using the same `chatId`.
5. The existing conversation continues.
This allows the AI to maintain the context of the conversation and use previous messages from the same
chat.

---

### 6. Get Chats
The Get Chats API is a **protected API**.

The user only needs to be logged in and make a request to this API.
The user's ID is obtained from the authentication token.
The API then fetches all chats belonging to that user.

The response contains information such as:
- Chat ID
- Chat title
- Chat creation date
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

### 7. Get Messages
The Get Messages API is a **protected API**.
The user must provide a `chatId` as a route parameter.

Example:
```text
GET /api/chat/messages/:chatId
```

The API uses the provided `chatId` to fetch all messages related to that conversation.

The response contains:
- User messages
- AI messages
- Messages belonging to the requested chat

This allows the frontend to load the complete conversation when a user opens an existing chat.

---

### 8. Delete Chat
The Delete Chat API is a **protected API**.

The user provides the `chatId` as a route parameter.

Example:
```text
DELETE /api/chat/:chatId
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

##  AI Features
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

###  Web Search
Qevro-Ai uses **Tavily** to provide web search capabilities to the AI.
This allows the AI to search the web when external or current information is required.
The AI can use the search results as part of its response generation.

---

##  Frontend
The frontend is built using React and currently includes:
- Login page
- Register page
- Complete Dashboard UI

The main dashboard UI is implemented in `Dashboard.jsx`.
The frontend follows a **feature-based folder structure** to keep the application organized and scalable.

The dashboard is designed to handle:
- User chats
- Chat history
- AI messages
- User messages
- Chat selection
- Chat deletion
- AI conversation flow

---

##  Frontend Packages & Tools

The frontend currently uses:
- `@reduxjs/toolkit` — State management
- `react-redux` — Connecting Redux with React
- `react-router` — Client-side routing
- `axios` — Making API requests
- `socket.io-client` — Real-time communication
- `tailwindcss` — Utility-first CSS framework for styling

---

## ⚙ Backend Packages & Tools
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

---

##  API Testing

I use **Bruno** for testing and managing the backend APIs.

The Bruno collection is organized feature-wise:
```text
bruno/
└── Qevro-AI-APIs/
├── auth/
│ ├── Register.yml
│ ├── Login.yml
│ ├── Get-me.yml
│ └── folder.yml
│
├── chat/
│ ├── Message-ai.yml
│ ├── Get-chats.yml
│ ├── Get-messages.yml
│ ├── Delete-chat.yml
│ └── folder.yml
│
├── environments/
│
├── .gitignore
└── opencollection.yml

```

The APIs are organized into feature-based collections:

### Auth
- Register
- Login
- Get Me

### Chat
- Message AI
- Get Chats
- Get Messages
- Delete Chat
All currently implemented APIs are tested using Bruno.

---

##  Architecture
Qevro-Ai is being developed with a modular backend and a feature-based frontend architecture.

The project currently combines:
- MERN stack
- JWT authentication
- Email verification
- Password hashing
- Request validation
- AI-powered conversations
- AI-generated chat titles
- Conversation context management
- Web search using Tavily
- Chat history
- Message history
- Chat deletion with connected messages
- Google Gemini integration
- Groq integration
- Real-time communication using Socket.IO
- Redux state management
- REST APIs
- API testing with Bruno

---

##  Project Structure
```text
Qevro-Ai/
├── frontend/
├── backend/
├── bruno/
│ └── Qevro-AI-APIs/
└── README.md
```

- `frontend/` — React frontend application
- `backend/` — Express backend and AI functionality
- `bruno/` — Bruno API testing collection

---

##  Development Status
Qevro-Ai is still under development.
More APIs, frontend features, AI capabilities, real-time functionality, search improvements, and
detailed documentation will be added as development continues.
More README details coming soon...
