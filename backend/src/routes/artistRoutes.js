import express from "express";
import {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
  ajukanMusisi,
  verifyArtist,
  getArtistRequests,
  getMySongs,
  getMyArtist
} from "../controllers/artistController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// ================= MY ARTIST =================
router.get("/my-artist", authenticateToken, getMyArtist);

// ================= USER =================
router.get("/my-songs", authenticateToken, getMySongs);
router.post("/ajukan", authenticateToken, upload.single("photo"), ajukanMusisi);

// ================= ADMIN =================
router.get("/requests", authenticateToken, getArtistRequests);
router.put("/verify/:artist_id", authenticateToken, verifyArtist);

// ================= CRUD ARTIST =================
router.post("/", authenticateToken, createArtist);
router.put("/:id", authenticateToken, updateArtist);
router.delete("/:id", authenticateToken, deleteArtist);

// ================= PUBLIC =================
router.get("/", getAllArtists);
router.get("/:id", getArtistById); // HARUS terakhir



export default router;
