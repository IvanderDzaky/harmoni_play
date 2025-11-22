import User from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator"; // untuk validasi email
import jwt from "jsonwebtoken";

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

    // --- VALIDASI ROLE ---
    const allowedRoles = ["admin", "reguler"];
    const userRole = role || "reguler";

    if (!allowedRoles.includes(userRole))
      return res.status(400).json({ message: "Invalid role. Allowed: admin, reguler" });

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
      role: userRole,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
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

      // Cek apakah email sudah digunakan user lain
      const duplicate = await User.findOne({ where: { email } });
      if (duplicate && duplicate.user_id !== user.user_id)
        return res
          .status(409)
          .json({ message: "Email already registered by another user" });
    }

    // --- VALIDASI PASSWORD JIKA DIUPDATE ---
    let hashedPassword = user.password;
    if (password) {
      if (password.length < 6)
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });

      hashedPassword = await bcrypt.hash(password, 10);
    }

    // --- VALIDASI ROLE JIKA DIUPDATE ---
    const allowedRoles = ["admin", "reguler"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Allowed roles: admin, reguler",
      });
    }

    // --- UPDATE DATA ---
    await user.update({
      name: name ?? user.name,
      email: email ?? user.email,
      role: role ?? user.role,
      password: hashedPassword,
    });

    res.json({
      message: "User updated successfully",
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
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

    if (user.role === "admin")
      return res.status(403).json({ message: "Admin accounts cannot be deleted" });

    await user.destroy();

    res.json({
      message: "User deleted successfully",
      deleted_user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err.message,
    });
  }
};


// ===== REGISTER =====
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // --- VALIDASI FIELD WAJIB ---
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Name, email, and password are required",
      });
    }

    // --- VALIDASI FORMAT EMAIL ---
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email format",
      });
    }

    // --- VALIDASI PASSWORD MINIMAL ---
    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 6 characters",
      });
    }

    // --- CEK EMAIL SUDAH ADA ---
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email already registered",
      });
    }

    // --- HASH PASSWORD ---
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- SIMPAN USER ---
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "reguler",
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error registering user",
      error: err.message,
    });
  }
};

// ===== LOGIN =====
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- VALIDASI INPUT ---
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    // --- CEK USER ADA ---
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // --- CEK PASSWORD BENAR ---
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // --- GENERATE TOKEN ---
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      status: "success",
      message: "Login successful",
      token,
      data: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error logging in",
      error: err.message,
    });
  }
};

// -------------------- GET USER PROFILE --------------------
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};
