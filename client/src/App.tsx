import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import "./app.css";

const App: React.FC = () => {
  const [userName] = useState("Heroic User");
  const [avatarUrl] = useState("https://www.example.com/avatar.png");
  const [progress] = useState(70); // Example progress value
  const [quests] = useState(["Quest 1", "Quest 2", "Quest 3"]);

  return (
    <div className="app-container">
      <header>
        <h1>Heroic Habits</h1>
      </header>
      <main>
        <Dashboard
          userName={userName}
          avatarUrl={avatarUrl}
          progress={progress}
          quests={quests}
        />
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Heroic Habits. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
