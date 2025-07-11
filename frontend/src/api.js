import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if using cookies
});

// Product APIs
export const fetchAllProducts = () => API.get("/products");
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);

// Auth APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
