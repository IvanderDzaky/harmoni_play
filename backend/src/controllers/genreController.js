import Genre from "../models/Genre.js";

export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);

    if (!genre) return res.status(404).json({ message: "Genre not found" });

    res.json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    await genre.update(req.body);
    res.json(genre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    await genre.destroy();
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
