import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

function TeamLogin() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, accessCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and team info
      localStorage.setItem("token", data.token);
      localStorage.setItem("team", JSON.stringify(data.team));

      navigate("/challenges");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <h2>CODEMANIA PLAYER LOGIN</h2>
      {error && <p style={{ color: "#ff4757", fontSize: "0.85rem", marginBottom: "10px" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "CONNECTING..." : "ENTER ARENA"}
        </button>
      </form>
    </div>
  );
}

export default TeamLogin;
