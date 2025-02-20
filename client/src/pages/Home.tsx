import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuestSearch from "../components/QuestSearch";
import ColorPicker from "../components/ColorPicker";
import ProfileAvatar from "../components/ProfileAvatar";
import Zenquote from "../components/zenQuote";
import { GraphDisplay } from "../components/GraphDisplay"; // Assuming GraphDisplay replaces HabitTracker
import { Quest } from "../types/quest";

const getRandomColor = () => {
  const colors = ["#ffcc00", "#ff6666", "#66ccff", "#99ff99", "#ff99cc"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quests, setQuests] = useState<Quest[]>([
    {
      name: "Forest of Focus",
      image: "/ForestFocus.png",
      color: "#28a745",
      link: "/forestfocus",
    },
    {
      name: "Peak Performance",
      image: "/workout.png",
      color: "#ff3b30",
      link: "/peakperformance",
    },
    {
      name: "Crystal Clarity",
      image: "/crystal.png",
      color: "#add8e6",
      link: "/crystalclarity",
    },
  ]);
  const [selectedQuestIndex, setSelectedQuestIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const addNewQuest = (questName: string) => {
    const newQuest: Quest = {
      name: questName,
      image: "/QuestIcon.png",
      color: getRandomColor(),
      link: "",
    };
    setQuests([...quests, newQuest]);
  };

  const updateQuestColor = (color: string) => {
    if (selectedQuestIndex !== null) {
      const updatedQuests = [...quests];
      updatedQuests[selectedQuestIndex].color = color;
      setQuests(updatedQuests);
    }
  };

  return (
    <div style={styles.container}>
      <Link to="/profile" style={styles.profileLink}>
        <ProfileAvatar />
      </Link>

      <header style={styles.header}>
        <h1 style={styles.title}>Your Active Quests</h1>
      </header>

      {isLoggedIn && (
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          style={styles.signOutButton}
        >
          Sign Out
        </button>
      )}

      <Zenquote />
      <QuestSearch onAddQuest={addNewQuest} />
      <ColorPicker onColorSelect={updateQuestColor} />

      <div style={styles.questContainer}>
        {quests.map((quest, index) => (
          <div
            key={index}
            onClick={() => setSelectedQuestIndex(index)}
            style={{
              ...styles.questCard,
              backgroundColor: quest.color,
              cursor: index < 3 ? "pointer" : "default",
            }}
          >
            <img src={quest.image} alt={quest.name} style={styles.questImage} />
            <h3 style={styles.questTitle}>{quest.name}</h3>
            {quest.link && (
              <Link to={quest.link} style={styles.questLink}>
                →
              </Link>
            )}
          </div>
        ))}
      </div>

      <div style={styles.pixelaContainer}>
        <h2 style={styles.graphTitle}>Your Habit Progress</h2>
        <GraphDisplay />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    backgroundImage:
      "url('https://img.freepik.com/premium-vector/pixel-art-sky-background-with-clouds-cloudy-blue-sky-vector-8bit-game-white-background_360488-614.jpg?semt=ais_hybrid')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    imageRendering: "pixelated",
  },
  profileLink: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
  },
  questContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  questCard: {
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    width: "250px",
    textAlign: "center",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
  },
  questImage: { width: "100%", borderRadius: "8px" },
  questLink: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    fontSize: "18px",
    color: "#fff",
  },
  pixelaContainer: {
    marginTop: "40px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "80%",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  graphTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};

export default HomePage;
