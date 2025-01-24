import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database"; // Import only sequelize
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import index from "./routes/index";
import apiRoutes from "./routes/apiRoutes";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// Initialize environment variables
dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Database synchronization
if (process.env.NODE_ENV === "development") {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Database synced (force reset in development mode)!");
    })
    .catch((err) => {
      console.error("Error syncing the database", err);
    });
} else {
  sequelize
    .sync()
    .then(() => {
      console.log("Database synced!");
    })
    .catch((err) => {
      console.error("Error syncing the database", err);
    });
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/", index);

// Centralized error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    sequelize.close().then(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    sequelize.close().then(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });
});
