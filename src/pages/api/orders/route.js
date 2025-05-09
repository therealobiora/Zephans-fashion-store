import connectMongoDB from "@/lib/mongodb";
import Order from "@/models/Order";
import authMiddleware from "@/middleware/auth";

export const GET = authMiddleware(async (req) => {
  await connectMongoDB();
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ date: -1 });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
});