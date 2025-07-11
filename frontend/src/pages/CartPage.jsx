import React from "react";
import useShopStore from "../store/useShopStore";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useShopStore((s) => s.cartItems);
  const removeCart = useShopStore((s) => s.removeFromCart);
  const inc = useShopStore((s) => s.increaseQuantity);
  const dec = useShopStore((s) => s.decreaseQuantity);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert("Proceeding to checkout...");
    // navigate("/checkout"); // optional redirect
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Cart</h2>

      {cartItems.length === 0 && (
        <p className="text-gray-500 text-center">No items in your cart.</p>
      )}

      <div className="space-y-6">
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded border"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-gray-600">Size: {item.size}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => dec(item.id, item.size)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  −
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  onClick={() => inc(item.id, item.size)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeCart(item.id, item.size)}
                className="mt-3 inline-block text-red-500 font-medium border border-red-500 rounded px-4 py-1 hover:bg-red-500 hover:text-white transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-10 text-right border-t pt-6">
          <div className="text-xl font-semibold mb-4">
            Total: <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Proceed to Buy
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
