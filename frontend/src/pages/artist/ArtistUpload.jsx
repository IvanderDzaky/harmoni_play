import { useEffect, useState, useRef } from "react";
import { uploadSong } from "../../services/artistService";
import { getAllCategories } from "../../services/genresService";
import Loader from "../../components/layout/Loader";
import "../../styles/ArtistUpload.css";
import "../../styles/loader.css";

export default function ArtistUpload() {
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const coverInputRef = useRef();

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  const handleGenreChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedGenres(selected);
  };

  const handleCoverChange = (file) => {
    setCoverImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setCoverPreview(null);
    }
  };

  const handleCoverDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleCoverChange(file);
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) return setMessage("Audio file wajib diisi!");
    if (selectedGenres.length === 0) return setMessage("Pilih minimal 1 genre!");

    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) return setMessage("User tidak ditemukan. Silakan login ulang.");

    let artist_id = user.artist_id;

    if (user.role === "artist" && !artist_id) {
      try {
        const res = await fetch("http://localhost:5000/api/artists/my-artist", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const artistData = await res.json();
        artist_id = artistData.artist_id || artistData.data?.artist_id;
        if (!artist_id) return setMessage("Gagal mengambil data artist.");
        user = { ...user, artist_id };
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
        return setMessage("Gagal mengambil data artist. Silakan coba lagi.");
      }
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("lyrics", lyrics);
    formData.append("file_audio", audioFile);
    if (coverImage) formData.append("cover_image", coverImage);
    formData.append("artist_id", artist_id);
    formData.append("uploaded_by", user.user_id);

    // Append genres dengan format backend friendly
    selectedGenres.forEach((g) => formData.append("genres[]", g));

    console.log("FormData siap dikirim:", {
      title,
      lyrics,
      audioFile,
      coverImage,
      artist_id,
      uploaded_by: user.user_id,
      genres: selectedGenres,
    });

    setLoading(true);
    setMessage("");

    try {
      await uploadSong(formData);
      setMessage("Lagu berhasil diunggah!");

      // Reset form
      setTitle("");
      setLyrics("");
      setSelectedGenres([]);
      setAudioFile(null);
      setCoverImage(null);
      setCoverPreview(null);
      setAudioPreview(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || err.message || "Gagal mengunggah lagu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artist-upload-page">
      {loading && <Loader />}

      <h2>Unggah Lagu Baru</h2>
      {message && <p className="message">{message}</p>}

      {/* Cover Preview */}
      {coverPreview && <img src={coverPreview} alt="Cover Preview" className="preview-cover-large" />}

      <form onSubmit={handleSubmit} className="upload-form">
        {/* Judul Lagu */}
        <input
          type="text"
          placeholder="Judul Lagu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Lirik Lagu */}
        <textarea
          placeholder="Lirik Lagu"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
        />

        {/* Genre */}
        <label>Genre</label>
        <select multiple value={selectedGenres} onChange={handleGenreChange}>
          {categories.map((c) => (
            <option key={c.genre_id} value={c.genre_id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Audio */}
        <label>Audio</label>
        <input type="file" accept="audio/*" onChange={handleAudioChange} required />
        {audioPreview && <audio controls src={audioPreview} className="preview-audio" />}

        {/* Cover Drag & Drop */}
        <label>Cover Image (Opsional)</label>
        <div
          className="cover-drop-zone"
          onClick={() => coverInputRef.current.click()}
          onDrop={handleCoverDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {coverPreview ? "Klik atau Drop untuk ganti cover" : "Klik atau Drop file cover di sini"}
        </div>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleCoverChange(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Mengunggah..." : "Unggah Lagu"}
        </button>
      </form>
    </div>
  );
}
