// import connectDB from "@/lib/mongodb";
// import Profile from "@/models/Profile";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   const token = req.headers.authorization?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     await connectDB();

//     if (req.method === "GET") {
//       const profile = await Profile.findOne({ userId: decoded.userId });
//       if (!profile) {
//         return res.status(404).json({ message: "Profile not found" });
//       }
//       res.status(200).json({ name: profile.name, email: profile.email });
//     } else if (req.method === "PUT") {
//       const { name } = req.body;
//       if (!name) {
//         return res.status(400).json({ message: "Name is required" });
//       }
//       const profile = await Profile.findOneAndUpdate(
//         { userId: decoded.userId },
//         { name },
//         { new: true }
//       );
//       if (!profile) {
//         return res.status(404).json({ message: "Profile not found" });
//       }
//       res.status(200).json({ message: "Profile updated" });
//     } else {
//       res.status(405).json({ message: "Method not allowed" });
//     }
//   } catch (error) {
//     console.error("Profile error:", error);
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     res.status(500).json({ message: "Server error" });
//   }
// }


import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";
import authMiddleware from "@/middleware/authMiddleware";

export default async function handler(req, res) {
  console.log("Profile API: Request received", req.method);

  if (req.method !== "GET" && req.method !== "PUT") {
    console.error("Profile API: Method not allowed", req.method);
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Apply auth middleware
  try {
    await new Promise((resolve, reject) => {
      authMiddleware(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  } catch (error) {
    console.error("Profile API: Auth middleware error", error);
    return; // Response already sent by middleware
  }

  try {
    await connectMongoDB();
    console.log("Profile API: Connected to MongoDB");

    if (req.method === "GET") {
      console.log("Profile API: Fetching user", req.userId);
      const user = await User.findById(req.userId).select("name email phone");
      if (!user) {
        console.error("Profile API: User not found", req.userId);
        return res.status(404).json({ message: "User not found" });
      }
      console.log("Profile API: User fetched", user.email);
      return res.status(200).json({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });
    }

    if (req.method === "PUT") {
      console.log("Profile API: Updating user", req.userId, req.body);
      const { name, phone } = req.body;
      if (!name) {
        console.error("Profile API: Name is required");
        return res.status(400).json({ message: "Name is required" });
      }

      const user = await User.findById(req.userId);
      if (!user) {
        console.error("Profile API: User not found", req.userId);
        return res.status(404).json({ message: "User not found" });
      }

      user.name = name;
      user.phone = phone || "";
      await user.save();
      console.log("Profile API: User updated", user.email);

      return res.status(200).json({
        message: "Profile updated successfully",
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  } catch (error) {
    console.error("Profile API error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}