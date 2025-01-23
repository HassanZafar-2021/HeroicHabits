import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Progress from "./Progress";
import QuestList from "./QuestList";
import StreakCalendar from "./StreakCalendar";

interface DashboardProps {
  userName: string;
  avatarUrl: string;
  progress: number;
  quests: string[];
}

const Dashboard: React.FC<DashboardProps> = ({
  userName,
  avatarUrl,
  progress,
  quests,
}: DashboardProps) => {
  const [streakDuration, setStreakDuration] = useState<number>(7);

  useEffect(() => {
    // Fetch any necessary user data or updates
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Welcome, {userName}!</h1>
        <div className="avatar-container">
          <Avatar avatarUrl={avatarUrl} />
        </div>
      </div>

      <div className="streak-calendar-container">
        <h2>Your Streak</h2>
        <div className="streak-duration-selector">
          <button type="button" onClick={() => setStreakDuration(7)}>
            7 Days
          </button>
          <button type="button" onClick={() => setStreakDuration(14)}>
            14 Days
          </button>
          <button type="button" onClick={() => setStreakDuration(30)}>
            30 Days
          </button>
        </div>
        <StreakCalendar streakDuration={streakDuration} />
      </div>

      <div className="progress-section">
        <h2>Your Progress</h2>
        <Progress value={progress} />
      </div>

      <div className="quests-section">
        <h2>Your Quests</h2>
        <QuestList items={quests} />
      </div>

      <div className="motivational-message">
        <p>Keep going! You're doing great!</p>
      </div>
    </div>
  );
};

export default Dashboard;
