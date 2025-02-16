import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FitnessPerformance = () => {
  const [fitnessTask, setFitnessTask] = useState("");
  const [caloriesBurnt, setCaloriesBurnt] = useState(0);
  const [foodItem, setFoodItem] = useState("");
  const [caloriesGained, setCaloriesGained] = useState(0);

  // Fetch food calories
  const fetchFoodCalories = async (food: string) => {
    try {
      const response = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        { query: food },
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": import.meta.env.VITE_APP_API_ID!,
            "x-app-key": import.meta.env.VITE_APP_API_KEY!,
          },
        }
      );
      setCaloriesGained(
        (response.data as { foods: { nf_calories: number }[] }).foods[0]
          .nf_calories
      );
    } catch (error) {
      console.error("Error fetching food calories", error);
    }
  };

  // Fetch exercise calories
  const fetchExerciseCalories = async (exercise: string) => {
    try {
      const response = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/exercise",
        { query: exercise },
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": import.meta.env.VITE_APP_API_ID!,
            "x-app-key": import.meta.env.VITE_APP_API_KEY!,
          },
        }
      );
      setCaloriesBurnt(
        (response.data as { exercises: { nf_calories: number }[] }).exercises[0]
          .nf_calories
      );
    } catch (error) {
      console.error("Error fetching exercise calories", error);
    }
  };

  // Handle fitness task change
  const handleFitnessTaskChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const task = e.target.value;
    setFitnessTask(task);
    await fetchExerciseCalories(task);
  };

  // Handle food item change
  const handleFoodItemChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const food = e.target.value;
    setFoodItem(food);
    await fetchFoodCalories(food);
  };

  // Calculate total calories (net)
  const totalCalories = caloriesBurnt - caloriesGained;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, #FF8000, #FFA500)",
        textAlign: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Home Link */}
      <Link
        to="/home"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "#fff",
          padding: "8px 15px",
          borderRadius: "5px",
          textDecoration: "none",
          color: "#333",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        ⬅ Home
      </Link>

      <h2 style={{ fontSize: "26px", marginBottom: "20px" }}>
        🏋️ Fitness Performance Tracker
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "15px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {/* Fitness Task */}
        <div
          style={{
            backgroundColor: "#FFF3E0",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            color: "#333",
          }}
        >
          <h3>🏃‍♂️ Fitness Task</h3>
          <input
            type="text"
            placeholder="Enter workout (e.g., Running 30min)"
            value={fitnessTask}
            onChange={handleFitnessTaskChange}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "none",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Calories Burnt */}
        <div
          style={{
            backgroundColor: "#FFF3E0",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            color: "#333",
          }}
        >
          <h3>🔥 Calories Burnt</h3>
          <input
            type="number"
            placeholder="Calories burnt"
            value={caloriesBurnt}
            onChange={(e) => setCaloriesBurnt(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "none",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Food Intake */}
        <div
          style={{
            backgroundColor: "#FFF3E0",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            color: "#333",
          }}
        >
          <h3>🍎 Food Intake</h3>
          <input
            type="text"
            placeholder="Enter food (e.g., Pizza)"
            value={foodItem}
            onChange={handleFoodItemChange}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "none",
              fontSize: "16px",
            }}
          />
        </div>

        {/* Calories Gained */}
        <div
          style={{
            backgroundColor: "#FFF3E0",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            color: "#333",
          }}
        >
          <h3>🍔 Calories Gained</h3>
          <input
            type="number"
            placeholder="Calories gained"
            value={caloriesGained}
            onChange={(e) => setCaloriesGained(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "none",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

      {/* Net Calories */}
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "#FFD180",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          color: "#333",
          width: "300px",
        }}
      >
        <h3>📊 Net Calories</h3>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          {totalCalories} kcal {totalCalories >= 0 ? "🔥 Burnt" : "🍔 Gained"}
        </p>
      </div>

      <style>
        {`
          input:focus {
            outline: 2px solid #FF8C00;
          }

          h3 {
            margin-bottom: 5px;
          }

          div:hover {
            transform: scale(1.02);
            transition: 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default FitnessPerformance;
