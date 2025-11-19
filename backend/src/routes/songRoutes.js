import express from "express";
import {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";

const router = express.Router();

// CRUD
router.post("/", createSong);
router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;
