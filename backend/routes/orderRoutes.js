import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order
router.post("/", protect, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      cartItems: req.body.cartItems,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod || "COD",
      totalPrice: req.body.totalPrice,
    });
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to place order", error: err.message });
  }
});

// Get user's orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders" });
  }
});

export default router;
