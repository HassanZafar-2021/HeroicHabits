import express from "express";
import { getQuests, updateQuestProgress } from "../controllers/apiController";

const router = express.Router();

// Get all quests
router.get("/quests", getQuests);

// Update quest progress
router.post("/quests/:id/progress", updateQuestProgress);

export default router;
