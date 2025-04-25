import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String },
    id: { type: Number },
    stock: { type: Number, required: true, default: 1 },
    sizes: { type: [String] }, // Array of strings for sizes
    details: {
      fabric: { type: String },
      color: { type: String },
      care: { type: String },
      model: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
