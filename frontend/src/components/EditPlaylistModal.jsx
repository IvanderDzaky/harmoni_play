import { useState } from "react";
import "../styles/EditPlaylistModal.css";

export default function EditPlaylistModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({ name, description });
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

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
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
