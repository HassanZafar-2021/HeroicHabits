// Header.tsx
import { FC } from "react";

interface HeaderProps {
  userName: string;
  avatarUrl: string;
}

const Header: FC<HeaderProps> = ({ userName, avatarUrl }) => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-blue-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-gamepad text-blue-600 text-2xl"></i>
          <h1 className="text-xl font-bold text-blue-800">Heroic Habits</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
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
        <div className="flex items-center space-x-4">
          <button
            className="text-blue-700 hover:text-blue-500"
            title="Notifications"
          >
            <i className="fa-regular fa-bell text-xl"></i>
          </button>
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-blue-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
