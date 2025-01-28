import express from "express";
import { getQuests, updateQuestProgress } from "../controllers/apiController.js";
import { body, param } from "express-validator";

const router = express.Router();

// Get all quests
router.get("/quests", async (req, res, next) => {
  try {
    await getQuests(req, res);
  } catch (error) {
    next(error);
  }
});

// Update quest progress
router.put(
  "/quests/:id/progress",
  [param("id").isInt().withMessage("ID must be an integer")],
  updateQuestProgress
);

export default router;
