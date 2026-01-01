import { Outlet } from "react-router-dom";
import ArtistSidebar from "../artist/ArtistSidebar";
import ArtistTopbar from "../artist/ArtistTopbar";

export default function ArtistDashboardLayout() {
  return (
    <div className="dashboard-container">
      <ArtistSidebar />

      <div className="dashboard-main">
        <ArtistTopbar />
        <div className="dashboard-content">
          <Outlet /> {/* Halaman artist akan muncul di sini */}
        </div>
      </div>
    </div>
  );
}
