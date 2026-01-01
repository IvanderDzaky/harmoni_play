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
        const songsData = await getMySongs();
        setSongs(songsData || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || err.message || "Gagal memuat lagu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="artist-my-songs-page">
      {songs.length === 0 ? (
        <p style={{ textAlign: "center" }}>Belum ada lagu yang diunggah.</p>
      ) : (
        <div className="song-grid">
          {songs.map((song) => (
            <div key={song.song_id} className="song-card">
              <div className="cover-wrapper">
                {song.cover_image ? (
                  <img
                    src={song.cover_image}
                    alt={song.title}
                    className="song-cover"
                  />
                ) : (
                  <div className="song-cover placeholder">No Cover</div>
                )}

                {/* Overlay audio player */}
                {song.file_audio_url && (
                  <div className="overlay">
                    <audio controls className="mini-player" src={song.file_audio_url}></audio>
                  </div>
                )}
              </div>

              <div className="song-info">
                <h3>{song.title}</h3>
                {song.genres?.length > 0 && (
                  <p className="genres">{song.genres.map((g) => g.name).join(", ")}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
