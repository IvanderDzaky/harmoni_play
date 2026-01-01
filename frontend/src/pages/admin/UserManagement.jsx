import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/adminService";
import Loader from "../../components/layout/Loader";
import "../../styles/UserManagement.css";
import "../../styles/loader.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    setDeleting(true);
    try {
      const result = await deleteUser(selectedUser.user_id);
      if (result) {
        setUsers((prev) =>
          prev.filter((u) => u.user_id !== selectedUser.user_id)
        );
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    } finally {
      setDeleting(false);
      setModalVisible(false);
      setSelectedUser(null);
    }
  };

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

              <div className="user-actions">
                <span className={`role-badge ${u.role}`}>{u.role}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(u)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DELETE MODAL */}
      {modalVisible && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedUser.name}</strong>?
            </p>
            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setModalVisible(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn delete"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
