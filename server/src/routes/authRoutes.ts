import express from "express";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/verify", verifyToken);

export default router;
