import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../contexts/PlayerContext";
import AjukanMusisiModal from "./AjukanMusisiModal";
import "../../styles/Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();
  const { resetPlayer } = usePlayer();

  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [showModal, setShowModal] = useState(false);

  const dropdownWrapperRef = useRef(null);
  const dropdownBtnRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= CLOSE DROPDOWN CLICK OUTSIDE =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= HITUNG POSISI DROPDOWN =================
  useEffect(() => {
    if (dropdownOpen && dropdownBtnRef.current) {
      const rect = dropdownBtnRef.current.getBoundingClientRect();

      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
        zIndex: 1000,
      });
    }
  }, [dropdownOpen]);

  // ================= ACTIONS =================
  const handleLogout = () => {
    resetPlayer();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!searchText.trim()) return;
      navigate(`/searchlist?q=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="nav-btn" onClick={() => navigate(-1)}>⟨</button>
          <button className="nav-btn" onClick={() => navigate(1)}>⟩</button>
        </div>

        <div className="topbar-right">
          <input
            type="text"
            className="topbar-search"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearch}
          />

          <div className="dropdown" ref={dropdownWrapperRef}>
            <button
              ref={dropdownBtnRef}
              className="dropdown-toggle"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <svg
                className="avatar-icon"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-5 0-8 3-8 5v1h16v-1c0-2-3-5-8-5z" />
              </svg>

              <svg
                className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu" style={dropdownStyle}>
                {user?.role === "reguler" && (
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowModal(true);
                      setDropdownOpen(false);
                    }}
                  >
                    Ajukan Musisi
                  </button>
                )}

                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && <AjukanMusisiModal onClose={() => setShowModal(false)} />}
    </>
  );
}
