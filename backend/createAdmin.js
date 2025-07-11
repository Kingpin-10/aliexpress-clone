// createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    const adminEmail = "admin@example.com";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: "Admin",
      email: adminEmail,
      password: "admin123", // Strong password recommended for production
      isAdmin: true,
    });

    console.log("✅ Admin user created successfully:");
    console.log({
      email: admin.email,
      password: "admin123",
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
