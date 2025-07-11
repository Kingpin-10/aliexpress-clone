import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import FavouritesPage from "./pages/FavouritesPage";
import ProductListingPage from "./pages/ProductListingPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistory from "./pages/OrderHistory";
import AccountPage from "./pages/AccountPage";
import PublicRoute from "./components/publicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";


function App() {
  return (
    <>
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favourite" element={<FavouritesPage />} />
        <Route path="products" element={<ProductListingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

         {/* Public pages */}
         <Route
         path="/account/orders"
         element={
        <ProtectedRoute>
        <OrderHistory />
        </ProtectedRoute>
         }
        />
        <Route
        path="/login"
        element={
        <PublicRoute>
        <LoginPage />
        </PublicRoute>
          }
        />
        <Route
         path="/signup"
        element={
        <PublicRoute>
        <SignupPage />
        </PublicRoute>
          }
        />
          {/* ✅ Protected Route */}
        <Route
         path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
        />
         <Route
         path="/account"
         element={
        <ProtectedRoute>
        <AccountPage />
        </ProtectedRoute>
       }
       />
       <Route
        path="/admin"
        element={
        <ProtectedRoute adminOnly={true}>
      <AdminPage />
      </ProtectedRoute>
        }
      />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

