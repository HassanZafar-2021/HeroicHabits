import React, { useState, useEffect } from "react";

interface Quest {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

const QuestList: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    // Simulate fetching quests from Pixela or Habitica API.
    // For now, let's use mock data.
    const mockQuests = [
      {
        id: "1",
        name: "Morning Workout",
        description: "Complete 30 minutes of exercise",
        completed: false,
      },
      {
        id: "2",
        name: "Read a Book",
        description: "Read 10 pages of a book",
        completed: false,
      },
      {
        id: "3",
        name: "Meditation",
        description: "Meditate for 10 minutes",
        completed: true,
      },
    ];

    // Replace with Pixela or Habitica API call in the future
    setQuests(mockQuests);
  }, []);

  const handleComplete = (questId: string) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === questId ? { ...quest, completed: true } : quest
      )
    );

    // TODO: Call Pixela or Habitica API to mark quest as complete
  };

  return (
    <div className="quest-list">
      <h2>Your Quests</h2>
      <ul>
        {quests.map((quest) => (
          <li
            key={quest.id}
            className={`quest-item ${quest.completed ? "completed" : ""}`}
          >
            <h3>{quest.name}</h3>
            <p>{quest.description}</p>
            {!quest.completed && (
              <button
                onClick={() => handleComplete(quest.id)}
                className="complete-btn"
              >
                Complete Quest
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestList;
