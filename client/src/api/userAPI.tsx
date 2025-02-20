import Auth from "../util/auth"; // Ensure Auth module has getToken() method

// Function to retrieve users with authentication
const retrieveUsers = async () => {
  try {
    const token = Auth.getToken(); // Retrieve token from Auth utility

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch("/api/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    return data; // Return retrieved users
  } catch (err) {
    console.error(
      "User retrieval failed:",
      err instanceof Error ? err.message : err
    );
    return []; // Return an empty array if fetching fails
  }
};

export { retrieveUsers };
