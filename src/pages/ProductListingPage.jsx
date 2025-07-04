import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Heart, HeartOff } from "lucide-react";
import useShopStore from "../../store/useShopStore";
import toast from "react-hot-toast";

// Helper to read query params
const useQuery = () => new URLSearchParams(useLocation().search);

const ProductListingPage = () => {
  const query = useQuery();
  const initialCategory = query.get("category") || "All";

  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const favourites = useShopStore((s) => s.favouriteItems);
  const toggleFavourite = useShopStore((s) => s.toggleFavourite);
  const addToCart = useShopStore((s) => s.addToCart);
  const cartItems = useShopStore((s) => s.cartItems);
  const searchTerm = useShopStore((s) => s.searchTerm);
  const search = searchTerm.trim().toLowerCase(); // ✅ safe search

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products?offset=0&limit=40")
      .then((res) => {
        setAllProducts(res.data);
        setFiltered(res.data);
      })
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filteredProducts = allProducts.filter((p) => {
      const inCategory =
        selectedCategory === "All" || p.category?.name === selectedCategory;
      const inPriceRange = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesSearch = p.title.toLowerCase().includes(search);
      return inCategory && inPriceRange && matchesSearch;
    });
    setFiltered(filteredProducts);
  }, [selectedCategory, priceRange, search, allProducts]);

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id && item.size === "N/A");
  };

  const handleAddToCart = (product) => {
    if (isInCart(product.id)) {
      toast("Item already in cart", { icon: "⚠️" });
      return;
    }

    const item = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images?.[0] || "",
      size: "N/A",
      quantity: 1,
    };

    addToCart(item);
    toast.success("Added to cart");
  };

  if (loading) return <p className="p-4">Loading products...</p>;

  const uniqueCategories = [
    "All",
    ...new Set(allProducts.map((p) => p.category?.name).filter(Boolean)),
  ];

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
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <label>Price:</label>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-20 border px-2 py-1 rounded"
          />
          <span>to</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-20 border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => {
          const inFav = favourites.some((i) => i.id === product.id);

          return (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow bg-white transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.images?.[0] || "/fallback.jpg"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-lg truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600">₹{product.price}</p>
              </Link>

              <div className="mt-2 flex justify-between items-center">
                <button
                  onClick={() => toggleFavourite(product)}
                  className="text-red-500"
                >
                  {inFav ? <Heart className="fill-red-500" /> : <HeartOff />}
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

        {/* No products fallback */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
