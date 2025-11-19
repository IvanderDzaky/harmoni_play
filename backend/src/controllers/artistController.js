import Artist from "../models/Artist.js";

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
    const artist = await Artist.findByPk(req.params.id);

    if (!artist) return res.status(404).json({ message: "Artist not found" });

    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    await artist.update(req.body);
    res.json(artist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    await artist.destroy();
    res.json({ message: "Artist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
