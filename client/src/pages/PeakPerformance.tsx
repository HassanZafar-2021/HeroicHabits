import React, { useState } from "react";

const PeakPerformance: React.FC = () => {
  const [dailyGoal, setDailyGoal] = useState<number>(2000);
  const [consumed, setConsumed] = useState<number>(1200);

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Peak Performance</h1>
      <p className="text-lg mb-8">Track your training progress below</p>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md text-center">
        <div className="space-y-4">
          <label className="block text-blue-300 font-bold">
            Daily Calorie Goal
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded-lg border border-blue-400 text-black"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(Number(e.target.value))}
          />
        </div>
        <div className="space-y-4 mt-4">
          <label className="block text-blue-300 font-bold">
            Calories Consumed Today
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded-lg border border-blue-400 text-black"
            value={consumed}
            onChange={(e) => setConsumed(Number(e.target.value))}
          />
        </div>
        <div className="mt-6 p-4 bg-blue-100/80 rounded-xl">
          <h3 className="text-xl font-bold text-blue-800">
            Remaining Calories
          </h3>
          <p className="text-3xl font-bold text-blue-800">
            {dailyGoal - consumed} cal
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeakPerformance;
