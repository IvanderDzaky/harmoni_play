import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../contexts/PlayerContext";
import "../../styles/AdminTopbar.css";

export default function AdminTopbar() {
  const navigate = useNavigate();
  const { resetPlayer } = usePlayer();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // CLOSE DROPDOWN OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    resetPlayer();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topbar admin-topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <button className="nav-btn" onClick={() => navigate(-1)}>⟨</button>
        <button className="nav-btn" onClick={() => navigate(1)}>⟩</button>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <div className="dropdown" ref={dropdownRef}>
          <button
            className="dropdown-toggle"
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg className="avatar-icon" viewBox="0 0 24 24" width="20" height="20">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-5 0-8 3-8 5v1h16v-1c0-2-3-5-8-5z" />
            </svg>

            <span className="admin-label">ADMIN</span>

            <svg
              className={`dropdown-arrow ${open ? "open" : ""}`}
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <div className="dropdown-menu">
              <div className="dropdown-item disabled">
                {user?.name || "Administrator"}
              </div>

              <button className="dropdown-item logout" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
