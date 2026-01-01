import {
  Playlist,
  PlaylistSong,
  Song,
  Artist,
  Album,
} from "../models/index.js";

/* ================= ADD SONG TO PLAYLIST ================= */
export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlist_id, song_id } = req.body;

    if (!playlist_id || !song_id) {
      return res.status(400).json({ message: "playlist_id and song_id are required" });
    }

    // Cek duplikasi
    const existing = await PlaylistSong.findOne({
      where: { playlist_id, song_id },
    });

    if (existing) {
      return res.status(400).json({ message: "Song already exists in playlist" });
    }

    const add = await PlaylistSong.create({
      playlist_id,
      song_id,
    });

    res.status(201).json({
      message: "Song added to playlist",
      data: add,
    });
  } catch (error) {
    console.error("Error adding song to playlist:", error);

    // Kalau error masih constraint violation (duplikat), bisa tangani juga
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Song already exists in playlist" });
    }

    res.status(500).json({
      message: "Gagal menambahkan lagu",
      error: error.message,
    });
  }
};

/* ================= GET SONGS IN PLAYLIST ================= */
export const getSongsInPlaylist = async (req, res) => {
  try {
    const { playlist_id } = req.params; // ✅ FIX

    if (!playlist_id) {
      return res.status(400).json({
        success: false,
        message: "playlist_id is required",
      });
    }

    const playlistSongs = await PlaylistSong.findAll({
      where: { playlist_id },
      order: [["added_at", "ASC"]],
      include: [
        {
          model: Song,
          as: "song",
          attributes: [
            "song_id",
            "title",
            "cover_image",
            "file_audio",
            "created_at",
          ],
          include: [
            {
              model: Artist,
              as: "artist",
              attributes: ["artist_id", "name"],
            },
            {
              model: Album,
              as: "album",
              attributes: ["album_id", "title", "cover_image"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      data: playlistSongs,
    });
  } catch (error) {
    console.error("Sequelize error fetching playlist songs:", error);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil lagu dari playlist",
    });
  }
};

/* ================= REMOVE SONG FROM PLAYLIST ================= */
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlist_id, song_id } = req.params;

    const item = await PlaylistSong.findOne({
      where: { playlist_id, song_id },
    });

    if (!item) {
      return res.status(404).json({ message: "Song not found in playlist" });
    }

    await item.destroy();

    res.json({ message: "Song removed from playlist" });
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    res.status(500).json({
      message: "Gagal hapus lagu dari playlist",
      error: error.message,
    });
  }
};

/* ================= GET PLAYLISTS BY USER ================= */
export const getPlaylistsByUserId = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const playlists = await Playlist.findAll({
      where: { created_by: req.user.user_id },
      include: [
        {
          model: Song,
          as: "songs", // ✅ sesuai belongsToMany
          attributes: ["song_id", "title", "cover_image", "duration"],
          include: [
            {
              model: Artist,
              as: "artist",
              attributes: ["name"],
            },
            {
              model: Album,
              as: "album",
              attributes: ["title"],
            },
          ],
          through: { attributes: ["added_at"] },
        },
      ],
      order: [["playlist_id", "ASC"]],
    });

    const result = playlists.map((playlist) => ({
      playlist_id: playlist.playlist_id,
      name: playlist.name,
      description: playlist.description || "-",
      songs: playlist.songs.map((song) => ({
        song_id: song.song_id,
        title: song.title || "-",
        artist: song.artist?.name || "-",
        album: song.album?.title || "-",
        cover_image: song.cover_image || null,
        duration: song.duration || "-",
        added_at: song.PlaylistSong?.added_at || null,
      })),
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("ERROR getPlaylistsByUserId:", error);
    res.status(500).json({
      message: "Gagal fetch playlist user",
      error: error.message,
    });
  }
};

/* ================= GET USER PLAYLISTS CONTAINING SONG ================= */
export const getUserPlaylistsContainingSong = async (req, res) => {
  try {
    const { songId } = req.params;

    if (!req.user || !req.user.user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const playlists = await Playlist.findAll({
      where: { created_by: req.user.user_id },
      include: [
        {
          model: Song,
          as: "songs",
          where: { song_id: songId },
          attributes: ["song_id", "title"],
          through: { attributes: [] },
        },
      ],
    });

    const result = playlists.map((playlist) => ({
      playlist_id: playlist.playlist_id,
      name: playlist.name,
      description: playlist.description || "-",
    }));

    res.json(result);
  } catch (error) {
    console.error("ERROR getUserPlaylistsContainingSong:", error);
    res.status(500).json({
      message: "Gagal fetch playlist lagu",
      error: error.message,
    });
  }
};
