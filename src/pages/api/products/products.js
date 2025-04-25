import Product from "@/models/Product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { name, price, description, image } = req.body;
      const newProduct = await Product.create({
        name,
        price,
        description,
        image,
      });
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
