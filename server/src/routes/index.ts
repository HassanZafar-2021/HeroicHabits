import express from "express";
import userRoutes from "./userRoutes.js";
import questRoutes from "./questRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

// Routes
router.use("/users", userRoutes); // Route for user-related actions
router.use("/quests", questRoutes); // Route for quest-related actions
router.use("/auth", authRoutes); // Route for authentication actions

export default router;
