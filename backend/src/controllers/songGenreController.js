import SongGenre from "../models/SongGenre.js";

export const addGenreToSong = async (req, res) => {
  try {
    const { song_id, genre_id } = req.body;

    const exists = await SongGenre.findOne({
      where: { song_id, genre_id },
    });

    if (exists) {
      return res.status(400).json({
        message: "Genre sudah ditambahkan ke lagu ini",
      });
    }

    const data = await SongGenre.create({ song_id, genre_id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
