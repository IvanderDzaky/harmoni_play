import React from "react";
import {useEffect,useState} from "react";
import { getAllPlaylistSongs } from "../../services/playlistSongService";
import { useParams, useSearchParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Loader from "./Loader";
import "../../styles/loader.css"
import "../../styles/playlist.css"


export default function PlaylistDetail() {
  const {id} = useParams();
  const [searchParams] = useSearchParams()

  const name = searchParams.get("name")
  const description = searchParams.get("description")

  const [playlistsongs, setPlaylistSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPlaylistSongs = async () => {
    const data = await getAllPlaylistSongs({ id });
    setPlaylistSongs(data || []); // aman, kalau fetch gagal tetap array
    setLoading(false);
  };
  fetchPlaylistSongs();
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
  if (!playlistsongs) return <div>Error loading playlist</div>;
  return (
    <DashboardLayout>
      <div className="playlist-page">
        <div className="playlist-content">
          <div className="playlist-cover">
            <img src="images/playlist-cover.png" alt="" />
          </div>
          <div className="playlist-info">
            <div className="playlist-public">PUBLIC PLAYLIST</div>
            <div className="playlist-title">{name || "Playlist Title"}</div>
            <div className="playlist-description">{description || "Playlist description"}</div>
            <div style={{ height: "10px" }}></div>
            <div className="playlist-stats">
              <img src="/default-cover.png" width="24px" height="24px" alt="" />
              <span> Spotify ·</span>
              <span>{playlistsongs.length} songs · </span>
            </div>
          </div>
        </div>

        <div className="playlist-songs-container">
          {/* Buttons tetap sama */}
          <div className="playlist-songs">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>Date Added</th>
                  <th>
                    <img src="assets/Duration.svg" alt="" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {playlistsongs?.map((song, index) => (
                  <tr key={song.id || index}>
                    <td>{index + 1}</td>
                    <td className="song-title">
                      <div className="song-image">
                        <img src={song.cover || "images/song-cover.jpeg"} alt="" />
                      </div>
                      <div className="song-name-album">
                        <div className="song-name">{song.title}</div>
                        <div className="song-artist">{song.artist}</div>
                      </div>
                    </td>
                    <td className="song-album">{song.album}</td>
                    <td className="song-date-added">{song.dateAdded}</td>
                    <td className="song-duration">{song.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
