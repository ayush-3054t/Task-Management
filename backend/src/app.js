const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// CORS — allowed origins come from the env so no code change is needed
// when switching between local dev and production deployment.
const allowedOrigins = [
  process.env.CLIENT_URL,          // set in .env  (localhost or Vercel)
  'http://localhost:5173',          // always allow local Vite dev server
  'http://localhost:5174',          // allow Vite fallback dev port
  'http://localhost:4173',          // allow Vite preview build too
].filter(Boolean);                  // drop undefined if CLIENT_URL is not set

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use(errorHandler);

module.exports = app;
