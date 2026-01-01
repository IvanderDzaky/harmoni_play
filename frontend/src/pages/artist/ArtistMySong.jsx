import { useEffect, useState } from "react";
import { getMySongs } from "../../services/artistService";
import Loader from "../../components/layout/Loader";
import "../../styles/ArtistMySongs.css";
import "../../styles/loader.css";

export default function ArtistMySongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songsData = await getMySongs(); // token otomatis dipakai
        setSongs(songsData || []);            // langsung gunakan array
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || err.message || "Gagal memuat lagu"
        ); // ambil pesan dari backend
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="artist-my-songs-page">
      <h2>Lagu Saya</h2>
      {songs.length === 0 ? (
        <p>Belum ada lagu yang diunggah.</p>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>ID Genre: {song.genre_id}</p>
                <p>ID Album: {song.album_id || "-"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
