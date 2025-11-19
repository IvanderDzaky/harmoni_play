import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { song_id, user_id, content } = req.body;

    const comment = await Comment.create({
      song_id,
      user_id,
      content,
    });

    res.status(201).json({
      message: "Comment created",
      data: comment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsBySong = async (req, res) => {
  try {
    const song_id = req.params.song_id;

    const comments = await Comment.findAll({
      where: { song_id },
      order: [["created_at", "DESC"]],
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
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

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.comment_id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await comment.destroy();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
