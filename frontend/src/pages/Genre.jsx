import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSongsByCategoryId } from "../services/songsService";
import Loader from "../components/layout/Loader";
import SongSection from "../components/SongSection";
import "../styles/Genre.css";

const Genre = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSongs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getSongsByCategoryId(id);
      setSongs(data || []);
    } catch (err) {
      console.error("Error fetching songs by category:", err);
      setSongs([]);
      setError("Failed to fetch songs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  return (
    <div className="genres-page">
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchSongs}>Retry</button>
        </div>
      )}

      {!error && songs.length === 0 && <p className="no-songs">No songs found in this genre.</p>}

      {songs.length > 0 && <SongSection songs={songs} titleSection="Genres" />}
    </div>
  );
};

export default Genre;
