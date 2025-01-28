import express from "express";
import userRoutes from "./userRoutes.js";
import apiRoutes from "./apiRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/api", apiRoutes);

export default router;
