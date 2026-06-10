import mongoose from "mongoose";
import { env } from "./env.js";
import User from "../models/User.js";

export const connectDb = async () => {
  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
  await seedAdmin();
};

export const seedAdmin = async () => {
  try {
    const adminEmail = "diya.v.p.108@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail, role: "admin" });

    if (!existingAdmin) {
      await User.create({
        fullName: "Admin",
        email: adminEmail,
        password: "diyavp108",
        role: "admin",
        profileImageUrl: "",
      });
      console.log("Admin account created successfully");
    } else {
      console.log("Admin account already exists");
    }
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};
