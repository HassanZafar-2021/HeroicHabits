import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const config = {
  username: process.env.USERNAME,
  token: process.env.TOKEN,
  graphId: process.env.GRAPH_ID,
  port: Number(process.env.PORT) || 3000,
  apiUrl: process.env.API_URL,
  pixelaBaseUrl: process.env.PIXELA_BASE_URL, // Add this line
};
