import authMiddleware from "@/middleware/authMiddleware";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  res
    .status(200)
    .json({ message: "Profile accessed successfully", user: req.user });
}

export default authMiddleware(handler);
