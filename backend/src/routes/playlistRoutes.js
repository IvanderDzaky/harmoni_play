import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getPlaylistsByUserId,
  getUserPlaylistsContainingSong
} from "../controllers/playlistController.js";

const router = express.Router();

router.get(
  "/user/me",
  authenticateToken,
  getPlaylistsByUserId,
  getUserPlaylistsContainingSong
);

router.post("/", authenticateToken, createPlaylist);

router.get("/", getAllPlaylists);
router.get("/:id", getPlaylistById);
router.put("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);
router.get("/song/:songId", authenticateToken, getUserPlaylistsContainingSong)

export default router;
