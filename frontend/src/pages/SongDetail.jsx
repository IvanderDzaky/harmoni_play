import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/layout/Loader";
import PlaylistModal from "../components/layout/PlaylistModal";

import { getSongById } from "../services/songsService";
import { getAllPlayListByUser } from "../services/playlistService";
import { addSongToPlaylist, getPlaylistsContainingSong } from "../services/playlistSongService";
import { createComments, getAllComments } from "../services/commentService";
import { usePlayer } from "../contexts/PlayerContext";

import "../styles/SongDetail.css";
import "../styles/loader.css";

export default function SongDetail() {
  const { id } = useParams(); // song_id
  const { playSong } = usePlayer();

  const [song, setSong] = useState(null);
  const [playlists, setPlaylists] = useState([]); // playlist user yang bisa ditambahkan lagu
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

        const userPlaylists = await getAllPlayListByUser(); // semua playlist user
        const existingPlaylistIds = await getPlaylistsContainingSong(id); // array of playlist_id

        // filter playlist yang belum ada lagu ini
        const availablePlaylists = userPlaylists.filter(
          (p) => !existingPlaylistIds.includes(p.playlist_id)
        );

        setPlaylists(availablePlaylists);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Ambil komentar untuk lagu ini
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const allComments = await getAllComments();
        const songComments = allComments.filter(c => c.song_id === id);
        setComments(songComments);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [id]);

  // Tambah komentar
  const handleAddComment = async () => {
    if (commentText.trim() === "") return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      const newComment = await createComments(id, user.user_id, commentText);
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

  // Tambah lagu ke playlist
  const handleAddToPlaylist = async (playlist_id) => {
    try {
      await addSongToPlaylist({ song_id: song.song_id, playlist_id });
      alert("Lagu berhasil ditambahkan");
      closeModal();

      // update state: hapus playlist yang sudah ditambahkan
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
              <button className="play-btn" onClick={() => playSong(song)}>▶️ Play</button>

              {/* Tombol add hanya muncul jika ada playlist yang bisa ditambahkan */}
              {playlists.length > 0 && (
                <button className="add-btn" onClick={openModal}>＋</button>
              )}

              <button className="download-btn">⬇️</button>
              <button className="comment-btn" onClick={() => setShowComment(prev => !prev)}>💬 Comment</button>
            </div>
          </div>
        </div>

        <div className="song-lyrics">
          <h2>Lyrics</h2>
          {song.lyrics ? song.lyrics.split("\n").map((line, i) => <p key={i}>{line}</p>) : <p>No lyrics available</p>}
        </div>

        {/* Komentar */}
        {showComment && (
          <div className="comments-section">
            <h3>Comments</h3>
            <div className="add-comment">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button onClick={handleAddComment}>Send</button>
            </div>
            <div className="comments-list">
              {comments.length === 0 ? <p>No comments yet.</p> : comments.map((c, i) => <p key={i}>{c.content || c}</p>)}
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
