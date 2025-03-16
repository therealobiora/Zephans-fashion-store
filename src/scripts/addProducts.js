import mongoose from "mongoose";
import Product from "../models/Product.js";

// MongoDB connection string
const MONGODB_URI =
  "mongodb://admin:Obiora511@localhost:27017/admin?authSource=admin";

// 12 Products
const products = [
  {
    name: "Black Mini Dress",
    label: "Minis",
    price: 18000,
    image: "/images/LEKESHOTIT-18.jpg",
    category: "Minis",
  },
  {
    name: "Pink Pant Set",
    label: "Pant Sets",
    price: 20000,
    image: "/images/LEKESHOTIT-61.jpg",
    category: "Pant Sets",
  },
  {
    name: "Red Skirt Set",
    label: "Skirt Sets",
    price: 15000,
    image: "/images/LEKESHOTIT-37.jpg",
    category: "Skirt Sets",
  },
  {
    name: "White Lace Dress",
    label: "Dresses",
    price: 25000,
    image: "/images/LEKESHOTIT-31.jpg",
    category: "Dresses",
  },
  {
    name: "Floral Summer Dress",
    price: 17000,
    image: "/images/LEKESHOTIT-18.jpg",
    category: "Dresses",
  },
  {
    name: "Green Satin Skirt Set",
    price: 21000,
    image: "/images/LEKESHOTIT-61.jpg",
    category: "Skirt Sets",
  },
  {
    name: "Brown Corduroy Pant Set",
    price: 22000,
    image: "/images/LEKESHOTIT-37.jpg",
    category: "Pant Sets",
  },
  {
    name: "Blue Denim Mini Dress",
    price: 19000,
    image: "/images/LEKESHOTIT-31.jpg",
    category: "Minis",
  },
  {
    name: "Checkered Skirt Set",
    price: 16000,
    image: "/images/LEKESHOTIT-18.jpg",
    category: "Skirt Sets",
  },
  {
    name: "Gold Sequin Party Dress",
    price: 30000,
    image: "/images/LEKESHOTIT-61.jpg",
    category: "Dresses",
  },
  {
    name: "Pink Floral Mini Dress",
    price: 14000,
    image: "/images/LEKESHOTIT-37.jpg",
    category: "Minis",
  },
  {
    name: "Cream Linen Pant Set",
    price: 23000,
    image: "/images/LEKESHOTIT-31.jpg",
    category: "Pant Sets",
  },
];

async function addProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await Product.insertMany(products);
    console.log("🚀 12 Products added successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting products:", error);
    mongoose.connection.close();
  }
}

addProducts();
