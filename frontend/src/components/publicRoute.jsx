// src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // If logged in, redirect to profile or home
    return <Navigate to="/account" />;
  }

  return children;
};

export default PublicRoute;
