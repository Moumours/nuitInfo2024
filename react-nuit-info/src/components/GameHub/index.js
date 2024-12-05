import React from "react";
import "./index.scss";

const GameHub = () => {
  return (
    <div className="game-hub">
      <h1>Hub</h1>
      <p>Welcome to the Game Hub!</p>
      <ul className="hub-options">
        <li>📊 Player Stats</li>
        <li>🎮 Game Modes</li>
        <li>🏆 Leaderboards</li>
      </ul>
      <p style={{ marginTop: "20px" }}>
        <a href="/" className="hub-link">Back to Home</a>
      </p>
    </div>
  );
};

export default GameHub;
