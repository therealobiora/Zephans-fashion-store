import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect(); // Connect to MongoDB

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      if (id) {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
      } else {
        const products = await Product.find({});
        return res.status(200).json(products);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching product(s)", error });
    }
  }

  if (req.method === "POST") {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json({ message: "Product added!", product });
    } catch (error) {
      return res.status(500).json({ message: "Error adding product", error });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
