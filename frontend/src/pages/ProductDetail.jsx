import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import useShopStore from "../store/useShopStore"
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const discountMode = searchParams.get("discount") === "true";
  const addToCart = useShopStore((s) => s.addToCart);
  const toggleFavourite = useShopStore((s) => s.toggleFavourite);
  const favourites = useShopStore((s) => s.favouriteItems);

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4 text-center text-gray-600">Loading...</p>;
  if (!product) return <p className="p-4 text-center text-red-500">Product not found.</p>;

  const discountedPrice = discountMode
    ? (product.price * 0.8).toFixed(2)
    : product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: Number(discountedPrice),
      image: product.images?.[0] || "",
      size: "N/A",
      quantity: 1,
    });
    toast.success("Added to cart");
  };

  const inFav = favourites.some((f) => f.id === product.id);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Product Image */}
        <div className="flex-1">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-lg border"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          {discountMode && (
            <p className="text-sm text-red-600 font-semibold mb-1">🔥 20% OFF</p>
          )}

          <div className="text-2xl font-semibold text-gray-800 mb-4">
            ${" "}
            {discountMode ? (
              <>
                <span className="line-through text-gray-400 text-base mr-2">
                  ${product.price}
                </span>
                <span className="text-green-600">${discountedPrice}</span>
              </>
            ) : (
              product.price
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => toggleFavourite(product)}
              className={`border px-6 py-2 rounded transition ${
                inFav
                  ? "border-red-500 text-red-500 hover:bg-red-50"
                  : "hover:bg-gray-100"
              }`}
            >
              {inFav ? "❤️ Remove from Favourites" : "🤍 Add to Favourites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
