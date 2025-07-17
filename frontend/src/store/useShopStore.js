import { create } from 'zustand';

const useShopStore = create((set, get) => ({
  // Cart & Favourites (loaded from localStorage)
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  favouriteItems: JSON.parse(localStorage.getItem('favourites')) || [],

  // Product Data
  allProducts: [],
  filteredProducts: [],
  searchTerm: "",
  selectedCategory: "All",
  priceRange: [0, 10000],

  // =================== Product Fetch & Filter Logic ===================
  setAllProducts: (products) => {
    set({ allProducts: products });
    get().filterProducts(); // re-filter based on latest products
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterProducts();
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().filterProducts();
  },

  setPriceRange: (range) => {
    set({ priceRange: range });
    get().filterProducts();
  },

  filterProducts: () => {
    const { allProducts, searchTerm, selectedCategory, priceRange } = get();
    const search = searchTerm.trim().toLowerCase();

    const filtered = allProducts.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search);
      const matchesCategory =
        selectedCategory === "All" || p.category?.name === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    set({ filteredProducts: filtered });
  },

  // =================== Cart Logic ===================
  addToCart: (newItem) => {
    set((state) => {
      const exists = state.cartItems.some(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      if (exists) return state;

      const updatedCart = [...state.cartItems, newItem];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    });
  },

  removeFromCart: (id, size) => {
    set((state) => {
      const updatedCart = state.cartItems.filter(
        (item) => !(item.id === id && item.size === size)
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    });
  },

  increaseQuantity: (id, size) => {
    set((state) => {
      const updatedCart = state.cartItems.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    });
  },

  decreaseQuantity: (id, size) => {
    set((state) => {
      const updatedCart = state.cartItems.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cartItems: updatedCart };
    });
  },

  // =================== Favourites Logic ===================
  addToFavourites: (item) => {
    set((state) => {
      const exists = state.favouriteItems.some((fav) => fav.id === item.id);
      if (exists) return state;

      const updatedFavourites = [...state.favouriteItems, item];
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return { favouriteItems: updatedFavourites };
    });
  },

  removeFromFavourites: (id) => {
    set((state) => {
      const updatedFavourites = state.favouriteItems.filter(
        (item) => item.id !== id
      );
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return { favouriteItems: updatedFavourites };
    });
  },

   clearCart: () => {
    localStorage.removeItem('cart'); // ✅ clear from localStorage
    set({ cartItems: [] }); // ✅ clear from Zustand store
  },

  toggleFavourite: (item) => {
  const id = item._id || item.id; // normalize _id
  const normalizedItem = { ...item, id }; // ensure consistent ID for comparison

  set((state) => {
    const exists = state.favouriteItems.some((fav) => fav.id === id);
    const updatedFavourites = exists
      ? state.favouriteItems.filter((fav) => fav.id !== id)
      : [...state.favouriteItems, normalizedItem];

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    return { favouriteItems: updatedFavourites };
  });
},
}));

export default useShopStore;
