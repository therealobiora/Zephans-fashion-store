import mongoose from "mongoose";

const paymentOptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  preferred: { type: String, enum: ["card", "bank_transfer", "cod"], default: "card" },
}, { timestamps: true });

export default mongoose.models.PaymentOption || mongoose.model("PaymentOption", paymentOptionSchema);