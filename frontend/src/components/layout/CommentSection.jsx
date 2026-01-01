import { useState, useEffect } from "react";
import { createComment, getCommentsBySong } from "../../services/commentService";

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

export default function CommentSection({ songId, visible }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!visible) return;

    const fetchComments = async () => {
      try {
        const data = await getCommentsBySong(songId);
        setComments(data || []);
      } catch (err) {
        console.error(err);
        setComments([]);
      }
    };

    fetchComments();
  }, [songId, visible]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      const newComment = await createComment(songId, commentText);
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

  if (!visible) return null;

  return (
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
  );
}
