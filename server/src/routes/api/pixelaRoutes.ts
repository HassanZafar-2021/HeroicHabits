import express from "express";
import {
  createGraph,
  addDataToGraph,
} from "../../controllers/pixelaController.js";

const router = express.Router();

router.post("/create-graph", createGraph);
router.post("/add-data", addDataToGraph);

export default router;
