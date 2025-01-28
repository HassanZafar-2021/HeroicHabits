import { useState } from "react";
import StreakCalendar from "./StreakCalendar";
import QuestCard from "./QuestCard"; // Import QuestCard directly
import Header from "./Header";
import Footer from "./Footer";

interface DashboardProps {
  userName: string;
  avatarUrl: string;
  quests: {
    title: string;
    description: string;
    progress: string;
    image: string;
  }[]; // Use the actual quest object structure
}

const Dashboard: React.FC<DashboardProps> = ({
  userName,
  avatarUrl,
  quests,
}) => {
  const [streakDuration, setStreakDuration] = useState<number>(7);

  return (
    <div className="dashboard-container">
      <Header userName={userName} avatarUrl={avatarUrl} />

      <div className="streak-calendar-container py-16 bg-white">
        <h2 className="text-2xl font-bold text-blue-800 mb-8">Your Streak</h2>
        <div className="streak-duration-selector mb-8">
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

      <div className="quests-section py-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-8">Your Quests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quests.map((quest, index) => (
            <QuestCard key={index} {...quest} /> // Render QuestCard directly
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
