import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes.js";
import questRoutes from "./questRoutes.js";

router.use("/users", userRoutes); 
router.use("/quests", questRoutes); 

export default router;
