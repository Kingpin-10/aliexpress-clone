import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  // Debug logs
  console.log("AccountPage - User:", user);
  console.log("AccountPage - Token:", token);

  if (!user || !token) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-4">Please login to view account.</p>
        {/* <p className="text-sm text-gray-500">
          Debug: User={user ? 'exists' : 'null'}, Token={token ? 'exists' : 'null'}
        </p> */}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name || user.email}!</h2>
      <div className="space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
        <p><strong>ID:</strong> {user._id}</p>
        <Link to="/account/orders">Order History</Link>

      </div>
      <button 
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AccountPage;