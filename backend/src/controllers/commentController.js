import Comment from "../models/Comment.js";
import User from "../models/User.js";

// ==============================
// Create a new comment
// ==============================
export const createComment = async (req, res) => {
  try {
    const { song_id, content } = req.body;
    const user_id = req.user.user_id; // dari token

    if (!song_id || !content) {
      return res.status(400).json({ message: "song_id dan content wajib diisi" });
    }

    const comment = await Comment.create({
      song_id,
      user_id,
      content,
    });

    // ambil info user name untuk response
    const newComment = await Comment.findByPk(comment.comment_id, {
      include: [{ model: User, as: "user", attributes: ["name"] }],
    });

    res.status(201).json({
      message: "Comment created",
      data: newComment,
    });
  } catch (error) {
    console.error("createComment error:", error);
    res.status(500).json({ message: "Gagal membuat comment", error: error.message });
  }
};

// ==============================
// Get all comments
// ==============================
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      order: [["created_at", "DESC"]],
      include: [{ model: User, as: "user", attributes: ["name"] }],
    });

    res.json(comments);
  } catch (error) {
    console.error("getAllComments error:", error);
    res.status(500).json({ message: "Gagal fetch comments", error: error.message });
  }
};

// ==============================
// Get comment by ID
// ==============================
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.comment_id, {
      include: [{ model: User, as: "user", attributes: ["name"] }],
    });

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.json(comment);
  } catch (error) {
    console.error("getCommentById error:", error);
    res.status(500).json({ message: "Gagal fetch comment", error: error.message });
  }
};

// ==============================
// Get comments by song
// ==============================
export const getCommentsBySong = async (req, res) => {
  try {
    const song_id = req.params.song_id;

    const comments = await Comment.findAll({
      where: { song_id },
      order: [["created_at", "DESC"]],
      include: [{ model: User, as: "user", attributes: ["name"] }],
    });

    res.json(comments);
  } catch (error) {
    console.error("getCommentsBySong error:", error);
    res.status(500).json({ message: "Gagal fetch comments lagu", error: error.message });
  }
};

// ==============================
// Update a comment
// ==============================
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Forbidden: bukan pemilik comment" });
    }

    await comment.update({ content: req.body.content });

    const updatedComment = await Comment.findByPk(comment.comment_id, {
      include: [{ model: User, as: "user", attributes: ["name"] }],
    });

    res.json({
      message: "Comment updated",
      data: updatedComment,
    });
  } catch (error) {
    console.error("updateComment error:", error);
    res.status(500).json({ message: "Gagal update comment", error: error.message });
  }
};

// ==============================
// Delete a comment
// ==============================
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Forbidden: bukan pemilik comment" });
    }

    await comment.destroy();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("deleteComment error:", error);
    res.status(500).json({ message: "Gagal hapus comment", error: error.message });
  }
};
