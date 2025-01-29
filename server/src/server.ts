import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import sequelize from "./config/connection.js"; // Import only sequelize
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import index from "./routes/index.js";
import apiRoutes from "./routes/apiRoutes.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// Initialize environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is missing in environment variables.");
}

const app: Express = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("../client/dist"));
// Middleware setup
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Database synchronization
sequelize
  .sync({ force: process.env.NODE_ENV === "development" }) // Avoid using `force: true` in production
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err: Error) => {
    console.error("Error syncing the database", err);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/", index);

// Centralized error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = (err as any).statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong!"
      : err.message;
  res.status(statusCode).json({ message, error: err.message });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(() => {
    console.log("HTTP server closed");
    sequelize.close().then(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  process.exit(1);
});

/*
kylemcgrat@gmail.com
*/
