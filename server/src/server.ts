import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Added CORS middleware
import morgan from "morgan";
import helmet from "helmet";
import sequelize from "./config/connection.js";
import routes from "./routes/index.js";

dotenv.config();

// ✅ Ensure required environment variables are set
const requiredEnvVars = [
  "JWT_SECRET_KEY",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "PIXELA_USERNAME",
  "PIXELA_TOKEN",
  "PIXELA_GRAPH_ID",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`${varName} is missing in environment variables.`);
  }
});

const app: Express = express();
const PORT = process.env.PORT || 3001;

// ✅ Middleware
app.use(
  cors({
    origin: ["https://heroic-habits.onrender.com", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// ✅ Serve frontend (if using a full-stack deployment)
app.use(express.static("../client/dist"));

// ✅ Database synchronization
sequelize
  .sync({ force: process.env.NODE_ENV === "development" }) // ❗ Set `force: false` in production
  .then(() => console.log("✅ Database synced!"))
  .catch((err: Error) => console.error("❌ Error syncing the database:", err));

// ✅ Mount API routes
app.use("/api", routes);

// ✅ Centralized error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
});

// ✅ Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Graceful Shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received: closing server...`);
  server.close(() => {
    console.log("✅ HTTP server closed.");
    sequelize.close().then(() => {
      console.log("✅ Database connection closed.");
      process.exit(0);
    });
  });
};

["SIGTERM", "SIGINT"].forEach((signal) =>
  process.on(signal, () => gracefulShutdown(signal))
);

// ✅ Handle unexpected errors
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", promise, "Reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});
