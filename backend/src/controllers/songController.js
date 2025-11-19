import Song from "../models/Song.js";

export const createSong = async (req, res) => {
  try {
    const {
      title,
      artist_id,
      album_id,
      genre_id,
      lyrics,
      file_audio,
      cover_image,
      uploaded_by,
    } = req.body;

    const song = await Song.create({
      title,
      artist_id,
      album_id,
      genre_id,
      lyrics,
      file_audio,
      cover_image,
      uploaded_by,
    });

    res.status(201).json({
      message: "Song created successfully",
      data: song,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByPk(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const song = await Song.findByPk(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    await song.update(updateData);

    res.json({
      message: "Song updated successfully",
      data: song,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findByPk(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    await song.destroy();

    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
