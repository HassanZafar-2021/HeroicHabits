import axios from "axios";
import { config } from "../config/config.js";

interface Graph {
  id: string;
  name: string;
  unit: string;
  type: string;
  color: string;
  timezone?: string;
  purgeCacheURLs?: string[];
}

const BASE_URL = config.pixelaBaseUrl;

export const pixelaService = {
  // Create a Pixela user
  createUser: async (username: string, token: string) => {
    const response = await axios.post(`${BASE_URL}`, {
      token,
      username,
      agreeTermsOfService: "yes",
      notMinor: "yes",
    });
    return response.data;
  },

  // Create a new graph
  createGraph: async (
    username: string,
    token: string,
    graphData: Partial<Graph>
  ) => {
    const response = await axios.post(
      `${BASE_URL}/${username}/graphs`,
      graphData,
      { headers: { "X-USER-TOKEN": token } }
    );
    return response.data;
  },

  // Fetch all graphs
  getGraphs: async (username: string, token: string) => {
    const response = await axios.get(`${BASE_URL}/${username}/graphs`, {
      headers: { "X-USER-TOKEN": token },
    });
    return response.data;
  },

  // Add data (pixel) to a graph
  addPixel: async (
    username: string,
    token: string,
    graphId: string,
    date: string,
    quantity: string
  ) => {
    const response = await axios.post(
      `${BASE_URL}/${username}/graphs/${graphId}`,
      { date, quantity },
      { headers: { "X-USER-TOKEN": token } }
    );
    return response.data;
  },

  // Get graph statistics
  getGraphStats: async (username: string, token: string, graphId: string) => {
    const response = await axios.get(
      `${BASE_URL}/${username}/graphs/${graphId}/stats`,
      { headers: { "X-USER-TOKEN": token } }
    );
    return response.data;
  },
};
