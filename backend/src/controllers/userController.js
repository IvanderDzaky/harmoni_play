import User from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator"; // untuk validasi email

// -------------------- GET ALL USERS --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      error: err.message,
    });
  }
};

// -------------------- GET USER BY ID --------------------
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user",
      error: err.message,
    });
  }
};

// -------------------- CREATE USER --------------------
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // --- VALIDASI INPUT ---
    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email, and password are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    // --- CEK EMAIL SUDAH ADA? ---
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(409).json({ message: "Email already registered" });

    // --- HASH PASSWORD ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- CREATE USER ---
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};

// -------------------- UPDATE USER --------------------
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // --- VALIDASI EMAIL JIKA DIUPDATE ---
    if (email) {
      if (!validator.isEmail(email))
        return res.status(400).json({ message: "Invalid email format" });

      // Cek email tidak digunakan user lain
      const duplicate = await User.findOne({ where: { email } });
      if (duplicate && duplicate.id !== user.id)
        return res.status(409).json({ message: "Email already registered by another user" });
    }

    // --- VALIDASI PASSWORD JIKA DIUPDATE ---
    let hashedPassword = user.password;
    if (password) {
      if (password.length < 6)
        return res.status(400).json({ message: "Password must be at least 6 characters" });

      hashedPassword = await bcrypt.hash(password, 10);
    }

    // --- UPDATE DATA ---
    await user.update({
      name,
      email,
      role,
      password: hashedPassword,
    });

    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user",
      error: err.message,
    });
  }
};

// -------------------- DELETE USER --------------------
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    await user.destroy();

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err.message,
    });
  }
};
