import React, { useState } from "react";

const ProgressPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days");

  return (
    <div className="h-screen bg-gradient-to-b from-yellow-50 to-blue-50 flex flex-col items-center">
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-blue-100 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-800">Heroic Habits</h1>
        <nav className="flex space-x-4">
          <span className="text-blue-700 hover:text-blue-500 cursor-pointer">
            Dashboard
          </span>
          <span className="text-blue-700 hover:text-blue-500 cursor-pointer">
            Tasks
          </span>
          <span className="text-blue-700 hover:text-blue-500 cursor-pointer">
            Progress
          </span>
          <span className="text-blue-700 hover:text-blue-500 cursor-pointer">
            Settings
          </span>
        </nav>
      </header>
      <main className="w-full max-w-3xl bg-white rounded-lg shadow p-6 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Adventure Progress
          </h2>
          <select
            className="border rounded-md px-3 py-2 text-sm text-gray-600"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Total Quests</p>
            <p className="text-2xl font-bold text-gray-800">248</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">186</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-orange-600">42</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Achievement Points</p>
            <p className="text-2xl font-bold text-purple-600">1,240</p>
          </div>
        </div>
        <iframe
          src="https://pixe.la/v1/users/a-know/graphs/test-graph"
          className="h-60 w-full rounded-lg border border-gray-200"
          title="Progress Graph"
        />
      </main>
    </div>
  );
};

export default ProgressPage;
