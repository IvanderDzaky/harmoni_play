import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../layout/Loader";

import { getAllPlaylistSongs } from "../../services/playlistSongService";

import "../../styles/playlist.css";
import "../../styles/loader.css";

export default function PlaylistDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");
  const description = searchParams.get("description") || "";

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllPlaylistSongs(id);
        setSongs(data);
      } catch (err) {
        console.error(err);
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

      {/* TABLE */}
      <table className="playlist-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th>Date Added</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song, index) => (
            <tr key={song.song_id}>
              <td>{index + 1}</td>

              <td className="song-title">
                <img
                  src={song.cover_image || "/default-cover.png"}
                  alt=""
                  className="song-cover"
                />
                <div>
                  <div className="song-name">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
              </td>

              <td>{song.album}</td>
              <td>
                {song.added_at
                  ? new Date(song.added_at).toLocaleDateString("id-ID")
                  : "-"}
              </td>
              <td>{song.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
