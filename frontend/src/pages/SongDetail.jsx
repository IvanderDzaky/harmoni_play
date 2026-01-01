import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
import PlaylistModal from "../components/layout/PlaylistModal";

import { getSongById } from "../services/songsService";
import { getAllPlayListByUser, getPlaylistsContainingSong } from "../services/playlistService";
import { addSongToPlaylist } from "../services/playlistSongService";
import { createComment, getCommentsBySong } from "../services/commentService";
import { usePlayer } from "../contexts/PlayerContext";

import "../styles/SongDetail.css";
import "../styles/loader.css";

// Fungsi format "time ago"
const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

export default function SongDetail() {
  const { id } = useParams();
  const { playSong } = usePlayer();

  const [song, setSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
  };

  // Ambil data lagu + playlist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const songData = await getSongById(id);
        setSong(songData);

        const userPlaylists = await getAllPlayListByUser();
        const existingPlaylistIds = await getPlaylistsContainingSong(id);

        const availablePlaylists = userPlaylists
          .filter((p) => !existingPlaylistIds.includes(p.playlist_id))
          .filter((p, i, arr) => arr.findIndex((x) => x.playlist_id === p.playlist_id) === i);

        setPlaylists(availablePlaylists);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Ambil komentar
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const songComments = await getCommentsBySong(id);
        setComments(songComments || []);
      } catch (err) {
        console.error(err);
        setComments([]);
      }
    };
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      showNotification("User tidak ditemukan. Silakan login ulang.", "error");
      return;
    }
    try {
      const newComment = await createComment(id, commentText);
      if (newComment) {
        setComments((prev) => [...prev, newComment]);
        setCommentText("");
        showNotification("💬 Komentar berhasil ditambahkan!");
      } else showNotification("❌ Gagal menambahkan komentar", "error");
    } catch (err) {
      console.error(err);
      showNotification("❌ Terjadi error saat menambahkan komentar", "error");
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleAddToPlaylist = async (playlist_id) => {
    try {
      await addSongToPlaylist({ song_id: song.song_id, playlist_id });
      showNotification("🎵 Lagu berhasil ditambahkan!");
      closeModal();
      setPlaylists((prev) => prev.filter((p) => p.playlist_id !== playlist_id));
    } catch (err) {
      console.error(err);
      showNotification("❌ Gagal menambahkan lagu", "error");
    }
  };

  if (loading) return <div className="loader-overlay"><Loader /></div>;
  if (!song) return <p>Song not found</p>;

  return (
    <>
      <div className="song-detail">
        {/* Header */}
        <div className="song-header">
          <div className="song-cover-large-wrapper">
            {song.cover_image ? (
              <img src={song.cover_image} alt={song.title} className="song-cover-large" />
            ) : (
              <div className="placeholder-large">No Cover</div>
            )}
          </div>
          <div className="song-info">
            <h1>{song.title}</h1>
            <p>{song.artist_name || "-"} • {song.album_name || "-"}</p>

            <div className="song-actions">
              {playlists.length > 0 && <button onClick={openModal}>＋</button>}
              <button>⬇️</button>
              <button onClick={() => setShowComment(prev => !prev)}>💬 Comment</button>
            </div>
          </div>
        </div>

        {/* Lyrics */}
        <div className="song-lyrics">
          <h2>Lyrics</h2>
          {song.lyrics
            ? song.lyrics.split("\n").map((line, i) => <p key={i}>{line}</p>)
            : <p>No lyrics available</p>}
        </div>

        {/* Comments */}
        {showComment && (
          <div className="comments-section">
            <h3>Comments</h3>
            <div className="add-comment">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button onClick={handleAddComment}>Send</button>
            </div>
            <div className="comments-list">
              {comments.length === 0
                ? <p>No comments yet.</p>
                : comments.map((c) => (
                  <div className="comment-item" key={c.comment_id}>
                    <div className="comment-header">
                      <strong>{c.user ? c.user.name : "Unknown"}</strong>
                      <span className="comment-time">{timeAgo(c.created_at)}</span>
                    </div>
                    <p>{c.content}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Playlist Modal */}
      <PlaylistModal
        isOpen={showModal}
        playlists={playlists}
        onClose={closeModal}
        onSelect={handleAddToPlaylist}
      />

      {/* Notifications */}
      <div className="notification-stack">
        {notifications.map((n) => (
          <div key={n.id} className={`notification ${n.type}`}>
            {n.message}
          </div>
        ))}
      </div>
    </>
  );
}
