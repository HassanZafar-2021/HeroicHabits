import * as React from "react";

interface ProgressProps {
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ value }: ProgressProps) => {
  const progressStyle = { width: `${value}%` };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={progressStyle}>
        {value}%
      </div>
    </div>
  );
};

export default Progress;
