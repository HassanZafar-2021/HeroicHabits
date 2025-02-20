import express from "express";
import authRoutes from "./api/authRoutes.js";
import userRoutes from "./api/userRoutes.js";
import questRoutes from "./api/questRoutes.js";
import pixelaRoutes from "./api/pixelaRoutes.js";
import quotesRoutes from "./api/quoteRoutes.js"; // ✅ Import new quotes route

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/quests", questRoutes);
router.use("/pixela", pixelaRoutes);
router.use("/quotes", quotesRoutes); // ✅ Now `/api/quotes` works

export default router;
