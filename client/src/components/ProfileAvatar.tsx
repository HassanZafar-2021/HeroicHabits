import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const user = localStorage.getItem("user") || "";

  return (
    <div
      style={{
        ...styles.container,
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered
          ? "0px 6px 15px rgba(0,0,0,0.3)"
          : "0px 4px 10px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/profile" style={styles.link}>
        <img
          src={"/Avatar.png"}
          alt="Profile"
          style={styles.avatar}
        />
        <span style={styles.username}>{user || "Guest"}</span>
      </Link>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "absolute",
    top: "10px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "10px",
    width: "120px",
    height: "50px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    cursor: "pointer",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    marginRight: "10px",
    transition: "transform 0.3s ease-in-out",
  },
  username: {
    fontSize: "14px",
    fontWeight: "bold",
    transition: "color 0.3s ease-in-out",
  },
  link: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    color: "inherit",
    width: "100%",
  },
};

export default ProfileAvatar;
