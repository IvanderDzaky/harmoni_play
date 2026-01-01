import { NavLink } from "react-router-dom";
import { FiHome, FiSearch, FiBook, FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";

import "../../styles/Sidebar.css";
import { addPlaylist, getAllPlayListByUser } from "../../services/playlistService";
import EditPlaylistModal from "../EditPlaylistModal";

export default function Sidebar() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getAllPlayListByUser(); // sudah kirim token
        setPlaylist(data); // data dari backend array playlist {id, name, description, songs}
      } catch (err) {
        console.error("Error fetch playlist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, []);

  const handleCreatePlaylist = async ({ name, description }) => {
    try {
      const response = await addPlaylist({ name, description });
      if (response) {
        setPlaylist((prev) => [...prev, response]); // response sudah ada id
        setShowEditModal(false);
      }
    } catch (err) {
      console.error("Error create playlist:", err);
    }
  };

  if (loading) {
    return <div className="sidebar-loading">Memuat playlist...</div>;
  }

  return (
    <aside className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">HarmoniPlay</h2>
      </div>

      {/* MENU + LIBRARY + PLAYLIST */}
      <nav className="sidebar-menu">
        {/* Menu utama */}
        <NavLink to="/dashboard" className="menu-item">
          <div className="menu-icon">
            <FiHome size={18} />
          </div>
          <span className="menu-text">Home</span>
        </NavLink>

        <NavLink to="/search" className="menu-item">
          <div className="menu-icon">
            <FiSearch size={18} />
          </div>
          <span className="menu-text">Search</span>
        </NavLink>

        {/* Library + tombol create playlist */}
        <div className="library-row">
          <div className="menu-item library-link no-hover">
            <div className="menu-icon">
              <FiBook size={18} />
            </div>
            <span className="menu-text">Your Library</span>
          </div>

          <button
            className="add-playlist-btn"
            onClick={() => setShowEditModal(true)}
            title="Buat playlist"
          >
            <FiPlus size={18} />
          </button>
        </div>

        {/* Playlist */}
        <div className="playlist-section">
          {playlist.length === 0 ? (
            <p className="empty-playlist">Belum ada playlist</p>
          ) : (
            playlist.map((item) => (
              <NavLink
                key={item.id} // fix key
                to={`/playlist/${item.id}?name=${encodeURIComponent(item.name)}&description=${encodeURIComponent(item.description)}`}
                className="menu-item playlist-item"
              >
                <div className="menu-icon">
                  <FiBook size={18} />
                </div>
                <span className="menu-text">{item.name}</span>
              </NavLink>
            ))
          )}
        </div>
      </nav>

      {/* Edit playlist modal */}
      {showEditModal && (
        <EditPlaylistModal
          onClose={() => setShowEditModal(false)}
          onSave={handleCreatePlaylist}
        />
      )}
    </aside>
  );
}
