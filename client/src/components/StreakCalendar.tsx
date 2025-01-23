interface StreakCalendarProps {
  streakDuration: number;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ streakDuration }: StreakCalendarProps) => {
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
