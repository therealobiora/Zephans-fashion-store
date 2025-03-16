import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Cart from "@/models/Cart";
import Order from "@/models/Order";

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

  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res
        .status(200)
        .json({ message: "Product updated!", product: updatedProduct });
    } catch (error) {
      return res.status(500).json({ message: "Error updating product", error });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted!" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting product", error });
    }
  }

  if (req.method === "POST" && req.url.includes("/cart")) {
    try {
      const { userId, productId, quantity } = req.body;
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [], totalPrice: 0 });
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      cart.totalPrice = cart.items.reduce(
        (sum, item) => sum + item.quantity * product.price,
        0
      );
      await cart.save();
      return res.status(200).json({ message: "Cart updated!", cart });
    } catch (error) {
      return res.status(500).json({ message: "Error updating cart", error });
    }
  }

  if (req.method === "POST" && req.url.includes("/order")) {
    try {
      const { userId, cartId, paymentMethod } = req.body;
      const cart = await Cart.findById(cartId).populate("items.productId");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      const newOrder = new Order({
        userId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        paymentMethod,
        status: "Pending",
      });
      await newOrder.save();
      await Cart.findByIdAndDelete(cartId);
      return res
        .status(201)
        .json({ message: "Order placed successfully!", order: newOrder });
    } catch (error) {
      return res.status(500).json({ message: "Error placing order", error });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
