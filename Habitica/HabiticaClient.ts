// habiticaClient.ts
import axios, { AxiosInstance } from "axios";
import { Task } from "./HabiticaTypes";

class HabiticaClient {
  private apiClient: AxiosInstance;
  private userId: string;
  private apiToken: string;

  constructor(userId: string, apiToken: string) {
    this.userId = userId;
    this.apiToken = apiToken;
    this.apiClient = axios.create({
      baseURL: "https://habitica.com/api/v3",
      headers: {
        "x-api-user": userId,
        "x-api-key": apiToken,
      },
    });
  }

  // Fetch user's tasks
  async getTasks(): Promise<Task[]> {
    try {
      const response = await this.apiClient.get("/tasks/user");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  // Create a new task
  async createTask(taskText: string, taskType: string = "todo"): Promise<Task> {
    try {
      const response = await this.apiClient.post("/tasks/user", {
        text: taskText,
        type: taskType,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  // Update task status
  async updateTaskStatus(taskId: string, completed: boolean): Promise<Task> {
    try {
      const response = await this.apiClient.put(`/tasks/${taskId}`, {
        completed,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  }
}

export default HabiticaClient;
