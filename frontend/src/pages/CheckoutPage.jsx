import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useShopStore from "../store/useShopStore";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";

const CheckoutPage = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const cartItems = useShopStore((s) => s.cartItems);
  const clearCart = useShopStore((s) => s.clearCart);
  const { token } = useAuthStore();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBuy = async () => {
    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        {
          cartItems, // ✅ must match backend model
          address,
          paymentMethod: "COD",
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("🎉 Order placed successfully!");
      clearCart();
      navigate("/account/orders"); // show order history
    } catch (err) {
      console.error("Order placement failed:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Shipping Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your delivery address..."
        ></textarea>
      </div>

      <div className="mb-4">
        <p className="font-medium">Payment Method</p>
        <p className="mt-1">Cash on Delivery (COD)</p>
      </div>

      <button
        onClick={handleBuy}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Buy
      </button>
    </div>
  );
};

export default CheckoutPage;
