import { useState } from "react";
import "../styles/EditPlaylistModal.css"

export default function EditPlaylistModal({ onClose, onSave }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({ name });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create playlist</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="My Playlist"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-create">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
