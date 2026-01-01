import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminService";
import "../../styles/UserManagement.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
        <div className="admin-page">
            <h1>User Management</h1>

            <table className="admin-table">
              <thead>...</thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.user_id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role ${u.role}`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  );
}
