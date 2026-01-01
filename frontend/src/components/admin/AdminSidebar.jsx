import { NavLink } from "react-router-dom";
import { FiUsers, FiCheckCircle } from "react-icons/fi";
import "../../styles/SidebarAdmin.css";

export default function AdminSidebar() {
  return (
    <aside className="sidebar admin-sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admin Panel</h2>
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">
        <NavLink to="/admin/users" className="menu-item">
          <div className="menu-icon">
            <FiUsers size={18} />
          </div>
          <span className="menu-text">User Management</span>
        </NavLink>

        <NavLink to="/admin/artists" className="menu-item">
          <div className="menu-icon">
            <FiCheckCircle size={18} />
          </div>
          <span className="menu-text">Artist Verification</span>
        </NavLink>
      </nav>
    </aside>
  );
}
