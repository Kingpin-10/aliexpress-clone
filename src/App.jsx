import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import FavouritesPage from "./pages/FavouritesPage";
import ProductListingPage from "./pages/ProductListingPage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favourite" element={<FavouritesPage />} />
        <Route path="products" element={<ProductListingPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

