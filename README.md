# Qevro-Ai

🚀 **Live Demo:** https://qevro-ai.vercel.app

Qevro-Ai is an AI-powered search and conversation application built with the MERN stack and LangChain. Users can register and verify their email, sign in, ask AI questions, search the web for current information, and revisit or delete previous conversations.

## Features

- 🔐 User registration and login
- ✉️ Email verification using the Resend API
- 🍪 JWT authentication stored in an HTTP-only cookie
- 🔒 Protected chat endpoints and authenticated user lookup
- 🤖 AI-powered conversations using Google Gemini with Groq fallback
- 🌐 Web search through Tavily for current or time-sensitive information
- 🧠 Conversation context using previous messages from the selected chat
- 🏷️ AI-generated titles for new chats
- 💬 Saved chat and message history
- 🗑️ Delete a chat together with its associated messages
- 📝 Markdown rendering with GitHub Flavored Markdown support
- ⚡ Socket.IO client/server connection foundation
- 🧰 Redux Toolkit for frontend authentication and chat state
- 🧪 Bruno collection for API testing
- 📱 Responsive dashboard with a collapsible chat sidebar

## How It Works

```text
                         User
                          │
                          ▼
                   React Frontend
                          │
             Axios + HTTP-only Cookie
                          │
                          ▼
                    Express Backend
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
       Authentication   Chat APIs   Socket.IO
             │            │
             ▼            ▼
         MongoDB      LangChain Agent
                           │
                    ┌──────┴──────┐
                    ▼             ▼
                 Gemini          Groq
                    │        (fallback model)
                    ▼
               Tavily Search
          (when current web info is needed)
```

For registration, the backend creates an unverified user and sends an email containing a verification link through Resend. After email verification, the user can log in. The backend issues a JWT in an HTTP-only cookie, which is used for protected routes.

For chat requests, the backend stores user and AI messages in MongoDB. The AI agent uses Gemini and can call Tavily for current information; Groq is configured as a fallback model. A separate Groq call generates a title for a new conversation.

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS 4
- React Router
- Axios
- Redux Toolkit and React Redux
- Socket.IO Client
- React Markdown
- remark-gfm
- lucide-react

### Backend

- Node.js
- Express 5
- MongoDB and Mongoose
- JWT (`jsonwebtoken`)
- HTTP-only cookies (`cookie-parser`)
- Password hashing with `bcryptjs`
- Request validation with `express-validator`
- LangChain
- Google Gemini integration (`@langchain/google-genai`)
- Groq integration (`@langchain/groq`)
- Tavily web search (`@tavily/core`)
- Resend email API (`resend`)
- Socket.IO
- CORS
- Morgan request logging
- dotenv
- Zod

## Project Structure

```text
Qevro-Ai/
├── backend/
│   ├── .env.example
│   ├── nodemon.json
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── database.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── chats.controller.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   └── error.middleware.js
│       ├── models/
│       │   ├── user.model.js
│       │   ├── chat.model.js
│       │   └── message.model.js
│       ├── routes/
│       │   ├── auth.route.js
│       │   └── chats.route.js
│       ├── services/
│       │   ├── ai.service.js
│       │   ├── internet.service.js
│       │   └── mail.service.js
│       ├── sockets/
│       │   └── server.socket.js
│       └── validations/
│           └── auth.validation.js
├── frontend/
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json
│   └── src/
│       ├── app/
│       │   ├── App.jsx
│       │   ├── app.routes.jsx
│       │   └── app.store.js
│       └── features/
│           ├── auth/
│           │   ├── auth.slice.js
│           │   ├── components/
│           │   ├── hook/
│           │   ├── pages/
│           │   └── services/
│           ├── chat/
│           │   ├── chat.slice.js
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── pages/
│           │   └── services/
│           └── pages/
│               └── PrivacyPolicy.jsx
├── bruno/
│   └── Qevro-Ai-APIs/
│       ├── auth/
│       ├── chat/
│       ├── .gitignore
│       └── opencollection.yml
├── .gitignore
└── README.md
```

## Getting Started

You need Node.js, npm, a MongoDB connection string, and API credentials for Gemini, Groq, Tavily, and Resend.

### 1. Clone the repository

```bash
git clone https://github.com/Ashish2k04/Qevro-Ai.git
cd Qevro-Ai
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory. You can use the example file as a starting point:

```bash
cp .env.example .env
```

Configure the following environment variables in `backend/.env`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
ENVIRONMENT=development
JWT_SECRET=your_long_random_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
RESEND_API_KEY=your_resend_api_key
FRONTEND_URI=http://localhost:5173
BACKEND_URI=http://localhost:3000
```

Replace the placeholders with your actual credentials. Never commit `.env` or expose private API keys in frontend code.

**Email provider note:** The current `backend/src/services/mail.service.js` uses the Resend SDK and reads `RESEND_API_KEY`. It sends verification email from `Qevro-AI <onboarding@resend.dev>`. The old Gmail OAuth2/Nodemailer SMTP configuration is not used by the current mail service. The `nodemailer` dependency is still present in `package.json`, but the current email implementation imports `resend`.

