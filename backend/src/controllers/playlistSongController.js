import {
  PlaylistSong,
  Song,
  Artist,
  Album,
} from "../models/index.js";


export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlist_id, song_id } = req.body;

    const add = await PlaylistSong.create({
      playlist_id,
      song_id,
    });

    res.status(201).json({
      message: "Song added to playlist",
      data: add,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSongsInPlaylist = async (req, res) => {
  const { playlist_id } = req.params;

  try {
    const data = await PlaylistSong.findAll({
      where: { playlist_id },
      include: [
        {
          model: Song,
          as: "Song", // pastikan sama persis dengan as di index.js
          attributes: ["song_id", "title", "cover_image"],
          include: [
            { model: Artist, as: "Artist", attributes: ["name"] },
            { model: Album, as: "Album", attributes: ["title"] },
          ],
        },
      ],
    });

    console.log("Data fetched:", data); // 🔥 cek di console server

    const result = data.map(item => ({
      song_id: item.Song.song_id,
      title: item.Song.title,
      cover_image: item.Song.cover_image,
      artist: item.Song.Artist?.name || "-",
      album: item.Song.Album?.title || "-",
      duration: "-",
    }));

    res.json(result);
  } catch (err) {
    console.error("Sequelize error:", err); // 🔥 log error asli
    res.status(500).json({ message: err.message }); // tampilkan error asli
  }
};





export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlist_id, song_id } = req.params;

    const item = await PlaylistSong.findOne({
      where: { playlist_id, song_id },
    });

    if (!item)
      return res.status(404).json({ message: "Song not found in playlist" });

    await item.destroy();

    res.json({ message: "Song removed from playlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
