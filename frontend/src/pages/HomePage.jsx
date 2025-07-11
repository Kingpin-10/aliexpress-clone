import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ALLOWED_CATEGORIES = ["electronics", "clothes", "shoes", "furniture"];

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
    text: "Latest Electronics Deals",
  },
  {
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80",
    text: "Fashion Sale is Live!",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80",
    text: "Modern Furniture Offers",
  },
  {
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
    text: "Step into Style – Shoes",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [topDeals, setTopDeals] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [prevBanner, setPrevBanner] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleCategoryClick = (cat) => {
    navigate(`/products?category=${cat.toLowerCase()}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
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
      })
      .finally(() => setLoading(false));
  }, []);

  // Auto-rotate banner every 2.5s (pause on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setPrevBanner(currentBanner);
      setCurrentBanner((prev) => (prev + 1) % bannerSlides.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered, currentBanner]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* 🔁 Hero Banner with Fade Transition and Arrows */}
      <div
        className="relative w-full h-52 md:h-64 rounded-2xl overflow-hidden shadow-lg mb-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Current Image (fade in) */}
        <img
          key={currentBanner}
          src={bannerSlides[currentBanner].image}
          alt={`banner-${currentBanner}`}
          className="absolute w-full h-full object-cover opacity-100 transition-opacity duration-700 ease-in-out"
        />

        {/* Previous Image (fade out) */}
        {prevBanner !== currentBanner && (
          <img
            src={bannerSlides[prevBanner].image}
            alt={`banner-prev`}
            className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out"
          />
        )}

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-lg md:text-2xl font-extrabold text-center px-4 z-10">
            {bannerSlides[currentBanner].text}
          </h2>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => {
            setPrevBanner(currentBanner);
            setCurrentBanner(
              currentBanner === 0 ? bannerSlides.length - 1 : currentBanner - 1
            );
          }}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow transition z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => {
            setPrevBanner(currentBanner);
            setCurrentBanner((currentBanner + 1) % bannerSlides.length);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow transition z-10"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 🗂 Categories */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {["Electronics", "Clothes", "Shoes", "Furniture"].map((cat) => (
          <div
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="bg-white border hover:bg-red-50 cursor-pointer p-6 rounded-xl text-center font-semibold text-gray-700 shadow hover:shadow-md transition duration-300 transform hover:-translate-y-1"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* 🔥 Top Deals */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Deals - 20% OFF</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {topDeals.map((product) => {
          const discountedPrice = (product.price * 0.8).toFixed(2);
          return (
            <Link
              key={product._id}
              to={`/product/${product._id}?discount=true`}
              className="relative bg-white border rounded-xl p-4 shadow hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 group"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-36 object-cover rounded mb-3 group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow">
                20% OFF
              </span>
              <h3 className="text-sm font-semibold truncate mb-1 text-gray-800">{product.title}</h3>
              <p className="text-gray-400 text-xs line-through">${product.price}</p>
              <p className="text-red-600 font-bold text-sm">${discountedPrice}</p>
            </Link>
          );
        })}
      </div>

      {/* 🌟 Featured Products */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="bg-white border rounded-xl p-4 shadow hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 group"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-3 group-hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-sm font-semibold truncate text-gray-800">{product.title}</h3>
            <p className="text-gray-700 font-bold">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
