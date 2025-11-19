import Subscription from "../models/Subscription.js";

export const createSubscription = async (req, res) => {
  try {
    const { user_id, plan, end_date } = req.body;

    const newSub = await Subscription.create({
      user_id,
      plan,
      end_date,
    });

    res.status(201).json({
      message: "Subscription created",
      data: newSub,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.findAll();
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubscriptionByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const sub = await Subscription.findOne({
      where: { user_id },
      order: [["start_date", "DESC"]],
    });

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json(sub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const id = req.params.id;

    const sub = await Subscription.findByPk(id);

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await sub.update(req.body);

    res.json({
      message: "Subscription updated",
      data: sub,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const id = req.params.id;

    const sub = await Subscription.findByPk(id);

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await sub.destroy();

    res.json({ message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
