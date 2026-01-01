import { useState } from "react";
import { ajukanMusisi } from "../../services/artistService";
import Loader from "./Loader";
import "../../styles/ArtistUpload.css";

export default function AjukanMusisiModal({ onClose }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return setMessage("Nama wajib diisi!");
    if (!bio.trim()) return setMessage("Bio wajib diisi!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (photo) formData.append("file", photo); // sesuai backend

    setLoading(true);
    setMessage("");

    try {
      const res = await ajukanMusisi(formData);
      setMessage(res.message || "Pengajuan berhasil!");
      // Reset form
      setName("");
      setBio("");
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Gagal mengajukan musisi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {loading && <Loader />}

        <h3>Ajukan Menjadi Musisi</h3>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit} className="upload-form">
          <input
            type="text"
            placeholder="Nama Artist"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />

          <label>Foto (Opsional)</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Mengirim..." : "Ajukan"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
