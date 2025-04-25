// import mongoose from "mongoose";
// import Product from "../../../models/Product"; // This path might need adjusting
// import ProductDetails from "../../../components/ProductDetails";

// const MONGODB_URI =
//   "mongodb://admin:Obiora511@localhost:27017/admin?authSource=admin";

// export async function getServerSideProps({ params }) {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     const product = await Product.findOne({ id: Number(params.id) }).lean();

//     if (!product) {
//       return { notFound: true }; // If no product is found, show a 404 page
//     }

//     return {
//       props: { product },
//     };
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return { notFound: true };
//   }
// }

// export default function ProductPage({ product }) {
//   return <ProductDetails product={product} />;
// }

// import mongoose from "mongoose";
// import Product from "../../../models/Product";

// export default async function handler(req, res) {
//   const { id } = req.query;

//   if (req.method !== "GET") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     await mongoose.connect(
//       process.env.MONGODB_URI ||
//         "mongodb://admin:Obiora511@localhost:27017/admin?authSource=admin"
//     );
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).json({ error: "Internal server error" });
//   } finally {
//     await mongoose.connection.close();
//   }
// }

import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  // NEW: Log handler start
  console.log("[API/products/[id]] START:", {
    method: req.method,
    query: req.query,
    time: new Date().toISOString(),
  });

  const { id } = req.query;

  if (req.method !== "GET") {
    // NEW: Log invalid method
    console.log("[API/products/[id]] Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // NEW: Log connectDB call
    console.log("[API/products/[id]] Calling connectDB");
    await connectDB();
    // NEW: Log connection success
    console.log("[API/products/[id]] connectDB succeeded");

    // NEW: Log query
    console.log("[API/products/[id]] Find product ID:", id);
    const product = await Product.findById(id);

    if (!product) {
      // NEW: Log not found
      console.log("[API/products/[id]] Product not found:", id);
      return res.status(404).json({ error: "Product not found" });
    }

    // NEW: Log result
    console.log("[API/products/[id]] Product found:", product._id);
    return res.status(200).json(product);
  } catch (error) {
    // NEW: Log error
    console.error("[API/products/[id]] Query FAILED:", {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString(),
    });
    return res.status(500).json({
      error: "Error fetching product",
      details: error.message,
    });
  }
}
