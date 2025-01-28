// app.ts
import HabiticaClient from "./HabiticaClient";

// Your Habitica API credentials
const userId = "YOUR_USER_ID";
const apiToken = "YOUR_API_TOKEN";

const habitica = new HabiticaClient(userId, apiToken);

// Example: Create a new challenge
habitica
  .createChallenge(
    "group-id",
    "Challenge Name",
    "short-name",
    "Summary of the challenge",
    "Detailed description",
    50,
    false
  )
  .then((challenge) => {
    console.log("Challenge created:", challenge);
    // Update UI with challenge details
  })
  .catch((error) => console.error("Failed to create challenge:", error));
