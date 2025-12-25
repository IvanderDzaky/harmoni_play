import { Link } from "react-router-dom";
import { FiHome, FiSearch, FiBook,FiPlus } from "react-icons/fi";
import {useState} from "react";
import "../../styles/Sidebar.css";
import EditPlaylistModal from "../EditPlaylistModal";
export default function Sidebar() {
   const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="sidebar">

      <div className="sidebar-header">
      <h2 className="sidebar-title">HarmoniPlay</h2>
        <Link to="/dashboard" className="menu-item">
          <FiHome className="menu-icon" />
        </Link>

      </div>

        <nav className="sidebar-menu">
        <Link to="/search" className="menu-item">
          <FiSearch className="menu-icon" />
          <span>Search</span>
        </Link>
         <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
         }}>
        <Link to="/library" className="menu-item">
          <FiBook className="menu-icon" />
          <span>Your Library</span>
        </Link>
            <button
              className="add-playlist-btn" onClick={() => setShowEditModal(true)}
            >
              <FiPlus size={18} />
            </button>
         </div>
        </nav>
        {showEditModal && (
          <EditPlaylistModal
            onClose={() => setShowEditModal(false)}
            onSave={() => {
              // nanti connect backend
              setShowEditModal(false);
            }}
          />
        )}
    </div>
    
  );

}
