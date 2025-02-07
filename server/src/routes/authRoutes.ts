import express from "express";
import { verifyToken } from "../controllers/authController.js"; // Assuming your verifyToken middleware is correctly imported

const router = express.Router();

// Protect the /verify route using the verifyToken middleware
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

export default router;
