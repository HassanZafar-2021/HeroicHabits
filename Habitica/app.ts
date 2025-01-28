// app.ts
import HabiticaClient from "./HabiticaClient";

// Your Habitica API credentials
const userId = "YOUR_USER_ID";
const apiToken = "YOUR_API_TOKEN";

const habitica = new HabiticaClient(userId, apiToken);

// Example: Create a new challenge
habitica
  .createChallenge("My New Challenge", "new-challenge", 100, "public", "guild")
  .then((response) => {
    console.log("Challenge created successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error creating challenge:", error);
  });
