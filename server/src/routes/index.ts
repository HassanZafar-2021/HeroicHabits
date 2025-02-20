import express from "express";
import authRoutes from "./authRoutes.js";
import quoteRoutes from "./quoteRoutes.js";
import authenticateToken from "../middleware/authmiddleware.js";
import apiRoutes from "./api/index.js";
import pixelaRoutes from "./api/pixelaRoutes.js";

const router = express.Router();

router.use("/api", authenticateToken, apiRoutes);
router.use("/auth", authRoutes);
router.use("/quotes", quoteRoutes);
router.use("/pixela", pixelaRoutes);

export default router;
