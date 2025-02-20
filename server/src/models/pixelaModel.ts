import axios from "axios";

const PIXELA_BASE_URL = "https://pixe.la/v1/users";
const PIXELA_USERNAME = "rzafar";
const PIXELA_TOKEN = "NewSecureToken123";
const PIXELA_GRAPH_ID = "habit-tracker";

// Function to add a habit entry
export const addHabitEntry = async (date: string, quantity: string) => {
  try {
    const response = await axios.post(
      `${PIXELA_BASE_URL}/${PIXELA_USERNAME}/graphs/${PIXELA_GRAPH_ID}`,
      { date, quantity },
      {
        headers: {
          "X-USER-TOKEN": PIXELA_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding habit entry:", error);
    throw error;
  }
};

// Function to get the habit tracking graph URL
export const getGraphURL = () => {
  return `${PIXELA_BASE_URL}/${PIXELA_USERNAME}/graphs/${PIXELA_GRAPH_ID}.html`;
};
