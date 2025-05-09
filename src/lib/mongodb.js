// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   // NEW: Log missing URI
//   console.error("[MongoDB] MONGODB_URI not defined");
//   throw new Error("❌ MONGODB_URI is not defined in environment variables");
// }

// const connectDB = async () => {
//   try {
//     // NEW: Log connection start
//     console.log("[MongoDB] Connecting to MongoDB:", {
//       uri: MONGODB_URI.replace(/:.*@/, ":***@"),
//       time: new Date().toISOString(),
//     });
//     await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     // NEW: Log connection success
//     console.log("[MongoDB] Connected:", {
//       readyState: mongoose.connection.readyState,
//       time: new Date().toISOString(),
//     });
//   } catch (error) {
//     // NEW: Log detailed error
//     console.error("[MongoDB] Connection FAILED:", {
//       message: error.message,
//       stack: error.stack,
//       time: new Date().toISOString(),
//     });
//     throw error; // Avoid process.exit to allow API response
//   }
// };

// export default connectDB;


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB; // Optional: for explicit database name

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: MONGODB_DB || undefined, // Use MONGODB_DB if defined, else rely on URI
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected to:", {
        host: mongoose.connection.host,
        database: mongoose.connection.db.namespace,
      });
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
