import express from "express";
import {
  createGraph,
  addHabitData,
} from "../../controllers/pixelaController.js";

const router = express.Router();

router.post("/create-graph", createGraph);
router.post("/add-data", addHabitData);
export default router;
