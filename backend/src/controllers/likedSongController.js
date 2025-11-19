import LikedSong from "../models/LikedSong.js";

export const likeSong = async (req, res) => {
  try {
    const { user_id, song_id } = req.body;

    const like = await LikedSong.create({ user_id, song_id });

    res.status(201).json({
      message: "Song liked",
      data: like,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: "Song already liked by this user" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const unlikeSong = async (req, res) => {
  try {
    const { user_id, song_id } = req.params;

    const liked = await LikedSong.findOne({
      where: { user_id, song_id },
    });

    if (!liked) {
      return res.status(404).json({ message: "Like not found" });
    }

    await liked.destroy();

    res.json({ message: "Song unliked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikedSongsByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const liked = await LikedSong.findAll({
      where: { user_id },
    });

    res.json(liked);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
