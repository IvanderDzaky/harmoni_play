import express from "express";
import {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
  ajukanMusisi,
  verifyArtist,
} from "../controllers/artistController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Routes umum
router.get("/", getAllArtists);
router.get("/:id", getArtistById);
router.post("/", createArtist); // admin create artist langsung
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);

// Route khusus ajukan musisi oleh user
router.post(
  "/ajukan",
  authenticateToken,
  upload.single("photo"), // ⬅️ WAJIB
  ajukanMusisi
);

// Admin verifikasi artist
router.put("/verify/:artist_id", authenticateToken, verifyArtist);

export default router;
