import { Playlist, Song } from "../models/index.js";

// CREATE PLAYLIST
export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    const playlist = await Playlist.create({
      name,
      description,
      created_by: req.user.user_id,
    });

    res.status(201).json({
      message: "Playlist created successfully",
      data: playlist,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ message: "Gagal membuat playlist", error: error.message });
  }
};

// GET ALL PLAYLISTS
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      include: [{ model: Song, through: { attributes: [] } }],
    });
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ message: "Gagal fetch playlist", error: error.message });
  }
};

// GET PLAYLIST BY ID
export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [{ model: Song, through: { attributes: [] } }],
    });

    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    res.json(playlist);
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ message: "Gagal fetch playlist", error: error.message });
  }
};

// UPDATE PLAYLIST
export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);

    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    await playlist.update(req.body);

    res.json({
      message: "Playlist updated successfully",
      data: playlist,
    });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({ message: "Gagal update playlist", error: error.message });
  }
};

// DELETE PLAYLIST
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);

    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    await playlist.destroy();

    res.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ message: "Gagal hapus playlist", error: error.message });
  }
};

// GET PLAYLISTS BY USER ID
export const getPlaylistsByUserId = async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: { created_by: req.user.user_id },
      include: [{ model: Song, through: { attributes: [] } }],
    });

    res.json(playlists);
  } catch (error) {
    console.error("Error fetching user's playlists:", error);
    res.status(500).json({ message: "Gagal fetch playlist user", error: error.message });
  }
};

// ✅ GET USER'S PLAYLISTS THAT CONTAIN A SPECIFIC SONG
export const getUserPlaylistsContainingSong = async (req, res) => {
  try {
    const { songId } = req.params;

    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const playlists = await Playlist.findAll({
      where: { created_by: req.user.user_id },
      include: [
        {
          model: Song,
          where: { song_id: songId }, // <-- pakai song_id sesuai DB
          through: { attributes: [] }, // hide PlaylistSong columns
        },
      ],
    });

    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists containing song:", error);
    res.status(500).json({
      message: "Gagal fetch playlist lagu",
      error: error.message,
    });
  }
};