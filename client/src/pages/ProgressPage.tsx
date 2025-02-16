import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const habitsList = [
  { id: 1, name: "Morning Exercise" },
  { id: 2, name: "Read 10 Pages" },
  { id: 3, name: "Drink more water" },
  { id: 4, name: "Healthy Meal" },
  { id: 5, name: "No Social Media for 1 Hour" },
];

const ProgressPage = () => {
  const [completedHabits, setCompletedHabits] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<
    { habit: string; timestamp: string }[]
  >([]);
  const [mood, setMood] = useState<string>("");

  useEffect(() => {
    const storedStreak = localStorage.getItem("streak");
    if (storedStreak) setStreak(parseInt(storedStreak));

    const storedHistory = localStorage.getItem("habitHistory");
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem("streak", String(streak));
    localStorage.setItem("habitHistory", JSON.stringify(history));
  }, [streak, history]);

  const toggleHabit = (id: number, name: string) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((habit) => habit !== id) : [...prev, id]
    );

    if (!completedHabits.includes(id)) {
      const timestamp = new Date().toLocaleString();
      setHistory((prev) => [...prev, { habit: name, timestamp }]);
    }
  };

  const resetProgress = () => {
    setCompletedHabits([]);
    setStreak((prev) => prev + 1);
  };

  const handleMoodChange = (selectedMood: string) => {
    setMood(selectedMood);
  };

  const progressPercentage = (completedHabits.length / habitsList.length) * 100;

  const submitMood = () => {
    if (!mood) {
      alert("Please select a mood before submitting.");
      return;
    }
    alert(`Mood for the day: ${mood}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#b3e0ff", // Light blue background color
        padding: "20px",
      }}
    >
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

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "350px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Heroic Habits Progress
        </h1>

        <div
          style={{
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "50px",
            height: "8px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#4caf50",
              height: "100%",
              borderRadius: "50px",
              width: `${progressPercentage}%`,
              transition: "width 0.5s ease",
            }}
          />
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          {completedHabits.length} / {habitsList.length} habits completed
        </p>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {habitsList.map((habit) => (
            <li
              key={habit.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <input
                type="checkbox"
                checked={completedHabits.includes(habit.id)}
                onChange={() => toggleHabit(habit.id, habit.name)}
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              <span style={{ fontSize: "18px" }}>{habit.name}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={resetProgress}
          style={{
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "16px",
            transition: "background-color 0.3s",
          }}
        >
          Complete Day & Increase Streak
        </button>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
            🔥 Streak: {streak} Days
          </h2>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
            📜 Habit History
          </h2>
          <ul
            style={{
              fontSize: "14px",
              marginTop: "8px",
              maxHeight: "160px",
              overflowY: "auto",
              backgroundColor: "#e0e0e0",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {history.length > 0 ? (
              history.map((entry, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  ✅ {entry.habit} -{" "}
                  <span style={{ color: "#616161" }}>{entry.timestamp}</span>
                </li>
              ))
            ) : (
              <p style={{ color: "#616161" }}>No history yet.</p>
            )}
          </ul>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
            😊 Mood Tracker
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <button
              onClick={() => handleMoodChange("😊")}
              style={{
                fontSize: "24px",
                margin: "0 10px",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              😊
            </button>
            <button
              onClick={() => handleMoodChange("😐")}
              style={{
                fontSize: "24px",
                margin: "0 10px",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              😐
            </button>
            <button
              onClick={() => handleMoodChange("😞")}
              style={{
                fontSize: "24px",
                margin: "0 10px",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              😞
            </button>
          </div>
        </div>

        <button
          onClick={submitMood}
          style={{
            width: "100%",
            backgroundColor: "#28a745",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "16px",
          }}
        >
          Submit Mood
        </button>
      </div>
    </div>
  );
};

export default ProgressPage;
