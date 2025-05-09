import connectMongoDB from "@/lib/mongodb";
import Card from "@/models/Card";
import authMiddleware from "@/middleware/auth";

export const GET = authMiddleware(async (req) => {
  await connectMongoDB();
  try {
    const cards = await Card.find({ userId: req.user.userId });
    return new Response(JSON.stringify(cards), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
});

export const POST = authMiddleware(async (req) => {
  await connectMongoDB();
  const { number, expiry, cvc } = await req.json();

  try {
    // Mock card processing (in production, use Stripe/Paystack)
    const last4 = number.slice(-4);
    const brand = number.startsWith("4") ? "Visa" : "Mastercard"; // Simplified
    const card = new Card({ userId: req.user.userId, last4, brand, expiry });
    await card.save();
    return new Response(JSON.stringify({ id: card._id, last4, brand, expiry }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
});