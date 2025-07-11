// src/utils/auth.js
import jwtDecode from "jwt-decode";

export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};
