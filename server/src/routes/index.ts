import express from "express";
import authRoutes from "./authRoutes.js";
import quoteRoutes from "./quoteRoutes.js";
import authenticateToken from "../middleware/authmiddleware.js";
import apiRoutes from "./api/index.js";

const router = express.Router();

router.use("/api", authenticateToken, apiRoutes);
router.use("/auth", authRoutes);
router.use("/quotes", quoteRoutes);

export default router;
