import express from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
} from "../controllers/userController.js";

import { validateRegister, validateLogin } from "../middleware/validateAuth.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", authenticateToken, getProfile);

// CRUD user (opsional)
router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUserById);
router.post("/", authenticateToken, createUser);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
