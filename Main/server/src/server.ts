import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import * as cors from "cors";
import apiRoutes from "./routes/api";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // For handling cross-origin requests

// Use API routes
app.use("/api", apiRoutes);

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Heroic Habits API!");
});

// Start the server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
