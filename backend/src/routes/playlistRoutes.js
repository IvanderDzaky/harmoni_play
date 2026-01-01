// src/routes/playlistRoutes.js
import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getAllPlaylistByUser,
  getUserPlaylistsContainingSong,
} from "../controllers/playlistController.js";

const router = express.Router();
router.get("/song/:songId", authenticateToken, getUserPlaylistsContainingSong);
router.get("/user/me", authenticateToken, getAllPlaylistByUser);
router.get("/:id", getPlaylistById);


//CRUD
router.post("/", authenticateToken, createPlaylist);
router.get("/", getAllPlaylists);
router.put("/:id", authenticateToken, updatePlaylist);
router.delete("/:id", authenticateToken, deletePlaylist);

export default router;
