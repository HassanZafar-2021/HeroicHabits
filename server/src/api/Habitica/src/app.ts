// app.ts
import HabiticaClient from "./HabiticaClient";
import { CreateChallengeResponse } from "./HabiticaTypes";
import dotenv from "dotenv";

// Your Habitica API credentials
const userId = process.env.HABITICA_USER_ID as string;
const apiToken = process.env.HABITICA_API_TOKEN as string;

if (!userId || !apiToken) {
  throw new Error(
    "Habitica API credentials are not set in the environment variables."
  );
}

const habitica = new HabiticaClient(userId, apiToken);

// Example: Create a new challenge
const createChallenge = async () => {
  try {
    const challengeResponse = await habitica.createChallenge(
      "group-id", // Replace with your group ID
      "Heroic Challenge", // Challenge name
      "heroic-challenge", // Short name
      "Summary of the challenge", // Short summary
      "This is the detailed description of the Heroic Challenge", // Full description
      50, // Prize points or reward
      false // Whether the challenge is official or not
    );

    const typedChallengeResponse = challengeResponse as CreateChallengeResponse;
    console.log("Challenge created:", typedChallengeResponse.data);
  } catch (error) {
    console.error("Failed to create challenge:", error);
  }
};

createChallenge();
