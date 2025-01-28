import express from "express";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

// Verify token route
router.get("/verify", verifyToken);

export default router;
