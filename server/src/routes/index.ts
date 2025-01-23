import express from "express";
import userRoutes from "./userRoutes";
import apiRoutes from "./apiRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/api", apiRoutes);

export default router;
