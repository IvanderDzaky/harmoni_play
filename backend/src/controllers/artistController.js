import Artist from "../models/Artist.js";

// Helper: validasi URL
const isURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Artist ID must be a number" });
    }

    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArtist = async (req, res) => {
  try {
    const { name, bio, photo, user_id, verified } = req.body;

    // ===== VALIDATION RULES =====
    if (!name || name.length < 2) {
      return res.status(400).json({
        message: "Artist name is required and must be at least 2 characters.",
      });
    }

    if (bio && bio.length < 5) {
      return res.status(400).json({
        message: "Bio must be at least 5 characters.",
      });
    }

    if (photo && !isURL(photo)) {
      return res.status(400).json({
        message: "Photo must be a valid URL.",
      });
    }

    if (user_id && isNaN(user_id)) {
      return res.status(400).json({
        message: "user_id must be a number.",
      });
    }

    if (verified && typeof verified !== "boolean") {
      return res.status(400).json({
        message: "verified must be a boolean.",
      });
    }

    const artist = await Artist.create({
      name,
      bio,
      photo,
      user_id,
      verified,
    });

    res.status(201).json({
      message: "Artist created successfully",
      data: artist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Artist ID must be a number" });
    }

    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const { name, bio, photo, user_id, verified } = req.body;

    // ===== PARTIAL VALIDATION =====
    if (name && name.length < 2) {
      return res.status(400).json({
        message: "Artist name must be at least 2 characters.",
      });
    }

    if (bio && bio.length < 5) {
      return res.status(400).json({
        message: "Bio must be at least 5 characters.",
      });
    }

    if (photo && !isURL(photo)) {
      return res.status(400).json({
        message: "Photo must be a valid URL.",
      });
    }

    if (user_id && isNaN(user_id)) {
      return res.status(400).json({
        message: "user_id must be a number.",
      });
    }

    if (verified !== undefined && typeof verified !== "boolean") {
      return res.status(400).json({
        message: "verified must be a boolean.",
      });
    }

    await artist.update(req.body);

    res.json({
      message: "Artist updated successfully",
      data: artist,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Artist ID must be a number" });
    }

    const artist = await Artist.findByPk(id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    await artist.destroy();

    res.json({ message: "Artist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
