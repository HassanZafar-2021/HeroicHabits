import React, { useState } from "react";

interface AvatarProps {
  avatarUrl: string;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl, onAvatarChange }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>(avatarUrl);

  const handleAvatarChange = () => {
    if (newAvatarUrl !== avatarUrl) {
      onAvatarChange(newAvatarUrl);
    }
    setIsEditing(false);
  };

  return (
    <div className="avatar-container">
      <img src={avatarUrl} alt="Avatar" className="avatar-image" />

      {isEditing ? (
        <div className="avatar-edit">
          <input
            type="text"
            value={newAvatarUrl}
            onChange={(e) => setNewAvatarUrl(e.target.value)}
            className="avatar-input"
            placeholder="Enter new avatar URL"
          />
          <button type="button" onClick={handleAvatarChange} className="save-button">
            Save
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="edit-avatar-button"
        >
          Edit Avatar
        </button>
      )}
    </div>
  );
};

export default Avatar;
