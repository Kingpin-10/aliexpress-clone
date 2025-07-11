import React, { useState } from "react";
import useShopStore from "../store/useShopStore";
import toast from "react-hot-toast";

const FavouritesPage = () => {
  const favouriteItems = useShopStore((s) => s.favouriteItems);
  const removeFromFavourites = useShopStore((s) => s.removeFromFavourites);
  const addToCart = useShopStore((s) => s.addToCart);
  const [sizes, setSizes] = useState({});

  const needsSize = (category) =>
    ["Clothing", "Footwear"].includes(category);

  const handleAddToCart = (item) => {
    const size = sizes[item.id] || "N/A";
    if (needsSize(item.category?.name) && !sizes[item.id]) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      ...item,
      name: item.title,
      image: item.images[0],
      size,
      quantity: 1,
    });

    toast.success("Added to cart");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favourites</h2>

      {favouriteItems.length === 0 ? (
        <p className="text-gray-500">No favourites yet.</p>
      ) : (
        favouriteItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 border p-4 rounded mb-4 shadow-sm bg-white transition hover:shadow-md"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-700">${item.price}</p>

              {needsSize(item.category?.name) && (
                <select
                  value={sizes[item.id] || ""}
                  onChange={(e) =>
                    setSizes((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }))
                  }
                  className="border px-2 py-1 rounded mt-2"
                >
                  <option value="">Select size</option>
                  {["S", "M", "L", "XL"].map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </select>
              )}

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-3 py-1 bg-blue-600 text-white rounded transition hover:bg-blue-700"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    removeFromFavourites(item.id);
                    toast("Removed from favourites");
                  }}
                  className="px-3 py-1 border border-red-500 text-red-500 rounded transition hover:bg-red-500 hover:text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FavouritesPage;
