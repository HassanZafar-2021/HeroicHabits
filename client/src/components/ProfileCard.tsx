import React, { useState } from "react";
import Avatar from "./Avatar"; // Import the Avatar component

interface ProfileCardProps {
  username: string;
  avatarUrl: string;
  progress: number;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  username,
  avatarUrl,
  progress,
  onAvatarChange,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>(username);

  const handleUsernameChange = () => {
    if (newUsername !== username) {
      // Update the username
      // This can be done through a parent callback to update the user's profile
    }
    setIsEditing(false);
  };

  return (
    <div className="profile-card">
      <h2 className="profile-card-title">User Profile</h2>
      <div className="avatar-container">
        <Avatar avatarUrl={avatarUrl} onAvatarChange={onAvatarChange} />
      </div>

      {/* Username Section */}
      <div className="username-section">
        <h3>Username:</h3>
        {isEditing ? (
          <div className="username-edit">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="username-input"
              placeholder="Enter new username"
            />
            <button onClick={handleUsernameChange} className="save-button">
              Save
            </button>
          </div>
        ) : (
          <p>{newUsername}</p>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-username-button"
        >
          {isEditing ? "Cancel" : "Edit Username"}
        </button>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <h3>Progress:</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{progress}% completed</p>
      </div>

      {/* Optional: Button to navigate to the user's quest dashboard */}
      <button className="view-quests-button">View My Quests</button>
    </div>
  );
};

export default ProfileCard;
