import * as axios from "axios";
import { AxiosInstance } from "axios";
import { Task } from "./HabiticaTypes";

class HabiticaClient {
    private apiClient: AxiosInstance;

    constructor(private userId: string, private apiToken: string) {
        this.apiClient = axios.create({
            baseURL: "https://habitica.com/api/v3",
            headers: {
                "Content-Type": "application/json",
                "x-api-user": this.userId,
                "x-api-key": this.apiToken,
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
            throw new Error("Failed to fetch tasks");
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
            throw new Error("Failed to create task");
        }
    }

    // Update task status
    async updateTaskStatus(taskId: string, completed: boolean): Promise<Task> {
        try {
            const response = await this.apiClient.put(`/tasks/${taskId}`, { completed });
            return response.data.data;
        } catch (error) {
            console.error("Error updating task status:", error);
            throw new Error("Failed to update task status");
        }
    }

    // Create a challenge
    async createChallenge(
        group: string,
        name: string,
        shortName: string,
        summary: string,
        description: string,
        prize: number = 0,
        official: boolean = false
    ): Promise<any> {
        try {
            const response = await this.apiClient.post("/challenges", {
                group,
                name,
                shortName,
                summary,
                description,
                prize,
                official,
            });
            return response.data.data;
        } catch (error) {
            console.error("Error creating challenge:", error);
            throw new Error("Failed to create challenge");
        }
    }

    // Delete a challenge
    async deleteChallenge(challengeId: string): Promise<void> {
        try {
            await this.apiClient.delete(`/challenges/${challengeId}`);
            console.log("Challenge deleted successfully");
        } catch (error) {
            console.error("Error deleting challenge:", error);
            throw new Error("Failed to delete challenge");
        }
    }

    // Fetch all challenges
    async getChallenges(): Promise<any[]> {
        try {
            const response = await this.apiClient.get("/challenges");
            return response.data.data;
        } catch (error) {
            console.error("Error fetching challenges:", error);
            throw new Error("Failed to fetch challenges");
        }
    }
}

export default HabiticaClient;
