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

  const { playSong } = usePlayer();

  useEffect(() => {
    if (!query?.trim()) {
      setSongs([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchSongs = async () => {
      try {
        const result = await getSongsByName(query);
        setSongs(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [query]);

  const topResult = songs[0] || null;

  if (loading) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  if (!songs.length) {
    return (
      <div className="searchlist-empty">
        <p>Songs Not Found</p>
      </div>
    );
  }

  return (
    <div className="searchlist-page">
      <div className="searchlist-grid">
        {/* TOP RESULT */}
        <div>
          <h3 className="section-title">Top Result</h3>

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
                  <div className="song-text">
                    <p className="song-title">{song.title}</p>
                    {song.artist_name && (
                      <p className="song-artist">{song.artist_name}</p>
                    )}
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
