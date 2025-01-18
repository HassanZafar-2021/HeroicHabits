import express, { Request, Response } from "express";
import axios from "axios";

// Initialize router
export const apiRoutes = express.Router();

// Sample route to get data (GET)
apiRoutes.get("/getData", async (req: Request, res: Response) => {
  try {
    // Example of a GET request to an external API (Pixela)
    const pixelaResponse = await axios.get("https://pixe.la/v1/users", {
      params: {
        username: "your_username", // replace with real username
      },
    });

    res.json(pixelaResponse.data);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch data", error: error.message });
    } else {
      res.status(500).json({ message: "Failed to fetch data" });
    }
apiRoutes.post("/addData", async (req: Request, res: Response) => {
  const { name, value } = req.body;

  if (!name || !value) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Example of sending a POST request to an external API (Habitica)
    const habiticaResponse = await axios.post(
      "https://habitica.com/api/v3/tasks",
      {
        name,
        value,
      },
      {
        headers: {
          "x-api-key": "your_habitica_api_key", // replace with real API key
        },
      }
    );

    return res.status(201).json(habiticaResponse.data);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Failed to add data", error: error.message });
    } else {
      return res.status(500).json({ message: "Failed to add data" });
    }
  }
});
      .status(500)
      .json({ message: "Failed to add data", error: error.message });
  }
});
