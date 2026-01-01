import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Player from "./Player";
import Loader from "./Loader";
import { useLoader } from "../../contexts/LoaderContext.jsx";

export default function DashboardLayout() {
  const { loading } = useLoader(); 

  return (
    <div className="dashboard-container">
      {loading && <Loader />}

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