The verification link is built using `BACKEND_URI` (with a backend URL fallback in the code), while the post-verification login link uses `FRONTEND_URI`. Set these to your deployed backend and frontend URLs in production.

Start the backend:

```bash
npm run dev
```

With `PORT=3000`, the backend is available locally at `http://localhost:3000`.

### 3. Set up the frontend

Open another terminal from the repository root:

```bash
cd frontend
npm install
```

Create or update `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`.

For the deployed frontend, set `VITE_API_URL` in Vercel to your deployed backend's base URL. Do not add `/api` to the base URL; the frontend services append API paths such as `/api/login` themselves. Environment variables prefixed with `VITE_` are included in the client bundle, so use this only for a public backend URL—not for secrets.

## Backend API Endpoints

The backend currently exposes nine application API endpoints.

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/register` | Public | Create an account and send the verification email |
| `GET` | `/api/verify-email?token=...` | Email token | Verify the user's email address |
| `POST` | `/api/login` | Public | Check credentials and set the JWT cookie |
| `GET` | `/api/get-me` | Required | Return the currently authenticated user's information |
| `POST` | `/api/logout` | Required | Clear the authentication cookie |
| `POST` | `/api/message` | Required | Send a message to the AI and create or continue a chat |
| `GET` | `/api/get-chats` | Required | Fetch the logged-in user's chats |
| `GET` | `/api/get-messages/:chatId` | Required | Fetch messages for a chat owned by the user |
| `DELETE` | `/api/delete-chat/:chatId` | Required | Delete a chat and its associated messages |

The root endpoint `GET /` returns a simple server-running message.

### Register

`POST /api/register`

Request body:

```json
{
  "username": "your_username",
  "email": "you@example.com",
  "password": "your_password"
}
```

The backend validates the input, checks for an existing username/email, hashes the password before storing it, and attempts to send a verification email through Resend. A user must verify their email before logging in.

### Verify Email

`GET /api/verify-email?token=VERIFICATION_TOKEN`

The verification token is included in the email link. On successful verification, the backend serves a confirmation page with a link back to the frontend login route.

### Login

`POST /api/login`

Request body:

```json
{
  "email": "you@example.com",
  "password": "your_password"
}
```

On successful login, the server returns the user information and sets a JWT in an HTTP-only cookie with `secure` and `sameSite: "none"` options for cross-site deployment.

### Get Current User

`GET /api/get-me`

Requires the authentication cookie. It returns the current user's username and email.

### Logout

`POST /api/logout`

Requires authentication and clears the JWT cookie.

### Send a Message to AI

`POST /api/message`

Start a new conversation by sending a message without `chatId`:

```json
{
  "message": "What is the latest space exploration news?"
}
```

Continue an existing conversation by including its `chatId`:

```json
{
  "message": "Tell me more about the mission you mentioned.",
  "chatId": "YOUR_CHAT_ID"
}
```

When starting a new chat, the backend generates a title and stores the user and AI messages. When continuing a chat, it uses the existing chat's message history as context for the AI response.

### Get Chats

`GET /api/get-chats`

Returns the chats belonging to the authenticated user.

### Get Messages

`GET /api/get-messages/:chatId`

Returns messages for the specified chat after confirming that the chat belongs to the authenticated user.

### Delete Chat

`DELETE /api/delete-chat/:chatId`

Deletes the authenticated user's chat and its related messages.

## AI Workflow and Web Search

### AI conversation

The AI service uses LangChain's agent functionality. Gemini (`gemini-3.5-flash-lite`) is the primary model and Groq (`openai/gpt-oss-120b`) is configured as a fallback. The service passes the current question and available conversation history to the agent.

### Tavily search

The `SearchInternet` tool uses Tavily. The system prompt instructs the model to call web search for requests involving latest, current, recent, today's, or other time-sensitive information. The tool searches for up to five results and returns them to the model to help compose the answer.

### Chat title generation

When a new chat is created, the backend calls Groq to generate a short title based on the user's first message. The title generator is instructed to return a concise 2–5 word title in the user's language without extra explanation.

## Authentication and Security

- Passwords are hashed using `bcryptjs` before being stored in MongoDB.
- Registration and login inputs are validated using `express-validator`.
- JWT authentication is stored in an HTTP-only cookie rather than exposed to client-side JavaScript.
- Protected routes use authentication middleware to verify the JWT.
- Chat retrieval and deletion check that the requested chat belongs to the authenticated user.
- CORS is configured for the local Vite origin and the configured `FRONTEND_URI`.
- API keys should remain in backend environment variables.

## Email Verification with Resend

Email delivery currently uses the official Resend Node SDK.

The mail service:

1. Reads `RESEND_API_KEY` from the backend environment.
2. Sends a verification email using `resend.emails.send()`.
3. Includes the user's generated verification link in the email.
4. Throws an error if the Resend API returns an error and logs the email ID on success.

Current sender configured in code:

```text
Qevro-AI <onboarding@resend.dev>
```

The previous Gmail OAuth2 SMTP approach was replaced after connection issues. For production email delivery to users, make sure your Resend account and sender/domain setup meet Resend's current sending requirements.

## State Management

Redux Toolkit is used to organize frontend state.

### Authentication state

The auth slice manages user information, loading state, and errors. On application load, the frontend requests `/api/get-me` to restore the current user's state from the authentication cookie.

### Chat state

The chat slice manages the chat list, selected chat ID, message-related state, loading state, and errors. Feature-specific hooks and API service files keep state updates and HTTP requests organized.

## Frontend UI

The frontend includes:

- Login and registration pages
- Protected chat dashboard
- Responsive/collapsible chat sidebar
- Start a new chat and switch between existing chats
- Display user and AI messages
- Render AI responses as Markdown with GitHub Flavored Markdown support
- Delete-chat confirmation modal
- Logout confirmation modal
- AI thinking/loading indicator
- Current user information in the dashboard

The route configuration currently enables `/login`, `/register`, and the protected `/` dashboard. A Privacy Policy page component exists in the project, but its route is currently commented out in `frontend/src/app/app.routes.jsx`.

## Socket.IO

The backend initializes a Socket.IO server on the same HTTP server as Express. The frontend creates a Socket.IO client connection when the dashboard loads. The currently implemented socket handler logs when a client connects; the chat send/receive flow currently uses the REST API.

Relevant files:

```text
backend/src/sockets/server.socket.js
frontend/src/features/chat/services/chat.socket.js
frontend/src/features/chat/hooks/useChat.js
```

## Bruno API Collection

The repository contains a Bruno collection under `bruno/Qevro-Ai-APIs/`, organized into `auth` and `chat` folders. The committed request files currently cover registration, login, getting the current user, sending AI messages, getting chats, getting messages, and deleting a chat. Logout and email-verification routes are implemented in the backend, but separate request files for them are not currently present in the collection.

## Main Packages

`npm install` in each app installs the dependencies listed in its `package.json`.

### Frontend

| Package | Purpose |
| --- | --- |
| `react` / `react-dom` | Build and render the UI |
| `react-router` | Client-side routing and protected dashboard routes |
| `@reduxjs/toolkit` / `react-redux` | Manage authentication and chat state |
| `axios` | Call backend APIs with credentials included |
| `socket.io-client` | Establish the Socket.IO client connection |
| `tailwindcss` / `@tailwindcss/vite` | Utility styling and Vite integration |
| `lucide-react` | UI icons |
| `react-markdown` / `remark-gfm` | Render Markdown and GitHub Flavored Markdown in AI responses |

### Backend

| Package | Purpose |
| --- | --- |
| `express` | HTTP API and routing |
| `mongoose` | MongoDB models and queries |
| `bcryptjs` | Hash and compare passwords |
| `jsonwebtoken` | Create and verify JWTs |
| `cookie-parser` | Read cookies from incoming requests |
| `express-validator` | Validate registration and login input |
| `resend` | Send email-verification messages via Resend API |
| `langchain` | Configure the AI agent and fallback middleware |
| `@langchain/google-genai` | Gemini chat model integration |
| `@langchain/groq` | Groq chat model integration and title generation |
| `@tavily/core` | Internet search tool for the AI agent |
| `socket.io` | Initialize the server-side socket connection |
| `cors` | Allow requests from configured frontend origins |
| `morgan` | HTTP request logging |
| `dotenv` | Load environment variables |
| `zod` | Define the search tool input schema |

**Migration note:** `nodemailer` remains listed in backend dependencies, but the current `mail.service.js` sends mail through `resend`. It is not used by the active mail service implementation.

## Deployment Notes

- **Frontend:** deployed on Vercel at https://qevro-ai.vercel.app
- **Backend:** deploy the `backend/` application on a Node.js hosting service and configure its environment variables in that service's dashboard.
- Set `VITE_API_URL` in Vercel to the backend's base URL (for example, `https://your-backend-domain`), then redeploy the frontend after changing it.
- Set `FRONTEND_URI` in the backend to `https://qevro-ai.vercel.app` for production CORS, socket CORS, and the post-verification login link.
- Set `BACKEND_URI` to the deployed backend URL so email verification links point to the deployed API.
- Configure `RESEND_API_KEY`, `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `GROQ_API_KEY`, and `TAVILY_API_KEY` on the backend hosting service. Do not put these secrets in Vercel's `VITE_` variables.
- Do not expose `.env` files or API keys in the repository.

## What This Project Demonstrates

Qevro-Ai is a practical full-stack project combining:

- MERN stack development
- Authentication with JWT and HTTP-only cookies
- Password hashing and request validation
- Email verification through a transactional email API
- REST API design and protected resources
- MongoDB data modeling and chat/message persistence
- LangChain agents and model fallback
- AI-powered conversation context and title generation
- Tool calling for web search with Tavily
- Redux Toolkit and feature-based React architecture
- Markdown rendering
- Socket.IO client/server setup
- API testing with Bruno
- Deployment with Vercel and a hosted Node.js backend
