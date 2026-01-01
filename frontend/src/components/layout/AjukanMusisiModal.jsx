import React, { useState } from "react";
import { ajukanMusisi } from "../../services/artistService";
import "../../styles/AjukanMusisiModal.css";

export default function AjukanMusisiModal({ onClose }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (photo) formData.append("photo", photo);

      await ajukanMusisi(formData);

      setMessage("Pengajuan berhasil dikirim!");
      setName("");
      setBio("");
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Gagal mengajukan musisi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Ajukan Musisi</h2>

        <form onSubmit={handleSubmit}>
          <label>Nama Musisi</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Bio (Opsional)</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <label>Foto Musisi</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          {message && <p className="modal-message">{message}</p>}

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim"}
            </button>
            <button type="button" onClick={onClose}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
