import "../../styles/SidebarAdmin.css"

export default function AdminSidebar({ menu, setMenu }) {
  return (
    <aside className="admin-sidebar">
      <h3 className="admin-title">Admin Panel</h3>


      <button
        className={menu === "users" ? "active" : ""}
        onClick={() => setMenu("users")}
      >
        👤 Users
      </button>

      <button
        className={menu === "artists" ? "active" : ""}
        onClick={() => setMenu("artists")}
      >
        🎵 Artist Requests
      </button>
    </aside>
  );
}
