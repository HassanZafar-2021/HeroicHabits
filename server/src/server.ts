import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import sequelize from "./config/connection.js";
import routes from "./routes/index.js";
import pixelaRoutes from "./routes/api/pixelaRoutes.js"; // Import Pixela routes
import morgan from "morgan";
import helmet from "helmet";

dotenv.config();

// Check for required environment variables
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

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Database synchronization
sequelize
  .sync({ force: process.env.NODE_ENV === "development" })
  .then(() => console.log("Database synced!"))
  .catch((err: Error) => console.error("Error syncing the database:", err));

// Routes
app.use("/api", routes);
app.use("/api/pixela", pixelaRoutes); // Add Pixela API routes

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

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
