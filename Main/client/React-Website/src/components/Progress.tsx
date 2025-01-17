import React, { useState, useEffect } from "react";

interface ProgressProps {
  initialProgress: number; // Initial progress percentage (0-100)
}

const Progress: React.FC<ProgressProps> = ({ initialProgress }) => {
  const [progress, setProgress] = useState<number>(initialProgress);

  useEffect(() => {
    // Simulate fetching progress from Pixela or Habitica API
    // For now, we use the passed `initialProgress` as the starting point.
    // In the future, fetch from the API and update the progress accordingly.
  }, [initialProgress]);

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);

    // TODO: Call Pixela or Habitica API to update user progress
  };

  return (
    <div className="progress-container">
      <h2>Your Progress</h2>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <p>{progress}% Completed</p>
      <button
        onClick={() => handleProgressUpdate(progress + 10)}
        className="update-btn"
      >
        Increase Progress
      </button>
    </div>
  );
};

export default Progress;
