import Song from "../models/Song.js";
import { supabase } from "../config/supabase.js";
import {Op, Sequelize } from "sequelize";
// CREATE SONG
export const createSong = async (req, res) => {
  try {
    const { title, artist_id, album_id, genre_id, lyrics, uploaded_by } = req.body;

    if (!req.files?.file_audio || !req.files?.cover_image) {
      return res.status(400).json({ error: "Audio and cover files are required" });
    }

    const audioFile = req.files.file_audio[0];
    const coverFile = req.files.cover_image[0];

    // Upload audio ke Supabase
    const { data: audioData, error: audioError } = await supabase.storage
      .from("Songs")
      .upload(`audio/${Date.now()}-${audioFile.originalname}`, audioFile.buffer, {
        contentType: audioFile.mimetype,
        upsert: true,
      });
    if (audioError) throw audioError;

    // Upload cover ke Supabase
    const { data: coverData, error: coverError } = await supabase.storage
      .from("Songs")
      .upload(`covers/${Date.now()}-${coverFile.originalname}`, coverFile.buffer, {
        contentType: coverFile.mimetype,
        upsert: true,
      });
    if (coverError) throw coverError;

    // Dapatkan URL public
    const audioUrl = supabase.storage.from("songs").getPublicUrl(audioData.path).data.publicUrl;
    const coverUrl = supabase.storage.from("songs").getPublicUrl(coverData.path).data.publicUrl;

    // Simpan ke database
    const song = await Song.create({
      title,
      artist_id,
      album_id,
      genre_id,
      lyrics,
      file_audio: audioUrl,
      cover_image: coverUrl,
      uploaded_by,
    });

    res.status(201).json({ message: "Song created successfully", data: song });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// GET ALL SONGS
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SONG BY ID
export const getSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByPk(id);
    if (!song) return res.status(404).json({ message: "Song not found" });
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



export const getSongsByName = async (req, res) => {
  const q = req.query.q?.trim().toLowerCase();

  if (!q) return res.json([]);
  
  console.log("Searching songs for:", q);

  const songs = await Song.findAll({
    where: Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("title")),
      {
        [Op.like]: `%${q}%`
      }
    )
  });

  res.json(songs);
};
