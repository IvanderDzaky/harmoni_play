import { NavLink } from "react-router-dom";
import { FiMusic, FiUpload } from "react-icons/fi";
import "../../styles/SidebarAdmin.css"; // bisa tetap pakai style admin sidebar

export default function ArtistSidebar() {
  return (
    <aside className="sidebar artist-sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Artist Panel</h2>
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">
        <NavLink to="/artist/my-songs" className="menu-item">
          <div className="menu-icon">
            <FiMusic size={18} />
          </div>
          <span className="menu-text">Lagu Saya</span>
        </NavLink>

        <NavLink to="/artist/upload" className="menu-item">
          <div className="menu-icon">
            <FiUpload size={18} />
          </div>
          <span className="menu-text">Unggah Lagu</span>
        </NavLink>
      </nav>
    </aside>
  );
}
