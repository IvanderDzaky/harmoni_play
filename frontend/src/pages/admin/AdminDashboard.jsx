import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import UserManagement from "./UserManagement";
import ArtistVerification from "./ArtistVerification";
import "../../styles/AdminDashboard.css"

export default function AdminDashboard() {
  const [menu, setMenu] = useState("users");

  return (
        <div className="admin-layout">
      <AdminSidebar menu={menu} setMenu={setMenu} />

      <main className="admin-content">
        {menu === "users" && <UserManagement />}
        {menu === "artists" && <ArtistVerification />}
      </main>
    </div>
  );
}
