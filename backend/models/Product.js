import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
     name: {type: String,
      required: true},
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    stock: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
