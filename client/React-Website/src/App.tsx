import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestList from "./components/QuestList";
import Progress from "./components/Progress";
import Dashboard from "./components/Dashboard";
import ProfileCard from "./components/ProfileCard"; // Add ProfileCard if you have it
import Header from "./components/Header"; // Optionally, a header component for navigation

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header /> {/* This can be a header with links to different pages */}
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                userName="John Doe"
                avatarUrl="https://example.com/avatar.jpg"
                progress={50}
                quests={[]}
              />
            }
          />{" "}
          {/* Home page / Dashboard */}
          <Route path="/quests" element={<QuestList />} />{" "}
          {/* Page to show quest list */}
          <Route
            path="/progress"
            element={<Progress initialProgress={40} />}
          />{" "}
          {/* Show user's progress */}
          <Route
            path="/profile"
            element={
              <ProfileCard
                username="John Doe"
                avatarUrl="https://example.com/avatar.jpg"
                progress={50}
                onAvatarChange={() => {}}
              />
            }
          />{" "}
          {/* Optionally, a user profile page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
