import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const OrderHistory = () => {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error("Order fetch failed", err));
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.map((order, i) => (
        <div key={i} className="border p-3 mb-4 rounded">
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <ul className="ml-4 mt-2 list-disc">
            {order.cartItems.map((item, j) => (
              <li key={j}>
                {item.name} - {item.quantity} pcs - ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
