import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSongsByName } from "../services/songsService";
import Loader from "../components/layout/Loader";
import "../styles/SearchList.css";
import "../styles/loader.css";
import { usePlayer } from "../contexts/PlayerContext";

const SearchList = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { playSong } = usePlayer(); // 🔥 global player

  useEffect(() => {
    if (!query || !query.trim()) {
      setSongs([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchSongsByName = async () => {
      try {
        const result = await getSongsByName(query);
        setSongs(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongsByName();
  }, [query]);

  const topResult = songs.length > 0 ? songs[0] : null;

  if (loading) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Songs Not Found</p>
      </div>
    );
  }

  return (
    <div className="searchlist-page">
      <div className="searchlist-grid">
        {/* TOP RESULT */}
        <div>
          <h3 className="section-title">Top result</h3>

          {topResult && (
            <div className="top-result-card">
              <img
                src={
                  topResult.cover_image?.startsWith("http")
                    ? topResult.cover_image
                    : "/default-cover.png"
                }
                alt={topResult.title}
              />
              <h2>{topResult.title}</h2>

              <button
                className="play-btn"
                onClick={() => playSong(topResult)}
              >
                ▶
              </button>
            </div>
          )}
        </div>

        {/* SONG LIST */}
        <div>
          <h3 className="section-title">Songs</h3>

          <div className="song-list">
            {songs.map((song) => (
              <div
                key={song.song_id}
                className="song-item"
                onClick={() => playSong(song)}
              >
                <div className="song-info">
                  <img
                    src={
                      song.cover_image?.startsWith("http")
                        ? song.cover_image
                        : "/default-cover.png"
                    }
                    alt={song.title}
                  />
                  <div>
                    <p className="song-title">{song.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
