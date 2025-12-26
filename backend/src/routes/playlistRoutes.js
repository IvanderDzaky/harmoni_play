import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";

import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getPlaylistsByUserId
} from "../controllers/playlistController.js";

const router = express.Router();

router.get(
  "/user/me",
  authenticateToken,
  getPlaylistsByUserId
);

router.post("/", authenticateToken, createPlaylist);

router.get("/", getAllPlaylists);
router.get("/:id", getPlaylistById);
router.put("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);


export default router;
