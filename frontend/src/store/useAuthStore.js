import { create } from "zustand";

export const useAuthStore = create((set, get) => {
  let user = null;
  let token = null;

  try {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      user = JSON.parse(storedUser);
    }

    if (storedToken && storedToken !== "undefined" && storedToken !== "null") {
      token = storedToken;
    }
  } catch (error) {
    console.error("Error parsing stored auth data:", error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    user = null;
    token = null;
  }

  return {
    user,
    token,

    login: (userData, tokenData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", tokenData);
      set({ user: userData, token: tokenData });
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null });
    },

    isAuthenticated: () => {
      const state = get();
      return !!(state.user && state.token);
    },

    isAdmin: () => {
      const { user } = get();
      return user?.isAdmin === true;
    },
  };
});

export default useAuthStore;
