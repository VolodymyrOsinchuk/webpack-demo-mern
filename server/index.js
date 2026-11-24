require("dotenv").config();

if (!process.env.PRIVATE_KEY) {
  throw new Error(
    "PRIVATE_KEY is not set. Define it in the environment (or in .env) before starting the server.",
  );
}

const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");

// Configuration DB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

// ─── Connexion Mongoose avec cache (compatible serverless Vercel) ──────────────
let isConnected = false;

async function connectDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return;
  }
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    bufferCommands: false,
  });
  isConnected = true;
  console.log("Successfully connected to MongoDB");
}

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Vercel injecte automatiquement VERCEL_URL = "ton-app.vercel.app" (sans https://)
const allowedOrigins = [
  "http://localhost:3000",
  "https://webpack-demo-mern.vercel.app",
  process.env.REACT_APP_API_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// ─── Middleware DB : connecte avant chaque requête ────────────────────────────
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    res.status(503).json({ error: "Database unavailable" });
  }
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// ─── Fichiers statiques (dist buildé par webpack) ─────────────────────────────
const distPath = path.join(__dirname, "../dist");

if (fs.existsSync(distPath)) {
  console.log("Serving static files from:", distPath);
  app.use(express.static(distPath));

  // Client-side routing fallback (compatible Express 5)
  app.all(/\/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("App listening on port: " + port);
});

module.exports = app;
