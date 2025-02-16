import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import ProgressBar from "../components/ProgressBar";

const Profile = () => {
  const [user, setUser] = useState<{
    name: string;
    avatar: string;
    description: string | null;
  } | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }, []);

  return (
    <div className="profile-container bg-gray-100 min-h-screen p-8">
      {/* Home Link */}
      <Link
        to="/home"
        className="absolute top-5 left-5 bg-white px-4 py-2 rounded shadow-md text-gray-800 font-semibold"
      >
        ⬅ Home
      </Link>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4 border-b pb-4">
          <img
            src={user?.avatar || "/Avatar.png"} // Ensure Avatar.png is in public/
            alt="Avatar"
            className="w-24 h-24 rounded-lg border-2 border-purple-500"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {user?.name || "Habit Hero"}
            </h1>
            <p className="text-gray-600">@habit_warrior • Level 1 Adventurer</p>
          </div>
        </div>

        {/* Progress Bars */}
        <ProgressBar label="Health" progress={100} color="green" />
        <ProgressBar label="Experience" progress={25} color="blue" />
        <ProgressBar label="Focus" progress={25} color="yellow" />

        <div className="mt-4 text-gray-700">
          <h3 className="font-bold text-lg">About</h3>
          <p>
            {user?.description ||
              "An adventurous spirit determined to conquer habits and master daily quests!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
