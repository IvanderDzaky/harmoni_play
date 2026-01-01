import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminTopbar.css"; // bisa tetap pakai style admin topbar

export default function ArtistTopbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Close dropdown saat klik di luar
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topbar artist-topbar">
      <div className="topbar-left">
        <button className="nav-btn" onClick={() => navigate(-1)}>⟨</button>
        <button className="nav-btn" onClick={() => navigate(1)}>⟩</button>
      </div>

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

            <span className="artist-label">{user?.name || "Musisi"}</span>

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
