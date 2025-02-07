import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import sequelize from "./config/connection.js";
import routes from "./routes/index.js";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["JWT_SECRET_KEY", "DB_NAME", "DB_USER", "DB_PASSWORD"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`${varName} is missing in environment variables.`);
  }
});

const app: Express = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("../client/dist"));

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Database synchronization
sequelize
  .sync({ force: process.env.NODE_ENV === "development" })
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Error syncing the database:", err));

// Routes
app.use("/api", routes);

// Centralized error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
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

["SIGTERM", "SIGINT"].forEach((signal) =>
  process.on(signal, () => gracefulShutdown(signal))
);

// Unhandled Rejection and Uncaught Exception
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", promise, "reason:", reason);
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
