import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
import PlaylistModal from "../components/layout/PlaylistModal";

import { getSongById } from "../services/songsService";
import { getAllPlayListByUser } from "../services/playlistService";
import { addSongToPlaylist } from "../services/playlistSongService";

import { usePlayer } from "../contexts/PlayerContext";

import "../styles/SongDetail.css";
import "../styles/loader.css";

export default function SongDetail() {
  const { id } = useParams();
  const { playSong } = usePlayer();

  const [song, setSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await getSongById(id);
        setSong(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  const openModal = async () => {
    try {
      const data = await getAllPlayListByUser();
      setPlaylists(data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => setShowModal(false);

  const handleAddToPlaylist = async (playlist_id) => {
    try {
      await addSongToPlaylist({
        song_id: song.song_id,
        playlist_id,
      });
      alert("Lagu berhasil ditambahkan");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan lagu");
    }
  };

  if (loading) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  if (!song) {
    return <p>Song not found</p>;
  }

  return (
    <>
      <div className="song-detail">
        <div className="song-header">
          <img
            src={
              song.cover_image?.startsWith("http")
                ? song.cover_image
                : "/default-cover.png"
            }
            alt={song.title}
            className="song-cover"
          />

          <div className="song-info">
            <h1>{song.title}</h1>
            <p>
              {song.artist_name || "-"} • {song.album_name || "-"}
            </p>

            <div className="song-actions">
              <button
                className="play-btn"
                onClick={() => playSong(song)}
              >
                ▶️ Play
              </button>

              <button className="add-btn" onClick={openModal}>
                ＋
              </button>

              <button className="download-btn">⬇️</button>
            </div>
          </div>
        </div>

        <div className="song-lyrics">
          <h2>Lyrics</h2>
          {song.lyrics ? (
            song.lyrics.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))
          ) : (
            <p>No lyrics available</p>
          )}
        </div>
      </div>

      {/* MODAL PLAYLIST */}
      <PlaylistModal
        isOpen={showModal}
        playlists={playlists}
        onClose={closeModal}
        onSelect={handleAddToPlaylist}
      />
    </>
  );
}
