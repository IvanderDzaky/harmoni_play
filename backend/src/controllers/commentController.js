import Comment from "../models/Comment.js";
import User from "../models/User.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { song_id, content } = req.body;
    const user_id = req.user.user_id; // ambil dari token

    const comment = await Comment.create({
      song_id,
      user_id,
      content,
    });

    // ambil info name user untuk response
    const newComment = await Comment.findByPk(comment.comment_id, {
      include: [{ model: User, as: "User", attributes: ["name"] }],
    });

    res.status(201).json({
      message: "Comment created",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      order: [["created_at", "DESC"]],
      include: [{ model: User, as: "User", attributes: ["name"] }],
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get comments by song
export const getCommentsBySong = async (req, res) => {
  try {
    const song_id = req.params.song_id;

    const comments = await Comment.findAll({
      where: { song_id },
      order: [["created_at", "DESC"]],
      include: [{ model: User, as: "User", attributes: ["name"] }],
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await comment.update({ content: req.body.content });

    res.json({
      message: "Comment updated",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user_id !== req.user.user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await comment.destroy();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
