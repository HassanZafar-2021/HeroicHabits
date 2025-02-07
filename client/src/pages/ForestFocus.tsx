import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ForestFocus = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(5 * 60); // Default 5 minutes
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(selectedTime);
    setIsRunning(true);
  };

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedTime);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = parseInt(e.target.value) * 60;
    setSelectedTime(newTime);
    setTimeLeft(newTime);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #2c3e50, #4ca1af)",
        textAlign: "center",
        color: "#fff",
      }}
    >
      {/* Home Link */}
      <Link
        to="/home"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "#fff",
          padding: "8px 15px",
          borderRadius: "5px",
          textDecoration: "none",
          color: "#333",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        ⬅ Home
      </Link>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          width: "300px",
        }}
      >
        <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>
          🔥 Forest Focus Timer
        </h2>

        {/* Animated Campfire */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/campfire.png"
            alt="Campfire"
            style={{
              width: "100px",
              height: "100px",
              marginBottom: "10px",
              borderRadius: "50%",
              border: "2px solid white",
              animation: "glow 1.5s infinite alternate ease-in-out",
            }}
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/100?text=No+Image")
            }
          />
        </div>

        {/* Timer Display */}
        <div
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Timer Selection */}
        <select
          value={selectedTime / 60}
          onChange={handleTimeChange}
          disabled={isRunning}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "5px",
            marginBottom: "10px",
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "#333",
            border: "none",
            width: "100%",
          }}
        >
          <option value="5">5 Minutes</option>
          <option value="10">10 Minutes</option>
          <option value="15">15 Minutes</option>
          <option value="20">20 Minutes</option>
          <option value="25">25 Minutes</option>
        </select>

        {/* Timer Controls */}
        <div style={{ marginTop: "10px" }}>
          {!isRunning ? (
            <button
              onClick={handleStart}
              style={{
                backgroundColor: "#27ae60",
                color: "white",
                padding: "10px 20px",
                margin: "5px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
                fontSize: "16px",
                width: "100%",
                transition: "0.3s",
              }}
            >
              Start Timer
            </button>
          ) : (
            <button
              onClick={handleStop}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "10px 20px",
                margin: "5px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
                fontSize: "16px",
                width: "100%",
                transition: "0.3s",
              }}
            >
              Stop Timer
            </button>
          )}
          <button
            onClick={handleReset}
            style={{
              backgroundColor: "#34495e",
              color: "white",
              padding: "10px 20px",
              margin: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              width: "100%",
              transition: "0.3s",
            }}
          >
            Reset
          </button>
        </div>

        {/* Music Button */}
        <button
          onClick={toggleMusic}
          style={{
            backgroundColor: "#f39c12",
            color: "white",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "50%",
            cursor: "pointer",
            border: "none",
            width: "50px",
            height: "50px",
          }}
        >
          <img
            src="/music.png"
            alt="Music"
            style={{ width: "30px", height: "30px" }}
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/30?text=No+Image")
            }
          />
        </button>

        {/* Audio Element */}
        <audio ref={audioRef} loop>
          <source src="/CampFireSound.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <style>
        {`
          @keyframes glow {
            0% { filter: drop-shadow(0px 0px 5px orange); }
            100% { filter: drop-shadow(0px 0px 20px red); }
          }

          button:hover {
            transform: scale(1.05);
            opacity: 0.9;
          }
        `}
      </style>
    </div>
  );
};

export default ForestFocus;
