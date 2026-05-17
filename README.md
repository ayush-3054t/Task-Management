# MERN Task Management App

Full-stack task management app with JWT authentication, user-specific CRUD, filters, search, counters, responsive Tailwind UI, toast notifications, loading states, and Socket.io task update events.

## Project Structure

```txt
backend/
  src/config
  src/controllers
  src/middleware
  src/models
  src/routes
frontend/
  src/components
  src/context
  src/pages
  src/services
```

## Backend Setup

```bash
cd backend
npm install
```

Fill `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/task-management
JWT_SECRET=replace_with_a_local_secret
PORT=5001
CLIENT_URL=http://localhost:5173
```

If `JWT_SECRET` contains characters like `#`, wrap it in quotes so dotenv reads the full value.

Run:

```bash
npm run dev
```

API endpoints:

```txt
POST   /api/auth/register
POST   /api/auth/login
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The React app runs at `http://localhost:5173` and expects the backend at `http://localhost:5001`.

Frontend routes:

```txt
/           Public landing page
/login      Login page
/register   Register page
/dashboard  Protected task dashboard
```

## Sample MongoDB Schema

User:

```js
{
  name: String,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
}
```

Task:

```js
{
  user: ObjectId,
  title: String,
  description: String,
  status: "pending" | "in-progress" | "completed",
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

JWTs are issued without expiration logic, as requested.
