import express from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionByUser,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscriptionController.js";

const router = express.Router();

// Create subscription
router.post("/", createSubscription);

// Get all subscriptions
router.get("/", getAllSubscriptions);

// Get subscription by user
router.get("/user/:user_id", getSubscriptionByUser);

// Update subscription
router.put("/:id", updateSubscription);

// Delete subscription
router.delete("/:id", deleteSubscription);

export default router;
