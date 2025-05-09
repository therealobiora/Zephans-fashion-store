import connectMongoDB from "@/lib/mongodb";
import Card from "@/models/Card";
import authMiddleware from "@/middleware/authMiddleware";

export const DELETE = authMiddleware(async (req, { params }) => {
  await connectMongoDB();
  try {
    const card = await Card.findOneAndDelete({
      _id: params.id,
      userId: req.user.userId,
    });
    if (!card) {
      return new Response(JSON.stringify({ message: "Card not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: "Card deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
});
