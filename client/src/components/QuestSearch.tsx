import { useState } from "react";

const QuestSearch = ({
  onAddQuest,
}: {
  onAddQuest: (quest: string) => void;
}) => {
  const [questName, setQuestName] = useState("");

  const handleAddQuest = () => {
    if (questName.trim() !== "") {
      onAddQuest(questName);
      setQuestName("");
    }
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Enter a new quest..."
        value={questName}
        onChange={(e) => setQuestName(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleAddQuest} style={styles.button}>
        Add Quest
      </button>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "2px solid #ddd",
    fontSize: "16px",
    width: "250px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default QuestSearch;
