import express from "express";
import {
  likeSong,
  unlikeSong,
  getLikedSongsByUser,
} from "../controllers/likedSongController.js";

const router = express.Router();

// Like a song
router.post("/", likeSong);

// Get all liked songs from a user
router.get("/:user_id", getLikedSongsByUser);

// Unlike a song
router.delete("/:user_id/:song_id", unlikeSong);

export default router;
