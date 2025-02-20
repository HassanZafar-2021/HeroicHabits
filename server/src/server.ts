import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import sequelize from "./config/connection.js";
import routes from "./routes/index.js"; // ✅ Import all routes in one place

dotenv.config();

// ✅ Check for required environment variables
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

app.use(express.static("../client/dist"));

// ✅ Middleware
app.use(
  cors({
    origin: ["https://your-frontend.onrender.com", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// ✅ Database synchronization (Prevent data loss in production)
sequelize
  .sync({ alter: process.env.NODE_ENV === "development" }) // ✅ Use `alter: true` to avoid dropping tables
  .then(() => console.log("Database synced!"))
  .catch((err: Error) => console.error("Error syncing the database:", err));

// ✅ Mount all routes correctly
app.use("/api", routes); // ✅ Ensures all API routes are prefixed with `/api`

// ✅ Centralized error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.stack);
  res.status(err.statusCode || 500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
});

// ✅ Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ Graceful shutdown (Handle crashes)
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received: closing server`);
  server.close(() => {
    console.log("HTTP server closed");
    sequelize.close().then(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });
};

// ✅ Handle process exit signals
["SIGTERM", "SIGINT"].forEach((signal) =>
  process.on(signal, () => gracefulShutdown(signal))
);

// ✅ Catch unhandled errors
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
