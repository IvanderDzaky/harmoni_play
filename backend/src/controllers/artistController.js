import Artist from "../models/Artist.js";
import { supabase } from "../config/supabase.js";
import crypto from "crypto";

// ================= GET =================
export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getArtistById = async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ message: "Invalid artist ID" });
  }

  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ message: "Artist not found" });
  res.json(artist);
};


// ================= CREATE (ADMIN) =================
export const createArtist = async (req, res) => {
  try {
    const { name, bio, user_id, verified } = req.body;
    const file = req.file;

    if (!name || name.length < 2)
      return res.status(400).json({ message: "Nama artist minimal 2 karakter" });

    let photo = null;

    if (file) {
      const ext = file.originalname.split(".").pop();
      const filename = `${crypto.randomUUID()}.${ext}`;
      photo = `photos/${filename}`;

      const { error } = await supabase.storage
        .from("Artist")
        .upload(photo, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;
    }

    const artist = await Artist.create({
      name,
      bio,
      user_id,
      verified,
      photo,
    });

    res.status(201).json({ message: "Artist created", artist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE =================
export const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ message: "Artist not found" });

    const file = req.file;
    let photo = artist.photo;

    if (file) {
      // hapus foto lama
      if (artist.photo) {
        await supabase.storage.from("Artist").remove([artist.photo]);
      }

      const ext = file.originalname.split(".").pop();
      const filename = `${crypto.randomUUID()}.${ext}`;
      photo = `photos/${filename}`;

      const { error } = await supabase.storage
        .from("Artist")
        .upload(photo, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;
    }

    await artist.update({ ...req.body, photo });
    res.json({ message: "Artist updated", artist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE =================
export const deleteArtist = async (req, res) => {
  const artist = await Artist.findByPk(req.params.id);
  if (!artist) return res.status(404).json({ message: "Artist not found" });

  if (artist.photo) {
    await supabase.storage.from("Artist").remove([artist.photo]);
  }

  await artist.destroy();
  res.json({ message: "Artist deleted" });
};

// ================= AJUKAN MUSISI =================
export const ajukanMusisi = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user_id = req.user.user_id;
    const file = req.file;

    const existing = await Artist.findOne({ where: { user_id } });
    if (existing)
      return res.status(400).json({ message: "Sudah mengajukan musisi" });

    let photo = null;

    if (file) {
      const ext = file.originalname.split(".").pop();
      const filename = `${crypto.randomUUID()}.${ext}`;
      photo = `photos/${filename}`;

      const { error } = await supabase.storage
        .from("Artist")
        .upload(photo, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;
    }

    const artist = await Artist.create({
      name,
      bio,
      user_id,
      photo,
      verified: false,
    });

    res.status(201).json({
      message: "Pengajuan berhasil, tunggu verifikasi admin",
      artist,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= VERIFY =================
export const verifyArtist = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Admin only" });

    const artist = await Artist.findByPk(req.params.artist_id);
    if (!artist)
      return res.status(404).json({ message: "Artist not found" });

    const verified = req.body.verified ?? req.body.status; // ⬅️ FIX

    if (typeof verified !== "boolean") {
      return res.status(400).json({ message: "Invalid verification value" });
    }

    artist.verified = verified;
    await artist.save();

    res.json({ message: "Verification updated", artist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getArtistRequests = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const artists = await Artist.findAll({
      where: { verified: false },
    });

    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
