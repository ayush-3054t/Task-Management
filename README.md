# TaskFlow — MERN Task Management App

A full-stack task management application built with MongoDB, Express, React, and Node.js.

## Features

- **Authentication** — JWT-based register/login with bcrypt password hashing
- **Task CRUD** — Create, read, update, delete tasks
- **Filters & Search** — Filter by status, priority; full-text search; sort options
- **Real-time Updates** — Socket.IO syncs changes instantly across sessions
- **Priority & Status** — High/Medium/Low priority, To Do / In Progress / Completed statuses
- **Due Dates & Tags** — Attach deadlines and custom tags to tasks
- **Responsive UI** — Tailwind CSS, works on mobile and desktop

## Tech Stack

| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | React 18, Vite, Tailwind CSS      |
| Backend  | Node.js, Express 4                |
| Database | MongoDB Atlas + Mongoose          |
| Auth     | JWT + bcryptjs                    |
| Realtime | Socket.IO                         |

## Project Structure

```
├── backend/
│   └── src/
│       ├── config/db.js
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── app.js
│       └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        ├── services/
        └── styles/
```

## Getting Started

### Backend
```bash
cd backend
npm install
npm run dev        # starts on port 5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # starts on port 5173
```

## Environment Variables

**backend/.env**
```
MONGO_URI=...
JWT_SECRET=...
PORT=5000
CLIENT_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```
