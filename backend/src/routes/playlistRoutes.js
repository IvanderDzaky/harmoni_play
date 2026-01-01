// src/routes/playlistRoutes.js
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getPlaylistsByUserId,
  getUserPlaylistsContainingSong,
} from "../controllers/playlistController.js";

const router = express.Router();

router.post("/", authenticateToken, createPlaylist);
router.get("/user/me", authenticateToken, getPlaylistsByUserId);
router.get("/song/:songId", authenticateToken, getUserPlaylistsContainingSong);

router.get("/", getAllPlaylists);
router.get("/:id", getPlaylistById);

router.put("/:id", authenticateToken, updatePlaylist);
router.delete("/:id", authenticateToken, deletePlaylist);

export default router;
