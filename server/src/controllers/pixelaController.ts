import { Request, Response } from "express";
import { pixelaService } from "../services/pixelaService.js"; // Import service

// Create a new Pixela user
export const createUser = async (req: Request, res: Response) => {
  const { username, token } = req.body;

  try {
    const user = await pixelaService.createUser(username, token);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
};

// Create a new graph
export const createGraph = async (req: Request, res: Response) => {
  const { username, token, graphData } = req.body;

  try {
    const graph = await pixelaService.createGraph(username, token, graphData);
    res.json(graph);
  } catch (error) {
    res.status(500).json({ message: "Failed to create graph", error });
  }
};

// Get all graphs
export const getGraphs = async (req: Request, res: Response) => {
  const { username, token } = req.body;

  try {
    const graphs = await pixelaService.getGraphs(username, token);
    res.json(graphs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch graphs", error });
  }
};

// Add habit data (pixel)
export const addHabitData = async (req: Request, res: Response) => {
  const { username, token, graphId, date, quantity } = req.body;

  try {
    const response = await pixelaService.addPixel(
      username,
      token,
      graphId,
      date,
      quantity
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to add habit data", error });
  }
};

// Get graph statistics
export const getGraphStats = async (req: Request, res: Response) => {
  const { username, token, graphId } = req.body;

  try {
    const stats = await pixelaService.getGraphStats(username, token, graphId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch graph stats", error });
  }
};
