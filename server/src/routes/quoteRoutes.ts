import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let response = await fetch("https://zenquotes.io/api/quotes/");
    if (!response.ok) {
      return res.json({ message: "Failed to fetch quotes" });
    }
    let data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ message: "An error occurred", error });
  }
});

export default router;
