import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://task-management-theta-six-12.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.set("io", io);

io.on("connection", (socket) => {
  socket.on("join-user-room", (userId) => {
    if (userId) socket.join(userId);
  });
});

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required in .env");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required in .env");
  }

  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set a different PORT in backend/.env.`);
    process.exit(1);
  }

  console.error(`Server error: ${error.message}`);
  process.exit(1);
});

startServer().catch((error) => {
  console.error(`Startup error: ${error.message}`);
  process.exit(1);
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-management-theta-six-12.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));
