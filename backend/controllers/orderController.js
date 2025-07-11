import Order from "../models/Order.js";

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private
export const placeOrder = async (req, res) => {
  const { cartItems, address, paymentMethod, totalPrice } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const order = new Order({
      user: req.user._id,
      cartItems,
      address,
      paymentMethod,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id
// @access  Admin
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};
