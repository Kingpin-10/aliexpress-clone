import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const AddProductForm = () => {
  const { token } = useAuthStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    brand: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          category: { name: form.category }, // match backend schema
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added successfully!");
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        brand: "",
        stock: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <select
  name="category"
  value={form.category}
  onChange={handleChange}
  required
  className="w-full border px-3 py-2 rounded"
>
  <option value="">Select Category</option>
  <option value="electronics">Electronics</option>
  <option value="clothes">Clothes</option>
  <option value="furniture">Furniture</option>
  <option value="shoes">Shoes</option>
</select>

      <input
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="stock"
        placeholder="Stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
