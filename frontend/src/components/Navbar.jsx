import { ShoppingCart, Heart, Search, User, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useShopStore from "../store/useShopStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Navbar = () => {
  const searchTerm = useShopStore((s) => s.searchTerm);
  const setSearchTerm = useShopStore((s) => s.setSearchTerm);
  const cartItems = useShopStore((s) => s.cartItems);
  const favourites = useShopStore((s) => s.favouriteItems);
  const totalCartQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowMobileMenu(false);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 shadow bg-white sticky top-0 z-50">
      <Link to="/">
        <h1 className="text-xl font-bold text-red-500 pl-8">AliExpress</h1>
      </Link>

      {/* 🔍 Search Bar */}
      <div className="flex items-center w-full max-w-lg mx-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim()) {
              navigate("/products");
            }
          }}
          placeholder="Search for products..."
          className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none"
        />
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-r-md"
          onClick={() => {
            if (searchTerm.trim()) {
              navigate("/products");
            } else {
              toast.error("Please enter something to search.");
            }
          }}
        >
          <Search size={18} />
        </button>
      </div>

      {/* Desktop Icons */}
      <div className="hidden lg:flex gap-6 items-center">
        <Link to="/favourite" className="relative">
          <Heart className="cursor-pointer" />
          {favourites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {favourites.length}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative">
          <ShoppingCart className="cursor-pointer" />
          {totalCartQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {totalCartQty}
            </span>
          )}
        </Link>

        {user ? (
          <div className="relative group">
            <User className="cursor-pointer" />
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-2 z-50 min-w-[140px] opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to="/account" className="block px-3 py-2 hover:bg-gray-100">
                My Account
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="block px-3 py-2 hover:bg-gray-100">
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <User className="cursor-pointer" />
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden relative">
        <Menu
          className="cursor-pointer"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />

        {showMobileMenu && (
          <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-4 z-50 min-w-[160px]">
            <Link to="/favourite" className="flex items-center justify-between mb-2">
              <span>Favourites</span>
              <div className="relative">
                <Heart />
                {favourites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    {favourites.length}
                  </span>
                )}
              </div>
            </Link>

            <Link to="/cart" className="flex items-center justify-between mb-2">
              <span>Cart</span>
              <div className="relative">
                <ShoppingCart />
                {totalCartQty > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                    {totalCartQty}
                  </span>
                )}
              </div>
            </Link>

            {user ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center mt-1 mb-2"
                >
                  <User className="inline mr-2" />
                  My Account
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center mt-1 mb-2"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center mt-1 text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center mt-1"
              >
                <User className="inline mr-2" />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
