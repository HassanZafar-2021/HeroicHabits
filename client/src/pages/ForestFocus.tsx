import React, { useState, useEffect } from "react";

const ForestFocus: React.FC = () => {
  const [timer, setTimer] = useState(1500); // Default 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  let timerInterval: NodeJS.Timeout;

  useEffect(() => {
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(timerInterval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="h-screen bg-gradient-to-b from-green-900 to-blue-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">
        Time to take a mindful rest to recover HP
      </h1>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md text-center">
        <div className="text-6xl font-bold mb-4">{formatTime(timer)}</div>
        <div className="flex justify-center mb-4">
          <select
            className="bg-blue-900/50 text-white px-4 py-2 rounded-lg border border-blue-400 backdrop-blur-sm"
            onChange={(e) => setTimer(Number(e.target.value) * 60)}
            disabled={isRunning}
          >
            {[5, 10, 15, 20, 25, 30, 45, 60].map((time) => (
              <option key={time} value={time}>
                {time} minutes
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg"
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg"
            onClick={() => setIsRunning(false)}
          >
            Stop
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg"
            onClick={() => setTimer(1500)}
            disabled={isRunning}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForestFocus;
