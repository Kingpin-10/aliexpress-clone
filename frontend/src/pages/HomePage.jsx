import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ALLOWED_CATEGORIES = ["electronics", "clothes", "shoes", "furniture"];

const HomePage = () => {
  const navigate = useNavigate();
  const [topDeals, setTopDeals] = useState([]);
  const [featured, setFeatured] = useState([]);

  const handleCategoryClick = (cat) => {
    navigate(`/products?category=${cat.toLowerCase()}`);
  };

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products?offset=0&limit=100")
      .then((res) => {
        const products = res.data.filter(
          (p) =>
            p.category?.name &&
            ALLOWED_CATEGORIES.includes(p.category.name.toLowerCase())
        );
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setTopDeals(shuffled.slice(0, 4));
        setFeatured(shuffled.slice(4, 12));
      })
      .catch(() => {
        console.error("Failed to load homepage products");
      });
  }, []);

  return (
    <div className="p-4">
      {/* Hero Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-red-500 to-orange-400 rounded-lg text-white flex items-center justify-center mb-6 text-2xl font-bold">
        Big Discounts on Trending Products!
      </div>

      {/* Categories */}
      <h2 className="text-xl font-semibold mb-3">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {["Electronics", "Clothes", "Shoes", "Furniture"].map((cat) => (
          <div
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="bg-gray-100 rounded-lg shadow-sm p-6 text-center font-medium hover:bg-red-100 cursor-pointer transition duration-200"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Top Deals */}
      <h2 className="text-xl font-semibold mb-3">Top Deals - 20% OFF</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {topDeals.map((product) => {
          const discountedPrice = (product.price * 0.8).toFixed(2);
          return (
            <Link
              key={product.id}
              to={`/product/${product.id}?discount=true`}
              className="relative bg-white rounded-lg p-3 shadow hover:shadow-md transition duration-300 hover:scale-105"
            >
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-36 object-cover rounded mb-2"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                20% OFF
              </span>
              <h3 className="text-sm font-semibold truncate">
                {product.title}
              </h3>
              <p className="text-gray-400 text-xs line-through">
                ${product.price}
              </p>
              <p className="text-red-600 font-bold text-sm">
                ${discountedPrice}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Featured Products */}
      <h2 className="text-xl font-semibold mb-3">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {featured.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border rounded-lg p-3 shadow bg-white hover:shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-medium text-sm truncate">{product.title}</h3>
            <p className="text-gray-700 font-semibold">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
