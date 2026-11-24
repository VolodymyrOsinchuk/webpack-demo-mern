require("dotenv").config();

if (!process.env.PRIVATE_KEY) {
  throw new Error(
    "PRIVATE_KEY is not set. Define it in the environment (or in .env) before starting the server.",
  );
}

const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// const config = require('../webpack.config')
// const compiler = webpack(config)

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
// Configuration DB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

async function connectDatabase() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Successfully connected to MongoDB");

    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

async function main() {
  try {
    await connectDatabase();

    // Your application logic goes here
  } catch (error) {
    console.error("Application startup failed:", error);

    process.exitCode = 1;
  }
}

main();
// app.use(
//   webpackConfigMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     writeToDisk: true,
//   })
// )

const app = express();

// Middlewares
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN || process.env.VERCEL_URL || "http://localhost:3000",
    credentials: true,
  }),
);
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

// Serveur des fichiers static en production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");
  console.log("🚀 ~  distPath:", distPath);

  // Serveur des assets statiques
  app.use(express.static(distPath));

  // Gestion du routing client-side (regex valide avec Express 5 — app.get("*") lève un PathError)
  app.all(/\/.*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Error Handling
app.use((req, res, next) => {
  next(createError.NotFound());
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
