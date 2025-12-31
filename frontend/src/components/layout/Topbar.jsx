import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import "../../styles/Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();
  const { resetPlayer } = usePlayer(); 
  const [name, setName] = useState("");

  const handleLogout = () => {
    resetPlayer();                      
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!name || !name.trim()) return;
      navigate(`/searchlist?q=${encodeURIComponent(name)}`);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="nav-btn" onClick={goBack}>⟨</button>
        <button className="nav-btn" onClick={goForward}>⟩</button>
      </div>

      <div className="topbar-right">
        <input
          type="text"
          placeholder="Search…"
          className="topbar-search"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleInput}
        />

        {/* PROFILE → LOGOUT */}
        <div
          className="topbar-profile"
          onClick={handleLogout}
          title="Log out"
        >
          V
        </div>
      </div>
    </div>
  );
}
