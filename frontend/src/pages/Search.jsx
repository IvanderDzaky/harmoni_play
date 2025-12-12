import DashboardLayout from "../components/layout/DashboardLayout";
import "../styles/Search.css";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  const categories = [
    { id: 1, label: "Pop", color: "#f39c12" },
    { id: 2, label: "Rock", color: "#e74c3c" },
    { id: 3, label: "Jazz", color: "#8e44ad" },
    { id: 4, label: "Classical", color: "#3498db" },
    { id: 5, label: "Hip Hop", color: "#27ae60" },
    { id: 6, label: "Electronic", color: "#d35400" }
  ];

  return (
    <DashboardLayout>
      <div className="search-page">
        <h2 className="search-title">Search</h2>

        {/* SEARCH BAR */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* CATEGORY GRID */}
        <h3 className="section-title">Browse All</h3>
        <div className="search-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="search-card"
              style={{ backgroundColor: cat.color }}
            >
              <p>{cat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
