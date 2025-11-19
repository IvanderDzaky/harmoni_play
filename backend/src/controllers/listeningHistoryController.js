import ListeningHistory from "../models/ListeningHistory.js";

export const addHistory = async (req, res) => {
  try {
    const { user_id, song_id } = req.body;

    const history = await ListeningHistory.create({
      user_id,
      song_id,
    });

    res.status(201).json({
      message: "Listening history added",
      data: history,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistoryByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const history = await ListeningHistory.findAll({
      where: { user_id },
      order: [["listened_at", "DESC"]],
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecentHistory = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const recent = await ListeningHistory.findOne({
      where: { user_id },
      order: [["listened_at", "DESC"]],
    });

    res.json(recent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ListeningHistory.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "History entry not found" });
    }

    await item.destroy();

    res.json({ message: "History entry deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
