import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import ManageProducts from "../components/ManageProduct";

// You can later create and import ManageProducts, ManageOrders, ManageUsers

const AdminPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("add");

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p className="text-gray-600">Welcome, {user.name} 👑</p>

      {/* Admin tab buttons */}
      <div className="mt-6 space-x-3 mb-6">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 rounded ${activeTab === "add" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
        >
          Add Product
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 rounded ${activeTab === "manage" ? "bg-green-600 text-white" : "bg-gray-100"}`}
        >
          Manage Products
        </button>
        {/* <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-yellow-600 text-white" : "bg-gray-100"}`}
        >
          Manage Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded ${activeTab === "users" ? "bg-red-600 text-white" : "bg-gray-100"}`}
        >
          Manage Users
        </button> */}
      </div>

      {/* Admin content area */}
      <div className="bg-white border rounded p-4 shadow">
        {activeTab === "add" && <AddProductForm />}
        {activeTab === "manage" && <ManageProducts />}
        {/* {activeTab === "orders" && <p>📦 Manage Orders component goes here</p>}
        {activeTab === "users" && <p>📦 Manage Users component goes here</p>} */}
      </div>
    </div>
  );
};

export default AdminPage;
