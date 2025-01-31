// HabiticaClient.ts
import axios from "axios";

class HabiticaClient {
  private userId: string;
  private apiToken: string;
  private baseUrl: string = "https://habitica.com/api/v3";

  constructor(userId: string, apiToken: string) {
    this.userId = userId;
    this.apiToken = apiToken;
  }

  // Helper method to get the Authorization header
  private getAuthHeaders() {
    return {
      "x-api-user": this.userId,
      "x-api-key": this.apiToken,
    };
  }

  // Create a new challenge
  public async createChallenge(
    groupId: string,
    name: string,
    shortName: string,
    summary: string,
    description: string,
    prize: number,
    isPrivate: boolean
  ) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/groups/${groupId}/challenges`,
        {
          name,
          shortName,
          summary,
          description,
          prize,
          isPrivate,
        },
        { headers: this.getAuthHeaders() }
      );
      return response.data; // Challenge creation response
    } catch (error) {
      if (axios.isAxiosError(error as any)) {
        throw new Error(`Error creating challenge: ${(error as any).message}`);
      } else {
        throw new Error('Error creating challenge');
      }
    }
  }
}

export default HabiticaClient;
