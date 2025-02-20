import { Router } from "express";
import fetch from "node-fetch"; // ✅ Explicitly import node-fetch

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random"); // ✅ Correct API URL
    if (!response.ok) {
      return res.status(500).json({ message: "Failed to fetch quotes" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: (error as Error).message });
  }
});

export default router;
