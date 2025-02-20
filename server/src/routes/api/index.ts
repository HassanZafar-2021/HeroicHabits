import express from "express";
import userRoutes from "./userRoutes.js";
import questRoutes from "./questRoutes.js";
import pixelaRoutes from "./pixelaRoutes.js";
import authRoutes from "../api/authRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/quests", questRoutes);
router.use("/pixela", pixelaRoutes);

export default router;
