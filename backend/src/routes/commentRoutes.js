import express from "express";
import {
  createComment,
  getAllComments,
  getCommentsBySong,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js"; // <- pakai export yang benar

const router = express.Router();

// Create a comment (harus login)
router.post("/", authenticateToken, createComment);

// Get all comments (semua user)
router.get("/", getAllComments);

// Get comments by song
router.get("/:song_id", getCommentsBySong);

// Update a comment (harus login)
router.put("/:comment_id", authenticateToken, updateComment);

// Delete a comment (harus login)
router.delete("/:comment_id", authenticateToken, deleteComment);

export default router;
