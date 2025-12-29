import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Player from "./Player";

export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>

      <Player />
    </div>
  );
}
