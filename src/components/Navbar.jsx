import { ShoppingCart, Heart, Search, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useShopStore from "../../store/useShopStore";
import LoginModal from "../../LoginModal";

const Navbar = () => {
  const searchTerm = useShopStore((s) => s.searchTerm);
  const setSearchTerm = useShopStore((s) => s.setSearchTerm);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Navigate to /products when search starts from any other page
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 shadow bg-white sticky top-0 z-50">
      <Link to="/">
        <h1 className="text-xl font-bold text-red-500 pl-8">AliExpress</h1>
      </Link>

      <div className="flex items-center w-full max-w-lg mr-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none"
        />
        <button className="px-3 py-2 bg-red-500 text-white rounded-r-md">
          <Search size={18} />
        </button>
      </div>

      <div className="hidden lg:flex gap-4 items-center">
        <Link to="/favourite">
          <Heart className="cursor-pointer" />
        </Link>
        <Link to="/cart">
          <ShoppingCart className="cursor-pointer" />
        </Link>
        <User className="cursor-pointer" onClick={() => setShowLogin(true)} />
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
};

export default Navbar;
