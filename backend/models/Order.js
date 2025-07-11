// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        id: String,
        name: String,
        price: Number,
        image: String,
        size: String,
        quantity: Number,
      },
    ],
    address: { type: String, required: true },
    paymentMethod: { type: String, default: "COD" },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Placed" }, // e.g. Placed, Shipped, Delivered
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
