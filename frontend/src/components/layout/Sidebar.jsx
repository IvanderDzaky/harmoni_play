import { Link } from "react-router-dom";
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
        const data = await getAllPlayListByUser();
        setPlaylist(data);
      } catch (err) {
        console.error(err);
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
        setPlaylist((prev) => [...prev, response]);
        setShowEditModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="sidebar-loading">Memuat playlist...</div>;
  }

  return (
    <aside className="sidebar">
      {/* HEADER */}
      <h2 className="sidebar-title">HarmoniPlay</h2>

      {/* MENU UTAMA */}
      <nav className="sidebar-menu">
        <Link to="/dashboard" className="menu-item">
          <FiHome className="menu-icon" />
          <span>Home</span>
        </Link>

        <Link to="/search" className="menu-item">
          <FiSearch className="menu-icon" />
          <span>Search</span>
        </Link>

        <div className="library-row">
          <Link to="/library" className="menu-item">
            <FiBook className="menu-icon" />
            <span>Your Library</span>
          </Link>

          <button
            className="add-playlist-btn"
            onClick={() => setShowEditModal(true)}
          >
            <FiPlus size={18} />
          </button>
        </div>
      </nav>

      {/* PLAYLIST */}
      <div className="playlist-section">
        {playlist.length === 0 ? (
          <p className="empty-playlist">Belum ada playlist</p>
        ) : (
          playlist.map((item) => (
            <Link
              key={item.playlist_id}
              to={`/playlist/${item.playlist_id}?name=${encodeURIComponent(
                item.name
              )}&description=${encodeURIComponent(item.description)}`}
              className="playlist-item"
            >
              <div className="playlist-icon">
                <FiBook size={18} />
              </div>

              <div className="playlist-info">
                <span className="playlist-name">{item.name}</span>
                <span className="playlist-meta">
                  Playlist • {item.created_by}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {showEditModal && (
        <EditPlaylistModal
          onClose={() => setShowEditModal(false)}
          onSave={handleCreatePlaylist}
        />
      )}
    </aside>
  );
}
