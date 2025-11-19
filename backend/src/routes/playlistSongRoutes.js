import express from "express";
import {
  addSongToPlaylist,
  getSongsInPlaylist,
  removeSongFromPlaylist,
} from "../controllers/playlistSongController.js";

const router = express.Router();

// Add song to a playlist
router.post("/", addSongToPlaylist);

// Get all songs in a playlist
router.get("/:playlist_id", getSongsInPlaylist);

// Remove song from playlist
router.delete("/:playlist_id/:song_id", removeSongFromPlaylist);

export default router;
