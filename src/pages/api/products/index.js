import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  // Log handler entry to confirm route is hit
  console.log("[API/products] START:", {
    method: req.method,
    query: req.query,
    time: new Date().toISOString(),
  });

  try {
    // Log connectDB call
    console.log("[API/products] Calling connectDB");
    await connectDB();
    // Log connection success
    console.log("[API/products] connectDB succeeded");
  } catch (error) {
    // Log connection failure
    console.error("[API/products] connectDB FAILED:", {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString(),
    });
    return res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }

  // Log Product model
  console.log("[API/products] Product model:", typeof Product);

  const { id } = req.query;

  if (req.method === "GET") {
    // Log GET start
    console.log("[API/products] GET request");
    try {
      if (id) {
        // Log single product query
        console.log("[API/products] Find product ID:", id);
        const product = await Product.findById(id);
        if (!product) {
          // Log not found
          console.log("[API/products] Product not found:", id);
          return res.status(404).json({ message: "Product not found" });
        }
        // Log found product
        console.log("[API/products] Product found:", product._id);
        return res.status(200).json(product);
      } else {
        // Log all products query
        console.log("[API/products] Find all products");
        const products = await Product.find({}).exec();
        // Log results
        console.log("[API/products] Products:", {
          count: products.length,
          sample: products.slice(0, 3).map((p) => p._id),
        });
        return res.status(200).json(products);
      }
    } catch (error) {
      // Log query error
      console.error("[API/products] Query FAILED:", {
        message: error.message,
        stack: error.stack,
        time: new Date().toISOString(),
      });
      return res.status(500).json({
        message: "Error fetching products",
        error: error.message,
      });
    }
  }

  if (req.method === "POST") {
    // Log POST start
    console.log("[API/products] POST request:", req.body);
    try {
      const product = await Product.create(req.body);
      // Log created product
      console.log("[API/products] Product created:", product._id);
      return res.status(201).json({ message: "Product added", product });
    } catch (error) {
      // Log POST error
      console.error("[API/products] Create FAILED:", {
        message: error.message,
        stack: error.stack,
        time: new Date().toISOString(),
      });
      return res.status(500).json({
        message: "Error creating product",
        error: error.message,
      });
    }
  }

  // Log invalid method
  console.log("[API/products] Invalid method:", req.method);
  res.status(405).json({ message: "Method not allowed" });
}
