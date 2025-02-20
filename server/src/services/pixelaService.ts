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
    try {
      const response = await axios.post(
        `${BASE_URL}`,
        {
          token,
          username,
          agreeTermsOfService: "yes",
          notMinor: "yes",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Create a new graph
  createGraph: async (
    username: string,
    token: string,
    graphData: Partial<Graph>
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/${username}/graphs`,
        graphData,
        {
          headers: {
            "X-USER-TOKEN": token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating graph:", error);
      throw error;
    }
  },

  // Fetch all graphs
  getGraphs: async (username: string, token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${username}/graphs`, {
        headers: {
          "X-USER-TOKEN": token,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching graphs:", error);
      throw error;
    }
  },

  // Add data (pixel) to a graph
  addPixel: async (
    username: string,
    token: string,
    graphId: string,
    date: string,
    quantity: string
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/${username}/graphs/${graphId}`,
        { date, quantity },
        {
          headers: {
            "X-USER-TOKEN": token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding pixel:", error);
      throw error;
    }
  },

  // Get graph statistics
  getGraphStats: async (username: string, token: string, graphId: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${username}/graphs/${graphId}/stats`,
        {
          headers: {
            "X-USER-TOKEN": token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching graph stats:", error);
      throw error;
    }
  },

  // Get pixel data for a specific date
  getPixel: async (
    username: string,
    token: string,
    graphId: string,
    date: string
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${username}/graphs/${graphId}/${date}`,
        {
          headers: {
            "X-USER-TOKEN": token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching pixel data:", error);
      throw error;
    }
  },

  // Update pixel data for a specific date
  updatePixel: async (
    username: string,
    token: string,
    graphId: string,
    date: string,
    quantity: string
  ) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/${username}/graphs/${graphId}/${date}`,
        { quantity },
        {
          headers: {
            "X-USER-TOKEN": token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating pixel data:", error);
      throw error;
    }
  },

  // Delete pixel data for a specific date
  deletePixel: async (
    username: string,
    token: string,
    graphId: string,
    date: string
  ) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/${username}/graphs/${graphId}/${date}`,
        {
          headers: {
            "X-USER-TOKEN": token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting pixel data:", error);
      throw error;
    }
  },
};
