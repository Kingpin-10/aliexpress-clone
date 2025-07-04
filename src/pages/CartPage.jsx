import React from "react";
import useShopStore from "../../store/useShopStore";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useShopStore((s) => s.cartItems);
  const removeCart = useShopStore((s) => s.removeFromCart);
  const inc = useShopStore((s) => s.increaseQuantity);
  const dec = useShopStore((s) => s.decreaseQuantity);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    // Redirect or handle payment
    alert("Proceeding to checkout...");
    // navigate("/checkout"); // If you have a checkout page
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>

      {cartItems.length === 0 && <p>No items in cart.</p>}

      {cartItems.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 border p-4 rounded mb-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p>${item.price}</p>
            <p>Size: {item.size}</p>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => dec(item.id, item.size)} className="px-2 border">
                −
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => inc(item.id, item.size)} className="px-2 border">
                +
              </button>
            </div>
            <button
              onClick={() => removeCart(item.id, item.size)}
              className="mt-2 text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-6 text-right">
          <div className="text-lg font-semibold mb-2">Total: ${total}</div>
          <button
            onClick={handleCheckout}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Proceed to Buy
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
