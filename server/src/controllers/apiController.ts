import { Request, Response } from "express";
import { Quest } from "../models/Quest.js";

// Get all quests
export const getQuests = async (_: Request, res: Response) => {
  try {
    const quests = await Quest.findAll();
    res.status(200).json(quests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching quests", error: (error as Error).message });
  }
};

// Update quest progress
export const updateQuestProgress = async (req: Request, res: Response) => {
  const questId = req.params.id;
  const { progress } = req.body;

  if (typeof progress !== "number") {
    return res.status(400).json({ message: "Invalid progress value" });
  }

  try {
    const quest = await Quest.findByPk(questId);
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }

    // Update quest progress
    quest.progress = progress;
    await quest.save();

    res.status(200).json({ message: "Quest progress updated", quest });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating quest progress", error: (error as Error).message });
  }
};
