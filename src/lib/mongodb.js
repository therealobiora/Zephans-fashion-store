import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // NEW: Log missing URI
  console.error("[MongoDB] MONGODB_URI not defined");
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

const connectDB = async () => {
  try {
    // NEW: Log connection start
    console.log("[MongoDB] Connecting to MongoDB:", {
      uri: MONGODB_URI.replace(/:.*@/, ":***@"),
      time: new Date().toISOString(),
    });
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // NEW: Log connection success
    console.log("[MongoDB] Connected:", {
      readyState: mongoose.connection.readyState,
      time: new Date().toISOString(),
    });
  } catch (error) {
    // NEW: Log detailed error
    console.error("[MongoDB] Connection FAILED:", {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString(),
    });
    throw error; // Avoid process.exit to allow API response
  }
};

export default connectDB;
