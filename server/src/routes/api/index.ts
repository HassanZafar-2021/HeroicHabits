import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes.js";
import questRoutes from "./questRoutes.js";
import pixelaRoutes from "./pixelaRoutes.js";

router.use("/users", userRoutes);
router.use("/quests", questRoutes);
router.use("/pixela", pixelaRoutes);

export default router;
