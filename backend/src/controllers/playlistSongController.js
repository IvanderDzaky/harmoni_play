import PlaylistSong from "../models/PlaylistSong.js";

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
  try {
    const playlist_id = req.params.playlist_id;

    const songs = await PlaylistSong.findAll({
      where: { playlist_id },
    });

    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
