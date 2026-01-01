import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { getAllPlaylistSongs } from "../../services/playlistSongService";
import { usePlayer } from "../../contexts/PlayerContext";

import "../../styles/playlist.css";
import "../../styles/loader.css";

export default function PlaylistDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "Playlist";
  const description = searchParams.get("description") || "";

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { playSong, currentSong } = usePlayer();

  useEffect(() => {
    if (!id) {
      console.error("Playlist ID not found in URL");
      setLoading(false);
      return;
    }

    const fetchSongs = async () => {
      try {
        const data = await getAllPlaylistSongs(id);

        // Filter duplikat dan hapus undefined song_id
        const uniqueSongs = Array.from(
          new Map(
            data
              .filter((s) => s.song_id !== undefined && s.song_id !== null)
              .map((song) => [song.song_id, song])
          ).values()
        );

        setSongs(uniqueSongs);
      } catch (err) {
        console.error("Error fetching playlist songs:", err);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

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
    <div className="playlist-page">
      {/* HEADER */}
      <div className="playlist-header">
        <div className="playlist-info">
          <span className="playlist-public">PUBLIC PLAYLIST</span>
          <h1 className="playlist-title">{name}</h1>
          <p className="playlist-description">{description}</p>
          <span className="playlist-stats">{songs.length} songs</span>
        </div>
      </div>

      {/* SONG TABLE */}
      <table className="playlist-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {songs.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                No songs in this playlist.
              </td>
            </tr>
          ) : (
            songs.map((song, index) => (
              <tr
                key={song.song_id || index}
                className={currentSong?.song_id === song.song_id ? "playing" : ""}
                onClick={() => playSong(song)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{song.title || "-"}</td>
                <td>{song.artist || "-"}</td>
                <td>{song.album || "-"}</td>
                <td>
                  {song.added_at
                    ? new Date(song.added_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </td>
                <td>{song.duration || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
