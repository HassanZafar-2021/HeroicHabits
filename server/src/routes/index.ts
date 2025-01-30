import express from "express";
import userRoutes from "./userRoutes.js";
import questRoutes from "./questRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/quests", questRoutes);
router.use("/auth", authRoutes);

export default router;
