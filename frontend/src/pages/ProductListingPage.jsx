import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Heart, HeartOff } from "lucide-react";
import useShopStore from "../store/useShopStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ALLOWED_CATEGORIES = ["electronics", "clothes", "furniture", "shoes"];
const useQuery = () => new URLSearchParams(useLocation().search);

const ProductListingPage = () => {
  const query = useQuery();
  const initialCategory = query.get("category")?.toLowerCase() || "all";

  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const searchTerm = useShopStore((s) => s.searchTerm.trim().toLowerCase());
  const cartItems = useShopStore((s) => s.cartItems);
  const addToCart = useShopStore((s) => s.addToCart);
  const favourites = useShopStore((s) => s.favouriteItems);
  const toggleFavourite = useShopStore((s) => s.toggleFavourite);

  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => {
        const cleaned = res.data.filter(
          (p) =>
            p.category?.name &&
            ALLOWED_CATEGORIES.includes(p.category.name.toLowerCase())
        );
        setAllProducts(cleaned);
        setFiltered(cleaned);
      })
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filteredProducts = allProducts.filter((p) => {
      const category = p.category?.name?.toLowerCase();
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;
      const matchesPrice =
        p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesSearch = p.title.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesPrice && matchesSearch;
    });
    setFiltered(filteredProducts);
  }, [selectedCategory, priceRange, searchTerm, allProducts]);

  const isInCart = (id) =>
    cartItems.some((item) => item.id === id && item.size === "N/A");

  const handleAddToCart = (product) => {
    if (!user) return toast.error("Please login to add to cart");
    if (isInCart(product._id)) return toast("Item already in cart");

    const item = {
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.image || "",
      size: "N/A",
      quantity: 1,
    };

    addToCart(item);
    toast.success("Added to cart");
  };

  const handleToggleFavourite = (product) => {
    if (!user) return toast.error("Please login to add to favourites");
    toggleFavourite(product);
  };

  if (loading) return <p className="p-4">Loading products...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          {ALLOWED_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <label>Price:</label>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([+e.target.value, priceRange[1]])
            }
            className="w-20 border px-2 py-1 rounded"
          />
          <span>to</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], +e.target.value])
            }
            className="w-20 border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => {
          const inFav = favourites.some((i) => i.id === product._id);
          return (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition hover:scale-105"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image || "/fallback.jpg"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-lg truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600">${product.price}</p>
              </Link>

              <div className="mt-2 flex justify-between items-center">
                <button
                  onClick={() => handleToggleFavourite(product)}
                  className="text-red-500"
                >
                  {inFav ? (
                    <Heart className="fill-red-500 text-red-500" />
                  ) : (
                    <HeartOff />
                  )}
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListingPage;
