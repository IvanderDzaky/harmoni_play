import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./src/config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route uji koneksi
app.get("/", (req, res) => {
  res.json({ message: "🎵 Harmoni Play API connected to Supabase!" });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
