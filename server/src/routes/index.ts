import express from "express";
import authRoutes from "./api/authRoutes.js"; // ✅ Inside `/routes/api`
import userRoutes from "./api/userRoutes.js";
import questRoutes from "./api/questRoutes.js";
import pixelaRoutes from "./api/pixelaRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes); // ✅ Now `/api/auth/signup` works
router.use("/users", userRoutes);
router.use("/quests", questRoutes);
router.use("/pixela", pixelaRoutes);

export default router;
