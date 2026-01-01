import express from "express";
import {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
  ajukanMusisi,
  verifyArtist,
  getArtistRequests, // ⬅️ TAMBAHAN
} from "../controllers/artistController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// ================= ADMIN =================
router.get("/requests", authenticateToken, getArtistRequests);

router.put("/verify/:artist_id", authenticateToken, verifyArtist);

// ================= PUBLIC =================
router.get("/", getAllArtists);
router.get("/:id", getArtistById); // harus di bawah semua route spesifik

// ================= ADMIN CRUD ARTIST =================
// (sebaiknya nanti ditambah middleware verifyAdmin)
router.post("/", authenticateToken, createArtist);
router.put("/:id", authenticateToken, updateArtist);
router.delete("/:id", authenticateToken, deleteArtist);

// ================= USER AJUKAN MUSISI =================
router.post(
  "/ajukan",
  authenticateToken,
  upload.single("photo"),
  ajukanMusisi
);

export default router;
