import Playlist from "../models/Playlist.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description, created_by } = req.body;
    const playlist = await Playlist.create({ name, description, created_by });

    res.status(201).json({
      message: "Playlist created successfully",
      data: playlist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);

    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);

    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    await playlist.update(req.body);

    res.json({
      message: "Playlist updated successfully",
      data: playlist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);

    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    await playlist.destroy();

    res.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
