import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();

    if (req.method === "GET") {
      const profile = await Profile.findOne({ userId: decoded.userId });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json({ name: profile.name, email: profile.email });
    } else if (req.method === "PUT") {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      const profile = await Profile.findOneAndUpdate(
        { userId: decoded.userId },
        { name },
        { new: true }
      );
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json({ message: "Profile updated" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Profile error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error" });
  }
}
