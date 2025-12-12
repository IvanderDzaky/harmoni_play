import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Player from "./Player";
import "../../styles/Dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
  <Sidebar />

  <div className="dashboard-main">
    <Topbar />
    <div className="dashboard-content">{children}</div>

    <Player />   {/* Player masuk ke area main */}
  </div>
</div>

  );
}
