import express from "express";
import {
  addHistory,
  getHistoryByUser,
  getRecentHistory,
  deleteHistory,
} from "../controllers/listeningHistoryController.js";

const router = express.Router();

// Add history
router.post("/", addHistory);

// Get all history for a user
router.get("/:user_id", getHistoryByUser);

// Get most recent listening history for a user
router.get("/:user_id/recent", getRecentHistory);

// Delete a specific history entry
router.delete("/:id", deleteHistory);

export default router;
