 import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import FaultyTerminal from "./FaultyTerminal.jsx";
import TargetCursor from "./TargetCursor.jsx";
import "./App.css";   // 👈 important

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clickedQuestion, setClickedQuestion] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleQuestionClick = (index) => {
    setClickedQuestion(index);
  };

  const handleLeaderboardClick = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  const leaderboardData = [
    { rank: 1, team: 'Team Alpha', score: 150 },
    { rank: 2, team: 'Team Beta', score: 140 },
    { rank: 3, team: 'Team Gamma', score: 130 },
    { rank: 4, team: 'Team Delta', score: 120 },
    { rank: 5, team: 'Team Epsilon', score: 110 },
  ];

  return (

    <div className="page">
      {/* Persistent Background */}
      <FaultyTerminal
        scale={1}
        digitSize={1.2}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.1}
        tint="#f4372a"
        mouseReact
        mouseStrength={0.3}
        brightness={0.7}
        className="bg"
      />

      <TargetCursor />

      {!isLoggedIn ? (
        <>
          {/* Login UI */}
          <div className="login-card">
            <h2>CODEMANIA PLAYER LOGIN</h2>
            <input type="text" placeholder="Team Name" />
            <input type="password" placeholder="Access Code" />
            <button onClick={handleLogin}>ENTER ROUND 1</button>
          </div>
        </>
      ) : (
        <>
          {/* Questions UI */}
          <div className="login-card">
            <h2 style={{ color: '#fff' }}>QUESTIONS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'].map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid #f4372a',
                    color: '#fff',
                    padding: '20px',
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    transform: clickedQuestion === index ? 'scale(1.2)' : 'scale(1)',
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard Button */}
          <button
            onClick={handleLeaderboardClick}
            className="leaderboard-btn"
          >
            View Leaderboard
          </button>

          {/* Leaderboard Panel */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: showLeaderboard ? 0 : '-400px',
            width: '300px',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.65)',
            borderLeft: '2px solid #f4372a',
            padding: '0px',
            zIndex: 4,
            overflowY: 'auto',
            transition: 'right 0.3s ease-in-out',
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Leaderboard</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {leaderboardData.map((entry) => (
                <div key={entry.rank} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  background: 'rgba(244, 55, 42, 0.1)',
                  border: '1px solid #f4372a',
                  color: '#fff',
                }}>
                  <span>#{entry.rank} {entry.team}</span>
                  <span>{entry.score} pts</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleLeaderboardClick}
              style={{
                marginTop: '20px',
                width: '80%',
                padding: '10px',
                background: '#f4372a',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </>
      )}


    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
