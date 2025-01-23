import { Request, Response } from "express";
import { Quest } from "../models/Quest";

// Get all quests
export const getQuests = async (req: Request, res: Response) => {
  try {
    const quests = await Quest.findAll();
    res.status(200).json(quests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quests", error });
  }
};

// Update quest progress
export const updateQuestProgress = async (req: Request, res: Response) => {
  const questId = req.params.id;
  const { progress } = req.body;

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
    res.status(500).json({ message: "Error updating quest progress", error });
  }
};
