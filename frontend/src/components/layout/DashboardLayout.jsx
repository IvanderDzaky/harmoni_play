import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../../styles/Dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
