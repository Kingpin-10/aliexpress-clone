import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import useShopStore from "../store/useShopStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Heart, HeartOff } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isDiscounted = queryParams.get("discount") === "true";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const addToCart = useShopStore((s) => s.addToCart);
  const cartItems = useShopStore((s) => s.cartItems);
  const favourites = useShopStore((s) => s.favouriteItems);
  const toggleFavourite = useShopStore((s) => s.toggleFavourite);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const isInCart = (id) =>
    cartItems.some((item) => item.id === id && item.size === "N/A");

  const isFavourited = (id) =>
    favourites.some((item) => item.id === id || item._id === id);

  const handleAddToCart = () => {
    if (!user) return toast.error("Please login to add to cart");
    if (isInCart(product._id)) return toast("Item already in cart");

    const finalPrice = isDiscounted
      ? Number((product.price * 0.8).toFixed(2))
      : product.price;

    const item = {
      id: product._id,
      name: product.title,
      price: finalPrice,
      image: product.image,
      size: "N/A",
      quantity: 1,
    };

    addToCart(item);
    toast.success("Added to cart");
  };

  const handleToggleFavourite = () => {
    if (!user) return toast.error("Please login to add to favourites");
    toggleFavourite(product);
  };

  if (loading) return <p className="p-4">Loading product...</p>;
  if (!product) return <p className="p-4">Product not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-96 object-cover rounded"
      />

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {isDiscounted ? (
          <>
            <p className="text-gray-400 line-through text-sm">
              ${product.price}
            </p>
            <p className="text-red-600 font-bold text-xl">
              ${(product.price * 0.8).toFixed(2)} (20% OFF)
            </p>
          </>
        ) : (
          <p className="text-lg font-semibold">${product.price}</p>
        )}

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>

          <button
            onClick={handleToggleFavourite}
            className="text-red-600 hover:scale-110 transition-transform"
            aria-label="Toggle Favourite"
          >
            {isFavourited(product._id) ? (
              <Heart className="fill-red-600" />
            ) : (
              <HeartOff />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
