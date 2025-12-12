import React from "react";
import "../../styles/Topbar.css";

export default function Topbar() {
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
        <div className="topbar-profile">V</div>
      </div>
    </div>
  );
}
