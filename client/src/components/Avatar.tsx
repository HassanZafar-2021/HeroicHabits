import React, { useState } from "react";

interface AvatarProps {
  avatarUrl: string;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl, onAvatarChange }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>(avatarUrl);

  // Handle avatar URL change
  const handleChangeAvatar = () => {
    if (newAvatarUrl !== avatarUrl) {
      onAvatarChange(newAvatarUrl); // Calls parent function to update avatar URL
    }
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="avatar-container">
      <h3>Your Hero Avatar</h3>

      {/* Avatar Display */}
      <div className="avatar-display">
        <img src={newAvatarUrl} alt="Avatar" className="avatar-image" />
      </div>

      {/* Edit Avatar button */}
      <button
        onClick={() => setIsEditing((prev) => !prev)} // Toggle edit mode
        className="edit-avatar-button"
      >
        {isEditing ? "Cancel" : "Edit Avatar"}{" "}
        {/* Toggle between Edit and Cancel */}
      </button>

      {/* Avatar customization form */}
      {isEditing && (
        <div className="avatar-editor">
          <input
            type="text"
            value={newAvatarUrl}
            onChange={(e) => setNewAvatarUrl(e.target.value)} // Handle input change
            placeholder="Enter new avatar URL"
            className="avatar-input"
          />
          <button onClick={handleChangeAvatar} className="save-avatar-button">
            Save Avatar
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
