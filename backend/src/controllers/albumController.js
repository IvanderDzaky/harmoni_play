import Album from "../models/Album.js";

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);

    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAlbum = async (req, res) => {
  try {
    const album = await Album.create(req.body);
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    await album.update(req.body);
    res.json(album);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    await album.destroy();
    res.json({ message: "Album deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
