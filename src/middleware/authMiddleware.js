import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.error("Auth middleware: No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Auth middleware: Token verified, userId:", decoded.userId);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth middleware: Invalid token", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;