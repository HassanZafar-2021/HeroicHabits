import React from "react";

export const GraphDisplay: React.FC = () => {
  const logHabit = async () => {
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");

    const response = await fetch(
      "https://pixe.la/v1/users/rzafar/graphs/habit-tracker",
      {
        method: "POST",
        headers: {
          "X-USER-TOKEN": "NewSecureToken123",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          quantity: "1",
        }),
      }
    );

    const result = await response.json();
    console.log(result);
    alert(result.message);
  };

  return (
    <div className="graph-container">
      <iframe
        src="https://pixe.la/v1/users/rzafar/graphs/habit-tracker.html"
        width="100%"
        height="400"
        style={{ border: "0" }}
        title="Habit Tracking Graph"
        className="rounded-lg shadow-lg"
      />
      <button
        onClick={logHabit}
        className="mt-4 p-2 bg-blue-500 text-green rounded-lg"
      >
        Log Habit
      </button>
    </div>
  );
};
