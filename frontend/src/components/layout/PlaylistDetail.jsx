import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
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
      <DashboardLayout>
        <div className="loader-overlay">
          <Loader />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="playlist-page">
        <div className="playlist-content">
          <div className="playlist-cover">
            <img src="/images/playlist-cover.png" alt="" />
          </div>

          <div className="playlist-info">
            <div className="playlist-public">PUBLIC PLAYLIST</div>
            <div className="playlist-title">{name}</div>
            <div className="playlist-description">{description}</div>
            <div className="playlist-stats">
              <span>{songs.length} songs</span>
            </div>
          </div>
        </div>

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
                  {new Date(song.dateAdded).toLocaleDateString("id-ID")}
                </td>

                <td>{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
