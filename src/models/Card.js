import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  last4: { type: String, required: true },
  brand: { type: String, required: true },
  expiry: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Card || mongoose.model("Card", cardSchema);