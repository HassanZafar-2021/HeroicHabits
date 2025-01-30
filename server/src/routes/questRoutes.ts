import express from "express";
import {
  getQuests,
  updateQuestProgress,
} from "../controllers/apiController.js";
import { param } from "express-validator";

const router = express.Router();

router.get("/quests", getQuests);
router.put(
  "/quests/:id/progress",
  param("id").isInt().withMessage("ID must be an integer"),
  updateQuestProgress
);

export default router;
