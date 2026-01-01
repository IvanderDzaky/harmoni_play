import { useState } from "react";
import { uploadSong } from "../../services/artistService";
import Loader from "../../components/layout/Loader";
import "../../styles/ArtistUpload.css";
import "../../styles/loader.css";

export default function ArtistUpload() {
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [genreId, setGenreId] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioFile) {
      setMessage("Audio file wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("lyrics", lyrics);
    formData.append("genre_id", genreId);
    formData.append("album_id", albumId);
    formData.append("file_audio", audioFile);
    if (coverImage) formData.append("cover_image", coverImage);

    setLoading(true);
    setMessage("");

    try {
      await uploadSong(formData);
      setMessage("Lagu berhasil diunggah!");
      setTitle("");
      setLyrics("");
      setGenreId("");
      setAlbumId("");
      setAudioFile(null);
      setCoverImage(null);
    } catch (err) {
      console.error(err);
      setMessage("Gagal mengunggah lagu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artist-upload-page">
      {loading && <Loader />}

      <h2>Unggah Lagu Baru</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Judul Lagu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Lirik Lagu"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
        />
        <input
          type="number"
          placeholder="ID Genre"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
        />
        <input
          type="number"
          placeholder="ID Album (Opsional)"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Mengunggah..." : "Unggah Lagu"}
        </button>
      </form>
    </div>
  );
}
