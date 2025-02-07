import axios, { AxiosError, isAxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const HABITICA_API_URL = process.env.HABITICA_API_URL;
const API_KEY = process.env.API_KEY;
const USER_ID = process.env.USER_ID;

// Function to delete a challenge
const deleteChallenge = async (challengeId: string) => {
  try {
    // Make a DELETE request to the API to delete the challenge
    const response = await axios.delete(
      `${HABITICA_API_URL}/challenges/${challengeId}`,
      {
        headers: {
          "x-api-user": USER_ID,
          "x-api-key": API_KEY,
        },
      }
    );

    if (response.status === 200) {
      console.log("Challenge deleted successfully");
    }
  } catch (error) {
    if (isAxiosError(error) && (error as AxiosError).response?.status === 404) {
      console.error("Challenge not found");
    } else if (error instanceof Error) {
      console.error("Error deleting challenge:", error.message);
    } else {
      console.error("Error deleting challenge:", error);
    }
  }
};

// Call the function with a challenge ID to delete
const challengeId = "your-challenge-id"; // Replace with a valid challenge ID
deleteChallenge(challengeId);
