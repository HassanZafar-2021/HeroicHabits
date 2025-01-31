import express, { Request, Response, NextFunction } from "express";
import {
  getQuests,
  updateQuestProgress,
} from "../controllers/apiController.js";
import { param, validationResult } from "express-validator";

const router = express.Router();

// Middleware to check for validation errors
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /quests - Get all quests
router.get("/quests", getQuests);

// PUT /quests/:id/progress - Update quest progress
router.put(
  "/quests/:id/progress",
  param("id").isInt().withMessage("ID must be an integer"), // Validate quest ID
  handleValidationErrors, // Handle validation errors
  updateQuestProgress
);

export default router;
