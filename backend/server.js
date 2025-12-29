import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./src/config/db.js";

// import routes
import userRoutes from "./src/routes/userRoutes.js";
import songRoutes from "./src/routes/songRoutes.js";
import playlistRoutes from "./src/routes/playlistRoutes.js";
import playlistSongRoutes from "./src/routes/playlistSongRoutes.js";
import likedSongRoutes from "./src/routes/likedSongRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import listeningHistoryRoutes from "./src/routes/listeningHistoryRoutes.js";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
import artistRoutes from "./src/routes/artistRoutes.js";
import genreRoutes from "./src/routes/genreRoutes.js";
import albumRoutes from "./src/routes/albumRoutes.js";
import "./src/models/index.js";

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


// mounting routes
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/playlist-songs", playlistSongRoutes);
app.use("/api/liked-songs", likedSongRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/listening-history", listeningHistoryRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/albums", albumRoutes);