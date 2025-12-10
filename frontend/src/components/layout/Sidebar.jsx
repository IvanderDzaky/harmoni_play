import { Link } from "react-router-dom";
import { FiHome, FiSearch, FiBook } from "react-icons/fi";
import "../../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">HarmoniPlay</h2>

      <nav className="sidebar-menu">
        <Link to="/dashboard" className="menu-item">
          <FiHome className="menu-icon" />
          <span>Home</span>
        </Link>

        <Link to="/search" className="menu-item">
          <FiSearch className="menu-icon" />
          <span>Search</span>
        </Link>

        <Link to="/library" className="menu-item">
          <FiBook className="menu-icon" />
          <span>Your Library</span>
        </Link>
      </nav>
    </div>
  );
}
