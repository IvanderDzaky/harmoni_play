import { Song, Genre, SongGenre } from "../models/index.js";
import { supabase } from "../config/supabase.js";
import { Op, Sequelize } from "sequelize";

/* ==============================
   CREATE SONG + MULTI GENRE
================================ */
export const createSong = async (req, res) => {
  try {
    const { title, artist_id, album_id, lyrics, uploaded_by, genres } = req.body;

    if (!req.files?.file_audio) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    // Upload Audio
    const audioFile = req.files.file_audio[0];
    const { data: audioData, error: audioError } = await supabase.storage
      .from("Songs")
      .upload(`audio/${Date.now()}-${audioFile.originalname}`, audioFile.buffer, { contentType: audioFile.mimetype, upsert: true });
    if (audioError) throw audioError;
    const audioUrl = supabase.storage.from("Songs").getPublicUrl(audioData?.path)?.data?.publicUrl || null;

    // Upload Cover (opsional)
    let coverUrl = null;
    if (req.files?.cover_image) {
      const coverFile = req.files.cover_image[0];
      const { data: coverData, error: coverError } = await supabase.storage
        .from("Songs")
        .upload(`covers/${Date.now()}-${coverFile.originalname}`, coverFile.buffer, { contentType: coverFile.mimetype, upsert: true });
      if (coverError) throw coverError;
      coverUrl = supabase.storage.from("Songs").getPublicUrl(coverData?.path)?.data?.publicUrl || null;
    }

    // Create Song
    const song = await Song.create({
      title,
      artist_id,
      album_id,
      lyrics,
      file_audio: audioUrl,
      cover_image: coverUrl,
      uploaded_by,
    });

    // Insert Genres
    if (Array.isArray(genres) && genres.length > 0) {
      const rows = genres.map((genre_id) => ({ song_id: song.song_id, genre_id }));
      await SongGenre.bulkCreate(rows);
    }

    res.status(201).json({ message: "Song created successfully", data: song });
  } catch (error) {
    console.error("Error creating song:", error);
    res.status(500).json({ message: "Gagal membuat lagu", error: error.message });
  }
};

/* ==============================
   GET ALL SONGS + GENRES
================================ */
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll({
      include: [
        {
          model: Genre,
          as: "genres", // wajib sesuai alias di model
          through: { attributes: [] },
        },
      ],
    });
    res.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Gagal fetch lagu", error: error.message });
  }
};

/* ==============================
   GET SONG BY ID
================================ */
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id, {
      include: [{ model: Genre, as: "genres", through: { attributes: [] } }],
    });

    if (!song) return res.status(404).json({ message: "Song not found" });

    res.json(song);
  } catch (error) {
    console.error("Error fetching song:", error);
    res.status(500).json({ message: "Gagal fetch lagu", error: error.message });
  }
};

/* ==============================
   UPDATE SONG (TANPA GENRE)
================================ */
export const updateSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });

    await song.update(req.body);
    res.json({ message: "Song updated successfully", data: song });
  } catch (error) {
    console.error("Error updating song:", error);
    res.status(500).json({ message: "Gagal update lagu", error: error.message });
  }
};

/* ==============================
   DELETE SONG
================================ */
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });

    await song.destroy();
    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Gagal hapus lagu", error: error.message });
  }
};

/* ==============================
   SEARCH SONG BY TITLE
================================ */
export const getSongsByName = async (req, res) => {
  const q = req.query.q?.trim().toLowerCase();
  if (!q) return res.json([]);

  try {
    const songs = await Song.findAll({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("title")),
        { [Op.like]: `%${q}%` }
      ),
      include: [{ model: Genre, as: "genres", through: { attributes: [] } }],
    });
    res.json(songs);
  } catch (error) {
    console.error("Error searching songs:", error);
    res.status(500).json({ message: "Gagal cari lagu", error: error.message });
  }
};

/* ==============================
   GET SONGS BY GENRE
================================ */
export const getSongsByCategoryId = async (req, res) => {
  const { id } = req.params;

  try {
    const songs = await Song.findAll({
      include: {
        model: Genre,
        as: "genres", // HARUS sesuai alias di model
        where: { genre_id: id },
        through: { attributes: [] },
      },
    });

    res.json(songs); // kembalikan array, walau kosong
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};