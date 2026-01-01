import express from "express";
import {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  getSongsByName,
  getSongsByCategoryId
} from "../controllers/songController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

//search by categoryID
router.get("/category/:id",getSongsByCategoryId)

// Search by title
router.get("/search", getSongsByName);

// POST: upload audio + cover
router.post(
  "/",
  upload.fields([
    { name: "file_audio", maxCount: 1 },
    { name: "cover_image", maxCount: 1 }
  ]),
  createSong
);

// CRUD lainnya
router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);
export default router;
