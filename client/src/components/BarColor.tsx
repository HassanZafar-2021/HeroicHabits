import { FC } from "react";

interface BarColorProps {
  color: string; // Color of the progress bar
  width: number; // Progress percentage (0-100)
  height: number; // Height of the bar
}

const BarColor: FC<BarColorProps> = ({ color, width, height }) => {
  return (
    <div
      style={{
        backgroundColor: color, // Apply the dynamic color
        width: `${width}%`, // Dynamic width based on progress
        height: `${height}px`, // Fixed height or passed prop
        transition: "width 0.5s ease-in-out", // Smooth transition effect
      }}
    />
  );
};

export default BarColor;
