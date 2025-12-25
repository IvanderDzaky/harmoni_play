import express from "express";
import {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongsByName
} from "../controllers/songController.js";

const router = express.Router();

router.get("/search", getSongsByName);
// CRUD
router.post("/", createSong);
router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;
