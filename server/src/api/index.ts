import { Router } from "express";
import { userRouter } from "./user-routes.js"; // Ensure correct path

const router = Router();

// Use the userRouter for '/users' route
router.use("/users", userRouter);

export default router;
