import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">AliExpress</h2>
          <p className="text-sm">
            Your one-stop destination for quality products at unbeatable prices. Shop smarter, live better.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Shop</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/favourite" className="hover:text-white">Favourites</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#"><Facebook className="hover:text-white" /></a>
            <a href="#"><Instagram className="hover:text-white" /></a>
            <a href="#"><Twitter className="hover:text-white" /></a>
            <a href="#"><Linkedin className="hover:text-white" /></a>
            <a href="#"><Mail className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} AliExpress. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
