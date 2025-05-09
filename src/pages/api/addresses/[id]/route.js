import connectMongoDB from "@/lib/mongodb";
import Address from "@/models/Address";
import authMiddleware from "@/middleware/auth";

export const DELETE = authMiddleware(async (req, { params }) => {
  await connectMongoDB();
  try {
    const address = await Address.findOneAndDelete({ _id: params.id, userId: req.user.userId });
    if (!address) {
      return new Response(JSON.stringify({ message: "Address not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Address deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
});