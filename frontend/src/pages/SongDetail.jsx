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
  const diff = Math.floor((now - date) / 1000); // detik

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff/60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)} hours ago`;
  return `${Math.floor(diff/86400)} days ago`;
};

export default function SongDetail() {
  const { id } = useParams(); // song_id
  const { playSong } = usePlayer();

  const [song, setSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // Ambil data lagu + playlist user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const songData = await getSongById(id);
        setSong(songData);

        const userPlaylists = await getAllPlayListByUser();
        const existingPlaylistIds = await getPlaylistsContainingSong(id);

        const availablePlaylists = userPlaylists
          .filter((p) => !existingPlaylistIds.includes(p.playlist_id))
          .filter((p, i, arr) => arr.findIndex(x => x.playlist_id === p.playlist_id) === i);

        setPlaylists(availablePlaylists);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Ambil komentar per lagu
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

  // Tambah komentar
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      const newComment = await createComment(id, commentText);
      if (newComment) {
        setComments(prev => [...prev, newComment]);
        setCommentText("");
      } else {
        alert("Gagal menambahkan komentar");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi error saat menambahkan komentar");
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleAddToPlaylist = async (playlist_id) => {
    try {
      await addSongToPlaylist({ song_id: song.song_id, playlist_id });
      alert("Lagu berhasil ditambahkan");
      closeModal();
      setPlaylists(prev => prev.filter(p => p.playlist_id !== playlist_id));
    } catch (err) {
      alert("Gagal menambahkan lagu: " + err.message);
    }
  };

  if (loading) return <div className="loader-overlay"><Loader /></div>;
  if (!song) return <p>Song not found</p>;

  return (
    <>
      <div className="song-detail">
        <div className="song-header">
          <img
            src={song.cover_image?.startsWith("http") ? song.cover_image : "/default-cover.png"}
            alt={song.title}
            className="song-cover"
          />
          <div className="song-info">
            <h1>{song.title}</h1>
            <p>{song.artist_name || "-"} • {song.album_name || "-"}</p>

            <div className="song-actions">
              {playlists.length > 0 && <button className="add-btn" onClick={openModal}>＋</button>}
              <button className="download-btn">⬇️</button>
              <button className="comment-btn" onClick={() => setShowComment(prev => !prev)}>💬 Comment</button>
            </div>
          </div>
        </div>

        <div className="song-lyrics">
          <h2>Lyrics</h2>
          {song.lyrics 
            ? song.lyrics.split("\n").map((line, i) => <p key={`lyric-${i}`}>{line}</p>) 
            : <p>No lyrics available</p>
          }
        </div>

        {/* Komentar */}
        {showComment && (
          <div className="comments-section">
            <h3>Comments</h3>

            {/* Form tambah komentar */}
            <div className="add-comment">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button onClick={handleAddComment}>Send</button>
            </div>

            {/* Daftar komentar */}
            <div className="comments-list">
              {comments.length === 0 
                ? <p>No comments yet.</p> 
                : comments.map(c => (
                  <div className="comment-item" key={`comment-${c.comment_id}`}>
                    <div className="comment-header">
                      <strong>{c.User ? c.User.name : "Unknown"}</strong>
                      <span className="comment-time">{timeAgo(c.created_at)}</span>
                    </div>
                    <p className="comment-content">{c.content}</p>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>

      <PlaylistModal
        isOpen={showModal}
        playlists={playlists}
        onClose={closeModal}
        onSelect={handleAddToPlaylist}
      />
    </>
  );
}
