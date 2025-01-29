import axios from "axios";
import dotenv from "dotenv";
const HABITICA_API_URL = process.env.HABITICA_API_URL;
const API_KEY = process.env.API_KEY;
const USER_ID = process.env.USER_ID;

// Function to delete a challenge
const deleteChallenge = async (challengeId: string) => {
  try {
    // Make a DELETE request to the API to delete the challenge
    const response = await axios.delete(`${HABITICA_API_URL}/${challengeId}`, {
      headers: {
        "x-api-user": USER_ID,
        "x-api-key": API_KEY,
      },
    });

    if (response.status === 200) {
      console.log("Challenge deleted successfully");
    }
  } catch (error) {
    if (error.response?.status === 404) {
      console.error("Challenge not found");
    } else {
      console.error("Error deleting challenge:", error.message);
    }
  }
};

// Call the function with a challenge ID to delete
const challengeId = "your-challenge-id"; // Replace with the ID of the challenge you want to delete
deleteChallenge(challengeId);
