import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// POST /register - Register a new user
router.post("/register", registerUser);

// POST /login - Log in an existing user
router.post("/login", loginUser);

export default router;
