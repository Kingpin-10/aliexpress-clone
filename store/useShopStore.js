import { create } from 'zustand';

const useShopStore = create((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  favouriteItems: JSON.parse(localStorage.getItem('favourites')) || [],

  // Product data
  allProducts: [],
  filteredProducts: [],
  searchTerm: "",
  selectedCategory: "All",
  priceRange: [0, 10000],

  // ========== Filtering Logic ==========
  setAllProducts: (products) => {
    set({ allProducts: products }, false);
    get().filterProducts();
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term }, false);
    get().filterProducts();
  },

  setCategory: (category) => {
    set({ selectedCategory: category }, false);
    get().filterProducts();
  },

  setPriceRange: (range) => {
    set({ priceRange: range }, false);
    get().filterProducts();
  },

  filterProducts: () => {
    const { allProducts, searchTerm, selectedCategory, priceRange } = get();
    const search = searchTerm.trim().toLowerCase();

    const filtered = allProducts.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search);
      const matchCategory =
        selectedCategory === "All" || p.category?.name === selectedCategory;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchCategory && matchPrice;
    });

    set({ filteredProducts: filtered });
  },

  // ========== Cart Logic ==========
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

  // ========== Favourites Logic ==========
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

  toggleFavourite: (item) => {
    set((state) => {
      const exists = state.favouriteItems.some((fav) => fav.id === item.id);
      const updatedFavourites = exists
        ? state.favouriteItems.filter((fav) => fav.id !== item.id)
        : [...state.favouriteItems, item];

      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      return { favouriteItems: updatedFavourites };
    });
  },
}));

export default useShopStore;
