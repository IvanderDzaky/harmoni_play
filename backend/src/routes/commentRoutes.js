import express from "express";
import {
  createComment,
  getCommentsBySong,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Create comment
router.post("/", createComment);

// Get comments for a song
router.get("/:song_id", getCommentsBySong);

// Update comment
router.put("/:comment_id", updateComment);

// Delete comment
router.delete("/:comment_id", deleteComment);

export default router;
