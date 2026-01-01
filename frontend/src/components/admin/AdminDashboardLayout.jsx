import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminTopbar from "../admin/AdminTopbar";
import Loader from "../layout/Loader";
import { useLoader } from "../../contexts/LoaderContext";

export default function AdminDashboardLayout() {
  const { loading } = useLoader();

  return (
    <div className="dashboard-container">
      {loading && <Loader />}

      <AdminSidebar />

      <div className="dashboard-main">
        <AdminTopbar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
