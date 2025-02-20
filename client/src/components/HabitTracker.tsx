import React, { useState, useEffect } from "react";
import { pixelaService } from "../../../server/src/services/pixelaService";
import { GraphDisplay } from "./GraphDisplay";
import { GraphStats } from "../../types/GraphStats";

interface HabitTrackerProps {
  username: string;
  token: string;
  graphId: string;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({
  username,
  token,
  graphId,
}) => {
  const [stats, setStats] = useState<GraphStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, [username, token, graphId]);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const graphStats = await pixelaService.getGraphStats(
        username,
        token,
        graphId
      );
      setStats(graphStats as GraphStats);
    } catch (error) {
      setError("Failed to load habit stats");
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async () => {
    try {
      setError(null);
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      await pixelaService.addPixel(username, token, graphId, today, "1");
      await loadStats();
    } catch (error) {
      setError("Error adding habit");
      console.error("Error adding habit:", error);
    }
  };

  return (
    <div className="habit-tracker space-y-6">
      {loading ? (
        <p>Loading habit stats...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        stats && (
          <div className="stats-container grid grid-cols-3 gap-4 mb-6">
            <div className="stat-card bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg">Total Days</h3>
              <p className="text-2xl">{stats.totalPixels}</p>
            </div>
            <div className="stat-card bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg">Best Day</h3>
              <p className="text-2xl">{stats.maxQuantity}</p>
            </div>
            <div className="stat-card bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg">Average</h3>
              <p className="text-2xl">{stats.avgQuantity.toFixed(1)}</p>
            </div>
          </div>
        )
      )}

      <button
        onClick={handleAddHabit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Add Habit Completion
      </button>

      <div className="mt-6">
        <GraphDisplay />
      </div>
    </div>
  );
};
