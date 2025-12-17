import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="nav-btn">⟨</button>
        <button className="nav-btn">⟩</button>
      </div>

      <div className="topbar-right">
        <input
          type="text"
          placeholder="Search…"
          className="topbar-search"
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
