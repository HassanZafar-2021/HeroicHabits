import React from "react";
import "../index.css";
interface StreakCalendarProps {
  streakDuration: number;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ streakDuration }) => {
  // Generate an array of dates for the streak duration
  const streakDays = Array.from(
    { length: streakDuration },
    (_, index) => index + 1
  );

  return (
    <div className="streak-calendar">
      {streakDays.map((day) => (
        <div
          key={day}
          className={`calendar-day ${day % 2 === 0 ? "even-day" : "odd-day"}`}
          title={`Day ${day}`}
        >
          <div className="calendar-day-number">{day}</div>
          {/* Can add a conditional to show completion status */}
          <div
            className={`status ${
              Math.random() > 0.5 ? "completed" : "not-completed"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default StreakCalendar;
