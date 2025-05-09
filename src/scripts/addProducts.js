import mongoose from "mongoose";
import Product from "../models/Product.js";

const MONGODB_URI =
  "mongodb+srv://fashion-store:Fashion2025@webclass.gwjrh.mongodb.net/fashion-store?retryWrites=true&w=majority&appName=webclass";

const updatedProducts = [
  {
    name: "Cool T-Shirt",
    price: 25000,
    image: "/images/LEKESHOTIT-31.jpg",
    category: "Tops",
    stock: 1,
    sizes: ["S", "M", "L", "XL"],
    description: "A stylish cotton T-shirt perfect for casual wear.",
    details: {
      fabric: "Cotton",
      color: "Varies",
      care: "Machine wash",
      model: "Model is 5ft9, wearing size M",
    },
  },
  {
    name: "Black Mini Dress",
    price: 18000,
    image: "/images/LEKESHOTIT-18.jpg",
    category: "Minis",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A sleek black mini dress for a chic night out.",
    details: {
      fabric: "Polyester",
      color: "Black",
      care: "Dry-clean only",
      model: "Model is 5ft6, wearing UK 10",
    },
  },
  {
    name: "Pink Pant Set",
    price: 20000,
    image: "/images/LEKESHOTIT-61.jpg",
    category: "Pant Sets",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A trendy pink pant set for a bold statement.",
    details: {
      fabric: "Crepe",
      color: "Pink",
      care: "Hand wash / Dry-clean",
      model: "Model is 5ft7, wearing UK 12",
    },
  },
  {
    name: "LOUIE DRESS",
    price: 15000,
    image: "/images/Product1.jpeg",
    category: "Skirt Sets",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A vibrant red skirt set for any occasion.",
    details: {
      fabric: "Satin",
      color: "Red",
      care: "Dry-clean only",
      model: "Model is 5ft6, wearing UK 10",
    },
  },
  {
    name: "White Lace Dress",
    price: 25000,
    image: "/images/LEKESHOTIT-5.jpeg",
    category: "Dresses",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "An elegant white lace dress for special events.",
    details: {
      fabric: "Lace",
      color: "White",
      care: "Hand wash",
      model: "Model is 5ft7, wearing UK 12",
    },
  },
  {
    name: "Floral Summer Dress",
    price: 17000,
    image: "/images/LEKESHOTIT-14.jpeg",
    category: "Dresses",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A light floral dress perfect for summer days.",
    details: {
      fabric: "Chiffon",
      color: "Multi",
      care: "Hand wash",
      model: "Model is 5ft6, wearing UK 10",
    },
  },
  {
    name: "Green Satin Skirt Set",
    price: 21000,
    image: "/images/Product2.jpeg",
    category: "Skirt Sets",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A luxurious green satin skirt set for evening wear.",
    details: {
      fabric: "Satin",
      color: "Green",
      care: "Dry-clean only",
      model: "Model is 5ft7, wearing UK 12",
    },
  },
  {
    name: "Brown Corduroy Pant Set",
    price: 22000,
    image: "/images/Product3.jpeg",
    category: "Pant Sets",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A cozy brown corduroy pant set for cooler days.",
    details: {
      fabric: "Corduroy",
      color: "Brown",
      care: "Machine wash",
      model: "Model is 5ft6, wearing UK 10",
    },
  },
  {
    name: "Blue Denim Mini Dress",
    price: 19000,
    image: "/images/Product4.jpeg",
    category: "Minis",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A casual blue denim mini dress for everyday style.",
    details: {
      fabric: "Denim",
      color: "Blue",
      care: "Machine wash",
      model: "Model is 5ft7, wearing UK 12",
    },
  },
  {
    name: "Checkered Skirt Set",
    price: 16000,
    image: "/images/LEKESHOTIT-68.jpeg",
    category: "Skirt Sets",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A classic checkered skirt set for a timeless look.",
    details: {
      fabric: "Cotton Blend",
      color: "Multi",
      care: "Machine wash",
      model: "Model is 5ft6, wearing UK 10",
    },
  },
  {
    name: "Gold Sequin Party Dress",
    price: 30000,
    image: "/images/LEKESHOTIT-64.jpeg",
    category: "Dresses",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A dazzling gold sequin dress for party nights.",
    details: {
      fabric: "Sequins",
      color: "Gold",
      care: "Dry-clean only",
      model: "Model is 5ft7, wearing UK 12",
    },
  },
  {
    name: "Pink Floral Mini Dress",
    price: 14000,
    image: "/images/LEKESHOTIT-8.jpeg",
    category: "Minis",
    stock: 1,
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14", "UK 16"],
    description: "A cute pink floral mini dress for warm days.",
    details: {
      fabric: "Polyester",
      color: "Pink",
      care: "Hand wash",
      model: "Model is 5ft6, wearing UK 10",
    },
  },
];

async function updateDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️ Cleared existing products");

    // Insert updated products
    await Product.insertMany(updatedProducts);
    console.log(
      "🚀 12 Products updated successfully with sizes, description, and details!"
    );

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error updating database:", error);
    mongoose.connection.close();
  }
}

updateDatabase();
