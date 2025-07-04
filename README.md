# 🛍️ AliExpress Clone (React + Zustand)

This is a fully functional AliExpress clone built using **React** for the frontend and **Zustand** for global state management. The application integrates a product API, shopping cart, favourites, filters, Auth0-based login, and more — providing a seamless e-commerce experience.

## 🚀 Features

- 🔎 **Search**: Search for products globally from any page.
- 📦 **Product Listing**: Displays products from [Escuelajs API](https://api.escuelajs.co/api/v1/products).
- 🛒 **Cart Management**: Add to cart, remove, and quantity update (with `localStorage` persistence).
- ❤️ **Favourites**: Add/remove favourite products (also stored in `localStorage`).
- 🧭 **Category & Price Filters**: Filter by category and price range.
- 🎯 **Discount Logic**: Some products have dynamic 20% discounts in the "Top Deals" section.
- 🔐 **Auth0 Login**: Social login via modal popup using Auth0 (Google/Social).
- 🖼️ **Product Details Page**: Clean and responsive product view with “Add to Cart” feature.
- ⭐ **Featured Products Section**: Highlights 8 random products.
- ⚡ **Toasts**: User feedback with [react-hot-toast](https://react-hot-toast.com/).

## 🛠️ Tech Stack

- **React** + **React Router DOM**
- **Zustand** for global state
- **TailwindCSS** for styling
- **Axios** for API calls
- **Lucide Icons**
- **Auth0** for authentication
- **React Hot Toast**

## 📦 Installation

```bash
git clone https://github.com/your-username/aliexpress-clone.git
cd aliexpress-clone
npm install
npm run dev
