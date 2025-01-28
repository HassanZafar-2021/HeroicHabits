import axios from "axios";

const HABITICA_API_URL = "https://habitica.com/api/v3/challenges"; // Base URL for Habitica API
const API_KEY = "6bf83392-28bd-4928-9a08-7695a6a46c40"; // Replace with your Habitica API key
const USER_ID = "cf29dd0c-df19-4bf6-9519-0aebbdf2aef5"; // Replace with your Habitica user ID

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
