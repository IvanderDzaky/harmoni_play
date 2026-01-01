import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminService";
import Loader from "../../components/layout/Loader";
import "../../styles/UserManagement.css";
import "../../styles/loader.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data || []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  return (
    <div className="user-management">
      {/* HEADER */}
      <div className="user-header">
        <div className="user-count">
          Total Users: <span>{users.length}</span>
        </div>
      </div>

      {/* LIST */}
      <div className="user-list">
        {users.length === 0 ? (
          <p className="empty">No users found</p>
        ) : (
          users.map((u) => (
            <div className="user-card" key={u.user_id}>
              <div className="user-info">
                <h3>{u.name}</h3>
                <p>{u.email}</p>
              </div>

              <span className={`role-badge ${u.role}`}>
                {u.role}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
