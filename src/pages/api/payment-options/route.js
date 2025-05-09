import connectMongoDB from "@/lib/mongodb";
import PaymentOption from "@/models/PaymentOption";
import authMiddleware from "@/middleware/auth";

export const GET = authMiddleware(async (req) => {
  await connectMongoDB();
  try {
    let paymentOption = await PaymentOption.findOne({ userId: req.user.userId });
    if (!paymentOption) {
      paymentOption = new PaymentOption({ userId: req.user.userId, preferred: "card" });
      await paymentOption.save();
    }
    return new Response(JSON.stringify(paymentOption), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
});

export const PUT = authMiddleware(async (req) => {
  await connectMongoDB();
  const { preferred } = await req.json();

  try {
    let paymentOption = await PaymentOption.findOne({ userId: req.user.userId });
    if (!paymentOption) {
      paymentOption = new PaymentOption({ userId: req.user.userId, preferred });
    } else {
      paymentOption.preferred = preferred;
    }
    await paymentOption.save();
    return new Response(JSON.stringify(paymentOption), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
});