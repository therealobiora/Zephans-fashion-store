import connectMongoDB from "@/lib/mongodb";
import Address from "@/models/Address";
import authMiddleware from "@/middleware/auth";

export const GET = authMiddleware(async (req) => {
  await connectMongoDB();
  try {
    const addresses = await Address.find({ userId: req.user.userId });
    return new Response(JSON.stringify(addresses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
});

export const POST = authMiddleware(async (req) => {
  await connectMongoDB();
  const { street, city, state, zip, country } = await req.json();

  try {
    const address = new Address({ userId: req.user.userId, street, city, state, zip, country });
    await address.save();
    return new Response(JSON.stringify({ id: address._id, street, city, state, zip, country }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
});