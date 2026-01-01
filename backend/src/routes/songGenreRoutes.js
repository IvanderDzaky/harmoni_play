import express from "express";
import { addGenreToSong } from "../controllers/songGenreController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, addGenreToSong);

export default router;
