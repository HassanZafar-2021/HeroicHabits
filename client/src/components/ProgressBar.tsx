import { FC } from "react";
import BarColor from "../components/BarColor"

interface ProgressBarProps {
  label: string;
  progress: number;
  color: string;
  height?: number; // Optional height prop with a default value
}

const ProgressBar: FC<ProgressBarProps> = ({
  label,
  progress,
  color,
  height = 20,
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg text-gray-800">{label}</h3>
      <div
        className="bg-gray-300 w-full rounded-full overflow-hidden"
        style={{ height }}
      >
        <BarColor color={color} width={progress} height={height} />
      </div>
    </div>
  );
};

export default ProgressBar;
