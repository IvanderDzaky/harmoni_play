import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { useState, useEffect } from "react";

export default function ArtistDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <div className="dashboard-content" style={{ padding: "2rem" }}>
      <h2>Selamat datang, {user?.name || "Musisi"}!</h2>
      <p>Ini adalah dashboard Anda. Dari sini, Anda dapat mengelola lagu dan playlist Anda.</p>

      <div className="dashboard-links" style={{ marginTop: "2rem" }}>
        <Link to="/artist/upload" className="dashboard-link">
          Unggah Lagu Baru
        </Link>
        <Link to="/artist/my-songs" className="dashboard-link">
          Lagu Saya
        </Link>
      </div>
    </div>
  );
}

